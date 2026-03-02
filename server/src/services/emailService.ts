import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

let transporter: Transporter;

const getTransporter = (): Transporter => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    });
  }
  return transporter;
};

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const t = getTransporter();
    await t.sendMail({
      from: `"Shame The Lane 🚦" <${env.smtp.user}>`,
      ...options,
    });
    logger.info(`Email sent to ${options.to}: ${options.subject}`);
  } catch (error) {
    logger.error('Email send error:', error);
    throw error;
  }
};

export const sendEscalationEmail = async (
  officialEmail: string,
  complaintTitle: string,
  complaintUrl: string,
  pressureScore: number
): Promise<void> => {
  await sendEmail({
    to: officialEmail,
    subject: `[ESCALATION] Civic Complaint Requires Immediate Attention – Pressure Score: ${pressureScore}`,
    html: `
      <h2>🚨 Civic Complaint Escalation Notice</h2>
      <p>A complaint has reached critical pressure score (<strong>${pressureScore}</strong>) on Shame The Lane platform.</p>
      <h3>${complaintTitle}</h3>
      <p>Citizens are actively pressuring for resolution. View the complaint and citizen demands:</p>
      <a href="${complaintUrl}">View Complaint →</a>
      <br/><br/>
      <p>This is an automated escalation from <a href="https://shamethelane.in">Shame The Lane</a> civic accountability platform.</p>
    `,
  });
};

export const sendRtiConfirmationEmail = async (
  userEmail: string,
  userName: string,
  complaintTitle: string
): Promise<void> => {
  await sendEmail({
    to: userEmail,
    subject: `Your RTI Application is Ready – ${complaintTitle}`,
    html: `
      <h2>📋 RTI Application Generated</h2>
      <p>Hi ${userName},</p>
      <p>Your RTI application for <strong>${complaintTitle}</strong> has been generated successfully.</p>
      <p>Download and submit it to the concerned department via <a href="https://rtionline.gov.in">RTI Online Portal</a>.</p>
      <br/>
      <p>Keep fighting for accountability! 💪</p>
      <p>— Shame The Lane Team</p>
    `,
  });
};
