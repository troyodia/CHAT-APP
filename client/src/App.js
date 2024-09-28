import "./App.css";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={<RegisterScreen></RegisterScreen>}
        ></Route>
        <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
