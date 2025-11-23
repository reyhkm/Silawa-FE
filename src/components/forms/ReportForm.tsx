import { useForm } from '@mantine/form';
import { TextInput, Textarea, FileInput, Button, Group, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { createReport } from '../../api/reports';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

function ReportForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const form = useForm({
    initialValues: {
      reporter_name: '',
      reporter_contact: '',
      title: '',
      description: '',
      location: '',
      photo: null as File | null,
    },
    validate: {
      reporter_name: (value) => (value.trim().length < 2 ? 'Nama terlalu pendek' : null),
      reporter_contact: (value) => (/^\+?([0-9]){10,14}$/.test(value) ? null : 'Nomor kontak tidak valid'),
      title: (value) => (value.trim().length < 5 ? 'Judul terlalu pendek' : null),
      description: (value) => (value.trim().length < 10 ? 'Deskripsi terlalu pendek' : null),
      location: (value) => (value.trim().length < 5 ? 'Lokasi terlalu pendek' : null),
    },
  });

  const mutation = useMutation({
    mutationFn: createReport,
    onSuccess: (data) => {
      notifications.show({
        title: 'Laporan Terkirim!',
        message: `Terima kasih! Nomor tiket Anda adalah ${data.ticket_id}. Mohon simpan untuk pelacakan.`,
        color: 'green',
        autoClose: 10000,
      });
      setTicketId(data.ticket_id);
      setShowSuccess(true);
      form.reset();
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Gagal Mengirim Laporan',
        message: error.response?.data?.message || 'Terjadi kesalahan pada server.',
        color: 'red',
      });
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (value) {
        formData.append(key, value as any);
      }
    });
    mutation.mutate(formData);
  };

  if (showSuccess) {
    return (
        <div>
            <Text>Laporan Anda telah berhasil dikirim.</Text>
            <Text>Nomor tiket Anda: <strong>{ticketId}</strong></Text>
            <Button mt="md" onClick={() => setShowSuccess(false)}>Buat Laporan Baru</Button>
        </div>
    )
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Nama Pelapor" placeholder="Nama Anda" required {...form.getInputProps('reporter_name')} />
      <TextInput mt="md" label="Kontak (WA/Telepon)" placeholder="08123456789" required {...form.getInputProps('reporter_contact')} />
      <TextInput mt="md" label="Judul Laporan" placeholder="Contoh: Jalan Rusak di Depan Sekolah" required {...form.getInputProps('title')} />
      <Textarea mt="md" label="Deskripsi Lengkap" placeholder="Jelaskan detail laporan Anda di sini" required minRows={4} {...form.getInputProps('description')} />
      <TextInput mt="md" label="Lokasi Kejadian" placeholder="Contoh: Jl. Merdeka No. 10, RT 01/RW 02" required {...form.getInputProps('location')} />
      <FileInput mt="md" label="Foto (Opsional)" placeholder="Upload foto bukti" accept="image/png,image/jpeg" {...form.getInputProps('photo')} />
      <Group justify="flex-end" mt="xl">
        <Button type="submit" loading={mutation.isPending}>
          Kirim Laporan
        </Button>
      </Group>
    </form>
  );
}

export default ReportForm;
