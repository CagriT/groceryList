import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ItemList extends Component {
  state = { inputs: [] };

  async componentDidMount() {
    try {
      const list = await axios.get('http://localhost:8000/inputs/');
      this.setState({ inputs: list.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  deleteInput = id => {
    axios.delete('http://localhost:8000/inputs/' + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      inputs: this.state.inputs.filter(el => el._id !== id)
    });
    //in this way, I delete the item from database, at the same time I remove it from the browser
  };

  render() {
    return (
      <div className="container">
        <h3>Logged Items</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Item</th>
              <th>Priority</th>
              <th>Checked</th>
            </tr>
          </thead>
          <tbody>
            {this.state.inputs &&
              this.state.inputs.map(item => (
                // <Exercise exercise={item} deleteInput={this.deleteInput} key={item._id} />
                <tr key={item._id}>
                  <td>{item.input}</td>
                  <td>{item.priority}</td>
                  <td>{item.checked}</td>
                  <td>
                    <Link to={'/edit/' + item._id}>edit</Link> |{' '}
                    <a
                      href="#"
                      onClick={() => {
                        this.deleteInput(item._id);
                      }}
                    >
                      delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ItemList;
