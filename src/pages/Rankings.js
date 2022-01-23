
import React, { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const API_URL = `http://131.181.190.87:3000`;

function Rankings() {
  const [yearData,setYearData] = useState([]);
  const [year, setYear] = useState(["2020"]);
  const [rowData, setRowData] = useState([]);
  const uniqueYear = [...new Set((yearData.map((n)=>(n).year)))] 
  
  const columns = [
    { headerName: "Rank", field: "rank"},
    { headerName: "Country", field: "country"},
    { headerName: "Score", field: "score"},
  ];
  
  // fetch data for the year dropdown
   useEffect(() => {
    fetch(`${API_URL}/rankings`)
      .then(res => res.json())
      .then((data) => setYearData(data));
  // fetch normal data
    fetch(`${API_URL}/rankings?year=${year}`)
      .then(res => res.json())
      .then((data) => setRowData(data));

  }, [year]);

  return (
    <div style={{height: "1000px"}}>
      <select value={year} onChange={(e) => setYear(e.currentTarget.value)} 
      style ={{marginTop: "100px",  marginLeft: "650px",
         }}>
        {uniqueYear.map((year, index) => {
          return (
            <option key={index} value={year}>{year}</option>
          );
        })}
      </select>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "540px",
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block", 

        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
          suppressRowTransform= {true}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    </div>
    
  );
};
export default Rankings;
