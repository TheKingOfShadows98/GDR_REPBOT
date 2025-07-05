import { dataBase } from "./dataBase.js";


export async function createTable_serverSettings(){
    const response = await dataBase`
    CREATE TABLE servers_settings(
    server_id varchar(255) NOT NULL PRIMARY KEY,
    initial_credits INTEGER NOT NULL
    )`;
    console.log("servers_seetings created correctly");
    return response;
}

export async function add_settings(server_id,author_id,data){
    
    const response = await dataBase
    `
        INSERT INTO servers_settings (server_id, initial_credits)
        VALUES (${server_id}, ${data.initial_credits})
        RETURNING *
    `;
    
    return response;
}

export async function get_settings(server_id){
    const response = await dataBase
    `
    SELECT initial_credits 
    FROM servers_settings 
    WHERE server_id = ${server_id}
    `;
    
    console.log(response[0]);
    return response[0];

}

async function exist_table() {
  try {
    const result = await dataBase`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'servers_settings'
      ) AS table_exists
    `;
    return result[0].table_exists;
  } catch (error) {
    console.error('Error checking if servers_settings table exists:', error);
    throw error;
  }
}

async function exist_settings(server_id) {
    
    try 
    {
        const result = await dataBase
        `
        SELECT 1 
        FROM servers_settings 
        WHERE server_id = ${server_id}
        LIMIT 1
        `;

        return result.length > 0;
    } 
    catch (error)
    {
        console.error(`Error checking settings for server ${server_id}:`, error);
        throw error;
    }
}

export async function validate_servers_Table() {
    const table_exist = await exist_table()
    if(!table_exist) await createTable_serverSettings();
    console.log('servers_settigns EXIST');
}



export async function set_settings(server_id, author_id, data){
    const exist = await exist_settings(server_id);
    if(!exist){
        return add_settings(server_id,author_id, data);
    }
    else {
    const result = await dataBase
    `
        UPDATE servers_settings
        SET 
        initial_credits = ${data.initial_credits}
        WHERE server_id = ${server_id}
        RETURNING *
    `;
    console.log("Server Settigns changed correctly");
    return result;
    }
}

