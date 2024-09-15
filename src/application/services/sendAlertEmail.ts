import transporter from '../../infrastructure/email/emailTransporter';

export const sendAlertEmail = async () => {
  try {
    const mailOptions = {
      from: process.env.ALERT_EMAIL_FROM,
      to: process.env.ALERT_EMAIL_TO,
      subject: 'Alerta: Falha na execução do CRON Job',
      text: 'O job do CRON não foi executado com sucesso no sistema. Consulte o banco de dados para mais informações.',
    };

    await transporter.sendMail(mailOptions);
    console.log('Alerta de e-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail de alerta:', error);
  }
};