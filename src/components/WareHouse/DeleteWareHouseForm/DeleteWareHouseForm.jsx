import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteWareHouseForm(props) {
    const {activeWareHouse, onDeleteWareHouse, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedWareHouse() {
      if(onDeleteWareHouse)
      onDeleteWareHouse(activeWareHouse._id);
    }

    return (
      activeWareHouse ?
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn xóa sản phẩm: {activeWareHouse.product.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedWareHouse}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    :<></>
    );
}

export default DeleteWareHouseForm;