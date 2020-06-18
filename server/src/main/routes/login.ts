import { Router, Request, Response } from 'express';

const router : Router = Router();
import * as LoginController from '../controllers/LoginController';
import logger from '../helpers/LoggerFactory';
import User from '../core/model/User';


function checkLoginParameters(req: Request):boolean{
    return !(req.body.username == undefined || req.body.password ===undefined);
}

function checkUserValid(userFromDB:any, req:Request, res:Response){
    if (userFromDB){
        logger.logInfo("User "+ userFromDB.username + " logged correctly");
        if (req.session){
            req.session.user = userFromDB._id;
            req.session.save((err)=>{
                logger.logError(err);
            });
        }
        res.json(JSON.stringify(userFromDB));
        res.status(200);
    }else{
        res.status(401);
        logger.logInfo("User/Password of "+ req.body.username + " incorrect");
    }
}

router.post("/", async (req, res) => {
    if (checkLoginParameters(req)){
        let user:any;
        user = <User> await LoginController.loginUser(req.body.username, req.body.password);
        let names = Object.getOwnPropertyNames(user);
        names.forEach(element => console.log(element));
        console.log(user?.constructor.name);
        checkUserValid(user, req, res);
    }else{
        res.status(409);
        logger.logError("Request without all parameters");
    }
    res.send();
});

export default router;