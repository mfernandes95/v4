import transporter from '../../infrastructure/email/emailTransporter';

export const sendAlertEmail = async () => {
  try {
    const mailOptions = {
      from: process.env.ALERT_EMAIL_FROM,
      to: process.env.ALERT_EMAIL_TO,
      subject: 'Alerta: Execução do CRON Job',
      text: 'O CRON job foi executado com sucesso no sistema Node.js.',
    };

    await transporter.sendMail(mailOptions);
    console.log('Alerta de e-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail de alerta:', error);
  }
};