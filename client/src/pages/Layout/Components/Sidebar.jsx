import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <SubMenu label="Vector Wallpaper">
          <MenuItem component={<Link to="/view-vector" />}>View All</MenuItem>
          <MenuItem component={<Link to="/add-vector" />}> Add New </MenuItem>
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
