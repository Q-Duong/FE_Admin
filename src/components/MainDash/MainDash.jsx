import React, { useEffect, useState} from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import { Button, Form, Modal } from "react-bootstrap";
import "./MainDash.css";
import {brandAPI} from '../../axios/exeAPI';

const MainDash = () => {
  const [brands, setBrands] =
   useState([{_id:"Lasania Chiken Fri",brandName:"???",brandImage: "???"}]);
  const [activeUpdatedBrand, setActiveUpdatedBrand] = 
    useState({_id:"Lasania Chiken Fri",brandName:"???",brandImage: "???"});
  const [show, setShow] = useState(false);

  useEffect(()=> {
    async function getBrands() {
      const brands = await brandAPI.getAll();
      setBrands(brands.data);
    }
    getBrands()
  })

  function handleClose ()  {
    setShow(false)
  };

  function handleShow () {
    setShow(true)
  };

  function handleUpdateBrand(brand) {
    console.log(brand)
    setActiveUpdatedBrand(brand)
    handleShow()
  };

  function handleDeleteBrand(id) {
    console.log('delete brands',id)
  };

  async function handleUpdatedBrand(){
    const updatedBrand = await brandAPI.update(activeUpdatedBrand);
    let tempBrands = [...brands];
    tempBrands = tempBrands.map(brand => brand._id === updatedBrand.data._id ? updatedBrand.data : brand);
    setBrands(tempBrands);
    setShow(false)
  }

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      {/* <Cards /> */}

      <Table 
        brands = {brands}
        onUpdateBrand={handleUpdateBrand}
        onDeleteBrand={handleDeleteBrand}
      />
      <>                  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brand Name"
                  value={activeUpdatedBrand.brandName}
                  onChange={(e) => {
                    const temp = {...activeUpdatedBrand};
                    temp.brandName = e.target.value;
                    setActiveUpdatedBrand(temp);
                  }}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdatedBrand}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default MainDash;
