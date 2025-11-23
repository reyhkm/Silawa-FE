import { useQuery } from '@tanstack/react-query';
import { getAllAdminReports } from '../../api/reports';
import { Table, Loader, Alert, Title, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import StatusBadge from '../../components/common/StatusBadge';

function DashboardPage() {
  const navigate = useNavigate();
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['adminReports'],
    queryFn: getAllAdminReports,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Gagal memuat data laporan. Coba lagi nanti.
      </Alert>
    );
  }

  const rows = reports?.map((report) => (
    <Table.Tr key={report.id} onClick={() => navigate(`/admin/report/${report.id}`)} style={{ cursor: 'pointer' }}>
      <Table.Td>{report.ticket_id}</Table.Td>
      <Table.Td>{report.title}</Table.Td>
      <Table.Td><StatusBadge status={report.status} /></Table.Td>
      <Table.Td>{report.category}</Table.Td>
      <Table.Td>{report.priority}</Table.Td>
      <Table.Td>{dayjs(report.created_at).format('DD MMM YYYY')}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={2}>Dashboard Laporan</Title>
      <Text c="dimmed" mb="xl">Klik pada baris untuk melihat detail.</Text>
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
    </>
  );
}

export default DashboardPage;
