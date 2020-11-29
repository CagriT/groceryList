import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar';
import NewItem from './containers/NewItem/NewItem';
import ItemList from './containers/ItemList/ItemList';
import EditItem from './containers/EditItem/EditItem';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Route path="/" exact component={ItemList} />
      <Route path="/inputs" exact component={ItemList} />
      <Route path="/inputs/new" component={NewItem} />
      <Route path="/edit/:id" component={EditItem} />
    </BrowserRouter>
  );
}

export default App;
