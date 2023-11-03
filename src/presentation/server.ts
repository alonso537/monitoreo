import { CheckService } from "../domain/use-cases";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  // new MongoLogDatasource()
  new PostgresLogDatasource()
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

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://soloher.com";
    //   new CheckService(
    //     logRepository,
    //     () => console.log("success"),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
