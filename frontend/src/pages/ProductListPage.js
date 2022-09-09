import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductEditModal from "../components/ProductEditModal";
import { deleteProduct } from "../features/user/adminUserSlice";
import { getProductList } from "../features/productList/productListSlice";
import { getProductDetail } from "../features/productList/productDetailSlice";
import { useNavigate } from "react-router-dom";

function ProductListPage() {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, error, products } = useSelector(
    (state) => state.productList
  );
  const { product } = useSelector((state) => state.productDetail);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProductList());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const updateProductHandler = (id) => {
    if (!product || product._id !== id) {
      dispatch(getProductDetail(id));
    }
    setShowModal(true);
  };

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  {product.countInStock ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-x' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {/* <LinkContainer to={`/admin/product/${product._id}`}> */}
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => updateProductHandler(product._id)}
                  >
                    <i className='fas fa-edit'></i>
                  </Button>
                  {/* </LinkContainer> */}
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ProductEditModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default ProductListPage;
