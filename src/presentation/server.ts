import { CheckService } from "../domain/use-cases";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server Started...");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        () => console.log("success"),
        (error) => console.log(error)
      ).execute("https://google.com");
    });
  }
}
