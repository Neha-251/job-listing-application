import {Routes, Route} from "react-router-dom";
import { JobListing } from "../job-listing/job-listing";



export const AllRoutes = () => {

    return (
        <>
           <Routes>
              <Route path="/home" element={<JobListing/>} ></Route>
           </Routes>
        </>
    )
}