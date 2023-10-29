import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url:string):Promise<boolean>;
}

type SuccesCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logrepository: LogRepository,
        private readonly successCallback:SuccesCallback,
        private readonly errorCallback:ErrorCallback
    ){

    }


    async execute(url:string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if(!req.ok) {
                throw new Error(`Error on check service`)
            }

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)

            // console.log(`${url} is ok`);
            this.logrepository.saveLog(log)
            this.successCallback && this.successCallback()
            
            return true;
        } catch (error) {
            // console.log(`${error}`);
            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.high)
            this.logrepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMessage)
            
            return false
        }

    }
}