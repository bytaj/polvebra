import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function setUp(){
    let config = dotenv.config({path:process.env.INIT_CWD+"/src/apps/backend/config/env/"+process.env.NODE_ENV+"/.env"});
    dotenvExpand(config);
}
