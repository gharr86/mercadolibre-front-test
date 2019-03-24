import React from 'react';
import { Switch, Route } from "react-router-dom";
import PropTypes from 'prop-types';

import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import ProductView from './components/ProductView/ProductView';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchTerm: '',
      searchResults: {},
      openedItem: []
    };
  }

  componentDidMount() {
    document.title = 'Guillermo Harriague - Test Práctico Front End';
    const { history, location } = this.props.match;
    
    if (location.search) {
      const { search } = location;
      history.push(search);
    } else {
      const { pathname } = location;
      history.push(pathname);
    }
    
    history.listen((location) => {
      if (location.search) {
        const { search } = location;
        const searchTerm = search.slice(search.indexOf('=') + 1);
        this.showSearchResults(searchTerm);
      } else {
        const { pathname } = location;
        const itemId = pathname.slice(pathname.indexOf('M'));
        this.showSingleItem(itemId);
      }
    });
  }

  getData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(res => {
          resolve(res)
        }, reject);
    });
  }

  setSearchTerm(value) {
    const sanitizedValue = value.toLowerCase().replace(/ /g, '+');
    this.setState({ searchTerm: sanitizedValue });
  }

  showSearchResults(term) {
    this.setState({ searchResults: {} });

    if (term !== '') {
      this.getData(`/api/items?search=${term}`)
        .then(data => {
          const { categories, items } = data;
          this.setState({ searchResults: { categories: categories, items: items } });
        })
        .catch(err => console.log(err));
    }
  }

  triggerShowSearchResults(e) {    
    if(e.keyCode === undefined || e.keyCode === 13) {
      e.target.nextSibling.click();
    }
  }

  clearSearchTerm(e) {
    this.setState({ searchTerm: '' });
    e.target.previousSibling.value = '';
  }

  showSingleItem(id) {
    this.setState({ openedItem: [] });

    this.getData(`/api/items/${id}`)
      .then(data => this.setState({ openedItem: data.item }))
      .catch(err => console.log(err));
  }

  render() {
    const { searchTerm, searchResults, openedItem } = this.state;

    return (
      <div>
        <Header
          handleChange={ (e) => this.setSearchTerm(e.target.value) }
          handleClick={ (e) => this.clearSearchTerm(e) }
          handleKeyUp={ (e) => this.triggerShowSearchResults(e) }
          searchTerm={searchTerm}
        />
        <Switch>
            <Route
              exact
              path={"/items"}
              render={
                () => (
                  <SearchResults
                    data={searchResults}
                  />
                )
              }
            />
            <Route 
              exact
              path="/items/:id"
              render={
                () => (
                  <ProductView
                    data={openedItem}
                    categories={searchResults.categories}
                  />
                )
              }
            />
        </Switch>
      </div>
    );
  }
}

export default App;

App.propTypes = {
  match: PropTypes.object
}
