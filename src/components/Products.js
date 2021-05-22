import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";
import { addToCart } from "../actions/cartActions";
import { fetchProducts } from "../actions/productActions";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  //calls when add to cart clicks and stores in redux store
  handleAddClick = (product) => {
    let isWarn = false;
    this.props.cartItems.forEach((cp) => {
      if (cp.id === product.id) {
        if (product.quantity < cp.count + 1) {
          isWarn = true;
        }
      }
    });
    if (!isWarn) {
      this.props.addToCart(this.props.cartItems, product);
    } else {
      this.props.showWarning(true);
    }
  };

  render() {
    const renderTableView = (
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Product Name</th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  style={{ height: "7vw", width: "7vw" }}
                  src={`products/${product.sku}.jpg`}
                  alt={product.title}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>{util.formatCurrency(product.price)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={(e) => this.handleAddClick(product)}
                >
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    const productItems = this.props.products.map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center">
          <div>
            <img
              style={{ height: 165, width: 165 }}
              src={`products/${product.sku}.jpg`}
              alt={product.title}
            />
            <p>{product.title}</p>
          </div>
          <div className="amt-add-btn">
            <b>{util.formatCurrency(product.price)}</b>
            <p>Stock: {product.quantity}</p>
            <button
              className="btn btn-primary"
              onClick={(e) => this.handleAddClick(product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="row">
        {this.props.isTable ? renderTableView : productItems}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);
