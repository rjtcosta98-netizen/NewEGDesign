'use server';

import nodemailer from 'nodemailer';
import { getSupabase } from '@/lib/supabase';
import { getLeadMagnet } from '@/lib/lead-magnets';

export type LeadState = { ok: true } | { ok: false; error: string } | null;

// ── SMTP transport ─────────────────────────────────────────────────────────
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

// ── Email ao utilizador ────────────────────────────────────────────────────
function buildUserEmail(data: {
  name: string;
  email: string;
  resourceTitle: string;
  resourceUrl: string;
}) {
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
              O teu recurso está aqui, ${data.name.split(' ')[0]}!
            </h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 32px">
            <p style="margin:0 0 16px;font-size:15px;color:#c9cfe0;line-height:1.7">
              Obrigado por descarregares <strong style="color:#e8ecf5">${data.resourceTitle}</strong>.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#c9cfe0;line-height:1.7">
              Clica no botão abaixo para aceder ao teu recurso ou volta à página sempre que precisares — o link fica sempre disponível.
            </p>
            <a href="${data.resourceUrl}"
               style="display:inline-block;padding:14px 28px;background:linear-gradient(180deg,#8b6afa,#6d28d9);color:#fff;font-size:15px;font-weight:700;border-radius:999px;text-decoration:none">
              Abrir recurso →
            </a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,.06)">
            <p style="margin:0;font-size:12px;color:#5d6478">
              Enviado pela Element Group · <a href="https://elementgroup.pt" style="color:#8b6afa;text-decoration:none">elementgroup.pt</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Notificação interna (para Ricardo) ────────────────────────────────────
function buildNotificationEmail(data: {
  name: string;
  email: string;
  resourceSlug: string;
  resourceTitle: string;
}) {
  return `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#05070d;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070d;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0d1424;border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden">
        <tr>
          <td style="background:linear-gradient(135deg,#059669,#0d9488);padding:28px 32px">
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6)">Element Group</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em">
              Novo lead captado
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:8px 16px 8px 0;color:#8a93a8;font-size:13px;white-space:nowrap;vertical-align:top">Nome</td>
                <td style="padding:8px 0;color:#e8ecf5;font-size:14px">${data.name}</td>
              </tr>
              <tr>
                <td style="padding:8px 16px 8px 0;color:#8a93a8;font-size:13px;white-space:nowrap;vertical-align:top">Email</td>
                <td style="padding:8px 0;color:#e8ecf5;font-size:14px">
                  <a href="mailto:${data.email}" style="color:#a78bfa">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 16px 8px 0;color:#8a93a8;font-size:13px;white-space:nowrap;vertical-align:top">Recurso</td>
                <td style="padding:8px 0;color:#e8ecf5;font-size:14px">${data.resourceTitle}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px">
            <a href="mailto:${data.email}?subject=Obrigado por descarregares ${encodeURIComponent(data.resourceTitle)}"
               style="display:inline-block;padding:12px 22px;background:linear-gradient(180deg,#8b6afa,#6d28d9);color:#fff;font-size:14px;font-weight:700;border-radius:999px;text-decoration:none">
              Contactar ${data.name.split(' ')[0]} →
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,.06)">
            <p style="margin:0;font-size:12px;color:#5d6478">
              Via elementgroup.pt/recursos/${data.resourceSlug} · ${new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}
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
export async function submitLeadCapture(
  _prev: LeadState,
  fd: FormData,
): Promise<LeadState> {
  const name  = fd.get('name')?.toString().trim()  ?? '';
  const email = fd.get('email')?.toString().trim()  ?? '';
  const slug  = fd.get('slug')?.toString()           ?? '';

  if (!name)  return { ok: false, error: 'Por favor indica o teu nome.' };
  if (!email) return { ok: false, error: 'Por favor indica o teu email.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Email inválido. Verifica o endereço introduzido.' };
  }
  if (!slug)  return { ok: false, error: 'Recurso inválido.' };

  const resource = getLeadMagnet(slug);
  if (!resource) return { ok: false, error: 'Recurso não encontrado.' };

  // ── 1. Guardar em Supabase (upsert para evitar duplicados) ────────────
  try {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb
        .from('leads')
        .upsert(
          { email, name, resource_slug: slug },
          { onConflict: 'email,resource_slug', ignoreDuplicates: false },
        );
      if (error) console.error('[Leads / Supabase]', error.message);
    }
  } catch (err) {
    console.error('[Leads / Supabase]', err);
  }

  const resourceUrl = `https://elementgroup.pt/recursos/${slug}`;

  // ── 2. Email ao utilizador ─────────────────────────────────────────────
  try {
    const transporter = createTransport();
    if (transporter) {
      await transporter.sendMail({
        from: `"Element Group" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `O teu recurso: ${resource.title}`,
        html: buildUserEmail({ name, email, resourceTitle: resource.title, resourceUrl }),
        text: `Olá ${name},\n\nO teu recurso "${resource.title}" está disponível aqui:\n${resourceUrl}\n\nElement Group — elementgroup.pt`,
      });
    } else {
      console.warn('[Leads / SMTP] Credenciais não configuradas — email ao utilizador não enviado.');
    }
  } catch (err) {
    console.error('[Leads / SMTP] Email ao utilizador:', err);
  }

  // ── 3. Notificação interna ─────────────────────────────────────────────
  try {
    const transporter = createTransport();
    if (transporter) {
      const to = process.env.SMTP_TO ?? process.env.SMTP_USER ?? 'info@elementgroup.pt';
      await transporter.sendMail({
        from: `"Element Group" <${process.env.SMTP_USER}>`,
        to,
        replyTo: email,
        subject: `[Lead] ${name} — ${resource.title}`,
        html: buildNotificationEmail({ name, email, resourceSlug: slug, resourceTitle: resource.title }),
        text: `Novo lead\nNome: ${name}\nEmail: ${email}\nRecurso: ${resource.title}`,
      });
    }
  } catch (err) {
    console.error('[Leads / SMTP] Notificação interna:', err);
  }

  return { ok: true };
}
