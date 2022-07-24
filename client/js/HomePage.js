class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books_arr: this.props.books,
            searched_books_arr: [],
            searched_book_name: '',
            selected_book: ''
        };

        this.handleChangeBookName = this.handleChangeBookName.bind(this);
    }

    componentDidMount() {
        this.setState({ searched_books_arr: this.state.books_arr });
    }

    checkName(name) {
        return;
    }

    handleChangeBookName(event) {
        let searched_arr = [];
        this.setState({ searched_book_name: event.target.value });
        console.log("Cur search=" + this.state.searched_book_name);
        searched_arr = this.state.books_arr.filter(function (book) {
            const name = book.name;
            return name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        // if(this.state.searched_book_name === ""){
        //     this.setState({searched_books_arr : this.state.books_arr});
        // }


        // for(let i=0; i < this.state.books_arr.length; ++i){
        //     const curr_book_name =this.state.books_arr[i].name;
        //     if(curr_book_name.toLowerCase().includes(this.state.searched_book_name.toLowerCase())){
        //         searched_arr.push(this.state.books_arr[i]);
        //     }
        // }
        this.setState({ searched_books_arr: searched_arr });
    }

    render() {
        const imageClick = book => {
            this.props.onCallBook(book.id);
            console.log('Click');
        };
        return React.createElement(
            'div',
            { className: 'HomePage' },
            React.createElement(
                'form',
                null,
                React.createElement(
                    'label',
                    null,
                    'Search a book:',
                    React.createElement('input', { type: 'text', value: this.state.searched_book_name, onChange: this.handleChangeBookName })
                )
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { className: 'books_list' },
                this.state.searched_books_arr.map((book, index) => {
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
        );
    }

}