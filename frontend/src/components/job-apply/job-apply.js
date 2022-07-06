import "./job-apply.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const JobApply = () => {

    const { id } = useParams();
    const [item, setItem] = useState({});

    

    const getData = (id) => {
        axios.get(`https://job-listing-app.herokuapp.com/jobs/single/${id}`)
        .then((res) => {
            setItem(res.data.job)
        }).catch(err => console.log(err))
    }
    
    useEffect(() => {
        getData(id);

    },[]);

    const handleSubmit = () => {
        alert("You have Successfully applied for the Job Application")
    }
    

    return (
        <div className="jobListing_mainDiv">

           
            <nav className="applynav">
            <h1>Job Description</h1>

            <hr/>

            <div className="subdiv">
            <div className="logo_div">
                <img className="company_logo" src={item.logo} alt="abcd"></img>
                <h3>{item.name}</h3>
            </div>
            <div className="description">
                <p className="small">Role: {item.role}</p>
                <p className="small">CTC: {item.ctc} LPA</p>
                <p className="small">Experience: {item.experience} Years</p>
                <p className="small">Location: {item.location}</p>
                <p className="small">Total Openings: {item.openings}</p>
                <p className="small">Interview Process: {item.process}</p>
                <p className="small">Description: {item.description}</p>
            </div>
            </div>
            <div>
                
            </div>
        
            </nav>

            <div className="jobApply_container">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="inp" placeholder="Full Name" /> <br/>
                    <input type="text" className="inp" placeholder="Highest Qualification" /> <br/>

                    <label>Gender: </label> <br/>
                    <label>Male</label><input className="radio" name="gender" type="radio"  value="Male" /> 
                    <label>Female</label><input className="radio" type="radio" name="gender" value="Female" />
                    <label>Other</label><input className="radio" type="radio" name="gender" value="Other" />
                    <br/>

                    <label>Are you comfortable in relocating to the job location? </label> <br/>
                    <label>Yes</label><input className="radio" type="radio" name="location"  value="Yes" /> 
                    <label>No</label><input className="radio" type="radio" name="location" value="No"/>
                    <br/>

                    <input type="text" className="inp" placeholder="Address" /> <br/>
                    <input type="text" className="inp" placeholder="Phone Number" /> <br/>
                    <input type="text" className="inp" placeholder="Resume Link" /> <br/>
                    <input type="text" className="inp" placeholder="Github Link" /> <br/>
                    <input type="text" className="inp" placeholder="Website Link(if any)" /> <br/>
                    <input type="text" className="inp" placeholder="Linkedin Link" /><br/>

                    <input type="submit" className="btn" value="Apply"/>
                </form>
            </div>
        </div>
    )
}