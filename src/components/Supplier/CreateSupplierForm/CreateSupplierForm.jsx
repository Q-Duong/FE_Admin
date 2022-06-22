import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { productAPI } from '../../../axios/exeAPI';

function CreateSupplierForm(props) {
    const {onCreateSupplier, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
    const [products, setProducts] = useState([]);
  
  function handleClose ()  {
    onCloseCreateform()
  };

  function handleCreateSupplier() {
    if(onCreateSupplier)
      onCreateSupplier(formRef);
  }
    useEffect(() => {
        async function getProducts() {
            try {
                const res = await productAPI.getAll()
                if(res.status === 200) {
                    const data = res.data
                    setProducts(data)
                } else {
                    console.log(res)
                }

            } catch (error) {
                console.log(error)
            }  
        }
        getProducts()
    },[])

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm nhà cung cấp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tên nhà cung cấp</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Tên nhà cung cấp"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Address"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>SĐT</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Sản phẩm cung cấp</Form.Label>
                        {
                            products.map(product => (
                                <Form.Check 
                                    type={"checkbox"}
                                    className='products'
                                    name='products'
                                    label={product.name}
                                    value={product._id}
                                />
                            ))
                        }
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng 
                </Button>
                <Button variant="primary" onClick={handleCreateSupplier}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateSupplierForm;