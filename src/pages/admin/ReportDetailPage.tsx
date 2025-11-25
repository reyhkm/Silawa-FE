import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReportDetail, updateReport, getProtectedImage } from '../../api/reports'; // Hapus deleteReport
import { Alert, Grid, Paper, Title, Text, Image, Box, Skeleton } from '@mantine/core'; // Hapus Button, Modal, Group
import { IconAlertCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import ManagementForm from '../../components/admin/ManagementForm';
import { notifications } from '@mantine/notifications';
import { Report } from '../../types';
import { useEffect } from 'react';

// --- KOMPONEN GAMBAR (Tetap Sama) ---
const ProtectedImage = ({ photoKey }: { photoKey: string }) => {
  const queryClient = useQueryClient();
  const queryKey = ['protectedImage', photoKey];

  const { data: imageUrl, isLoading, isError } = useQuery({
    queryKey: queryKey,
    queryFn: () => getProtectedImage(photoKey),
    staleTime: Infinity,
    enabled: !!photoKey,
  });

  useEffect(() => {
    return () => {
      if (imageUrl) {
        queryClient.removeQueries({ queryKey: queryKey, exact: true });
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, queryClient, queryKey]);

  if (isLoading) {
    return <Skeleton height={300} mt="sm" radius="md" />;
  }

  if (isError) {
    return <Text c="red" mt="sm">Gagal memuat gambar.</Text>;
  }

  return (
    <Image
      radius="md"
      mt="sm"
      src={imageUrl}
      alt="Foto Laporan"
      mah={400}
      w="auto"
    />
  );
};

// --- KOMPONEN SKELETON (Tetap Sama - Agar Loading Bagus) ---
const DetailSkeleton = () => (
  <Grid>
    <Grid.Col span={{ base: 12, md: 7 }}>
      <Paper shadow="sm" p="md" withBorder>
        <Skeleton height={30} width="70%" mb="sm" />
        <Skeleton height={20} width="40%" mb="xl" />
        <Skeleton height={20} width="50%" mb="xs" />
        <Skeleton height={20} width="50%" mb="xs" />
        <Skeleton height={20} width="60%" mb="xl" />
        <Skeleton height={100} mb="lg" />
        <Skeleton height={200} radius="md" />
      </Paper>
    </Grid.Col>
    <Grid.Col span={{ base: 12, md: 5 }}>
      <Paper shadow="sm" p="md" withBorder>
        <Skeleton height={30} width="60%" mb="lg" />
        <Skeleton height={50} mb="md" />
        <Skeleton height={50} mb="md" />
        <Skeleton height={50} mb="md" />
        <Skeleton height={100} mb="xl" />
        <Skeleton height={40} />
      </Paper>
    </Grid.Col>
  </Grid>
);

function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: report, isLoading, error } = useQuery({
    queryKey: ['adminReport', id],
    queryFn: () => getReportDetail(id!),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; data: Partial<Report> }) => updateReport(data),
    onSuccess: () => {
      notifications.show({
        title: 'Sukses',
        message: 'Laporan berhasil diperbarui.',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['adminReport', id] });
      queryClient.invalidateQueries({ queryKey: ['adminReports'] });
    },
    onError: () => {
      notifications.show({
        title: 'Gagal',
        message: 'Gagal memperbarui laporan.',
        color: 'red',
      });
    },
  });

  // --- BAGIAN DELETE DIHAPUS TOTAL DI SINI ---

  if (isLoading) return <DetailSkeleton />;

  if (error || !report) {
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        Gagal memuat detail laporan atau laporan tidak ditemukan.
      </Alert>
    );
  }

  const handleUpdate = (values: Partial<Report>) => {
    updateMutation.mutate({ id: id!, data: values });
  };

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 7 }}>
        <Paper shadow="sm" p="md" withBorder>
          <Title order={3}>{report.title}</Title>
          <Text c="dimmed" size="sm">Tiket: {report.ticket_id}</Text>
          <Text mt="md"><strong>Pelapor:</strong> {report.reporter_name}</Text>
          <Text><strong>Kontak:</strong> {report.reporter_contact}</Text>
          <Text><strong>Lokasi:</strong> {report.location}</Text>
          <Text><strong>Dilaporkan pada:</strong> {dayjs(report.created_at).format('DD MMMM YYYY, HH:mm')}</Text>
          <Text mt="lg"><strong>Deskripsi:</strong></Text>
          <Text>{report.description}</Text>
          {report.photo_key && (
            <Box mt="lg">
              <Text fw={500}>Foto:</Text>
              <ProtectedImage photoKey={report.photo_key} />
            </Box>
          )}
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Paper shadow="sm" p="md" withBorder>
          <Title order={3} mb="md">Manajemen Laporan</Title>
          <ManagementForm report={report} onSubmit={handleUpdate} isLoading={updateMutation.isPending} />
          
          {/* TOMBOL DELETE SUDAH DIHAPUS */}
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default ReportDetailPage;
