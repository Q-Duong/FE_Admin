import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteEmployeeForm(props) {
    const {activeEmployee, onDeleteEmployee, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedEmployee() {
      if(onDeleteEmployee)
         onDeleteEmployee(activeEmployee._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc muốn xóa nhân viên: {activeEmployee.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedEmployee}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteEmployeeForm;