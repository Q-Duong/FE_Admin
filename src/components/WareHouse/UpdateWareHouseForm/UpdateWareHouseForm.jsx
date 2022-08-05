import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateWareHouseForm = (props) => {
  const {activeWareHouse, onUpdateWareHouse, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [soldPrice, setSoldPrice] = useState(null);
  const [active, setActive] = useState(null);
  const [manufacturingDate, setManufacturingDate] = useState(null)
  const [expireIn, setExpireIn] = useState(null)

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
      setManufacturingDate(activeWareHouse.manufacturingDate)
      setExpireIn(activeWareHouse.expireIn)
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
              <Form.Label>Ngày nhập hàng</Form.Label>
              <Form.Control
                type="date"
                name="manufacturingDate"
                value={moment(manufacturingDate).format('YYYY-MM-DD')}
                onChange={(e) => {
                  setManufacturingDate(e.target.value);
                  setExpireIn(moment(e.target.value).add(1,'days').format('YYYY-MM-DD'))
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ngày hết hạn</Form.Label>
              <Form.Control
                type="date"
                name="expireIn"
                value={moment(expireIn).format('YYYY-MM-DD')}
                onChange={(e) => {
                  setExpireIn(e.target.value);
                }}
                min={moment(manufacturingDate).add(1,'days').format('YYYY-MM-DD')}
              />
            </Form.Group>
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
