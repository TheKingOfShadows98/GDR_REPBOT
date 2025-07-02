import {dataBase} from "./dataBase.js";



export async function createTable_serverSettings(){
    const response = await dataBase`
    CREATE TABLE servers_settings(
    server_id int NOT NULL PRIMARY KEY,
    initial_credits int NOT NULL
    )`;
    return response;
}

// CREATE TABLE OF USER
export async function create_userTable(server_id){
    const response = await dataBase`
    CREATE TABLE ${server_id}_Users(
    user_id int NOT NULL PRIMARY KEY,
    special_credits varchar(255),
    roles varchar(255)
    )`;
    return response;
}

// CREATE TABLE OF ROLES
export async function create_roleTable(server_id){
    const response = await dataBase`
    CREATE TABLE ${server_id}_Roles(
    id SERIAL NOT NULL PRIMARY KEY,
    server_id int NOT NULL,
    role_id int NOT NULL,
    credits_rewarded int
    )`;
    return response;
}

// CREATE TABLE OF SPECIAL REWARDS
export async function create_special_rewards_Table(server_id){
    const response = await dataBase`
    CREATE TABLE ${server_id}_special_rewards (
    id SERIAL NOT NULL PRIMARY KEY,
    server_id int NOT NULL,
    is_persistant bool NOT NULL,
    credits_rewarded int)
    `;
    return response;
}

// CREATE TABLE OF LOGS
export async function create_logs_Table(server_id){
    const response = await dataBase`
    CREATE TABLE ${server_id}_Logs (
id SERIAL NOT NULL PRIMARY KEY ,
action varchar(255),
author_id int NOT NULL,
description varchar(255)
)`;
    return response;
}
