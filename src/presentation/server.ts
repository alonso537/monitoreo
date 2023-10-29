import { CheckService } from "../domain/use-cases";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server Started...");

    //mandar email

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://soloher.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log("success"),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
