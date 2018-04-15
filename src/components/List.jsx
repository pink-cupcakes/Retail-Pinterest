import React from 'react';
import axios from 'axios';

import Item from './Item.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      totalList: [],
      condensedList: []
    };
    this.fetchItems = this.fetchItems.bind(this);
  };

  next() {
    let previousStart = this.state.start;
    let nextStart = Math.min(this.state.totalList.length - 21, previousStart + 20);
    let shortList = this.state.totalList.slice(nextStart, nextStart + 20);
    this.setState({'start': nextStart});
    this.setState({'condensedList': shortList});
  };

  previous() {
    let previousStart = this.state.start;
    let nextStart = Math.max(0, previousStart - 20);
    let shortList = this.state.totalList.slice(nextStart, nextStart + 20);
    this.setState({'start': nextStart});
    this.setState({'condensedList': shortList});
  };

  fetchItems() {
    let start = this.state.start;
    axios.get('/items')
      .then((response) => {
        this.setState({totalList: response.data});
        this.setState({condensedList: response.data.slice(start, start + 20)});
      })
      .catch(err => console.log(err));
  };

  componentWillMount() {
    this.fetchItems();
  };

  render() {
    return (
      <div className='itemList'>
        <span>Popular items</span>
        {this.state.condensedList.map((itemFromDummy, index) => {
          let itemNumber = index + this.state.start + 1;
          return <Item
            itemDetails={itemFromDummy}
            itemNumber={itemNumber}
            changeView={this.props.changeView}
          />
        })}
        <br />
        <button onClick={() => {this.previous()}}>Previous 20</button>
        <button onClick={() => {this.next()}}>Next 20</button>
      </div>
    )
  }
}

export default List;