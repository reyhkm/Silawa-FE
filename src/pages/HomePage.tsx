import { Container, Title, Paper, Text, Stack } from '@mantine/core';
import ReportForm from '../components/forms/ReportForm';

function HomePage() {
  return (
    <Container size="sm" my="xl">
      <Stack align="center" gap="lg">
        <Title order={1} ta="center">
          Layanan Pengaduan Warga Online
        </Title>
        <Text c="dimmed" size="lg" ta="center" maw={600}>
          Sampaikan laporan Anda langsung kepada kami. Setiap laporan akan kami proses untuk pelayanan publik yang lebih baik.
        </Text>
        <Paper p="xl" withBorder style={{ width: '100%' }}>
          <Title order={3} mb="md">
            Formulir Laporan Baru
          </Title>
          <ReportForm />
        </Paper>
      </Stack>
    </Container>
  );
}

export default HomePage;
