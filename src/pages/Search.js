
import React, { useState, useEffect } from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {Line} from 'react-chartjs-2';


const API_URL = `http://131.181.190.87:3000`;

function Search() {
  const [yearData, setYearData] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry]=useState([]);
  const [rowData, setRowData] = useState([]);
  const uniqueYear = [...new Set((yearData.map((n)=>(n).year)))]
  const columns = [
    { headerName: "Rank", field: "rank"},
    { headerName: "Country", field: "country"},
    { headerName: "Score", field: "score"},
     { headerName: "Year", field: "year"},
  ];
  
    

    // use to fetch data for the year dropdown
    useEffect(() => {
    fetch(`${API_URL}/rankings`)
      .then(res => res.json())
      .then((data) => setYearData(data));
       },[]);

     // use to fetch data for the countries dropdown
      useEffect(() => {
      fetch(`${API_URL}/countries`)
        .then(res => res.json())
        .then((data) => setCountries(data));
        },[]);


     // use to fetch data for the table
    useEffect(() => {
      let url       
      if ((selectedCountry[0] !== undefined && selectedYear[0] === undefined) || (selectedCountry !== "none" && selectedYear === "none")){
        url = `${API_URL}/rankings?country=${selectedCountry}`
      } else if ((selectedCountry[0] === undefined && selectedYear[0] !== undefined) || (selectedCountry === "none" && selectedYear !== "none")){
        url = `${API_URL}/rankings?year=${selectedYear}`
      }
       else if (selectedCountry[0] !== undefined && selectedYear[0] !== undefined && selectedYear !== "none" && selectedCountry !== "none"){
        url = `${API_URL}/rankings?year=${selectedYear}&country=${selectedCountry}`
      } else {
         url = `${API_URL}/rankings`
      }
        console.log("url   " + url )
      fetch(url)
      .then(res => res.json())
      .then((data) => setRowData(data));
  }, [selectedCountry,selectedYear, ]);


      

  return (
    <div style={{height: "1000px"}}>
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.currentTarget.value)} 
      style ={{ width: "700px", marginLeft: "auto",marginRight: "auto",marginTop: "80px",display:"block"}}>
        <option value="none" >Choose a Year</option>
        {uniqueYear.map((year, index) => {
          return (
            <option key={index} value={year}>{year}</option>
          );
        })}
      </select>
      <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.currentTarget.value)} 
      style ={{ width: "700px", marginLeft: "auto",marginRight: "auto", display: "block", 
}}>
            <option value="none" >Choose a Country</option>
        {countries.map((country, index) => {
          return (
            <option key={index} value={country}>{country}</option>
          );
        })}
      </select>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "500px",
          width: "700px",
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

       <Line
          data = {{
            labels: uniqueYear,
            datasets: [{
                label: 'Rank',
                data: rowData.map((n) => (n).rank),
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 2
            }],
          }}
          height={400}
          width={700}
          options={{
            responsive: true,
           indexAxis:'x',
            title: {
              display: true,
              text: 'Happiness Ranking',
              fontSize: 25
            },
            legend: {
              display: true,
              position:'right'
            }
          }}
        />
       </div> 
    </div>
    
  );
};
export default Search;
