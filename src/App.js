import { Global } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/UI/Routes/AuthRoute/AuthRoute";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import { Reset } from "./styles/Global/reset";
import { useRecoilValue } from "recoil";
import { authenticated } from "./index";



function App() {
  

    return (
        <>
            <Global styles={Reset}></Global>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <AuthRoute authenticated={useRecoilValue(authenticated)} element={<Main />} />
                  } npm install recoil/>
            </Routes>
        </>
    );
}

export default App;
