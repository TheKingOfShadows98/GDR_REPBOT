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
    return result[0].table_exists;
  } catch (error) {
    console.error('Error checking if servers_settings table exists:', error);
    throw error;
  }
}

async function validateTable(){
    const exist = await exist_table();
    console.log(`> VALIDATING IF user_credits TABLE EXIST `)
    if( ! exist ){
        console.log(`! user_credits TABLE NOT EXIST !`)
        await create_table();
    }

}

export async function get_credits(server_id ,user_id){
    await validateTable();
     const response = await dataBase`
    SELECT aditional_credits FROM user_credits
    WHERE
    server_id = ${server_id} AND user_id = ${user_id}
    `;
    return response;
}

export async function add_credits(server_id, user_id, amount){
    await validateTable();
    const response = await dataBase`
    INSERT INTO user_credits (server_id, user_id, aditional_credits)
      VALUES (${server_id},${user_id},${amount})
      ON CONFLICT (server_id, user_id)
      DO UPDATE SET 
          aditional_credits = aditional_credits + ${amount}
      RETURNING *
    `;
    console.log(response);
    return response;
}
export async function remove_credits(server_id, user_id, amount){
    await validateTable();
    const response = await dataBase`
    INSERT INTO user_credits (server_id, user_id, aditional_credits)
      VALUES (${server_id},${user_id},${amount})
      ON CONFLICT (server_id, user_id)
      DO UPDATE SET 
          aditional_credits = GREATEST(aditional_credits - ${amount}, 0)
      RETURNING *
    `;
    console.log(response);
    return response;
}

export async function reset_credits(server_id, user_id){
    await validateTable();
    const response = await dataBase`
    INSERT INTO user_credits (server_id, user_id, aditional_credits)
      VALUES (${server_id},${user_id},0,)
      ON CONFLICT (server_id, user_id)
      DO UPDATE SET 
          aditional_credits = 0
      RETURNING *
    `;
    console.log(response);
    return response;
}