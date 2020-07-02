import * as QueryInterface from "../../QueryInterface";
import {Document, Model, Query } from "mongoose";
import * as Constants from "../../../helpers/Constants";
import UserSchema from "./UserSchema";
import AccountSchema from "./AccountSchema";
import TagSchema from "./TagSchema";
import TransactionSchema from "./TransactionSchema";
import PeriodicTransactionSchema from "./PeriodicTransactionSchema";

export default class MongoQuery implements QueryInterface.QueryInterface{
    model:Model<Document>;
    query:Query<any>;

    constructor(model:string){
        switch(model){
            case QueryInterface.USER_DB_NAME: {
                this.model = UserSchema;
                break;
            }
            case QueryInterface.ACCOUNT_DB_NAME: {
                this.model = AccountSchema;
                break;
            }
            case QueryInterface.TAG_DB_NAME: {
                this.model = TagSchema;
                break;
            }
            case QueryInterface.TRANSACTION_DB_NAME: {
                this.model = TransactionSchema;
                break;
            }
            case QueryInterface.PERIODIC_TRANSACTION_DB_NAME: {
                this.model = PeriodicTransactionSchema;
                break;
            }
            default: {
                throw new Error("Type invalid");
                break;
            }
        }
        this.query=this.model.find();
    };

    addParamToQuery(name:string, value:any): QueryInterface.QueryInterface{
        this.query.where(name).equals(value);
        return this;
    }

    addParamToQueryByRange(name:string, gt?:any, lt?:any): QueryInterface.QueryInterface{
        if (gt && lt){
            this.query.where(name).lt(lt).gt(gt);
        }else if(gt){
            this.query.where(name).gt(gt);
        }else{
            this.query.where(name).lt(lt);
        }

        return this;
    }
    
    addAndCondition(firstQuery:QueryInterface.QueryInterface, secondQuery:QueryInterface.QueryInterface):QueryInterface.QueryInterface{
        return this;
    }

    addOrCondition(firstQuery:QueryInterface.QueryInterface, secondQuery:QueryInterface.QueryInterface):QueryInterface.QueryInterface{
        return this;
    }

    selectReturnParams(values:string[]):QueryInterface.QueryInterface{
        this.query.select(values);
        return this;
    }

    limitReturn(value:number):QueryInterface.QueryInterface{
        this.query.limit(value);
        return this;
    }

    sortBy(value:number):QueryInterface.QueryInterface{
        this.query.sort(value);
        return this;
    }

    getQuery():Query<any>{
        return this.query;
    }
}