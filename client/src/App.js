import { useState } from "react";
import "./App.css";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./use-contexts/userContext";
import Chat from "./pages/Chat";
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
          <Route path="/chat" element={<Chat></Chat>}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
