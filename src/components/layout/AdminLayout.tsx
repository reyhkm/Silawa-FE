import { AppShell, Burger, Group, Button, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={4} onClick={() => navigate('/admin/dashboard')} style={{cursor: 'pointer'}}>SILAWA Admin</Title>
          </Group>
          <Button variant="light" onClick={logout}>Logout</Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Button variant="subtle" onClick={() => navigate('/admin/dashboard')}>Dashboard</Button>
        {/* Tambahkan link navigasi lain di sini jika perlu */}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
