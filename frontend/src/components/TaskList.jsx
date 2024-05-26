import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTasks, deleteTask } from '../utils/api';

function TaskList() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, error } = useQuery('tasks', getTasks);

  const mutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex">
                  <h2 className="text-lg font-semibold mr-2">Title:</h2>
                  <p className="text-gray-800 capitalize">{task.title}</p>
                </div>
                <div className="flex">
                  <h2 className="text-lg font-semibold mr-2">Status:</h2>
                  <p className={`${getStatusColor(task.status)} capitalize`}>
                    {task.status}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={`/tasks/${task.id}`}
                  className="text-blue-500 hover:font-semibold min-w-[90px]"
                >
                  View Details
                </Link>
                <Link
                  to={`/edit-task/${task.id}`}
                  className="text-yellow-500 hover:font-semibold min-w-[40px]"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 hover:font-semibold min-w-[50px]"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Function to determine status color
function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'text-yellow-500';
    case 'in-progress':
      return 'text-orange-500';
    case 'completed':
      return 'text-green-500';
    default:
      return 'text-gray-800';
  }
}

export default TaskList;
