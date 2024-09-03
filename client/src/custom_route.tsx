import {BrowserRouter, Route, Routes} from "react-router-dom";
import BaseAuth from "./view/base_auth.tsx";

function CustomRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<BaseAuth/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default CustomRoute;
