import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateSupplierForm = (props) => {
  const {activeSupplier, onUpdateSupplier, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [name, setName] = useState(activeSupplier.categoryName);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedSupplier() {
    if(onUpdateSupplier)
      onUpdateSupplier(formRef);
  }

  useEffect(() => {
    setName(activeSupplier.supplierName)
  },[activeSupplier])

  return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                placeholder="Category Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatedSupplier}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateSupplierForm;
