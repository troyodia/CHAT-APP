import "./App.css";
import LoginScreen from "./pages/Login";
import ProfileScreen from "./pages/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SocketProvider from "./use-contexts/socketContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import Main from "./pages/Main";
import PersistLogin from "./hooks/usePersistLogin";
import LandingPage from "./pages/LandingPage";

function App() {
  console.log("app");
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<LoginScreen />}></Route>
          <Route element={<PersistLogin />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<ProfileScreen />}></Route>

              <Route path="/chat-page" element={<Main />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
