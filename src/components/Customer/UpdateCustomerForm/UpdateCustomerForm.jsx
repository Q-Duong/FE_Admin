import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateCustomerForm = (props) => {
  const {activeCustomer, onUpdateCustomer, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [active, setActive] = useState(activeCustomer.active);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedCustomer() {
    if(onUpdateCustomer)
      onUpdateCustomer(formRef);
  }

  useEffect(() => {
    setActive(activeCustomer.name)
  },[activeCustomer])

  return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} enctype="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tình trạng</Form.Label>
              <Form.Control
                type="text"
                name="active"
                placeholder="Tình trạng"
                value={active}
                onChange={(e) => {
                  setActive(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdatedCustomer}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateCustomerForm;
