import React from "react";
import "./MainDash.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import BrandTable from "../Brand/BrandTable/BrandTable";
const MainDash = () => {

  return (
    <div className="MainDash">
      <Routes>
        <Route exact path="/" element={< BrandTable />} />
        <Route path="/brand" element={< BrandTable />} />
        <Route path="/brand" element={< BrandTable />} />
        <Route path="/brand" element={< BrandTable />} />
       {/* <Route path="*" element={< BrandTable />} /> */}
      </Routes>
    </div>
  );
};

export default MainDash;
