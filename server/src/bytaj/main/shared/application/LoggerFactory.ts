import logger from './Logger/Config';

class LoggerFactory{
  public logInfo(msg:String): void{
    logger.info(msg);
  }
  
  public logError(msg:String): void{
    logger.error(msg);
  }
  
  public logWarning(msg:String): void{
    logger.warn(msg);
  }
}

const loggerFactory:LoggerFactory = new LoggerFactory();
export default loggerFactory;
