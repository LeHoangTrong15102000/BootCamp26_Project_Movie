import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Outlet, NavLink } from 'react-router-dom'


// Việc kiểm tra user đó có quyền truy cập vào không người ta hay dùng cái công cụ là json web token, JWT dùng để bảo vệ API của web
// Kiểm tra đã đăng nhập hay chưa thì mới set authorization

const AdminLayout = () => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          {/* Navbar content */}
          {/* Movies */}
          <Navbar.Section grow mt='md'>
            <NavLink to='/admin/movies'>Movies</NavLink>
          </Navbar.Section>
          {/* User */}
          <Navbar.Section>
            <NavLink to="/admin/users">Users</NavLink>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
          <span>Cybersoft Movie</span>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
        {/* Render childr route */}
        {/* Trong component layout phải có outlet để nó render ra những cái child route */}
      <Outlet />
    </AppShell>
  );
};

export default AdminLayout;
