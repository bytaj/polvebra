export const USER_DB_NAME: string = "User";
export const ACCOUNT_DB_NAME: string = "Account";
export const TAG_DB_NAME: string = "Tag";
export const TRANSACTION_DB_NAME: string = "Transaction";
export const PERIODIC_TRANSACTION_DB_NAME: string = "PeriodicTransaction";

export interface QueryInterface{
    addParamToQuery(name:string, value:any): QueryInterface;
    addParamToQueryByRange(name:string, gt?:any, lt?:any): QueryInterface;
    addAndCondition(firstQuery:QueryInterface, secondQuery:QueryInterface):QueryInterface;
    addOrCondition(firstQuery:QueryInterface, secondQuery:QueryInterface):QueryInterface;
    selectReturnParams(values:string[]):QueryInterface;
    limitReturn(value:number):QueryInterface;
    sortBy(value:number):QueryInterface;
    getQuery():any;
}