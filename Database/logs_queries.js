// CREATE TABLE OF LOGS
export async function create_logs_Table(){
    const response = await dataBase`
    CREATE TABLE LOGS (
id SERIAL NOT NULL PRIMARY KEY ,
action varchar(255),
author_id int NOT NULL,
description varchar(255)
)`;
    return response;
}

export async function add_newLog(){

}

export async function get_logs(){
    
}