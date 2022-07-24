const file_handling = require("./file_handling");

let author_id = 1;

const Author = function(name, image_url){
    this.name = name;
    this.id = author_id++;
    this.image_url = image_url;
}

async function create_author(req, res){
    const name = req.body.name;
    const image_url = req.body.image_url;
    if(!validate_params(name, image_url)){
        res.status(status_codes.BAD_REQUEST);
        res.send("Invalid request");
    }
    else{
        const author = new Author(name, image_url);
        await file_handling.add_to_arr_file(author, file_handling.authors_file);
        res.send("Author created successfully");
    }
}


async function get_all_authors(req, res){
    const authors_arr = await file_handling.get_arr_from_file(file_handling.authors_file);
    res.send(JSON.stringify(authors_arr));
}


function validate_params(name, img_url){
    if(name == null || img_url == null){
        return false;
    }
    return true;
}

async function count_server_authors(){
    const authors = await file_handling.get_arr_from_file(file_handling.authors_file);
    author_id = authors.length + 1;
}

module.exports = {
    create_author : create_author,
    get_all_authors : get_all_authors,
    count_server_authors : count_server_authors
}

