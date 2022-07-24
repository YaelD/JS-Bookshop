class AuthorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currAuthor: this.props.currAuthor,
            books: this.props.currAuthorBooks
        };
    }

    render() {
        const imageClick = book => {
            this.props.onCallBook(book.id);
            console.log('Click');
        };
        return React.createElement(
            'div',
            { className: 'AuthorPage' },
            React.createElement(
                'div',
                { className: 'base' },
                React.createElement(
                    'div',
                    { className: 'column' },
                    React.createElement(
                        'h2',
                        null,
                        this.state.currAuthor.name
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement('img', { src: this.state.currAuthor.image_url, alt: this.state.currAuthor.name, width: '350', height: '500' })
                ),
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'column' },
                    React.createElement(
                        'h2',
                        null,
                        'Books:'
                    ),
                    React.createElement(
                        'div',
                        { className: 'AuthorBooksList' },
                        this.state.books.map((book, index) => {
                            return React.createElement(
                                'figure',
                                { key: index, onClick: () => imageClick(book) },
                                React.createElement('img', { src: book.img, width: '150', height: '250' }),
                                React.createElement(
                                    'figcaption',
                                    null,
                                    book.name
                                )
                            );
                        })
                    )
                )
            )
        );
    }

}