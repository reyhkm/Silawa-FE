import { AppShell, Group, Button, Title, Box, Text, Container, Stack } from '@mantine/core';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { IconReportAnalytics } from '@tabler/icons-react';

function PublicHeader() {
  const navigate = useNavigate();
  return (
    <Group h="100%" justify="space-between">
      <Group style={{ cursor: 'pointer' }} onClick={() => navigate('/')} gap="xs">
        <IconReportAnalytics size={28} color="var(--mantine-color-brandBlue-9)" />
        <Title order={4} c="brandBlue.9">SILAWA</Title>
      </Group>
      <Group>
        <Button component={Link} to="/" variant="subtle">
          Buat Laporan
        </Button>
        <Button component={Link} to="/lacak" variant="filled">
          Lacak Laporan
        </Button>
      </Group>
    </Group>
  );
}

function PublicFooter() {
  return (
    <Box bg="brandBlue.9" c="white" py="xl" mt="xl">
      <Container size="lg">
        <Group justify="space-between" align="center">
          {/* Bagian Kiri: Brand & Slogan */}
          <Stack gap={4}>
            <Group gap="xs">
                <IconReportAnalytics size={24} color="white" />
                <Text fw={700} size="lg">SILAWA</Text>
            </Group>
            <Text size="sm" style={{ opacity: 0.8 }}>
              Sistem Layanan Pengaduan Warga Terpadu
            </Text>
            <Text size="xs" style={{ opacity: 0.6 }}>
              Melayani dengan Transparansi dan Akuntabilitas.
            </Text>
          </Stack>

          {/* Bagian Kanan: Copyright */}
          <Text size="sm" style={{ opacity: 0.8 }} ta="right">
            © {new Date().getFullYear()} Pemerintah Daerah.<br />
            Hak Cipta Dilindungi Undang-Undang.
          </Text>
        </Group>
      </Container>
    </Box>
  );
}

export function PublicLayout() {
  return (
    <AppShell 
      header={{ height: 70 }} 
      padding={0} 
      withBorder={false} // Menghilangkan garis border default
    >
      <AppShell.Header style={{ borderBottom: '1px solid #e9ecef' }}>
         <Container size="lg" h="100%">
            <PublicHeader />
         </Container>
      </AppShell.Header>

      {/* Menggunakan Flexbox agar footer terdorong ke bawah jika konten sedikit */}
      <AppShell.Main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box style={{ flex: 1 }} py="xl">
            <Container size="lg">
                <Outlet />
            </Container>
        </Box>
        <PublicFooter />
      </AppShell.Main>
    </AppShell>
  );
}
