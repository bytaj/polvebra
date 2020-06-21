import { Router, Request } from 'express';

const router : Router = Router();
import logger from '../helpers/LoggerFactory';
import * as LoginController from '../controllers/LoginController';

function checkCreateUserParam(req: Request):boolean{
    let body = req.body;
    return !(body.email==undefined || body.password == undefined || body.name == undefined || body.username == undefined);
}

router.post("/", (req, res) => {
    if (checkCreateUserParam(req)){
        LoginController.createUser(req.body).then(user =>{
            if (req.session){
                req.session.user = user;
                req.session.save((err)=>{
                    logger.logError(err);
                });
            }
            logger.logInfo("User "+ req.body.username + " created sucessful!");
            res.status(200);
            res.send();
        }).catch((err) => {
            res.status(409);
            logger.logInfo("User "+ req.body.username + " and/or email " + req.body.email + " already in use");
            res.send();
        });
    }else{
        logger.logError("Request without all parameters");
        res.status(400);
        res.send();
    }
    
});

export default router;