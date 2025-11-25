import { AppShell, Burger, Group, Button, Title, Box, Text, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { IconReportAnalytics } from '@tabler/icons-react';

function PublicHeader() {
  const navigate = useNavigate();
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <IconReportAnalytics size={28} />
        <Title order={4}>SILAWA</Title>
      </Group>
      <Group>
        <Button component={Link} to="/" variant="default">
          Buat Laporan
        </Button>
        <Button component={Link} to="/lacak">
          Lacak Laporan
        </Button>
      </Group>
    </Group>
  );
}

function PublicFooter() {
  return (
    <Box py="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
      <Text c="dimmed" size="sm" ta="center">
        © {new Date().getFullYear()} Sistem Layanan Pengaduan Warga (SILAWA). Hak Cipta Dilindungi.
      </Text>
    </Box>
  );
}

export function PublicLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <PublicHeader />
      </AppShell.Header>

      <AppShell.Main bg="gray.0">
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer p="md">
        <PublicFooter />
      </AppShell.Footer>
    </AppShell>
  );
}
