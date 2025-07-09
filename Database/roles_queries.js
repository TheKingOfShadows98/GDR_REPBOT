import {dataBase} from "./dataBase.js";


// CREATE TABLE OF ROLES
async function create_roleTable(){
    const response = await dataBase`
    CREATE TABLE roles (
    id SERIAL NOT NULL PRIMARY KEY,
    server_id varchar(255) NOT NULL,
    role_id varchar(255) NOT NULL,
    role_name varchar(255) NOT NULL,
    credits int
    )`;
    return response;
}

async function exist_table() {
  try {
    const result = await dataBase`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'roles'
      ) AS table_exists
    `;
    return result[0].table_exists;
  } catch (error) {
    console.error('Error checking if servers_settings table exists:', error);
    throw error;
  }
}

export async function validate_role_Table(){
    const exist = await exist_table();
    console.log(`> VALIDATING IF roles TABLE EXIST `)
    if( !exist ){
        console.log(`! logs TABLE NOT EXIST !`)
        await create_roleTable();
    }
    console.log('logs TABLE EXIST');
}

async function exist_role(server_id, role_id){
    const query = await dataBase`
    SELECT * FROM roles
    WHERE
    server_id = ${server_id} AND role_id = ${role_id}
    LIMIT 1
    `;
    return query > 0;
}

export async function add_role(server_id, role_id, role_name, reward){
    try {
        const query = await dataBase`
        INSERT INTO roles (server_id, role_id, role_name, credits)
        VALUES (${server_id},${role_id},${role_name},${reward})
        `;
        console.log(query);
        console.log('> ROLE ADDED');
        return (true, "ROLE CREATED SUCCESSFULLY");
    } catch (error) {
        console.log(error);
        return (false, "SOMETHING WAS WRONG");
    }
}

export async function set_role_reward(server_id, role_id, role_name, reward){
    try {
        const exist = await exist_role(server_id,role_id);
        if(!exist){
            await add_role(server_id, role_id, role_name, reward);
            return {confirm: true,  message:"ROLE SET CORRECTLY"};
        }
        const query = await dataBase`
        UPDATE INTO roles
        SET credits = ${reward};
        WHERE server_id = ${server_id} AND role_id = ${role_id}
        `;
        console.log('> ROLE MODIFIED');
        return {confirm: true,  message:"ROLE MODIFIED SUCCESSFULLY"};
    } catch (error) {
        console.log(error);
        return {confirm: false,  message:"SOMETHING WAS WRONG"};
    }

}

export async function remove_role(server_id, role_id){
    try {
        const exist = exist_role(server_id,role_id);
        if(!exist){
            return (false, "ROLE NOT EXIST");
        }
        const query = await dataBase`
        DELETE FROM roles
        WHERE server_id = ${server_id} AND role_id = ${role_id}
        `;
        console.log('> ROLE REMOVED');
        return {confirm: true,  message:"ROLE REMOVED"};
       
    } catch (error) {
        console.log(error);
        return {confirm: false, message: "SOMETHING WAS WRONG"};
    }

}

export async function get_roles(server_id){
    try {
        const query = await dataBase`
        SELECT role_id, credits FROM roles
        WHERE server_id = ${server_id}
        `
        console.log('> GET ALL ROLES');
        return {confirm: true, message: query};
        
    } catch (error) {
        console.log(error);
        return (false, "SOMETHING WAS WRONG");
    }
}