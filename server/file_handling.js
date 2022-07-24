const fs = require("fs").promises;
const books_file = "./data/books.json"
const authors_file = "./data/authors.json";

async function read_file(path){
	try{
		const content = await fs.readFile(path);
		return content.toString();
	}
	catch (e){
		return null;
	}
}

async function exists( path )
{
    try {
        const stat = await fs.stat( path )
        return true;
    }
    catch(e)
    {
        return false;
    }    
}

async function get_arr_from_file(path)
{
	if(!(await exists(path))){
		await fs.writeFile(path, JSON.stringify([]));
	}
	let arr = await read_file(path);
	arr_json = JSON.parse(arr); //parse: staring -> object, stringify:  object-> string
	return arr_json;
}

async function write_data_to_file(data ,path, mode)
{
	await fs.writeFile(path, JSON.stringify(data), {flag:mode});
}

async function add_to_arr_file(new_value, path){
	let arr = await get_arr_from_file(path);
	arr.push(new_value);
	await write_data_to_file(arr, path);
}



module.exports = {
    get_arr_from_file : get_arr_from_file,
    write_data_to_file : write_data_to_file, 
    add_to_arr_file : add_to_arr_file,
	exists : exists,
	read_file : read_file,
	fs : fs,
	authors_file : authors_file,
	books_file : books_file
}
