import { useState } from 'react';
import { Container, Title, Paper, TextInput, Button, Box, Alert, Text, Loader, Card, Group, Badge, Image } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getReportByTicketId } from '../api/reports';
import { IconAlertCircle, IconSearch } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { PublicReport } from '../types';

const ReportStatusCard = ({ data }: { data: PublicReport }) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl">
        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{data.title}</Text>
            <Badge color={data.status === 'Selesai' ? 'green' : data.status === 'Diproses' ? 'blue' : 'gray'}>
                {data.status}
            </Badge>
        </Group>

        <Text size="sm" c="dimmed">
            Dibuat pada: {dayjs(data.created_at).format('DD MMMM YYYY, HH:mm')}
        </Text>

        <Text mt="md">{data.description}</Text>

        {data.photo_key && (
            <Box mt="lg">
                <Text fw={500}>Foto Laporan:</Text>
                <Image
                    radius="md"
                    mt="sm"
                    src={`/api/reports/photo/${data.photo_key}`}
                    alt="Foto Laporan"
                    mah={400}
                    w="auto"
                />
            </Box>
        )}
    </Card>
);

function LacakPage() {
  const [ticketId, setTicketId] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['report', submittedTicketId],
    queryFn: () => getReportByTicketId(submittedTicketId),
    enabled: !!submittedTicketId, // Only run query if submittedTicketId is not empty
    retry: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketId.trim()) {
      setSubmittedTicketId(ticketId.trim());
      refetch();
    }
  };

  return (
    <Container size="sm" my="xl">
      <Title ta="center">Lacak Laporan</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Masukkan nomor tiket Anda untuk melihat status terbaru.
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Nomor Tiket"
            placeholder="Contoh: LPR-20240405-001"
            required
            value={ticketId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketId(e.currentTarget.value)}
          />
          <Button type="submit" fullWidth mt="xl" leftSection={<IconSearch size={16} />} loading={isLoading}>
            Lacak
          </Button>
        </form>
      </Paper>

      <Box mt="xl">
        {isLoading && <Loader style={{ display: 'block', margin: 'auto' }} />}
        {error && (
          <Alert icon={<IconAlertCircle size="1rem" />} title="Gagal!" color="red">
            Laporan dengan nomor tiket tersebut tidak ditemukan.
          </Alert>
        )}
        {data && <ReportStatusCard data={data} />}
      </Box>
    </Container>
  );
}

export default LacakPage;
