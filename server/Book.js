const file_handling = require("./file_handling");
const status_codes = require('http-status-codes').StatusCodes;

let book_id = 1;

const Book = function(name, author_id, img, price, author_name){
    this.name = name;
    this.author_id = author_id;
    this.img = img;
    this.price = price;
    this.id = book_id++;
    this.author_name = author_name;
}

async function get_all_books(req, res){
    const books = await file_handling.get_arr_from_file(file_handling.books_file);
    res.send(JSON.stringify(books));
}



async function create_book(req, res){
    const name = req.body.name;
    const author_id = req.body.author_id;
    const img = req.body.img;
    const price = req.body.price;
    if(validate_params(name, author_id, price)){
        res.status(status_codes.BAD_REQUEST);
        res.send("One of the pearamters is missing");
        return;
    }
    const book_author = await check_id_author_exist(author_id)
    if(book_author == null){
        res.status(status_codes.BAD_REQUEST);
        res.send("The author is not exist in the system");
        return;

    }

    const new_book = new Book(name, author_id, img, price, book_author.name);
    await file_handling.add_to_arr_file(new_book, file_handling.books_file);
    res.send("Book created successfully");
}


async function check_id_author_exist(autor_id){
    let curr_author = null;
    const authors = await file_handling.get_arr_from_file(file_handling.authors_file);
    for(let i=0; i < authors.length; ++i){
        if(authors[i].id == autor_id){
            curr_author = authors[i]
        }
    }
    return curr_author;
}

function validate_params(name, autor_id, price){
    return name == null || autor_id == null || price == null;
}


async function count_server_books(){
    const books =await file_handling.get_arr_from_file(file_handling.books_file);
    book_id = books.length +1;
}


module.exports = {
    create_book : create_book,
    get_all_books : get_all_books,
    count_server_books : count_server_books
}