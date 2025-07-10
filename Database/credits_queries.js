import { dataBase } from "./dataBase.js";

// CREATE TABLE OF USER
async function create_table(){
    const response = await dataBase`
    CREATE TABLE user_credits(
    id SERIAL NOT NULL PRIMARY KEY,
    server_id varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    aditional_credits INTEGER NOT NULL
    )`;
    console.log('> user_credits TALBE CREATED');
    return response;
}


async function exist_table() {
  try {
    const result = await dataBase`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'user_credits'
      ) AS table_exists
    `;
    console.log(result);
    return result[0].table_exists;
  } catch (error) {
    console.error('Error checking if servers_settings table exists:', error);
    throw error;
  }
}

export async function validate_users_Table(){
    const exist = await exist_table();
    console.log(`> VALIDATING user_credits`)
    if( ! exist ){
        console.log(`! user_credits TABLE NOT EXIST !`)
        await create_table();
    }
    console.log(`> user_credits TABLE EXIST `)
}

export async function get_all_credits(server_id){
    const response = await dataBase`
    SELECT server_id, user_id, aditional_credits FROM user_credits
    WHERE
    server_id = ${server_id}
    `;
    return response;
}

export async function get_credits(server_id ,user_id){
    
    console.log(`> SELECTING USERS WITH ${server_id}, ${user_id}`);
    
    const response = await dataBase`
    SELECT aditional_credits FROM user_credits
    WHERE
    server_id = ${server_id} AND user_id = ${user_id}
    LIMIT 1
    `;
    return response;
}

async function exist_credits(server_id, user_id){
    const response = await dataBase`
    SELECT * FROM user_credits
    WHERE
    server_id = ${server_id} AND user_id = ${user_id}
    LIMIT 1
    `;
    console.log(response);
    return response.length > 0;
}

async function insert_credits(server_id, user_id, amount){
    const response = await dataBase
    `
    INSERT INTO user_credits (server_id, user_id, aditional_credits)
    VALUES (${server_id},${user_id},${amount})
    `
    console.log('> INSERTADO COMO NUEVO REGISTRO')
    console.log(response);
    return response;
}

export async function add_credits(server_id, user_id, amount){
    
    try {
        const exist = await exist_credits(server_id, user_id);
        console.log(exist);
        if(!exist){
            return insert_credits(server_id, user_id,amount);
        }
        const response = await dataBase`
        UPDATE user_credits 
        SET aditional_credits = aditional_credits + ${amount} 
        WHERE server_id = ${server_id} AND user_id = ${user_id}
        RETURNING *
        `;
        console.log('> MODIFICADO REGISTRO');
        console.log(response);
        return response;
        
    } catch (error) {
        console.log(`! ALGO SALIO MAL !`)
        console.log(error);
    }
   
}
export async function remove_credits(server_id, user_id, amount){
    
    try {
        const exist = await exist_credits(server_id, user_id);
        if(!exist){
            insert_credits(server_id, user_id, 0);
        }
        const response = await dataBase`
        UPDATE user_credits 
        SET aditional_credits = aditional_credits - ${amount} 
        WHERE server_id = ${server_id} AND user_id = ${user_id}
        RETURNING *
        `;
        console.log(response);
        console.log('> MODIFICADO REGISTRO');
        return true;
        
    } catch (error) {
        console.log(`! ALGO SALIO MAL !`)
        console.log(error);
    }
}

export async function reset_credits(server_id, user_id){
    
    const exist = exist_credits(server_id, user_id);
    if(!exist){
        return insert_credits(server_id, user_id, 0);
    }
    const response = await dataBase`
        UPDATE user_credits 
        SET aditional_credits = 0 
        WHERE server_id = ${server_id} AND user_id = ${user_id}
        RETURNING *
        `;
    console.log('> SET 0 aditional credits');
    return response;
}