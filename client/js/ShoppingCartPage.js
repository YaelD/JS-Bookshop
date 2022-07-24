class ShoppingCartPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shoppingCart: this.props.shoppingCartArr,
            total_price: 0
        };

        this.calcTotalPrice = this.calcTotalPrice.bind(this);
    }

    componentDidMount() {
        this.calcTotalPrice();
    }

    calcTotalPrice() {
        let price = 0;
        for (let i = 0; i < this.state.shoppingCart.length; ++i) {
            price += parseInt(this.state.shoppingCart[i].price);
        }
        this.setState({ total_price: price });
    }

    render() {
        const imageClick = book => {
            this.props.onCallBook(book.id);
            console.log('Click');
        };
        return React.createElement(
            'div',
            { className: 'shopping_cart' },
            React.createElement('br', null),
            React.createElement(
                'label',
                null,
                'Total price:',
                this.state.total_price
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'label',
                null,
                'The books you have in the shopping cart: '
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'books_list' },
                this.state.shoppingCart.map((book, index) => {
                    return React.createElement(
                        'figure',
                        { key: index, onClick: () => imageClick(book) },
                        React.createElement('img', { src: book.img, width: '150', height: '250' }),
                        React.createElement(
                            'figcaption',
                            null,
                            book.name
                        ),
                        React.createElement(
                            'figcaption',
                            null,
                            'Price: ',
                            book.price
                        )
                    );
                })
            )
        );
    }

}