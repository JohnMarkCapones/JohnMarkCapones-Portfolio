/**
 * Contact Form Email Template
 * Professional HTML email template for contact submissions
 */

import { ContactFormData, contactReasons } from '@/lib/validations/contact';

interface EmailTemplateProps {
  data: ContactFormData;
  timestamp: string;
  messageId: string;
}

/**
 * Generate HTML email template
 */
export function generateContactEmail({ data, timestamp, messageId }: EmailTemplateProps): string {
  const reason = contactReasons.find((r) => r.value === data.reason);
  const reasonLabel = reason ? `${reason.icon} ${reason.label}` : data.reason;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background-color: #0A0A0A;
      color: #F0F0F0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #151515;
      border: 1px solid #2A2A2A;
      border-radius: 12px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #00D9FF 0%, #00FF94 100%);
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #0A0A0A;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #2A2A2A;
    }
    .field:last-child {
      border-bottom: none;
    }
    .field-label {
      font-size: 12px;
      color: #A0A0A0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .field-value {
      font-size: 16px;
      color: #F0F0F0;
      line-height: 1.6;
    }
    .message-box {
      background-color: #1F1F1F;
      border-left: 3px solid #00D9FF;
      padding: 20px;
      border-radius: 4px;
      margin-top: 10px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      background-color: #00D9FF;
      color: #0A0A0A;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
    }
    .footer {
      background-color: #0A0A0A;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #606060;
    }
    .reply-button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #00D9FF 0%, #00FF94 100%);
      color: #0A0A0A;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
    }
    .metadata {
      font-size: 11px;
      color: #606060;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📬 New Portfolio Contact</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- From -->
      <div class="field">
        <div class="field-label">From</div>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>

      <!-- Email -->
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">
          <a href="mailto:${escapeHtml(data.email)}" style="color: #00D9FF; text-decoration: none;">
            ${escapeHtml(data.email)}
          </a>
        </div>
      </div>

      <!-- Reason -->
      <div class="field">
        <div class="field-label">Contact Reason</div>
        <div class="field-value">
          <span class="badge">${reasonLabel}</span>
        </div>
      </div>

      <!-- Message -->
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>

      <!-- Reply Button -->
      <div style="text-align: center;">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: Portfolio Contact" class="reply-button">
          Reply to ${escapeHtml(data.name.split(' ')[0] || data.name)}
        </a>
      </div>

      <!-- Metadata -->
      <div class="metadata">
        <strong>Submission Details:</strong><br>
        Time: ${timestamp}<br>
        Message ID: ${messageId}<br>
        Source: Portfolio Contact Form
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      Sent via John Mark Capones Portfolio Contact Form<br>
      <a href="https://johnmark.dev" style="color: #00D9FF; text-decoration: none;">https://johnmark.dev</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text version (fallback)
 */
export function generateContactEmailText({ data, timestamp, messageId }: EmailTemplateProps): string {
  const reason = contactReasons.find((r) => r.value === data.reason);
  const reasonLabel = reason ? `${reason.icon} ${reason.label}` : data.reason;

  return `
NEW PORTFOLIO CONTACT
════════════════════════════════════════

From: ${data.name}
Email: ${data.email}
Reason: ${reasonLabel}

Message:
────────────────────────────────────────
${data.message}
────────────────────────────────────────

Submission Details:
Time: ${timestamp}
Message ID: ${messageId}
Source: Portfolio Contact Form

Reply to: ${data.email}
  `.trim();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
