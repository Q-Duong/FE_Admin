import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateEmployeeForm = (props) => {
  const {activeEmployee, onUpdateEmployee, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [name, setName] = useState(activeEmployee.employeeName);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedEmployee() {
    if(onUpdateEmployee)
      onUpdateEmployee(formRef);
  }

  useEffect(() => {
    setName(activeEmployee.employeeName)
  },[activeEmployee])

  return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} enctype="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="employeeName"
                placeholder="Employee Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hình ảnh </Form.Label>
              <Form.Control
                type="file"
                name="myFile"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng 
          </Button>
          <Button variant="primary" onClick={handleUpdatedEmployee}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateEmployeeForm;
