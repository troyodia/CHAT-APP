import { useState } from "react";
import "./App.css";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./use-contexts/userContext";
import ChatPage from "./pages/ChatPage";
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
          <Route path="/chat-page" element={<ChatPage></ChatPage>}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
