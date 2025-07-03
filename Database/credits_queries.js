import { dataBase } from "./dataBase.js";

// CREATE TABLE OF USER
export async function create_table(server_id){
    const response = await dataBase`
    CREATE TABLE USER_CREDITS(
    user_id varchar(255) NOT NULL PRIMARY KEY,
    special_credits varchar(255),
    roles varchar(255)
    )`;
    return response;
}
