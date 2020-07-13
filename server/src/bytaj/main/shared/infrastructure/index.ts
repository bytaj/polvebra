import { Router } from 'express';

const router : Router = Router();

router.get("/", (req, res) => {
    if (req.session?.user){
        res.status(200);
        res.json({
            "name": "jandepola"
        });
    }else{
        res.status(401);
    }
    res.send();
});

export default router;