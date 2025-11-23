import { useForm } from '@mantine/form';
import { Select, Textarea, Button } from '@mantine/core';
import { Report, ReportCategory, ReportPriority, ReportStatus } from '../../types';

interface ManagementFormProps {
  report: Report;
  onSubmit: (values: Partial<Report>) => void;
  isLoading: boolean;
}

const statusOptions: ReportStatus[] = ['Diterima', 'Diproses', 'Selesai'];
const categoryOptions: ReportCategory[] = ['Belum Dikategorikan', 'Infrastruktur', 'Kebersihan', 'Keamanan', 'Sosial'];
const priorityOptions: ReportPriority[] = ['Rendah', 'Normal', 'Tinggi', 'Mendesak'];

function ManagementForm({ report, onSubmit, isLoading }: ManagementFormProps) {
  const form = useForm({
    initialValues: {
      status: report.status,
      category: report.category,
      priority: report.priority,
      internal_notes: report.internal_notes || '',
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Select
        label="Status"
        data={statusOptions}
        required
        {...form.getInputProps('status')}
      />
      <Select
        mt="md"
        label="Kategori"
        data={categoryOptions}
        required
        {...form.getInputProps('category')}
      />
      <Select
        mt="md"
        label="Prioritas"
        data={priorityOptions}
        required
        {...form.getInputProps('priority')}
      />
      <Textarea
        mt="md"
        label="Catatan Internal"
        placeholder="Tambahkan catatan untuk tim..."
        minRows={4}
        {...form.getInputProps('internal_notes')}
      />
      <Button type="submit" fullWidth mt="xl" loading={isLoading}>
        Simpan Perubahan
      </Button>
    </form>
  );
}

export default ManagementForm;
