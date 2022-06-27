import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateWareHouseForm = (props) => {
  const {activeWareHouse, onUpdateWareHouse, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [soldPrice, setSoldPrice] = useState(activeWareHouse);
  const [active, setActive] = useState(activeWareHouse);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedWareHouse() {
    if(onUpdateWareHouse)
    onUpdateWareHouse(formRef);
  }

  useEffect(() => {
    setSoldPrice(activeWareHouse)
    setActive(activeWareHouse)
  },[activeWareHouse])

  return (
    activeWareHouse ?
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật sản phẩm kho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá bán</Form.Label>
              <Form.Control
                type="text"
                name="soldPrice"
                placeholder="Giá bán"
                value={soldPrice}
                onChange={(e) => {
                  setSoldPrice(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hiển thị</Form.Label>
              <Form.Control
                type="text"
                name="active"
                placeholder="Hiển thị"
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
          <Button variant="primary" onClick={handleUpdatedWareHouse}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    :<></>
  )
};

export default UpdateWareHouseForm;
