class ShoppingCartPage extends React.Component{
    constructor(props) {
		super(props);

        this.state = {
            shoppingCart : this.props.shoppingCartArr,
            total_price : 0
        }

        this.calcTotalPrice = this.calcTotalPrice.bind(this);
	}

    componentDidMount() 
	{
        this.calcTotalPrice();
	}

    calcTotalPrice(){
        let price = 0;
        for(let i=0 ; i<this.state.shoppingCart.length ; ++i){
            price += parseInt(this.state.shoppingCart[i].price);
        }
        this.setState({ total_price : price});
    }

    render(){
        const imageClick = (book) => {
            this.props.onCallBook(book.id);
            console.log('Click');
        }
        return( 	
            <div className = 'shopping_cart'>
                    <br/>
                    <label>
                    Total price:
                    {this.state.total_price}
                    </label>
                    <br/>
                    <br/>
                    <label>The books you have in the shopping cart: </label>
                    <br/>
                    <br/>
                    <div className = "books_list">
                    {
                        this.state.shoppingCart.map((book, index)=> { return <figure key={index} onClick={()=>imageClick(book)}>
                            <img src={book.img} width="150" height="250"/>
                            <figcaption>{book.name}</figcaption>
                            <figcaption>Price: {book.price}</figcaption>
                            </figure>})
                    }
                    </div>
            </div>
            );
    }

}