const file_handling = require('./file_handling');
const books = require('./Book');
const authors = require('./Authors');


async function get_page(req, res){
	res.type('html')
	res.sendFile('client/index.html', {root: __dirname });
}

//
async function init_server(){
    await books.count_server_books();
    await authors.count_server_authors();
}



//it is like setting the functions to public 
module.exports = {
    get_page : get_page, 
    init_server : init_server
}