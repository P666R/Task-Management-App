import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTask, createTask, updateTask } from '../utils/api';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery(['task', id], () => getTask(id), {
    enabled: !!id,
  });

  const mutation = useMutation(id ? updateTask : createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      navigate('/');
    },
  });

  const initialValues = {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'pending',
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().substring(0, 10)
      : '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    dueDate: Yup.string().required('Due Date is required'),
  });

  const handleSubmit = (values) => {
    if (id) {
      mutation.mutate({ id, task: values });
    } else {
      mutation.mutate(values);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Link to="/" className="text-blue-500">
        Back to Task List
      </Link>
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Task' : 'Create Task'}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold mb-2">
                Title
              </label>
              <Field
                id="title"
                name="title"
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${touched.title && errors.title ? 'border-red-500' : ''}`}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-bold mb-2"
              >
                Description
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${touched.description && errors.description ? 'border-red-500' : ''}`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-bold mb-2">
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${touched.status && errors.status ? 'border-red-500' : ''}`}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dueDate" className="block text-sm font-bold mb-2">
                Due Date
              </label>
              <Field
                id="dueDate"
                name="dueDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${touched.dueDate && errors.dueDate ? 'border-red-500' : ''}`}
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              {id ? 'Update Task' : 'Create Task'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
