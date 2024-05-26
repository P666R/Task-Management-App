import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import ViewTask from './pages/ViewTask';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/tasks/:id" element={<ViewTask />} />
      </Routes>
    </div>
  );
}

export default App;
