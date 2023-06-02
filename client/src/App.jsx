import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Books from './pages/books';
import Add from './pages/Add';
import Update from './pages/Update';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPass from './pages/auth/ForgotPass';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Books />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/signup',
    element: <SignUp />,
  },

  {
    path: '/forgot',
    element: <ForgotPass />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
