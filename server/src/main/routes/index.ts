import { Router } from 'express';

const router : Router = Router();

router.get("/", (req, res) => {
    res.json({
        "name": "jandepola"
    })
});

export default router;