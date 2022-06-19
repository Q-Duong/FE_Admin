import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { brandAPI, categoryAPI } from '../../../axios/exeAPI';

function CreateProductForm(props) {
    const [categories, setCategories] =
        useState([{_id:"123",categoryName:"???",categoryImage: "???"}]);
    const [brands, setBrands] =
        useState([{_id:"123",brandName:"???",brandImage: "???"}]);
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
                <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Danh mục</Form.Label>
                        <select name="categoryId" class="form-control m-bot15">
                            {categories.map((category) => (
                                <option value={category._id}>{category.categoryName}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Thương hiệu</Form.Label>
                        <select name="brandId" class="form-control m-bot15">
                            {brands.map((brand) => (
                                <option value={brand._id}>{brand.brandName}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            name="productName"
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
                                name="productStatus"
                                placeholder="Tình trạng"
                                autoFocus
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateProduct}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateProductForm;