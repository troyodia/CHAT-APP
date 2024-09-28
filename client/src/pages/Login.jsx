import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:5000/api/v1/auth/login";

  const loginUser = async () => {
    try {
      const {
        data: { user, token },
      } = await axios.post(url, { email, password });
      console.log(user, token);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <div className="bg-amber-100 h-screen flex justify-center items-center">
      <form
        className="m-3 mb-12 flex w-[500px] min-w-[200px] flex-col 
      space-y-3 text-black text-2xl font-medium"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        <input
          type="text"
          className="rounded px-4 py-4 w-full"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          className="rounded px-4 py-4 w-full"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="rounded bg-amber-700 px-4 py-4 text-white">
          Login
        </button>
        <p className="mx-auto text-black pt-2">
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}
