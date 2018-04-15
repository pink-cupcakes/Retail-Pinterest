import React from 'react';
import ReactDOM from 'react-dom';

import List from './components/List.jsx';
import ItemDetail from './components/ItemDetail.jsx';

import css from './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'list',
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(newView, item, itemNumber) {
    this.setState({ 'view': newView });
    if (item && itemNumber) {
      this.setState({ 'detailItem': item });
      this.setState({ 'itemNumber': itemNumber})
    }
  }

  render() {
    if (this.state.view === 'list') {
      return <List changeView={this.changeView} />
    } else if (this.state.view === 'item') {
      return (
        <ItemDetail changeView={this.changeView} item={this.state.detailItem} itemNumber={this.state.itemNumber} />
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

