import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserByAdmin } from "../features/user/adminUserSlice";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import Message from "./Message";

function ProductEditModal({ showModal, setShowModal }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState(null);

  const { isLoading, error, product } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if (!isLoading && product) {
      setName(product.name);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [isLoading, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Product Info updated.");
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Failed to fetch Product details from backend.</p>
            <Message variant='danger'>{error}</Message>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          size='lg'
          fullscreen='md-down'
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer>
              <Form>
                <Form.Group as={Row} controlId='name'>
                  <Form.Label column sm={2} className='float-left'>
                    Name:
                  </Form.Label>
                  <Col sm={10} className='p-2'>
                    <Form.Control
                      type='name'
                      placeholder='Enter Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='price'>
                  <Form.Label column sm={2}>
                    Price:
                  </Form.Label>
                  <Col sm={10} className='p-4'>
                    <Form.Control
                      type='number'
                      placeholder='Enter Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='stockCount'>
                  <Form.Label column sm={2}>
                    Stock:
                  </Form.Label>
                  <Col sm={10} className='p-4'>
                    <Form.Control
                      type='number'
                      placeholder='Enter Stock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='productImg'>
                  <Form.Label column sm={2}>
                    Product Img:
                  </Form.Label>
                  <Col sm={10} className='p-4'>
                    <Form.Control
                      type='file'
                      name='image'
                      onChange={(e) => setImage(e.target.files[0])}
                    ></Form.Control>
                    <h10 style={{ color: "red" }}>
                      <small>
                        *Uploading a new Image will overwrite the existing one.
                      </small>
                    </h10>
                  </Col>
                </Form.Group>
              </Form>
            </FormContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button type='submit' onClick={submitHandler} disabled={!product}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ProductEditModal;
