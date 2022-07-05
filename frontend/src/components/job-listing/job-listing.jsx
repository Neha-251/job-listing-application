import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./job-listing.css";

export const JobListing = () => {

    const [salaryRange, setSalaryRange] = useState(1);
    const [jobrole, setjobRole] = useState("");
    const [jobexperience, setjobExperience] = useState("")
    const [joblocation, setjobLocation] = useState("")

    const navigate = useNavigate();
    const search = useLocation().search;
    const page = new URLSearchParams(search).get('page') || 1;
    const pagesize = new URLSearchParams(search).get('pagesize') || 6;
    const sort = new URLSearchParams(search).get('sort');

    const role = new URLSearchParams(search).get('role') || "all";
    const salary = new URLSearchParams(search).get('salary') || "all";
    const location = new URLSearchParams(search).get('location') || "all";
    const experience = new URLSearchParams(search).get('experience') || "all";




    return (
        <div className="jobListing_mainDiv">

            <nav>
                <div className="logo">
                    <img src="https://cdn.worldvectorlogo.com/logos/logo-expertia-consultores-y-capacitaciones-01.svg" alt="" />
                </div>

                <h1>Filter</h1>

                <select name="jobRoles" onChange={(e)=> setjobRole(e.target.value)} className="select job_role">
                    <option value="all" >Choose Job Role...</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Sales Excecutive">Sales Excecutive</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Data Analyst">Data Analyst</option>
                </select>

                <select name="jobLocation" onChange={(e)=> setjobLocation(e.target.value)} className="select job_role">
                    <option value="all" >Choose Job Location...</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    
                </select>

              
                <select name="experience" onChange={(e)=> setjobExperience(e.target.value)} className="select experience">
                    <option value="all" >Choose Experience...</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Senior">Mid Senior</option>
                    <option value="Senior">Senior</option>
                </select>

                <input type="range" className="salaryRange_inp" min="1" max="40" name="salary" onChange={(e) => setSalaryRange(e.target.value)} />
                <p className="salaryRange_p">{salaryRange} LPA</p>
                
                <button>Apply</button>
            </nav>

            <div className="jobListing_container"></div>
        </div>
    )
}