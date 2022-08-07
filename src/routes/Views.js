import { Route, Routes } from "react-router-dom";
import Dashbaord from "../pages/admin/Dashbaord";
import Admin from "../pages/admin";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";


function Views() {
    return (
        <Routes>

            <Route index element={<Login />} />

            <Route path="Admin" element={< Admin />} >
                <Route index element={<Dashbaord/>}/>
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}

export default Views