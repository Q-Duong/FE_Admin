import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateCustomerForm = (props) => {
  const {activeCustomer, onUpdateCustomer, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [name, setName] = useState(activeCustomer.name);
  const [email, setEmail] = useState(activeCustomer.email);
  const [phone, setPhone] = useState(activeCustomer.phone);
  const [address, setAddress] = useState(activeCustomer.address);
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
    setName(activeCustomer.name)
    setEmail(activeCustomer.email)
    setPhone(activeCustomer.phone)
    setAddress(activeCustomer.address)
    setActive(activeCustomer.active)
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
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên khách hàng"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>SĐT</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="SĐT"
                value={phone}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tình trạng</Form.Label>
              <Form.Control
                type="text"
                name="active"
                placeholder="Tình trạng"
                value={active}
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
