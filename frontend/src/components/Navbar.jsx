import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center mb-4">
      <Link to="/" className="text-blue-500">
        Home
      </Link>
      <h1 className="text-2xl font-bold text-blue-900 uppercase">
        Task Management App
      </h1>
      <Link to="/create-task" className="text-blue-500">
        Create Task
      </Link>
    </nav>
  );
}

export default Navbar;
