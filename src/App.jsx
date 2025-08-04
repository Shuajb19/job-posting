import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import Header from "./app/components/header.jsx";
import Jobs from "./app/modules/jobs/pages/jobs.jsx";
import Login from "./app/modules/auth/pages/login.jsx";
import {Routes, Route} from "react-router-dom";
import PrivateRoute from "./app/services/PrivateRoute.jsx";
import JobsManagement from "./app/modules/jobs/pages/jobsManagement.jsx";
import Register from "./app/modules/auth/pages/register.jsx";
import JobDetails from './app/modules/jobs/pages/jobDetails.jsx';
import ApplicationPage from "@/app/modules/jobs/pages/applicationPage.jsx";


function App() {

    const location = useLocation();
    const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

    return (
        <div>
            <div className="pb-[90px]">{showNavbar && <Header/>}</div>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/jobs" replace/>}
                />
                <Route
                    path="/jobs"
                    element={<Jobs/>}
                />
                <Route
                    path="/login"
                    element={
                        <Login/>
                    }
                />
                <Route
                    path="/register"
                    element={<Register/>}
                />
                <Route
                    path="/jobs-management"
                    element={
                        <PrivateRoute>
                            <JobsManagement/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/job-details/:id"
                    element={<JobDetails/>}
                />
                <Route
                    path="/application-page/:id"
                    element={
                        <PrivateRoute>
                            <ApplicationPage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
