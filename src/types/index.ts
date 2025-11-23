export type ReportStatus = 'Diterima' | 'Diproses' | 'Selesai';
export type ReportCategory = 'Belum Dikategorikan' | 'Infrastruktur' | 'Kebersihan' | 'Keamanan' | 'Sosial';
export type ReportPriority = 'Normal' | 'Rendah' | 'Tinggi' | 'Mendesak';

export interface Report {
    id: string;
    ticket_id: string;
    reporter_name: string;
    reporter_contact: string;
    title: string;
    description: string;
    location: string;
    photo_key?: string;
    status: ReportStatus;
    category: ReportCategory;
    priority: ReportPriority;
    internal_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface PublicReport {
    title: string;
    status: ReportStatus;
    created_at: string;
    description: string;
    photo_key?: string;
}

export interface AdminReportListItem {
    id: string;
    ticket_id: string;
    title: string;
    status: ReportStatus;
    category: ReportCategory;
    priority: ReportPriority;
    created_at: string;
}
