'use server';

import nodemailer from 'nodemailer';
import { getSupabase } from '@/lib/supabase';

export type ParceriasState = { ok: true } | { ok: false; error: string } | null;

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

function buildNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  profile: string;
  volume: string;
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
        <tr>
          <td style="background:linear-gradient(135deg,#059669,#0d9488);padding:28px 32px">
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.65)">Element Group · Parcerias</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em">
              Nova candidatura a parceiro
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px">
            <table cellpadding="0" cellspacing="0" width="100%">
              ${row('Nome', data.name)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#a78bfa">${data.email}</a>`)}
              ${row('Telefone', data.phone)}
              ${row('Perfil', data.profile)}
              ${row('Volume estimado', data.volume)}
            </table>
            ${data.message
              ? `<div style="margin-top:20px;padding:16px;background:rgba(255,255,255,.04);border-radius:10px;border:1px solid rgba(255,255,255,.08)">
                   <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5d6478">Mensagem</p>
                   <p style="margin:0;font-size:14px;color:#c9cfe0;line-height:1.7">${data.message.replace(/\n/g, '<br />')}</p>
                 </div>`
              : ''}
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px">
            <a href="mailto:${data.email}?subject=Bem-vindo ao Programa de Parceiros da Element Group"
               style="display:inline-block;padding:12px 22px;background:linear-gradient(180deg,#10b981,#059669);color:#fff;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none">
              Responder a ${data.name.split(' ')[0]} →
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,.06)">
            <p style="margin:0;font-size:12px;color:#5d6478">
              Via elementgroup.pt/parcerias · ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildConfirmationHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#05070d;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070d;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1424;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden">
        <tr>
          <td style="background:linear-gradient(135deg,#6d28d9,#4f46e5);padding:28px 32px">
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.65)">Element Group</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em">
              Candidatura recebida, ${name.split(' ')[0]}!
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px">
            <p style="margin:0 0 16px;font-size:15px;color:#c9cfe0;line-height:1.7">
              Obrigado por te candidatares ao <strong style="color:#e8ecf5">Programa de Parceiros da Element Group</strong>.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#c9cfe0;line-height:1.7">
              Vamos analisar a tua candidatura e entrar em contacto <strong style="color:#e8ecf5">nas próximas 24–48 horas</strong> com todos os detalhes sobre como funciona a parceria e os próximos passos.
            </p>
            <p style="margin:0;font-size:15px;color:#c9cfe0;line-height:1.7">
              Enquanto isso, podes conhecer melhor o nosso trabalho em <a href="https://elementgroup.pt/portfolio" style="color:#a78bfa;text-decoration:none">elementgroup.pt/portfolio</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,.06)">
            <p style="margin:0;font-size:12px;color:#5d6478">
              Element Group · <a href="https://elementgroup.pt" style="color:#6d7280;text-decoration:none">elementgroup.pt</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function submitParcerias(
  _prev: ParceriasState,
  fd: FormData,
): Promise<ParceriasState> {
  // Anti-spam: honeypot — bots fill the hidden "website" field
  const honeypot = fd.get('website')?.toString() ?? '';
  if (honeypot) return { ok: true }; // Silent reject

  const name    = fd.get('name')?.toString().trim()    ?? '';
  const email   = fd.get('email')?.toString().trim()   ?? '';
  const phone   = fd.get('phone')?.toString().trim()   ?? '';
  const profile = fd.get('profile')?.toString()        ?? '';
  const volume  = fd.get('volume')?.toString()         ?? '';
  const message = fd.get('message')?.toString().trim() ?? '';

  // Field length limits to prevent flooding
  if (name.length > 200)    return { ok: false, error: 'Nome demasiado longo.' };
  if (email.length > 320)   return { ok: false, error: 'Email inválido.' };
  if (phone.length > 30)    return { ok: false, error: 'Telefone inválido.' };
  if (message.length > 5000) return { ok: false, error: 'Mensagem demasiado longa (máx. 5000 caracteres).' };

  if (!name)  return { ok: false, error: 'Por favor indica o teu nome.' };
  if (!email) return { ok: false, error: 'Por favor indica o teu email.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email inválido. Verifica o endereço introduzido.' };
  }

  // ── 1. Guardar em Supabase ─────────────────────────────────────────────
  try {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb.from('contacts').insert({
        name,
        email,
        phone,
        service: `Parceria — ${profile || 'sem perfil'}`,
        message: `Volume: ${volume || '–'}\n\n${message}`.trim(),
      });
      if (error) console.error('[Parcerias / Supabase]', error.message);
    }
  } catch (err) {
    console.error('[Parcerias / Supabase]', err);
  }

  const transporter = createTransport();

  // ── 2. Notificação interna ─────────────────────────────────────────────
  try {
    if (transporter) {
      const to = process.env.SMTP_TO ?? process.env.SMTP_USER ?? 'info@elementgroup.pt';
      await transporter.sendMail({
        from: `"Element Group" <${process.env.SMTP_USER}>`,
        to,
        replyTo: email,
        subject: `[Parceria] ${name}${profile ? ` — ${profile}` : ''}`,
        html: buildNotificationHtml({ name, email, phone, profile, volume, message }),
        text: `Nova candidatura a parceiro\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone || '–'}\nPerfil: ${profile || '–'}\nVolume: ${volume || '–'}\n\n${message}`,
      });
    }
  } catch (err) {
    console.error('[Parcerias / SMTP] Notificação:', err);
  }

  // ── 3. Confirmação ao candidato ────────────────────────────────────────
  try {
    if (transporter) {
      await transporter.sendMail({
        from: `"Element Group" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Candidatura a Parceiro recebida — Element Group',
        html: buildConfirmationHtml(name),
        text: `Olá ${name},\n\nRecebemos a tua candidatura ao Programa de Parceiros da Element Group. Vamos entrar em contacto em 24–48 horas.\n\nElement Group — elementgroup.pt`,
      });
    }
  } catch (err) {
    console.error('[Parcerias / SMTP] Confirmação:', err);
  }

  return { ok: true };
}
