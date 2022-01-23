import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const API_URL = "https://jaymindohappinessrankingapi.azurewebsites.net";
const token = localStorage.getItem("token");
const headers = {
  accept: "application.json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const Factors = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(["2020"]);
  const [yearData, setYearData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const uniqueYear = [...new Set(yearData.map((n) => n.year))];
  const [limitData, setLimitData] = useState([]);
  const limitOption = [5, 10, 20, 30, 40, 50];

  // Ag grid table components
  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country", sortable: true },
    { headerName: "Score", field: "score", sortable: true },
    { headerName: "Economy", field: "economy", sortable: true },
    { headerName: "Family", field: "family", sortable: true },
    { headerName: "Health", field: "health", sortable: true },
    { headerName: "Freedom", field: "freedom", sortable: true },
    { headerName: "Generosity", field: "generosity", sortable: true },
    { headerName: "Trust", field: "trust", sortable: true },
  ];

  // use to fetch data for year the dropdown
  useEffect(() => {
    fetch(`${API_URL}/rankings`)
      .then((res) => res.json())
      .then((data) => setYearData(data));
  }, []);

  // use to fetch data for the country dropdown
  useEffect(() => {
    fetch(`${API_URL}/countries`)
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  // use to fetch data for the factors table
  useEffect(() => {
    let url;
    if (
      (selectedCountry[0] !== undefined && limitData[0] === undefined) ||
      (selectedCountry !== "none" && limitData === "none")
    ) {
      url = `${API_URL}/factors/${selectedYear}?country=${selectedCountry}`;
    } else if (
      (selectedCountry[0] === undefined && limitData[0] !== undefined) ||
      (selectedCountry === "none" && limitData !== "none")
    ) {
      url = `${API_URL}/factors/${selectedYear}?limit=${limitData}`;
    } else if (
      selectedCountry[0] !== undefined &&
      limitData[0] !== undefined &&
      limitData !== "none" &&
      selectedCountry !== "none"
    ) {
      url = `${API_URL}/factors/${selectedYear}?limit=${limitData}&country=${selectedCountry}`;
    } else {
      url = `${API_URL}/factors/${selectedYear}`;
    }
    console.log(selectedCountry);
    console.log(limitData);
    console.log("url   " + url);
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setRowData(data));
  }, [selectedCountry, selectedYear, limitData]);

  // Factors authorization
  if (token == null) {
    alert("You have to login to see this content");
    window.location.href = "/Login";
  }
  return (
    <div style={{ height: "1000px" }}>
      <select
        onChange={(e) => setSelectedYear(e.currentTarget.value)}
        style={{
          width: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "80px",
          display: "block",
        }}
      >
        <option value="none" selected disabled hidden>
          Choose a Year
        </option>
        {uniqueYear.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setSelectedCountry(e.currentTarget.value)}
        style={{
          width: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      >
        <option value="none">Choose a Country</option>
        {countries.map((country, index) => {
          return (
            <option key={index} value={country}>
              {country}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setLimitData(e.currentTarget.value)}
        style={{
          width: "700px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      >
        <option value="none">Choose a Limit</option>
        {limitOption.map((limitOption, index) => {
          return (
            <option key={index} value={limitOption}>
              {limitOption}
            </option>
          );
        })}
      </select>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "800px",
          width: "1800px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={16}
          suppressRowTransform={true}
          style={{ width: "100%", height: "100%" }}
        />
        {/* <Bar
          data = {{
            labels: rowData.map((n)=>(n).country),
            datasets: [{
                label: 'Economy',
                data: rowData.map((n)=>(n).economy),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2
            },
          ],
          }}
          height={400}
          width={700}
          options={{
           indexAxis:'y',
            responsive:true
          }}
        />    */}
      </div>
    </div>
  );
};
export default Factors;
