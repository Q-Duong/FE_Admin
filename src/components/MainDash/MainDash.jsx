import React from "react";
import "./MainDash.css";
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import DashBoard from "../DashBoard/DashBoard";
import Login from "../Login/Login"
import BrandTable from "../Brand/BrandTable/BrandTable";
import CategoryTable from "../Category/CategoryTable/CategoryTable";
import SupplierTable from "../Supplier/SupplierTable/SupplierTable";
import ProductTable from "../Product/ProductTable/ProductTable";
import EmployeeTable from "../Employee/EmployeeTable/EmployeeTable";
import CustomerTable from "../Customer/CustomerTable/CustomerTable";
import ImportOrderTable from "../ImportOrder/ImportOrderTable/ImportOrderTable";
import ExportOrderTable from "../ExportOrder/ExportOrderTable/ExportOrderTable";
import WareHouseTable from "../WareHouse/WareHouseTable/WareHouseTable";
import Sidebar from '../Sidebar/Sidebar'
import Navbar from "../Navbar/Navbar";
import { removeToken } from "../../Actions/tokenAction";
import {useDispatch} from 'react-redux'

const MainDash = () => {
  const dispatch = useDispatch()
  const navigate  = useNavigate()

  function handleLogout (){
    dispatch(removeToken())
    navigate('/')
}
  return (
    <>
      <Navbar onLogout={handleLogout}/>
      <Sidebar/>
      <div className="MainDash">
        <Routes>
          <Route exec path="/" element={< DashBoard />} />
          <Route path="/login" element={< Login />} />
          <Route path="/dashBoard" element={< DashBoard />} />
          <Route path="/brand" element={< BrandTable />} />
          <Route path="/category" element={< CategoryTable />} />
          <Route path="/supplier" element={< SupplierTable />} />
          <Route path="/product" element={< ProductTable />} />
          <Route path="/wareHouse" element={< WareHouseTable />} />
          <Route path="/importOrder" element={< ImportOrderTable  />} />
          <Route path="/exportOrder" element={< ExportOrderTable  />} />
          <Route path="/employee" element={< EmployeeTable />} />
          <Route path="/customer" element={< CustomerTable  />} />
          
        </Routes>
      </div>
    </>
  );
};

export default MainDash;
