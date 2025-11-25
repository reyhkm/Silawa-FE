import { Container, Title, Paper, Text, SimpleGrid, ThemeIcon, List, rem, Box, Stack } from '@mantine/core';
// PERBAIKAN: Menghapus IconEar dan IconDeviceLaptop yang tidak terpakai
import { IconCheck, IconShieldCheck, IconRocket, IconSpeakerphone } from '@tabler/icons-react';
import ReportForm from '../components/forms/ReportForm';

// Komponen untuk fitur/keunggulan
function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Box>
      <ThemeIcon variant="light" size={40} radius={40} color="brandBlue">
        {icon}
      </ThemeIcon>
      <Text mt="sm" mb={7} fw={600} c="brandBlue.9">
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </Box>
  );
}

function HomePage() {
  return (
    <Box>
      {/* BAGIAN HERO (ATAS) */}
      <Box bg="brandBlue.0" py={60} style={{ borderBottom: '1px solid #e9ecef' }}>
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={50} verticalSpacing={50}>
            
            {/* KOLOM KIRI: Teks & Persuasi */}
            <Stack justify="center">
              <Title order={1} c="brandBlue.9" style={{ fontSize: rem(42), lineHeight: 1.2 }}>
                Layanan Aspirasi dan Pengaduan Online Warga
              </Title>
              <Text c="dimmed" size="lg" mt="md">
                Berani lapor untuk pelayanan publik yang lebih baik.
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="md"
                icon={
                  <ThemeIcon size={24} radius="xl" color="brandBlue">
                    <IconCheck style={{ width: rem(14), height: rem(14) }} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text span fw={600} c="brandBlue.9">Mudah & Cepat</Text> – Lapor kapan saja dan di mana saja.
                </List.Item>
                <List.Item>
                  <Text span fw={600} c="brandBlue.9">Transparan</Text> – Pantau status tindak lanjut laporan Anda.
                </List.Item>
                <List.Item>
                  <Text span fw={600} c="brandBlue.9">Terjamin</Text> – Identitas pelapor aman dan terlindungi.
                </List.Item>
              </List>
            </Stack>

            {/* KOLOM KANAN: Form Laporan */}
            <Paper p="xl" radius="md" shadow="lg" withBorder style={{ backgroundColor: 'white' }}>
              <Title order={3} mb="lg" c="brandBlue.9">
                Formulir Laporan Baru
              </Title>
              <ReportForm />
            </Paper>

          </SimpleGrid>
        </Container>
      </Box>

      {/* BAGIAN ALUR / FITUR (BAWAH) */}
      <Container size="lg" py={80}>
        <Title order={2} ta="center" mb="xl" c="brandBlue.9">
          Bagaimana Alur Pengaduan?
        </Title>
        <Text c="dimmed" ta="center" maw={600} mx="auto" mb={50}>
          Proses pengaduan di SILAWA dirancang sesederhana mungkin agar aspirasi Anda segera tersampaikan dan ditindaklanjuti.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
          <Feature
            icon={<IconSpeakerphone style={{ width: rem(24), height: rem(24) }} />}
            title="1. Tulis Laporan"
            description="Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap. Sertakan foto bukti pendukung agar laporan lebih valid."
          />
          <Feature
            icon={<IconShieldCheck style={{ width: rem(24), height: rem(24) }} />}
            title="2. Verifikasi & Proses"
            description="Laporan Anda akan diverifikasi oleh admin dan diteruskan ke instansi terkait untuk segera ditindaklanjuti."
          />
          <Feature
            icon={<IconRocket style={{ width: rem(24), height: rem(24) }} />}
            title="3. Selesai & Transparan"
            description="Anda dapat melacak progres laporan hingga selesai. Kami menjamin transparansi dalam setiap langkah penyelesaian."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default HomePage;
