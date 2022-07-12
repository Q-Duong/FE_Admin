import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateWareHouseForm = (props) => {
  const {activeWareHouse, onUpdateWareHouse, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [soldPrice, setSoldPrice] = useState(null);
  const [active, setActive] = useState(null);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedWareHouse() {
    if(onUpdateWareHouse)
    onUpdateWareHouse(formRef);
  }

  useEffect(() => {
    if(activeWareHouse) {
      setSoldPrice(activeWareHouse.soldPrice)
      setActive(activeWareHouse.active)
      console.log(activeWareHouse)
    }

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
              <Form.Label>Trạng thái</Form.Label>
              <select name="active" class="form-control m-bot15">
                {
                  <>
                    <option selected={active} value={true}>
                      Bán hàng
                    </option>
                    <option selected={!active} value={false}>
                      Ngưng bán
                    </option>
                  </>
                }
              </select>
              
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
