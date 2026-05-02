'use server';

import { headers } from 'next/headers';
import nodemailer from 'nodemailer';
import { getSupabase } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';

export type ContactState = { ok: true } | { ok: false; error: string } | null;

// ── SMTP transport (SmarterMail / mailbox.pt) ──────────────────────────────
function createTransport() {
  const host = process.env.SMTP_HOST ?? 'mail6.mailbox.pt';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

// ── Notificação HTML para o teu email ─────────────────────────────────────
function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:8px 16px 8px 0;color:#8a93a8;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
           <td style="padding:8px 0;color:#e8ecf5;font-size:14px">${value}</td>
         </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#05070d;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070d;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1424;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);padding:28px 32px">
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6)">Element Group</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em">
              Novo contacto recebido
            </h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 32px">
            <table cellpadding="0" cellspacing="0" width="100%">
              ${row('Nome', data.name)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#a78bfa">${data.email}</a>`)}
              ${row('Telefone', data.phone)}
              ${row('Serviço', data.service)}
            </table>
            ${
              data.message
                ? `<div style="margin-top:20px;padding:16px;background:rgba(255,255,255,.04);border-radius:10px;border:1px solid rgba(255,255,255,.08)">
                     <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5d6478">Mensagem</p>
                     <p style="margin:0;font-size:14px;color:#c9cfe0;line-height:1.7">${data.message.replace(/\n/g, '<br />')}</p>
                   </div>`
                : ''
            }
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 28px">
            <a href="mailto:${data.email}?subject=Re: Proposta Element Group"
               style="display:inline-block;padding:12px 22px;background:linear-gradient(180deg,#8b6afa,#6d28d9);color:#fff;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none">
              Responder a ${data.name.split(' ')[0]} →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,.06)">
            <p style="margin:0;font-size:12px;color:#5d6478">
              Submissão via elementgroup.pt/contacto · ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Server Action ──────────────────────────────────────────────────────────
export async function submitContact(
  _prev: ContactState,
  fd: FormData,
): Promise<ContactState> {
  // Rate limit: 5 submissions per IP per minute
  const hdrs = await headers();
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
    return { ok: false, error: 'Demasiadas tentativas. Aguarda um momento e tenta novamente.' };
  }

  // Anti-spam: honeypot — bots fill the hidden "website" field
  const honeypot = fd.get('website')?.toString() ?? '';
  if (honeypot) return { ok: true }; // Silent reject

  const name    = fd.get('name')?.toString().trim()    ?? '';
  const email   = fd.get('email')?.toString().trim()   ?? '';
  const phone   = fd.get('phone')?.toString().trim()   ?? '';
  const service = fd.get('service')?.toString()        ?? '';
  const message = fd.get('message')?.toString().trim() ?? '';

  // Field length limits to prevent flooding
  if (name.length > 200)    return { ok: false, error: 'Nome demasiado longo.' };
  if (email.length > 320)   return { ok: false, error: 'Email inválido.' };
  if (phone.length > 30)    return { ok: false, error: 'Telefone inválido.' };
  if (message.length > 5000) return { ok: false, error: 'Mensagem demasiado longa (máx. 5000 caracteres).' };

  // Validação
  if (!name)  return { ok: false, error: 'Por favor indica o teu nome.' };
  if (!email) return { ok: false, error: 'Por favor indica o teu email.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email inválido. Verifica o endereço introduzido.' };
  }

  const data = { name, email, phone, service, message };

  // ── 1. Guardar em Supabase ─────────────────────────────────────────────
  try {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.from('contacts').insert(data);
      if (error) console.error('[Contacto / Supabase]', error.message);
    }
  } catch (err) {
    console.error('[Contacto / Supabase]', err);
  }

  // ── 2. Enviar email via SMTP ───────────────────────────────────────────
  try {
    const transporter = createTransport();
    if (transporter) {
      const to = process.env.SMTP_TO ?? process.env.SMTP_USER ?? 'info@elementgroup.pt';
      await transporter.sendMail({
        from: `"Element Group" <${process.env.SMTP_USER}>`,
        to,
        replyTo: email,
        subject: `[Contacto] ${name}${service ? ` — ${service}` : ''}`,
        html: buildEmailHtml(data),
        text: [
          `Nome:     ${name}`,
          `Email:    ${email}`,
          `Telefone: ${phone   || '–'}`,
          `Serviço:  ${service || '–'}`,
          '',
          message || '(sem mensagem)',
        ].join('\n'),
      });
    } else {
      console.warn('[Contacto / SMTP] SMTP_USER ou SMTP_PASS não configurados — email não enviado.');
    }
  } catch (err) {
    // Não bloqueamos o utilizador se o email falhar — o Supabase já guardou
    console.error('[Contacto / SMTP]', err);
  }

  return { ok: true };
}
