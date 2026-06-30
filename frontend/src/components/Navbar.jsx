import { Link } from "react-router-dom";
function Navbar() {
    return (
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800 bg-slate-900">
        <h1 className="text-3xl font-bold text-cyan-400">
          DevSync AI
        </h1>
  
        <div className="flex gap-4">
          <button className="text-slate-300">
            Features
          </button>
  
          <Link
  to="/login"
  className="bg-cyan-500 px-5 py-2 rounded-lg"
>
  Login
</Link> 
        </div>
      </nav>
    );
  }
  
  export default Navbar;