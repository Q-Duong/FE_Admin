import React, { useEffect, useState } from 'react';
import { NewsAPI } from '../../../axios/exeAPI';
import CreateNewsForm from '../CreateNewsForm/CreateNewsForm';
import DeleteNewsForm from '../DeleteNewsForm/DeleteNewsForm';
import UpdateNewsForm from '../UpdateNewsForm/UpdateNewsForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./NewsTable.css";

import { Button, Dropdown } from "react-bootstrap";
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function NewsTable() {
    const [news, setNewss] =
        useState([]);
    const [activeNews, setactiveNews] =
        useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose() {
        setShowUpdateForm(false)
    };

    function handleUpdateFormShow(news) {
        setactiveNews(news)
        setShowUpdateForm(true)
    };

    function handleCreateFormClose() {
        setShowCreateForm(false)
    };

    function handleCreateFormShow() {
        setShowCreateForm(true)
    };

    function handleDeleteFormClose() {
        setShowDeleteForm(false)
    };

    function handleDeleteFormShow(news) {
        setactiveNews(news)
        setShowDeleteForm(true)
    };

    async function handleUpdatedNews(formRef) {
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id', activeNews._id)
        const response = await newsAPI.update(updateFormData);
        const updatedNews = response.data;
        let tempNewss = [...news];
        tempNewss = tempNewss.map(news => news._id === updatedNews._id ? updatedNews : news);
        setNewss(tempNewss);
        setShowUpdateForm(false)
    }

    async function handleCreateNews(formRef) {
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await newsAPI.create(createFormData);
        const createdNews = response.data;
        console.log(response.data)
        let tempNewss = [...news];
        tempNewss.unshift(createdNews)
        setNewss(tempNewss);
        setShowCreateForm(false)
    }

    async function handleDeleteNews(id) {
        const response = await newsAPI.delete(id);
        if (response.status === 200) {
            let tempNewss = [...news];
            tempNewss = tempNewss.filter(news => news._id !== activeNews._id)
            setactiveNews({ _id: "123", name: "???", image: "???" })
            setNewss(tempNewss);
            setShowDeleteForm(false);
        }
    };

    useEffect(() => {
        async function getNewss() {
            const res = await newsAPI.getAll();
            console.log(res.data)
            setNewss(res.data);
        }
        getNewss()

    }, [])

    return (
        <>
            <div className="Table">
                <h3>Sản phẩm</h3>
                <ProtectedRoute permission={"create_news"}>
                    <Button variant="primary" onClick={handleCreateFormShow}>
                        Thêm
                    </Button>
                </ProtectedRoute>
                <TableContainer
                    component={Paper}
                    style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                    className="tableContainer"

                >
                    <Table responsive="xl" sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Danh mục</TableCell>
                                <TableCell align="left">Thương hiệu</TableCell>
                                <TableCell align="left">Tên hàng hóa</TableCell>
                                <TableCell align="left">Hình ảnh</TableCell>
                                <TableCell align="left">Đơn vị</TableCell>
                                <TableCell align="left">Tình trạng</TableCell>
                                <TableCell align="left">Tác động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ color: "white" }}>
                            {news.map((news) => (
                                <TableRow
                                    key={news._id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >

                                    <TableCell align="left">{news.category.name}</TableCell>
                                    <TableCell align="left">{news.brand.name}</TableCell>
                                    <TableCell align="left">{news.name}</TableCell>
                                    <TableCell align="left"><img className="imageNews" src={`https://res.cloudinary.com/anhtuanpham1507/image/upload/v1616603933/${News.image}`} /></TableCell>
                                    <TableCell align="left">{news.unit}</TableCell>
                                    <TableCell align="left">{news.status}</TableCell>
                                    <TableCell align="left" className="Details">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Hành động
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item ></Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleUpdateFormShow(news) }}>
                                                    Cập nhật
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => { handleDeleteFormShow(news) }}>Xóa</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <CreateNewsForm
                isShow={showCreateForm}
                onCreateNews={handleCreateNews}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateNewsForm
                activeNews={activeNews}
                isShow={showUpdateForm}
                onUpdateNews={handleUpdatedNews}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteNewsForm
                activeNews={activeNews}
                isShow={showDeleteForm}
                onDeleteNews={handleDeleteNews}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default NewsTable;