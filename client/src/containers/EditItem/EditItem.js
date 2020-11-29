import React, { Component } from 'react';
import axios from 'axios';

class EditItem extends Component {
  state = {
    input: '',
    priority: '',
    checked: ''
  };

  async componentDidMount() {
    try {
      const item = await axios.get('http://localhost:8000/inputs/' + this.props.match.params.id);
      this.setState({
        input: item.data.data.input,
        priority: item.data.data.priority,
        checked: item.data.data.checked
      });
    } catch (error) {
      console.log(error);
    }
  }

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

  checkboxHandler = e => {
    this.setState({
      checked: e.target.value
    });
  };

  submitHandler = async e => {
    e.preventDefault();

    let newInput = null;

    if (this.state.checked === 'YES') {
      newInput = {
        input: this.state.input,
        priority: 1,
        checked: this.state.checked
      };
    } else {
      newInput = {
        input: this.state.input,
        priority: this.state.priority,
        checked: this.state.checked
      };
    }

    try {
      await axios.patch(
        'http://localhost:8000/inputs/edit/' + this.props.match.params.id,
        newInput
      );
      this.setState({ input: '', priority: '' });
    } catch (error) {
      console.log(error);
    }

    this.props.history.push('/inputs'); //after edit process, I choosed to return to the item list page
  };

  render() {
    return (
      <div className="container">
        <h3>Edit item</h3>
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
            <div>
              <label>Checked: </label>
              <select
                required
                className="form-control"
                value={this.state.checked}
                onChange={this.checkboxHandler}
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit this item" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditItem;
