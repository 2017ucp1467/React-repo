import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProductList } from "../features/productList/productListSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector(
    (store) => store.productList
  );

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return <Message variant='danger'>{error}</Message>;
  } else {
    return (
      <div>
        <h1>Latest Products</h1>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default HomePage;
