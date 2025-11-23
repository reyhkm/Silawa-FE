import { Badge } from '@mantine/core';
import { ReportStatus } from '../../types';

interface StatusBadgeProps {
  status: ReportStatus;
}

const statusColors: Record<ReportStatus, string> = {
  'Diterima': 'gray',
  'Diproses': 'blue',
  'Selesai': 'green',
};

function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge color={statusColors[status]}>{status}</Badge>;
}

export default StatusBadge;
