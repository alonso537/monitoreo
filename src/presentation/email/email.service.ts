
import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachement[];
}

//todo: attachements
interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(
    ){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const {to, subject, htmlBody, attachments = []} = options
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });

            // console.log(sendInformation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email Sent',
                origin: 'email.service.ts'
            })
            // this.logRepository.saveLog(log)
            

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not Sent',
                origin: 'email.service.ts'
            })
            // this.logRepository.saveLog(log)
            
            return false;
        }
    }

     async sendEmailWithFileSistemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>lorem bgeiwfgyeiwfglkiufgbuywgefuywfuywk</p>
        <p>lorem bgeiwfgyeiwfglkiufgbuywgefuywfuywk</p>
        `

        const attachements:Attachement[] = [
            {filename: 'logs-low.log', path: './logs/logs-low.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
        ]

        return this.sendEmail({
            to,
            subject,
            attachments: attachements,
            htmlBody
        });
    }
}