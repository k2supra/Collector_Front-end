class Logger{
    constructor(){
        if(Logger.instance) return Logger.instance;
        this.logs =[];
        Logger.instance = this
    }
    log(msg){
        this.logs.push(msg);
        console.log(`[LOG]: ${msg}`)
    }
}
export const logger = new Logger()