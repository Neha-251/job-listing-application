import {Routes, Route} from "react-router-dom";
import { JobApply } from "../job-apply/job-apply";
import { JobListing } from "../job-listing/job-listing";



export const AllRoutes = () => {

    return (
        <>
           <Routes>
              <Route path="" element={<JobListing/>} ></Route>
              <Route path="/:id" element={<JobApply/>} ></Route>
           </Routes>
        </>
    )
}