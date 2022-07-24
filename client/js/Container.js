class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPage: "",
            homePage: "homePage",
            bookPage: "bookPage",
            authorPage: "authorPage",
            shoppingCartPage: "shoppingCartPage",
            books_arr: [],
            authors_arr: [],

            selected_book: '',
            selected_book_author: '',
            selected_author_books: [],

            shopping_cart_arr: this.props.shopingCart
        };
        this.getCurrPage = this.renderCurrPage.bind(this);

        this.renderHomePage = this.renderHomePage.bind(this);
        this.renderBookPage = this.renderBookPage.bind(this);
        this.renderAuthorPage = this.renderAuthorPage.bind(this);
        this.renderShoppingCartPage = this.renderShoppingCartPage.bind(this);

        this.callHomePage = this.callHomePage.bind(this);
        this.callBookPage = this.callBookPage.bind(this);
        this.callAuthorPage = this.callAuthorPage.bind(this);
        this.callCartPage = this.callCartPage.bind(this);

        this.handle_get_books = this.handle_get_books.bind(this);
        this.get_all_authors = this.get_all_authors.bind(this);
        this.callAddBookToCart = this.callAddBookToCart.bind(this);
    }

    async componentDidMount() {

        const books = await this.handle_get_books();
        const authors = await this.get_all_authors();
        this.setState({ books_arr: books, authors_arr: authors,
            currPage: this.state.homePage });
    }

    async handle_get_books() {
        const response = await fetch('/book_shop/books', { method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status != 200) {
            alert("Error while gettin the books");
        } else {
            const books = await response.json();
            return books;
        }
    }

    async get_all_authors() {
        const response = await fetch('/book_shop/authors', { method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status != 200) {
            alert("Error while gettin the authors");
        } else {
            const authors = await response.json();
            return authors;
        }
    }

    renderCurrPage() {
        if (this.state.currPage == this.state.homePage) {
            return this.renderHomePage();
        } else if (this.state.currPage == this.state.bookPage) {
            return this.renderBookPage();
        } else if (this.state.currPage == this.state.authorPage) {
            return this.renderAuthorPage();
        } else if (this.state.currPage == this.state.shoppingCartPage) {
            return this.renderShoppingCartPage();
        }
    }

    callHomePage() {
        this.setState({ currPage: this.state.homePage });
    }

    callBookPage(book_id) {
        let book_author = null;
        let curr_book = null;
        let curr_author_books = [];
        for (let i = 0; i < this.state.books_arr.length; ++i) {
            if (this.state.books_arr[i].id == book_id) {
                curr_book = this.state.books_arr[i];
            }
        }
        for (let i = 0; i < this.state.authors_arr.length; ++i) {
            if (this.state.authors_arr[i].id == curr_book.author_id) {
                book_author = this.state.authors_arr[i];
            }
        }

        for (let i = 0; i < this.state.books_arr.length; ++i) {
            if (this.state.books_arr[i].author_id == book_author.id) {
                curr_author_books.push(this.state.books_arr[i]);
            }
        }

        console.log("Selected book name: " + curr_book.name + "Selected author name: " + book_author.name);

        this.setState({
            currPage: this.state.bookPage,
            selected_book: curr_book,
            selected_book_author: book_author,
            selected_author_books: curr_author_books
        });
    }

    callAddBookToCart(book) {
        this.state.shopping_cart_arr.push(book);
        this.props.addToCookie(JSON.stringify(this.state.shopping_cart_arr));
        alert("Book added successfully to the cart");
    }

    callAuthorPage() {
        this.setState({ currPage: this.state.authorPage });
    }

    callCartPage() {
        this.setState({ currPage: this.state.shoppingCartPage });
    }

    renderBookPage() {
        return React.createElement(BookPage, { MoveToAuthorPage: this.callAuthorPage, selected_book: this.state.selected_book,
            callAddBookToCart: this.callAddBookToCart });
    }

    renderHomePage() {
        return React.createElement(HomePage, { onCallBook: this.callBookPage, books: this.state.books_arr });
    }

    renderAuthorPage() {
        return React.createElement(AuthorPage, { currAuthor: this.state.selected_book_author,
            currAuthorBooks: this.state.selected_author_books,
            onCallBook: this.callBookPage });
    }

    renderShoppingCartPage() {
        return React.createElement(ShoppingCartPage, { shoppingCartArr: this.state.shopping_cart_arr, onCallBook: this.callBookPage });
    }

    render() {
        return React.createElement(
            "div",
            { className: "Container" },
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "nav_bar" },
                React.createElement(
                    "button",
                    { className: "btn", type: "button", onClick: this.callHomePage },
                    "Home page"
                ),
                React.createElement(
                    "button",
                    { className: "btn", type: "button", onClick: this.callCartPage },
                    "Shopping Cart"
                )
            ),
            React.createElement("br", null),
            this.renderCurrPage()
        );
    }

}