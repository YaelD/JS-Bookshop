class BookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksArr: this.props.booksArr,
            currBook: this.props.selected_book
        };

        this.handleAuthorPage = this.handleAuthorPage.bind(this);
        this.handleAddBookToCart = this.handleAddBookToCart.bind(this);
    }

    handleAuthorPage(event) {
        event.preventDefault();
        if (this.props.MoveToAuthorPage) {
            this.props.MoveToAuthorPage();
        }
    }

    handleAddBookToCart() {
        if (this.props.callAddBookToCart) {
            this.props.callAddBookToCart(this.state.currBook);
        }
    }

    render() {
        return React.createElement(
            "div",
            { className: "BookPage" },
            React.createElement(
                "div",
                { className: "base" },
                React.createElement(
                    "div",
                    { className: "column" },
                    React.createElement(
                        "button",
                        { className: "btn", type: "button", onClick: this.handleAddBookToCart },
                        "Add to shopping cart"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn", type: "button", onClick: this.handleAuthorPage },
                        "Go to author's page"
                    ),
                    React.createElement(
                        "h2",
                        null,
                        this.state.currBook.name
                    ),
                    React.createElement("img", { src: this.state.currBook.img, alt: this.state.currBook.name, width: "250", height: "350" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        { className: "bookPriceLabel" },
                        "Price: ",
                        this.state.currBook.price
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Author's name: ",
                        this.state.currBook.author_name
                    ),
                    React.createElement("br", null)
                )
            )
        );
    }

}