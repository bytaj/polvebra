export default function( req:any, res:any, next:any ) {
    if (!res.headersSent){
        res.send();
    }
    next();
}