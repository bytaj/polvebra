import {Response} from 'express';

export default function( req:any, res:Response, next:any ) {
    if (!res.headersSent){
        res.send();
    }
    res.end();
}