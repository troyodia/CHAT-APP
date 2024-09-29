import { useState } from "react";
import "./App.css";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./use-contexts/userContext";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<RegisterScreen></RegisterScreen>}
          ></Route>
          <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
