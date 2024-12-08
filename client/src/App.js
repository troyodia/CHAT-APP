import { useState } from "react";
import "./App.css";
import LoginScreen from "./pages/Login";
import ProfileScreen from "./pages/Profile";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserProvider, UserState } from "./use-contexts/userContext";
import SocketProvider from "./use-contexts/socketContext";
import ChatPage from "./pages/ChatPage";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
            <Route
              path="/profile"
              element={
                <PrivateRoutes>
                  {" "}
                  <ProfileScreen></ProfileScreen>
                </PrivateRoutes>
              }
            ></Route>

            <Route
              path="/chat-page"
              element={
                <PrivateRoutes>
                  <ChatPage></ChatPage>
                </PrivateRoutes>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
