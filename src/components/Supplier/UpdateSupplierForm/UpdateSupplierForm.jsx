import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { productAPI } from '../../../axios/exeAPI';

const UpdateSupplierForm = (props) => {
  const {activeSupplier, onUpdateSupplier, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [name, setName] = useState(activeSupplier.name);
  const [address, setAddress] = useState(activeSupplier.address);
  const [phone, setPhone] = useState(activeSupplier.phone);
  const [products, setProducts] = useState([]);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedSupplier() {
    if(onUpdateSupplier)
      onUpdateSupplier(formRef);
  }

  useEffect(() => {
    setName(activeSupplier.name)
    setAddress(activeSupplier.address)
    setPhone(activeSupplier.phone)
  },[activeSupplier])

  useEffect(() => {
    async function getProducts() {
        try {
            const res = await productAPI.getAll()
            if(res.status === 200) {
                const data = res.data
                setProducts(data)
            } else {
                console.log(res)
            }

        } catch (error) {
            console.log(error)
        }  
    }
    getProducts()
},[])

  return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật nhà cung cấp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên nhà cung cấp</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên nhà cung cấp"
                value={name}
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
                  setAddress(e.target.value);
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
                  setPhone(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sản phẩm cung cấp</Form.Label>
              {
                  products.map(product => (
                      <Form.Check 
                          type={"checkbox"}
                          className='products'
                          name='products'
                          label={product.name}
                          value={product._id}
                          defaultChecked={  
                            activeSupplier.products ? 
                            activeSupplier.products.find(item => item._id === product._id)
                            : false
                          }
                      />
                  ))
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdatedSupplier}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateSupplierForm;
