import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import Cart from "./components/Cart";
import Products from "./components/Products";
import store from "./store";
import CompareModal from "./components/CompareModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTable: true,
      showWarn: false,
      isOpen: false,
    };
  }

  //calls on table/grid switch toggle
  hanldeOnChange = (value) => {
    this.setState({ isTable: value });
  };

  //show warning modal
  showWarning = (flag) => {
    this.setState({ showWarn: flag });
  };

  //close compare modal
  handleClose = () => {
    this.setState({ isOpen: false });
  };

  //render stock warning and close after 4 sec
  showStockWarning = () => {
    setTimeout(() => {
      this.showWarning(false);
    }, 4000);

    return (
      <div class="alert alert-warning" role="alert">
        Your selected order quantity is greater than our existing stock.
      </div>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <h1>Product Catalog with Cart</h1>
          <div className="header-row">
            <div className="radio-btns">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={this.state.isTable}
                  onChange={() => this.hanldeOnChange(true)}
                />
                <label
                  className="form-check-label"
                  onClick={() => this.hanldeOnChange(true)}
                >
                  Table View
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={!this.state.isTable}
                  onChange={() => this.hanldeOnChange(false)}
                />
                <label
                  className="form-check-label"
                  onClick={() => this.hanldeOnChange(false)}
                >
                  Grid View
                </label>
              </div>
            </div>
            <button
              className="btn compare-btn"
              onClick={() => this.setState({ isOpen: true })}
            >
              compare
            </button>
          </div>
          <div className="row">
            <div className="col-md-9">
              <Products
                isTable={this.state.isTable}
                showWarning={this.showWarning}
              />
            </div>
            <div className="col-md-3">
              <Cart />
            </div>
          </div>
          {this.state.showWarn && this.showStockWarning()}
          <CompareModal
            isOpen={this.state.isOpen}
            handleClose={this.handleClose}
          />
        </div>
      </Provider>
    );
  }
}

export default App;
