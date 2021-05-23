import { Checkbox, Modal } from "antd";
import "antd/dist/antd.min.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const CompareModal = ({ isOpen, handleClose, products = [] }) => {
  const [productData, setProductData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showToSelect, setShowToSelect] = useState(false);

  useEffect(() => {
    setProductData(JSON.parse(JSON.stringify(products)));
  }, [products]);

  //set true/false to check box
  const onChange = (e, product) => {
    if (productData.length) {
      let checkCount = productData.filter((c) => c.checked);
      productData.map((cp) => {
        if (cp.id === product.id && checkCount.length < 3) {
          product.checked = e.target.checked;
        } else {
          if (!e.target.checked) product.checked = false;
        }
      });
    }
    setProductData([...productData]);
  };

  //after selection show data to compare products
  const handleDoneClick = () => {
    let newdata = [];
    if (productData.length) {
      productData.map((cp) => {
        if (cp.checked) newdata.push(cp);
      });
    }
    setSelected([...newdata]);
    setShowToSelect(false);
  };

  //remove item from compare list
  const handleCrossClick = (product) => {
    if (selected.length) {
      selected.map((it, i) => {
        if (it.id === product.id) selected.splice(i, 1);
      });
    }
    if (productData.length) {
      productData.map((cp) => {
        if (cp.id === product.id) cp.checked = false;
      });
    }
    setProductData([...productData]);
    setSelected([...selected]);
  };

  //on modal close clear data and close modal
  const onCancel = () => {
    setSelected([]);
    setProductData([...products]);
    handleClose();
  };

  return (
    <>
      <Modal
        title="Compare Products"
        visible={isOpen}
        footer={null}
        onCancel={onCancel}
        width={700}
        className="compare-modal"
      >
        {showToSelect ? (
          <>
            <h4>Select products to compare</h4>
            <table class="table table-bordered">
              <tbody>
                {productData.map((product) => (
                  <tr key={"sub" + product.id}>
                    <td style={{ width: 10 }}>
                      <Checkbox
                        checked={product.checked}
                        onChange={(e) => onChange(e, product)}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn compare-btn"
              onClick={() => handleDoneClick()}
            >
              Compare
            </button>
          </>
        ) : (
          <>
            <button
              className="btn compare-btn"
              onClick={() => setShowToSelect(true)}
            >
              Select Products
            </button>
            <br />
            <br />
            {selected.length ? (
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Compare on</th>
                    {selected.map((pr) => (
                      <th scope="col">
                        {pr.title}
                        <button
                          className="btn btn-danger btn-xs cm-danger-btn"
                          onClick={() => {
                            handleCrossClick(pr);
                          }}
                        >
                          X
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col">Display</td>
                    {selected.map((pr) => (
                      <td scope="col">{pr.display}</td>
                    ))}
                  </tr>
                  <tr>
                    <td scope="col">Battery</td>
                    {selected.map((pr) => (
                      <td scope="col">{pr.battery}</td>
                    ))}
                  </tr>
                  <tr>
                    <td scope="col">Storage</td>
                    {selected.map((pr) => (
                      <td scope="col">{pr.storage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td scope="col">Camera</td>
                    {selected.map((pr) => (
                      <td scope="col">{pr.camera}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No selected data to compare</p>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
});
export default connect(mapStateToProps, {})(CompareModal);
