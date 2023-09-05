import React, { useEffect, useState } from "react";
import "./Style/Capsules.css";

function Capsules() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOptions, setSearchOptions] = useState({
    type: "",
    status: "",
    original_launch: "",
  });
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v3/capsules");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter the data based on search options
  const filteredData = data.filter((capsule) => {
    const { type, status, original_launch } = searchOptions;

    const includesOrNull = (value, searchTerm) => {
      return value ? value.includes(searchTerm) : false;
    };

    return (
      (!type || includesOrNull(capsule.type, type)) &&
      (!status || includesOrNull(capsule.status, status)) &&
      (!original_launch ||
        includesOrNull(capsule.original_launch, original_launch))
    );
  });

  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search option changes
  const handleSearchOptionChange = (e) => {
    const { name, value } = e.target;
    setSearchOptions({ ...searchOptions, [name]: value });
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when performing a search
  };

  // Function to format the date
  function formatDate(dateTimeString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="Capsules">
      {/* <h1>SpaceX Capsules</h1> */}

      <div className="bannerTop">
        <div>
          <h3 className="h3_tag">UPCOMING LAUNCH</h3>
          <h1 className="h1_tag">NASA’S SWOT MISSION</h1>
          <button className="button_learnMore">Learn More</button>
        </div>
        <div>
          <img
            className="bannerImage"
            src="https://sxcontent9668.azureedge.us/cms-assets/assets/SWOT_Homepage_Launch_Tile_DESKTOP_36ea0a3735.jpg"
            alt="banner image"
          />
        </div>
      </div>
      <br />
      <hr className="hr" />
      <br />

      <div className="search-container">
        <h1 className="searchForm_title">Search Form</h1>
        <br />
        <input
          type="text"
          placeholder="Search by Type"
          name="type"
          value={searchOptions.type}
          onChange={handleSearchOptionChange}
          list="typeOptions"
        />
        <datalist id="typeOptions">
          <option value="Dragon 1.0" />
          <option value="Dragon 1.1" />
          <option value="Dragon 2.0" />
        </datalist>

        <input
          type="text"
          placeholder="Search by Status"
          name="status"
          value={searchOptions.status}
          onChange={handleSearchOptionChange}
          list="statusOptions"
        />
        <datalist id="statusOptions">
          <option value="retired" />
          <option value="unknown" />
          <option value="active" />
        </datalist>
        <input
          type="date"
          placeholder="Search by Original Launch"
          name="original_launch"
          value={searchOptions.original_launch}
          onChange={handleSearchOptionChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="card-container">
        {currentData.map((capsule, index) => (
          <div key={index} className="card">
            <img
              src="https://sxcontent9668.azureedge.us/cms-assets/assets/Homepage_Desktop_5ebdeb0c6c.webp"
              alt="SpaceX"
              className="card-image"
            />

            <p className="p_tag">Capsule Id : {capsule.capsule_id}</p>
            <p className="p_tag">Capsule Serial : {capsule.capsule_serial}</p>
            <p className="p_tag">Type : {capsule.type}</p>
            <p className="p_tag">Landings : {capsule.landings}</p>

            <p className="p_tag">
              Original Launch : {formatDate(capsule.original_launch)}
            </p>
            <p className="p_tag">Status : {capsule.status}</p>
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// Pagination component
function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Capsules;
