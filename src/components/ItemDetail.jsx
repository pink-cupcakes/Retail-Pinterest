import React from 'react';
import axios from 'axios';

import Comments from './Comments.jsx';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //assigning props to state so component can re-render after new comment submission
      item: this.props.item,
      //initializing input fields to avoid throwing error
        //future iterations could improve error handling
      user: '',
      text: ''
    };
  }

  handleUserChange (e) {
    this.setState({user: e.target.value});
  }

  handleTextChange (e) {
    this.setState({text: e.target.value});
  }

  newComment() {
    const commentComponents = {
      user: this.state.user,
      text: this.state.text,
      index: this.props.itemNumber
    }
    axios.post('/comment', commentComponents)
      .then((response) => {
        this.setState({ 'item': response.data });
        this.setState({ 'user': '' });
        this.setState({ 'text': '' });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='itemDetail'>
        <div className='homeButton'>
          <a className='returnHome' onClick={() => {this.props.changeView('list')}}>Return to item list</a>
        </div>
        <div className='contents'>
          <img src={this.state.item.key_image} />
          <div className='itemText'>
            <h4>{this.state.item.name}</h4>
            <Comments thread={this.state.item.comments} />
            <div className='username'>
              <p>Username</p>
              <textarea type='text' value={this.state.user} onChange={this.handleUserChange.bind(this)}></textarea><br />
            </div>
            <div className='newComment'>
              <p>Comment</p>
              <textarea type='text' value={this.state.text} onChange={this.handleTextChange.bind(this)}></textarea><br />
            </div>
            <button onClick={() => {this.newComment()}}>Submit comment</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ItemDetail;