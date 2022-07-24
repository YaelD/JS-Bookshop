
class Post extends React.Component 
{
	constructor(props) {
		super(props);
	}


	render() {
		return 	<div className = 'post'>
					<span>Send by: {this.props.post.creator_name}</span>
					<br/>
					<span>At: {this.props.post.creation_date}</span>
					<br/>
					<br/>
					<span>{this.props.post.message}</span>
				</div>
	}
}

//-----------------------------------------------------------------------------------------
class PostList extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.handle_get_posts = this.handle_get_posts.bind( this );
	}


	handle_get_posts(){
		if(this.props.handle_get_posts){
			this.props.handle_get_posts();
		}
	}


	update_list( posts, token )
	{
		this.setState( {posts : posts, token : token} );
	}

	render() {
		return <div>
			   {this.props.posts.map( (post, index) => { return  <Post 
						post={post} key={index}/>  }  ) }
			   </div>
	}
}

//-----------------------------------------------------------------------------------------
class PostPage extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {text_post : '', posts: [], token: this.props.token, warning_visable : false};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.update_state = this.update_state.bind(this);
		this.handle_add_post = this.handle_add_post.bind(this);
		this.handle_get_posts = this.handle_get_posts.bind(this);
	}

	async componentDidMount() 
	{
		const posts = await this.handle_get_posts();
		this.update_state(this.state.text_post, posts, this.state.token, this.state.warning_visable);
	}

	async componentDidUpdate(prevProps){
		if(prevProps.isRefreshed != this.props.isRefreshed){
			console.log("in componenet did Update");
			const data = await this.handle_get_posts();
			this.setState({posts : data})
		}
	}

	handleChange(event) {
		this.update_state(event.target.value, this.state.posts, this.state.token, false);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		if(this.state.text_post != ''){
			this.handle_add_post();
		}
		else{
			this.update_state('', this.state.posts, this.state.token, true);
		}
	}

	async handle_add_post( )
	{
		const response = await fetch('http://localhost:2718/social_network/users/post' , 
							  {method:'PUT', 
							   body: JSON.stringify( {text : this.state.text_post }), 
							   headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token }
							   });
		if ( response.status == 200 )
		{
			this.props.onHide();
			const posts = await this.handle_get_posts();	
			this.update_state('', posts, this.state.token, false);	  
		}
		else 
		{
			const err = await response.text();
			alert( err );
		}
	}

	async handle_get_posts( )
    {
      const response = await fetch('http://localhost:2718/social_network/users/post' , 
                {method:'GET',  
                   headers: { 'Content-Type': 'application/json', 'Authorization' : this.state.token}
                 });
      if ( response.status != 200 ) {
		  throw new Error ('Error while fetching posts');
	  }
	  const data = await response.json();
	  return data.slice(0,10);
    }

	update_state( text_post, posts, token, warning_visable){
		this.setState({text_post : text_post, posts : posts, token : token, warning_visable : warning_visable});
	}


	render() {
		return   <div className= "post_page">
					<form onSubmit={this.handleSubmit} className = "write_post">
        			<label>
          				Write a post:
					</label>
					<br/>
         			<textarea value={this.state.text_post} onChange={this.handleChange} />
        			<input type="submit" value="Post" />
      				</form>
					<label className = {this.state.warning_visable ? "errorVisible" : "errorInvisible"}>
         				 Please write something in the post
        			</label>
					<div className = "Posts">
						<PostList handle_get_posts = {this.handle_get_posts}  posts = {this.state.posts}/>
					</div>
				  </div>

	}
}