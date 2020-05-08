import * as Constants from './Constants';

/**
 * 
 */
export function numberOfPayment(beginDate:Date, endDate:Date, currentDate:Date, type:number):number{
    if (isInDate(beginDate, endDate, currentDate)){
        let numberOfDates: number = Math.floor(endDate.getTime()/Constants.MILISECONDS_IN_A_DAY) - Math.floor(currentDate.getTime()/Constants.MILISECONDS_IN_A_DAY);
        if (type == Constants.INTERVAL_DIARY){
            return numberOfDates;
        }else if (type == Constants.INTERVAL_WEEK){
            return Math.floor(numberOfDates/7);
        }else if (type == Constants.INTERVAL_MONTH){
            let payments:number = 0;
            while (Math.floor(currentDate.getTime()/Constants.MILISECONDS_IN_A_DAY) <= Math.floor(endDate.getTime()/Constants.MILISECONDS_IN_A_DAY)){
                currentDate.setMonth(currentDate.getMonth()+1);
                payments++;    
            }
            return payments;
        }
    }
    return 0;
}

/**
 * Checks if a date is between or equal other two.
 * @param beginDate Begin date to check.
 * @param endDate End date to check.
 * @param currentDate Date who'll be cheacked.
 */
export function isInDate(beginDate:Date, endDate:Date, currentDate:Date):boolean{
    if (Math.floor(beginDate.getTime()/Constants.MILISECONDS_IN_A_DAY)  <= Math.floor(currentDate.getTime()/Constants.MILISECONDS_IN_A_DAY)){
        return Math.floor(currentDate.getTime()/Constants.MILISECONDS_IN_A_DAY) <= Math.floor(endDate.getTime()/Constants.MILISECONDS_IN_A_DAY);
    }
    return false;
}

/**
 * Convert a date in a string with the form yyyy-MM-dd
 * @param date Date to transform.
 */
export function dateToString(date:Date) :string{
    return date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDay().toString()
}