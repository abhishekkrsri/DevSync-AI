import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logged Out Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-52 min-h-screen bg-slate-800 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-8">
        DevSync AI
      </h2>

      <ul className="space-y-6 text-lg">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/projects">Projects</Link>
        </li>

        <li>
          <Link to="/aireviews">AI Reviews</Link>
        </li>

        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        className="mt-10 w-full bg-red-500 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;