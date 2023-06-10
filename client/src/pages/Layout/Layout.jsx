import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
