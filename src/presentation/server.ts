import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService()
export class Server {
  public static start() {
    console.log("Server Started...");

    // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);


    
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(['fuxyzone@gmail.com','falonso537@gmail.com'])
    

    //mandar email

    // // CronService.createJob("*/5 * * * * *", () => {
    // //   const url = "https://soloher.com";
    // //   new CheckService(
    // //     fileSystemLogRepository,
    // //     () => console.log("success"),
    // //     (error) => console.log(error)
    // //   ).execute(url);
    // // });
  }
}
