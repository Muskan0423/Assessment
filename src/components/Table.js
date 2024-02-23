
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import * as XLSX from "xlsx";

const Table = () => {
    const head = "Dashboard";

    const data = [
        { ID: "02158", Status: "Completed", Remarks: "Pending", Distribution: "Bangalore" },
        { ID: "02159", Status: "In Progress", Remarks: "Not Started", Distribution: "Jaipur" },
        { ID: "02160", Status: "Pending", Remarks: "Delayed", Distribution: "Delhi" },
        { ID: "02161", Status: "Completed", Remarks: "In Review", Distribution: "Kanpur" },
        { ID: "02162", Status: "In Progress", Remarks: "On Track", Distribution: "Bangalore" },
        { ID: "02163", Status: "Pending", Remarks: "Awaiting Approval", Distribution: "Jaipur" },
        { ID: "02164", Status: "Completed", Remarks: "Pending", Distribution: "Ahmedabad" },
        { ID: "02165", Status: "In Progress", Remarks: "Not Started", Distribution: "Jammu and Kashmir" },
        { ID: "02166", Status: "Pending", Remarks: "Delayed", Distribution: "Delhi" },
        { ID: "02167", Status: "Completed", Remarks: "In Review", Distribution: "Kanpur" },
        { ID: "02168", Status: "Completed", Remarks: "Pending", Distribution: "Punjab" },
        { ID: "02169", Status: "In Progress", Remarks: "On Track", Distribution: "Punjab" },
        { ID: "02170", Status: "Pending", Remarks: "Awaiting Approval", Distribution: "Pathankot" },
        { ID: "02171", Status: "Completed", Remarks: "Pending", Distribution: "Ahmedabad" },
        { ID: "02172", Status: "In Progress", Remarks: "Not Started", Distribution: "Delhi" },
    ];

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState(""); 
    const [filterDistribution, setFilterDistribution] = useState(""); 
    const [searchdata, setsearchdata] = useState(data);
    const [selectedOrders, setSelectedOrders] = useState([]);

    useEffect(() => {
        // Filter data based on search input and selected Status filter
        const filtered = data.filter((item) => {
            return (
                item.ID.includes(search) &&
                (filterStatus === "" || item.Status === filterStatus) && // Filter by Status if filterStatus is not empty
                (filterDistribution === "" || item.Distribution === filterDistribution) // Filter by Distribution if filterDistribution is not empty
            );
        });
        setsearchdata(filtered);
    }, [search, filterStatus, filterDistribution]);

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            return (
                item.ID.includes(search) 
            );
        });
        setsearchdata(filtered);
    };

    const toggleOrderSelection = (orderID) => {
        if (selectedOrders.includes(orderID)) {
            setSelectedOrders(selectedOrders.filter(ID => ID !== orderID));
        } else {
            setSelectedOrders([...selectedOrders, orderID]);
        }
    };

    const toggleAllOrdersSelection = () => {
        if (selectedOrders.length === searchdata.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(searchdata.map(item => item.ID));
        }
    };
   
    const exportToExcel = () => {
        const selectedData = searchdata.filter(item => selectedOrders.includes(item.ID));
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Orders");
        XLSX.writeFile(workbook, "selected_orders.xlsx");
    };

    return (
        
            <div className="container">
                <div className="d-flex justify-content-between align-items-center h-16 position-relative">
                <div className="position-relative ">
                            <input className="ml-2 pl-3 h-8 w-auto form-control" type="text" maxLength="5" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Particular by ID" />
                            <span onClick={handleSearch} className="bg-dark rounded position-absolute top-0 end-0 mt-2 mr-2">
                                <SearchIcon className="text-white" />
                            </span>
                        </div>  
                   
                        <div  style={{display:"flex",justifyContent:"center"}}>
    {/* <div className="mr-2">
        <FilterListIcon className="text-dark cursor-pointer" />
    </div> */}
    
    <div style={{marginRight:120}}>
    <select  onChange={(e) => setFilterStatus(e.target.value)} style={{height:37,width:150}}>
        <option value="">All Status</option>
        <option value="Completed">Completed</option>
        <option value="In Progress">In Progress</option>
        <option value="Pending">Pending</option>
        {/* Add more Status options as needed */}
    </select>
    </div>
    {/* <div className="mr-2">
        <FilterListIcon className="text-dark cursor-pointer" />
    </div> */}
    <div>
    <select className="form-select mr-4" onChange={(e) => setFilterDistribution(e.target.value)}>
        <option value="">All Distribution</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Jaipur">Jaipur</option>
        <option value="Delhi">Delhi</option>
        <option value="Kanpur">Kanpur</option>
        <option value="Ahmedabad">Ahmedabad</option>
        {/* Add more Distribution options as needed */}
    </select>
    </div>
</div>

                        <button className="btn btn-primary" onClick={exportToExcel}>Export</button>
                </div>
                <div className="container">
                    <div className="max-h-96 border-2 rounded-2 overflow-hIDden shadow m-5">
                        <div className="row border-bottom-2 border-secondary text-center rounded-top-2 text-dark text-xl my-10">
                        {/* <div className="row border-bottom-2 border-secondary text-center rounded-top-2 text-dark text-xl bg-light"> */}
                            <div className="col p-2">
                                <input type="checkbox" onChange={toggleAllOrdersSelection} checked={selectedOrders.length === searchdata.length} />
                            </div>
                            <div className="col p-2">ID</div>
                            <div className="col p-2 border-secondary">Status</div>
                            <div className="col p-2">Remarks</div>
                            <div className="col p-2">Distribution</div>
                        </div>
                        <div className="row border-bottom-2 border-secondary text-center rounded-top-2 text-dark text-xl bg-light">
                            {searchdata.map((item, index) => (
                                <div className={`row  ${index % 2 === 0 ? 'bg-secondary' : 'bg-dark'} text-white h-8 rounded-xl mx-1`} key={index}>
                                    <div className="col-2 p-2">
                                        <input type="checkbox" onChange={() => toggleOrderSelection(item.ID)} checked={selectedOrders.includes(item.ID)} className="ml-lg-2"  />
                                    </div>
                                    <div className="col-3 p-2"><span className="text-white">{item.ID}</span></div>
                                    <div className="col-2 p-2"><span className="text-white">{item.Status}</span></div>
                                    <div className="col-3 p-2"><span className="text-white">{item.Remarks}</span></div>
                                    <div className="col-2 p-2"><span className="text-white">{item.Distribution}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    </div>
    );
}

export default Table;
