import { useEffect } from "react";
import { useState } from "react";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(email, password);
  });

  return (
    <div className="bg-amber-100 h-screen flex justify-center items-center">
      <form
        className="m-3 mb-12 flex w-[500px] min-w-[200px] flex-col 
      space-y-3 text-black text-2xl font-medium"
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
