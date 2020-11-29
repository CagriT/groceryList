import React, { Component } from 'react';
import axios from 'axios';

class NewItem extends Component {
  state = {
    input: '',
    priority: ''
  };

  inputHandler = e => {
    this.setState({
      input: e.target.value
    });
  };

  priorityHandler = e => {
    this.setState({
      priority: e.target.value
    });
  };

  submitHandler = async e => {
    e.preventDefault();

    const newInput = {
      input: this.state.input,
      priority: this.state.priority
    };

    console.log(newInput);
    // i did not add checkbox info here, just added "input and priority info", because I want to add checked info 
    // when I edit an item... 
    try {
      await axios.post('http://localhost:8000/inputs/new', newInput);
      this.setState({ input: '', priority: '' });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="container">
        <h3>Add an item</h3>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Item: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.input}
              onChange={this.inputHandler}
            />
            <div className="form-group">
              <label>Priority: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.priority}
                onChange={this.priorityHandler}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Add this item" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default NewItem;
