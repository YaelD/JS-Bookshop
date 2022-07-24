class BookPage extends React.Component{
    constructor(props) {
		super(props);
        this.state = {
            booksArr : this.props.booksArr,
            currBook : this.props.selected_book
        }

        this.handleAuthorPage = this.handleAuthorPage.bind(this);
        this.handleAddBookToCart = this.handleAddBookToCart.bind(this);

	}

    
    handleAuthorPage(event){
        event.preventDefault();
        if(this.props.MoveToAuthorPage){
            this.props.MoveToAuthorPage();
        }
    }

    handleAddBookToCart(){
        if(this.props.callAddBookToCart){
            this.props.callAddBookToCart(this.state.currBook);
        }
    }


	render() {
		return( 	
        <div className = 'BookPage'>
            <div className = "base">
            <div className = "column">
            <button className = "btn" type="button" onClick={this.handleAddBookToCart}>Add to shopping cart</button>         
            <button className = "btn" type="button" onClick={this.handleAuthorPage}>Go to author's page</button>
            <h2>{this.state.currBook.name}</h2>
            <img src={this.state.currBook.img} alt={this.state.currBook.name} width="250" height="350"/>
            <br/>
            <label className = "bookPriceLabel">Price: {this.state.currBook.price}</label>   
            <br/> 
            <label>Author's name: {this.state.currBook.author_name}</label>  
            <br/>
            </div> 
            </div>
        </div>
        );
	}

}
