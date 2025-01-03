import "./App.css";
import LoginScreen from "./pages/Login";
import ProfileScreen from "./pages/Profile";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SocketProvider from "./use-contexts/socketContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import Main from "./pages/Main";
import PersistLogin from "./hooks/usePersistLogin";

function App() {
  console.log("app");
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
          <Route element={<PersistLogin />}>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/profile"
                element={<ProfileScreen></ProfileScreen>}
              ></Route>

              <Route path="/chat-page" element={<Main />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
