const file_handling = require("./file_handling");

let user_id = 1;

const User = function(full_name, email){
    this.full_name = full_name;
    this.id = user_id++;
    this.email = email;
}

User.prototype.greeting_user = function(){
    return "Hello user " + this.full_name;
}


async function get_all_users(req, res){
    const users_arr = await file_handling.get_arr_from_file(file_handling.user_details_file);
    res.send(JSON.stringify(users_arr));
}

async function create_user(req, res){
    const user_name = req.body.user_name;
    const user_email = req.body.user_email;
    if(!validate_params(user_name, user_email)){
        res.status(status_codes.BAD_REQUEST);
        res.send("Invalid request");
    }
    else{
        const user = new User(user_name, user_email);
        await file_handling.add_to_arr_file(user, file_handling.user_details_file);
        res.send("User created successfully");
    }
}

async function delete_user(req, res){
    const user_email = req.body.user_email;
    if(!validate_params('', user_email)){
        res.status(status_codes.BAD_REQUEST);
        res.send("Invalid request");
    }
    else{
        let users_arr = await file_handling.get_arr_from_file(file_handling.user_details_file);
        let index_of_user_to_delete; 
        for(let i=0; i<users_arr.length; i++){
            if(users_arr[i].user_email == user_email){
                index_of_user_to_delete = i;
            }
        }
        users_arr.splice(index_of_user_to_delete, 1);
        await file_handling.write_data_to_file(users_arr, file_handling.user_details_file);
        res.send("User deleted successfully");   
    }
}

function validate_params(user_name, user_email){
    if(user_name == null || user_email == null){
        return false;
    }
    return true;
}


async function count_server_users(){
    const users = await file_handling.get_arr_from_file(file_handling.user_details_file);
    user_id = users.length + 1;
}

module.exports = {
    create_user : create_user,
    get_all_users : get_all_users,
    delete_user : delete_user,
    count_server_users : count_server_users
}