import React, { useState } from 'react';

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const [alldata, setAllData] = useState([
        { id: "02158", status: "Completed", remarks: "Pending", distribution: "Bangalore" },
        { id: "02159", status: "In Progress", remarks: "Not Started", distribution: "Jaipur" },
        { id: "02160", status: "Pending", remarks: "Delayed", distribution: "Delhi" },
        { id: "02161", status: "Completed", remarks: "In Review", distribution: "kanpur" },
        { id: "02162", status: "In Progress", remarks: "On Track", distribution: "Bangalore" },
        { id: "02163", status: "Pending", remarks: "Awaiting Approval", distribution: "Jaipur" },
        { id: "02164", status: "Completed", remarks: "Pending", distribution: "Ahmedabad" },
        { id: "02165", status: "In Progress", remarks: "Not Started", distribution: "jammu and kashmir" },
        { id: "02166", status: "Pending", remarks: "Delayed", distribution: "Delhi" },
        { id: "02167", status: "Completed", remarks: "In Review", distribution: "Kanpur" },
        { id: "02168", status: "Completed", remarks: "Pending", distribution: "Punjab" },
        { id: "02169", status: "In Progress", remarks: "On Track", distribution: "Punjab" },
        { id: "02170", status: "Pending", remarks: "Awaiting Approval", distribution: "Pathankot" },
        { id: "02171", status: "Completed", remarks: "Pending", distribution: "Ahmedabad" },
        { id: "02172", status: "In Progress", remarks: "Not Started", distribution: "Delhi" },
    ]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredData = alldata.filter((item) => {
        return item.id.includes(search) || item.status.includes(search) || item.remarks.includes(search) || item.distribution.includes(search);
    });

    return (
        <div className='container'>
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={search}
            />
            <div className="container my-5">
                <div className="max-h-96 border-2 rounded-2 overflow-hidden shadow m-5">
                    <div className="row border-bottom-2 border-secondary text-center rounded-top-2 text-dark text-xl">
                        <div className="col p-2">ID</div>
                        <div className="col p-2 border-x-2 border-secondary">Status</div>
                        <div className="col p-2">Remarks</div>
                        <div className="col p-2">Distribution</div>
                    </div>
                    <div className="row border-bottom-1 border-secondary text-center rounded-top-2 text-dark text-xl bg-light">
                        {filteredData.map((item, index) => (
                            <div className={`row text-center ${index % 2 === 0 ? 'bg-secondary' : 'bg-dark'} text-white h-8 rounded-xl mx-3`} key={index}>
                                <div className="col p-2"> <span className="text-white">{item.id}</span></div>
                                <div className="col p-2"><span className="text-white">{item.status}</span></div>
                                <div className="col p-2"><span className="text-white">{item.remarks}</span></div>
                                <div className="col p-2"><span className="text-white">{item.distribution}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Searchbar;
