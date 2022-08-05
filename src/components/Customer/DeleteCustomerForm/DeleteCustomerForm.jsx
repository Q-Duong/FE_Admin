import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteCustomerForm(props) {
  const { activeCustomer, onDeleteCustomer, isShow, onCloseDeleteform } = props;

  function handleClose() {
    onCloseDeleteform()
  };

  function handleDeletedCustomer() {
    if (onDeleteCustomer)
      onDeleteCustomer(activeCustomer._id);
  }

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc muốn xóa khách hàng: {activeCustomer.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedCustomer}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCustomerForm;