import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import Dashbaord from "../pages/admin/Dashbaord";
import Admin from "../pages/admin";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Patients from "../pages/admin/Patients";
import Records from "../pages/admin/Records";

import { Box } from '@mui/system'
import SidePanel from '../components/SidePanel'
import Header from "../components/Header"
import { Toolbar } from '@mui/material'
import { store } from "../store";


const ProtectedRoute = ({ children, }) => {
    const auth = store.getState().auth
    const location = useLocation()
    const path = location.pathname.split('/').filter(x => x)

    if (!auth.status) {
        if (location.pathname.split('/').filter(x => x).length === 1)
            return <Navigate to={'/'} replace />;
        path.pop()
        return <Navigate to={`/${path.join('/')}`} replace />;
    }

    return children ? children : (
        <Box p={1} >
            <Header />
            <Toolbar />
            <Box display="flex">
                <SidePanel />
                <Outlet />
            </Box>
        </Box>
    )
};

function Views() {
    return (
        <Routes>

            <Route index element={<Login />} />

            <Route path="admin" element={< ProtectedRoute />} >
                <Route index element={<Dashbaord />} />
                <Route path="patients" element={<Patients />} />
                <Route path="patients/:userID/records" element={<Records />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}

export default Views