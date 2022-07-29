import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteProductForm(props) {
    const {activeProduct, onDeleteProduct, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedProduct() {
      if(onDeleteProduct)
         onDeleteProduct(activeProduct._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc muốn xóa sản phẩm: {activeProduct.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedProduct}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteProductForm;