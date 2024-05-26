import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTask } from '../utils/api';

function TaskDetail() {
  const { id } = useParams();
  const {
    data: task,
    isLoading,
    error,
  } = useQuery(['task', id], () => getTask(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Link to="/" className="text-blue-500">
        Back to Task List
      </Link>
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
      </p>
    </div>
  );
}

export default TaskDetail;
