import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductEditModal from "../components/ProductEditModal";
import { getProductList } from "../features/productList/productListSlice";
import {
  getProductDetail,
  clearProductDetail,
  deleteProduct,
} from "../features/productList/productDetailSlice";
import { useNavigate } from "react-router-dom";

function ProductListPage() {
  const [showModal, setShowModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const { isLoading, error, products } = useSelector(
    (state) => state.productList
  );
  const { product} = useSelector((state) => state.productDetail);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (products.length === 0) {
        dispatch(getProductList());
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, products]);

  const updateProductHandler = (id) => {
    if (!product || product._id !== id) {
      dispatch(getProductDetail(id));
    }
    setShowModal(true);
  };

  const createProductHandler = () => {
    dispatch(clearProductDetail());
    setIsCreate(true);
    setShowModal(true);
  };

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      navigate("/admin/products");
    }
  };

  return (
    <div>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>Create Product
          </Button>
        </Col>
      </Row>
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
              <th>Brand</th>
              <th>Category</th>
              <th>InStock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
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
      <ProductEditModal
        showModal={showModal}
        setShowModal={setShowModal}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
      />
    </div>
  );
}

export default ProductListPage;
