import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

const SideMenu = () => {
  const location = useLocation();
  const path = location.pathname;

  const activeMenuItem = (getPath) => {
    if (path == getPath) {
      return true;
    }
    return false;
  };

  return (
    <Sidebar width="180px">
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 1)
              return {
                color: disabled ? '#f5d9ff' : '#d359ff',
                backgroundColor: active ? '#eecef9' : undefined,
              };
          },
        }}
      >
        <SubMenu open label="Vector Wallpaper">
          <MenuItem
            active={activeMenuItem('/view-vector') ? true : false}
            component={<Link to="/view-vector" />}
          >
            View All
          </MenuItem>
          <MenuItem
            active={activeMenuItem('/add-vector') ? true : false}
            component={<Link to="/add-vector" />}
          >
            Add New
          </MenuItem>
        </SubMenu>
        <SubMenu label="Boys Photo Pose">
          <MenuItem component={<Link to="/view-vector" />}>View All</MenuItem>
          <MenuItem component={<Link to="/add-vector" />}> Add New </MenuItem>
        </SubMenu>

        <SubMenu label="Mehidi Wallpaper">
          <MenuItem component={<Link to="/view-vector" />}>View All</MenuItem>
          <MenuItem component={<Link to="/add-vector" />}> Add New </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SideMenu;
