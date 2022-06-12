import React, { useRef } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function CreateSupplierForm(props) {
    const {onCreateSupplier, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
  
  function handleClose ()  {
    onCloseCreateform()
  };

  function handleCreateSupplier() {
    if(onCreateSupplier)
      onCreateSupplier(formRef);
  }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="supplierName"
                        placeholder="Supplier Name"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Address"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        autoFocus
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateSupplier}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateSupplierForm;