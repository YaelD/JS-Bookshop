// External modules
const express = require('express')
const package = require('../package.json');
const path = require('path')
const functions = require('./functions');
const book = require('./Book');
const authors = require('./Authors');


const app = express()

const  port = 5421;

//------------------------------------------------------------------------------------------------
// General app settings
const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader("Access-Control-Allow-Headers" ,"Content-Type, Authorization");
	res.setHeader("Access-Control-Expose-Headers", "Content-Type, Authorization")
	res.setHeader("Access-Control-Max-Age","86400")
	next()
}
app.use(express.static( path.join(__dirname,'..','client')));
app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
  extended: true
}));




//------------------------------------------------------------------------------------------------

const router = express.Router();

 //this will be call when we entering to the web page
app.get('/', (req, res) => { functions.get_page(req, res) });

router.post('/books', (req, res) => {book.create_book(req, res)});
router.get('/books', (req, res) => {book.get_all_books(req, res)});
router.post('/authors', (req, res) => {authors.create_author(req, res)});
router.get('/authors', (req, res) => {authors.get_all_authors(req,res)});


app.use('/book_shop',router)
let msg = `${package.description} listening at port ${port}`

functions.init_server();

app.listen(port, () => { console.log( msg ) ; })