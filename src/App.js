import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import AuthRouteReactQuery from './components/Routes/AuthRoute/AuthRouteReactQuery';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Register from './pages/Register/Register';
import { Reset } from "./styles/Global/reset";

function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>
        <Route exact path="/login" element={ <AuthRouteReactQuery path="/login" element={<Login />} /> } />
        <Route path="/register" element={ <AuthRouteReactQuery path="/register" element={<Register />} /> } />
        <Route path="/" element={ <AuthRouteReactQuery path="/" element={<Main />} /> } />
        <Route path="/admin/search" element={ <AuthRouteReactQuery path="/" element={<Main />} /> } />
      </Routes>
    </>
  );
}

export default App;
