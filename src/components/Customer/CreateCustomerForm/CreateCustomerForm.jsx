import React, { useRef } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function CreateCustomerForm(props) {
    const {onCreateCustomer, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
  
  function handleClose ()  {
    onCloseCreateform()
  };

  function handleCreateCustomer() {
    if(onCreateCustomer)
      onCreateCustomer(formRef);
  }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tên khách hàng</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Tên khách hàng"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Địa chỉ"
                        autoFocus
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleCreateCustomer}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateCustomerForm;