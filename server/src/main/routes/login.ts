import { Router, Request } from 'express';

const router : Router = Router();
import * as LoginController from '../controllers/LoginController';
import logger from '../helpers/LoggerFactory';

function checkLoginParameters(req: Request):boolean{
    return !(req.body.username == undefined || req.body.password ===undefined);
}

router.post("/", (req, res) => {
    if (checkLoginParameters(req)){
        logger.logInfo(req.body.username + " " + req.body.password);
        let user = LoginController.loginUser(req.body.username, req.body.password);
        if (user){
            if (req.session){
                req.session.user = user;
            }
            logger.logInfo("User "+ user.getUsername() + " logged correctly");
            res.status(200);
        }else{
            res.status(401);
            logger.logInfo("User/Password of "+ req.body.username + " incorrect");
        }
    }else{
        res.status(409);
        logger.logError("Request without all parameters");
    }
    res.send();
});

export default router;