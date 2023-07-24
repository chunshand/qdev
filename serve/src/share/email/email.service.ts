import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SMTPClient } from 'emailjs';

@Injectable()
export class EmailService {
    private config: object;
    private client: any;
    constructor(private readonly configService: ConfigService) {
        this.config = this.configService.get<object>("email");
        this.client = new SMTPClient({
            user: this.config['user'],
            password: this.config['password'],
            host: this.config['host'],
            port: this.config['port'],
            ssl: true,
        });
    }
    /**
     * 发送邮件 默认
     * @param to 
     * @param text 
     * @returns 
     */
    send(to, text) {
        return this.client.sendAsync({
            text: text,
            from: this.config['user'],
            to: to,
            subject: this.config['name'],
        });

    }

}