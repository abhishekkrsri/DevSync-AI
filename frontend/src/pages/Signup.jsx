import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-xl w-96">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          Sign Up
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-cyan-500 py-3 rounded"
        >
          Sign Up
        </button>
        <p className="text-center mt-4 text-slate-400">
  Already have an account?
  <span
    onClick={() => navigate("/")}
    className="text-cyan-400 cursor-pointer ml-2"
  >
    Login
  </span>
</p>
      </div>
    </div>
  );
}

export default Signup;