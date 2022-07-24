# JS-Bookshop


1. The first question solution in folder "first question"

2. Added postman collection to add books and test adding a new authors.
There are 4 authors(inside server/data/authors.json) and 8 books(two for each aouthor, inside server/data/books.json);

3. This is a One page app. So there is only one html = index.html, in the client folder.

4. Cookies: the cookies saving the current shoping cart as json format, 
when the site is up again we will read the cookie and parse again from string to array.

5. The client JSX files are found in client folder. the the compiled files are found in client/js folder.

## The GUI:

1. All the books are shown in the home page. While clicking on book picture the user will navigate to the book page.
2. Only in the book page the user can add the current book to his shopping cart.
3. The user can navigate to the page of the shopping cart and the home page from any page in the site.
4. While clicking on the book's pictures in the shopping cart page and authors page the user will navigate to the book page.

To run question 1:
cd first-question
node main.js

To run the server:
npm install
cd server
node server.js

# Moderators:

Matan Peretz: https://github.com/MatanP12

Yael Davidov: https://github.com/YaelD