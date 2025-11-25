import { useQuery } from '@tanstack/react-query';
import { getAllAdminReports } from '../../api/reports';
import { Table, Alert, Title, Text, Paper, SimpleGrid, Group, Skeleton } from '@mantine/core'; // Tambah Skeleton
import { IconAlertCircle, IconCircleCheck, IconClockHour4, IconListDetails } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import StatusBadge from '../../components/common/StatusBadge';
import { AdminReportListItem } from '../../types';

// ... (Kode StatCard tetap sama, tidak perlu diubah) ...
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
          {title}
        </Text>
        <Text c={color}>{icon}</Text>
      </Group>
      <Text fz={32} fw={700} mt="sm">
        {value}
      </Text>
    </Paper>
  );
}

// --- KOMPONEN BARU: SKELETON TABLE ---
function DashboardSkeleton() {
  return (
    <>
      <Skeleton height={40} width={200} mb="lg" /> {/* Judul */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb="xl">
        <Skeleton height={120} radius="md" />
        <Skeleton height={120} radius="md" />
        <Skeleton height={120} radius="md" />
      </SimpleGrid>
      <Paper withBorder p="md" radius="md">
        <Skeleton height={30} width={150} mb="md" />
        <Skeleton height={20} width={300} mb="lg" />
        {/* Simulasi 5 baris tabel */}
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} height={50} mt="sm" radius="sm" />
        ))}
      </Paper>
    </>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['adminReports'],
    queryFn: getAllAdminReports,
  });

  // --- PERBAIKAN DI SINI: Gunakan Skeleton ---
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Gagal memuat data laporan. Coba lagi nanti.
      </Alert>
    );
  }

  // ... (Sisa kode logika stats dan render tabel tetap sama persis) ...
  const stats = (reports || []).reduce(
    (acc, report) => {
      if (report.status === 'Diterima') acc.diterima += 1;
      if (report.status === 'Diproses') acc.diproses += 1;
      if (report.status === 'Selesai') acc.selesai += 1;
      return acc;
    },
    { diterima: 0, diproses: 0, selesai: 0 }
  );

  const rows = reports?.map((report: AdminReportListItem) => (
    <Table.Tr key={report.id} onClick={() => navigate(`/admin/report/${report.id}`)} style={{ cursor: 'pointer' }}>
      <Table.Td>{report.ticket_id}</Table.Td>
      <Table.Td>{report.title}</Table.Td>
      <Table.Td>
        <StatusBadge status={report.status} />
      </Table.Td>
      <Table.Td>{report.category}</Table.Td>
      <Table.Td>{report.priority}</Table.Td>
      <Table.Td>{dayjs(report.created_at).format('DD MMM YYYY')}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={2} mb="lg">
        Dashboard Laporan
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb="xl">
        <StatCard title="Laporan Diterima" value={stats.diterima} icon={<IconListDetails size={24} />} color="gray" />
        <StatCard title="Sedang Diproses" value={stats.diproses} icon={<IconClockHour4 size={24} />} color="blue" />
        <StatCard title="Laporan Selesai" value={stats.selesai} icon={<IconCircleCheck size={24} />} color="green" />
      </SimpleGrid>

      <Paper withBorder p="md" radius="md">
        <Title order={4} mb="sm">
          Daftar Laporan Masuk
        </Title>
        <Text c="dimmed" mb="md" size="sm">
          Klik pada baris untuk melihat detail dan melakukan manajemen laporan.
        </Text>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm" striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Nomor Tiket</Table.Th>
                <Table.Th>Judul</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Kategori</Table.Th>
                <Table.Th>Prioritas</Table.Th>
                <Table.Th>Tanggal</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </>
  );
}

export default DashboardPage;
