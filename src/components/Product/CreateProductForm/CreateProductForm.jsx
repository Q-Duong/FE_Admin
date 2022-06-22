import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { brandAPI, categoryAPI } from '../../../axios/exeAPI';

function CreateProductForm(props) {
    const [categories, setCategories] =
        useState([{_id:"123",name:"???",image: "???"}]);
    const [brands, setBrands] =
        useState([{_id:"123",name:"???",image: "???"}]);
    const {onCreateProduct, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
  
    function handleClose ()  {
        onCloseCreateform()
    };

    function handleCreateProduct() {
        if(onCreateProduct)
        onCreateProduct(formRef);
    }

    useEffect(()=> {
        async function getCategories() {
            const categories = await categoryAPI.getAll();
            setCategories(categories.data);
        }
        getCategories()
    },[])

    useEffect(()=> {
        async function getBrands() {
            const brands = await brandAPI.getAll();
            setBrands(brands.data);
        }
        getBrands()
    },[])

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Danh mục</Form.Label>
                        <select name="category" class="form-control m-bot15">
                            {categories.map((category) => (
                                <option value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Thương hiệu</Form.Label>
                        <select name="brand" class="form-control m-bot15">
                            {brands.map((brand) => (
                                <option value={brand._id}>{brand.name}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Tên sản phẩm"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control
                            type="file"
                            name="myFile"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Đơn vị</Form.Label>
                        <Form.Control
                                type="text"
                                name="unit"
                                placeholder="Đơn vị"
                                autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tình trạng</Form.Label>
                        <Form.Control
                                type="text"
                                name="status"
                                placeholder="Tình trạng"
                                autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Hạn dùng</Form.Label>
                        <Form.Control
                                type="text"
                                name="expireNumber"
                                placeholder="Hạn dùng"
                                autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Đơn vị hạn dùng</Form.Label>
                        <Form.Control
                                type="text"
                                name="expireUnit"
                                placeholder="Đơn vị hạn dùng"
                                autoFocus
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleCreateProduct}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateProductForm;