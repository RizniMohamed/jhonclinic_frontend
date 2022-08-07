import { Route, Routes } from "react-router-dom";
import Dashbaord from "../pages/admin/Dashbaord";
import Admin from "../pages/admin";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/admin/Profile";
import Patients from "../pages/admin/Patients";
import Records from "../pages/admin/Records";


function Views() {
    return (
        <Routes>

            <Route index element={<Login />} />

            <Route path="admin" element={< Admin />} >
                <Route index element={<Dashbaord/>}/>
                <Route path="patients" element={<Patients/>}/>
                <Route path="records" element={<Records/>}/>
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}

export default Views