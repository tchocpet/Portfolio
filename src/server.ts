import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: Number(process.env['SMTP_PORT']) || 587,
      secure: process.env['SMTP_SECURE'] === 'true',
      auth:
        process.env['SMTP_USER'] && process.env['SMTP_PASS']
          ? {
              user: process.env['SMTP_USER'],
              pass: process.env['SMTP_PASS'],
            }
          : undefined,
    });

    const toEmail = process.env['TO_EMAIL'] || process.env['SMTP_USER'];
    const fromEmail =
      process.env['SMTP_FROM'] || process.env['SMTP_USER'] || 'no-reply@example.com';

    const mailText = `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const info = await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `New contact from ${name}`,
      text: mailText,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(
        /\n/g,
        '<br/>'
      )}</p>`,
    });

    console.log('Contact form email sent:', info && (info as any).messageId);
    return res.json({ success: true });
  } catch (err) {
    console.error('Failed to send contact email', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
