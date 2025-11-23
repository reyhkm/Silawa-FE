import apiClient from './client';
import { AdminReportListItem, PublicReport, Report } from '../types';

export const verifyAdminLogin = async ({ username, password }: {username: string, password: string}): Promise<{ success: boolean }> => {
  const basicAuthHeader = `Basic ${btoa(`${username}:${password}`)}`;
  
  const response = await apiClient.get('/admin/auth/verify', {
    headers: {
      Authorization: basicAuthHeader,
    },
  });
  return response.data;
};

export const createReport = async (data: FormData): Promise<{ success: boolean; ticket_id: string }> => {
  const response = await apiClient.post('/reports', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getReportByTicketId = async (ticketId: string): Promise<PublicReport> => {
  const response = await apiClient.get(`/reports/${ticketId}`);
  return response.data.data;
};

export const getAllAdminReports = async (): Promise<AdminReportListItem[]> => {
  const response = await apiClient.get('/admin/reports');
  return response.data.data;
};

export const getReportDetail = async (id: string): Promise<Report> => {
  const response = await apiClient.get(`/admin/reports/${id}`);
  return response.data.data;
};

export const updateReport = async ({ id, data }: { id: string; data: Partial<Report> }): Promise<{ success: boolean }> => {
  const response = await apiClient.put(`/admin/reports/${id}`, data);
  return response.data;
};

export const getProtectedImage = async (key: string): Promise<string> => {
  const response = await apiClient.get(`/admin/reports/photo/${key}`, {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
};