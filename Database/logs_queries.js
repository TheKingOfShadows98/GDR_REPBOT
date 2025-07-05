import { dataBase } from "./dataBase.js";
// CREATE TABLE OF LOGS
export async function create_logs_Table(){
    
    console.log(result);
    const response = await dataBase`
    CREATE TABLE logs (
    id SERIAL NOT NULL PRIMARY KEY ,
    action varchar(255) NOT NULL,
    author_id varchar(255) NOT NULL,
    server_id varchar(255) NOT NULL,
    time_stamp TIMESTAMP NOT NULL
    )`;
    console.log('> CREATING TABLE logs');
    return response;
}

async function exist_table() {
  try {
    const result = await dataBase`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'logs'
      ) AS table_exists
    `;
    return result[0].table_exists;
  } catch (error) {
    console.error('Error checking if servers_settings table exists:', error);
    throw error;
  }
}

export async function validate_logs_Table(){
    const exist = await exist_table();
    console.log(`> VALIDATING IF logs TABLE EXIST `)
    if( !exist ){
        console.log(`! logs TABLE NOT EXIST !`)
        await create_logs_Table();
    }
    console.log('logs TABLE EXIST');
}

export async function add_newLog(server_id,  author_id, log){

    
    const response = await dataBase`
    INSERT INTO logs (action, author_id, server_id, time_stamp) 
    VALUES (${log}, ${author_id}, ${server_id}, CURRENT_TIMESTAMP)
    `;
    console.log('> ADDED LOG TO REGISTRY');
    return response;
}

export async function get_logs(server_id){
    
    
    const response = await dataBase`
    SELECT action, author_id, time_stamp FROM logs
    WHERE server_id = ${server_id}
    ORDER BY time_stamp DESC 
    LIMIT 10
    `;
    console.log('> REQUESTED 10 LAST LOGS');
    return response;

}