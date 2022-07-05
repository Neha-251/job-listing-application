import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./job-listing.css";
import axios from "axios";
import { useEffect } from "react";

export const JobListing = () => {

    const [salaryRange, setSalaryRange] = useState(1);
    const [jobrole, setjobRole] = useState("");
    const [jobexperience, setjobExperience] = useState("")
    const [joblocation, setjobLocation] = useState("")
    const [jobsort, setjobsort] = useState(-1);
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


    const getData = () => {
        axios.get(`https://sharanu.herokuapp.com/jobs?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${sort}`)
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
         console.log("pages",pages)
    }, [data])

    const handlePage = (e) => {
        navigate(`/home?page=${e}&pagesize=${pagesize}&role=${jobrole}&salary=${salaryRange}&location=${joblocation}&experience=${jobexperience}&sort=${jobsort}`)
    }


    console.log(data)
    console.log(totalPages)
    useEffect(()=> {
        getData()
    }, [page, pagesize, sort])

  

    const handleRoleChange = (e) => {
        setjobRole(e.target.value)
        navigate(`/home?page=${page}&pagesize=${pagesize}&role=${e.target.value}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${sort}`)

    }
    const handleExpChange = (e) => {
        setjobExperience(e.target.value)
        navigate(`/home?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${e.target.vaue}&sort=${sort}`)
    }
    const handleLocChange = (e) => {
        setjobLocation(e.target.value)
        navigate(`/home?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${e.target.value}&experience=${experience}&sort=${sort}`)
    }
    const handleCtcChange = (e) => {
        setSalaryRange(e.target.value)
        navigate(`/home?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${e.target.value}&location=${location}&experience=${experience}&sort=${sort}`)
    }

    const handleSortChange = (e) => {
        setjobsort(e.target.value)
        navigate(`/home?page=${page}&pagesize=${pagesize}&role=${role}&ctc=${ctc}&location=${location}&experience=${experience}&sort=${e.target.value}`)
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
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    
                </select>

              
                <select name="experience" onChange={(e)=> handleExpChange(e)} >
                    <option value="all" >Choose Experience...</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Senior">Mid Senior</option>
                    <option value="Senior">Senior</option>
                </select>

                <select name="sort" onChange={(e)=> handleSortChange(e)}>
                    <option value="1" >Recently Added</option>
                    <option value="-1">Default</option>
                    
                </select>

                <input type="range" className="salaryRange_inp" min="1" max="40" name="salary" onChange={(e) => handleCtcChange(e)} />
                <p className="salaryRange_p">{salaryRange} LPA</p>


                
                {/* <button onClick={handleFilterApply}>Apply</button> */}
            </nav>

            <div className="jobListing_container">



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