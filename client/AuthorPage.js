class AuthorPage extends React.Component{
    constructor(props) {
		super(props);
        this.state = {
            currAuthor : this.props.currAuthor,
            books : this.props.currAuthorBooks       
        }

	}

	render() {
        const imageClick = (book) => {
            this.props.onCallBook(book.id);
            console.log('Click');
        }
		return( 	
        <div className = 'AuthorPage'>
            <div className = "base">
            <div className = "column">
            <h2>{this.state.currAuthor.name}</h2>
            <br/>
            <br/>
            <img src={this.state.currAuthor.image_url} alt={this.state.currAuthor.name} width="350" height="500"/>
            </div>
            <br/>  
            <div className = "column">        
            <h2>Books:</h2>
            <div className= 'AuthorBooksList'>
                {this.state.books.map((book, index)=>{ return <figure key={index}  onClick={()=>imageClick(book)}>
                    <img src={book.img} width="150" height="250"/>
                    <figcaption>{book.name}</figcaption>
                    </figure>
                })}              
            </div>
            </div> 
            </div>
        </div>
        );
	}

}
