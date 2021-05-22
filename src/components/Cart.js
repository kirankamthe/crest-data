import React, { Component } from "react";
import { connect } from "react-redux";
import util from "../util";
import { addToCart, removeFromCart } from "../actions/cartActions";

class Cart extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          <div className="cart-items">Cart is empty</div>
        ) : (
          <div className="cart-items">
            Selected items in the cart.
            <br />
            <br />
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-view">
            <ul style={{ marginLeft: -25 }}>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <b className="ct-items">{item.title}</b>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-danger btn-xs cm-danger-btn"
                    onClick={(e) =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }
                  >
                    X
                  </button>
                  <br />
                  <strong>
                    {item.count} x {util.formatCurrency(item.price)}
                  </strong>
                </li>
              ))}
            </ul>

            <b>
              Items Count: {cartItems.length}
              <br />
              Total Amount:{" "}
              {util.formatCurrency(
                cartItems.reduce((a, c) => a + c.price * c.count, 0)
              )}
            </b>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});
export default connect(mapStateToProps, { addToCart, removeFromCart })(Cart);
