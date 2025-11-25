import { AppShell, Burger, Group, Text, Title, Box, NavLink, Avatar, Menu, UnstyledButton, rem, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IconDashboard, IconLogout, IconSettings, IconChevronDown, IconUser } from '@tabler/icons-react';

// --- KOMPONEN USER MENU (HEADER) ---
function UserMenu() {
  const { logout } = useAuth();
  const [userMenuOpened, { toggle: toggleUserMenu }] = useDisclosure(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => toggleUserMenu()}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar radius="xl" size={34} color="blue">AD</Avatar>
            <Box style={{ flex: 1 }}>
              <Text size="sm" fw={500} lh={1} mr={3}>Admin</Text>
              <Text c="dimmed" size="xs" lh={1}>Administrator</Text>
            </Box>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Pengaturan Akun</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
          Pengaturan
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

// --- KOMPONEN SIDEBAR ---
function AdminNavbar({ closeMobile }: { closeMobile: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Data menu navigasi
  const data = [
    { link: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
    // Bisa tambahkan menu lain di sini nanti, misal:
    // { link: '/admin/users', label: 'Pengguna', icon: IconUsers },
  ];

  const links = data.map((item) => (
    <NavLink
      key={item.label}
      active={location.pathname === item.link}
      label={item.label}
      leftSection={<item.icon size="1.2rem" stroke={1.5} />}
      onClick={() => {
        navigate(item.link);
        closeMobile();
      }}
      variant="light"
      color="blue"
      style={{ borderRadius: '8px', marginBottom: '4px', fontWeight: 500 }}
    />
  ));

  return (
    <Box p="md">
      {links}
    </Box>
  );
}

// --- LAYOUT UTAMA ---
function AdminLayout() {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      layout="alt" // Layout alternatif: Navbar menyatu dengan sisi kiri, Header di sebelahnya
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Title order={4} c="brandBlue.9">SILAWA Admin</Title>
          </Group>
          <UserMenu />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}>
        <Group px="md" mb="xl" mt="xs">
           {/* Logo di Sidebar untuk tampilan Desktop */}
           <Title order={3} c="brandBlue.9">SILAWA</Title>
        </Group>
        <AdminNavbar closeMobile={closeMobile} />
        
        {/* Footer Sidebar (Opsional) */}
        <Box p="md" mt="auto" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
            <Group gap="xs">
                <Avatar size="sm" radius="xl" color="blue"><IconUser size={14}/></Avatar>
                <Box>
                    <Text size="xs" fw={500}>Admin Panel</Text>
                    <Text size="xs" c="dimmed">v1.0.0</Text>
                </Box>
            </Group>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main bg="gray.0">
        {/* Container membatasi lebar konten agar tidak terlalu melebar di layar ultrawide */}
        <Container fluid p="md">
             <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
