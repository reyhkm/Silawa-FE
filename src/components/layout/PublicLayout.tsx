import { AppShell, Group, Button, Title, Box, Text, Container, Stack, Burger, Drawer, Divider, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { IconReportAnalytics, IconBuildingArch, IconPhone, IconMail } from '@tabler/icons-react';

// --- KOMPONEN HEADER ---
function PublicHeader({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Cek rute aktif untuk styling tombol
  const isActive = (path: string) => location.pathname === path;

  return (
    <Container size="lg" h="100%">
      <Group h="100%" justify="space-between">
        {/* LOGO AREA */}
        <Group style={{ cursor: 'pointer' }} onClick={() => navigate('/')} gap="xs">
          <Box p={6} bg="brandBlue.0" style={{ borderRadius: '8px' }}>
             <IconReportAnalytics size={28} color="var(--mantine-color-brandBlue-9)" />
          </Box>
          <Box>
            <Title order={4} c="brandBlue.9" lh={1.1}>SILAWA</Title>
            <Text size="10px" c="dimmed" tt="uppercase" fw={700} ls={1}>Pelayanan Publik</Text>
          </Box>
        </Group>

        {/* DESKTOP NAVIGATION (Hidden on Mobile) */}
        <Group visibleFrom="sm" gap="sm">
          <Button 
            component={Link} 
            to="/lacak" 
            variant={isActive('/lacak') ? "light" : "subtle"}
            color="brandBlue"
          >
            Lacak Laporan
          </Button>
          <Button 
            component={Link} 
            to="/" 
            variant="filled" 
            color="brandBlue"
            radius="md"
            leftSection={<IconReportAnalytics size={18} />}
          >
            Buat Laporan
          </Button>
        </Group>

        {/* MOBILE BURGER (Hidden on Desktop) */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Group>
    </Container>
  );
}

// --- KOMPONEN FOOTER ---
function PublicFooter() {
  return (
    <Box bg="brandBlue.9" c="white" py={40} mt={60}>
      <Container size="lg">
        <Group justify="space-between" align="flex-start">
          
          {/* Kolom 1: Brand */}
          <Stack gap="xs" maw={300}>
            <Group gap="xs" align="center">
                <IconBuildingArch size={32} color="white" style={{ opacity: 0.9 }} />
                <Title order={3} c="white">SILAWA</Title>
            </Group>
            <Text size="sm" c="gray.3" lh={1.6}>
              Platform digital resmi untuk penyampaian aspirasi dan pengaduan masyarakat. Transparan, Cepat, dan Terukur.
            </Text>
          </Stack>

          {/* Kolom 2: Kontak (Opsional tapi penting utk Gov site) */}
          <Stack gap="xs">
            <Text fw={700} size="lg" mb={4}>Hubungi Kami</Text>
            <Group gap="xs">
                <IconPhone size={18} color="var(--mantine-color-gray-4)" />
                <Text size="sm" c="gray.3">112 (Bebas Pulsa)</Text>
            </Group>
            <Group gap="xs">
                <IconMail size={18} color="var(--mantine-color-gray-4)" />
                <Text size="sm" c="gray.3">pengaduan@pemerintah.go.id</Text>
            </Group>
          </Stack>

          {/* Kolom 3: Copyright */}
          <Stack gap="xs" align="flex-end">
             <Text fw={700} size="lg" mb={4}>Legalitas</Text>
             <Text size="sm" c="gray.3" ta="right">
                © {new Date().getFullYear()} Pemerintah Daerah.<br />
                Hak Cipta Dilindungi Undang-Undang.
             </Text>
          </Stack>

        </Group>
      </Container>
    </Box>
  );
}

// --- LAYOUT UTAMA ---
export function PublicLayout() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell 
      header={{ height: 70 }} 
      padding={0} 
      withBorder={false}
    >
      {/* HEADER DENGAN SHADOW HALUS */}
      <AppShell.Header style={{ borderBottom: '1px solid #e9ecef', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
         <PublicHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      {/* DRAWER UNTUK MOBILE MENU */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Menu Navigasi"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Stack gap="md" p="md">
            <Button component={Link} to="/" onClick={close} fullWidth variant="filled" size="lg">
              Buat Laporan Baru
            </Button>
            <Button component={Link} to="/lacak" onClick={close} fullWidth variant="light" size="lg">
              Lacak Status Laporan
            </Button>
          </Stack>
        </ScrollArea>
      </Drawer>

      {/* KONTEN UTAMA */}
      <AppShell.Main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
        <Box style={{ flex: 1 }} py="xl">
            {/* Container konten dibatasi agar enak dibaca (Readability) */}
            <Container size="lg">
                <Outlet />
            </Container>
        </Box>
        <PublicFooter />
      </AppShell.Main>
    </AppShell>
  );
}
