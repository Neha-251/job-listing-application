import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./job-listing.css";
import axios from "axios";
import { useEffect } from "react";

export const JobListing = () => {

    const [salaryRange, setSalaryRange] = useState(0);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pages, setPages] = useState([])

    const navigate = useNavigate();
    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const sort = new URLSearchParams(search).get('sort') || -1;

    const role = new URLSearchParams(search).get('role') || "all";
    const ctc = new URLSearchParams(search).get('ctc') || 0;
    const location = new URLSearchParams(search).get('location') || "all";
    const experience = new URLSearchParams(search).get('experience') || "all";


    const handleClearFilter = () => {
        navigate("/");
    }

    const getData = () => {
        axios.get(`https://job-listing-app.herokuapp.com/jobs?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${sort}`)
        .then((res) => {
            setData(res.data.job)
            setTotalPages(res.data.totalPages)
        }).catch(err => console.log(err))
    }

    useEffect(() => {

        let arr = [];
        let limit = Math.round(totalPages);
        //console.log('limit', limit)

        for (let i = 1; i <= limit; i++) {
            arr.push(i);
        }
        setPages(arr);
    }, [data])

    const handlePage = (e) => {
        navigate(`?page=${e}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${sort}`)
    }



    useEffect(()=> {
        getData()
    }, [page, pagesize, sort, location, experience, role, sort, ctc])

  
    const handleRoleChange = (e) => {
        navigate(`?page=${page}&pagesize=${pagesize}&role=${e.target.value}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${sort}`)

    }
    const handleExpChange = (e) => {
        navigate(`?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${e.target.value}&sort=${sort}`)
    }
    const handleLocChange = (e) => {
        navigate(`?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${e.target.value}&experience=${experience}&sort=${sort}`)
    }
    const handleCtcChange = (e) => {
        setSalaryRange(e.target.value)
        navigate(`?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${e.target.value}&location=${location}&experience=${experience}&sort=${sort}`)
    }

    const handleSortChange = (e) => {
        navigate(`?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${e.target.value}`)
    }

    const handleApply= (id) => {
        navigate(`/${id}`)

    }

    return (
        <div className="jobListing_mainDiv">

            <nav>
                <div className="logo">
                    <img src="https://cdn.worldvectorlogo.com/logos/logo-expertia-consultores-y-capacitaciones-01.svg" alt="" />
                </div>

                <h1>Filter</h1>

                <select name="jobRoles" onChange={(e)=> handleRoleChange(e)} >
                    <option value="all" >Choose Job Role...</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Sales Excecutive">Sales Excecutive</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Data Analyst">Data Analyst</option>
                </select>

                <select name="jobLocation" onChange={(e)=> handleLocChange(e)} >
                    <option value="all" >Choose Job Location...</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Delhi NCR">Delhi NCR</option>

                    
                </select>

              
                <select name="experience" onChange={(e)=> handleExpChange(e)} >
                    <option value="all" >Choose Experience...</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Senior Level">Mid Senior Level</option>
                    <option value="Senior Level">Senior Level</option>
                </select>

                <select name="sort" onChange={(e)=> handleSortChange(e)}>
                    <option value="-1" >Recently Added</option>
                    <option value="1">Default</option>
                    
                </select>

                <input type="range" className="salaryRange_inp" min="1" max="20" name="salary" onChange={(e) => handleCtcChange(e)} />
                <p className="salaryRange_p">{salaryRange} LPA</p>

                <button onClick={handleClearFilter} className="btn">Clear Filter</button>
                
            </nav>

            <div className="jobListing_container">

          
             
                {
                    data.length === 0? <div> No Result for This filter</div> :
                    data.map((el) => {
                        return (
                            <div className="data_mainDiv" key={el._id}>
                                <div className="logo_div">
                                   <img src={el.logo} className="company_logo" alt="logo"/>
                                   <h3>{el.name}</h3>
                                </div>
                                <p>Job Role: {el.role}</p>
                                <p>Salary: {el.ctc} LPA</p>
                                <p>Required Experience: {el.experience}</p>
                                <p>Location: {el.location}</p>
                                <p>Total Openings: {el.openinigs}</p>
                                <p>Process: {el.process}</p>
                                <p>Description: {el.description}</p>

                                <button onClick={()=> handleApply(el._id)}>Apply</button>
                            </div>
                        )
                    })
                }

            <div className="pageDiv">
                {
                    pages.map((e) => {
                        return (
                            <button key={e} onClick={() => handlePage(e)}>{e}</button>
                        )
                    })
                }
            </div>
            </div>
        </div>
    )
}