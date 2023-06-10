import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPass from './pages/auth/ForgotPass';
import Layout from './pages/Layout/Layout';
import Add_Vector from './pages/Vector_Wall/Pages/Add_Vector';
import View_Vector from './pages/Vector_Wall/Pages/View_Vector';
import Update_Vector from './pages/Vector_Wall/Pages/Update_Vector';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/add-vector',
        element: <Add_Vector />,
      },

      {
        path: '/view-vector',
        element: <View_Vector />,
      },

      {
        path: '/update-vector/:id',
        element: <Update_Vector />,
      },
    ],
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
