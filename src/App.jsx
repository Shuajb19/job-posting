import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import Header from "./app/components/header.jsx";
import Jobs from "./app/pages/jobs/jobs.jsx";
import Login from "./app/pages/auth/login.jsx";
import {Routes, Route} from "react-router-dom";
import PrivateRoute from "./app/services/PrivateRoute.jsx";
import JobsManagement from "./app/pages/jobs/jobsManagement.jsx";
import Register from "./app/pages/auth/register.jsx";


function App() {

    const location = useLocation();
    const showNavbar = location.pathname !== '/login' && location.pathname !== '/register';

    return (
        <div>
            {showNavbar && <Header />}
            <Routes>
                <Route
                    path="/"
                    element={ <Navigate to="/jobs" replace /> }
                />
                <Route 
                    path="/jobs" 
                    element={ <Jobs /> } 
                />
                <Route
                    path="/login"
                    element={
                            <Login />
                    }
                />
                <Route
                    path="/register"
                    element={ <Register /> }
                />
                <Route
                    path="/jobs-management"
                    element={
                        <PrivateRoute>
                            <JobsManagement />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
