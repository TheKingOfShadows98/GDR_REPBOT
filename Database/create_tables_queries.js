import {dataBase} from "./dataBase.js";








// CREATE TABLE OF SPECIAL REWARDS
export async function create_special_rewards_Table(){
    const response = await dataBase`
    CREATE TABLE SPECIAL_REWARDS (
    id SERIAL NOT NULL PRIMARY KEY,
    server_id int NOT NULL,
    is_persistant bool NOT NULL,
    credits_rewarded int)
    `;
    return response;
}


