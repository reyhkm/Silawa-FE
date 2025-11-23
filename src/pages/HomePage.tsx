import { Container, Title, Paper, Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import ReportForm from '../components/forms/ReportForm';

function HomePage() {
  return (
    <Container size="sm" my="xl">
      <Title ta="center">SILAWA</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Sistem Layanan Pengaduan Warga
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Title order={2} mb="md">Buat Laporan Baru</Title>
        <ReportForm />
      </Paper>
      
      <Text ta="center" mt="lg">
        Sudah punya laporan? <Anchor component={Link} to="/lacak">Lacak di sini</Anchor>.
      </Text>
    </Container>
  );
}

export default HomePage;
