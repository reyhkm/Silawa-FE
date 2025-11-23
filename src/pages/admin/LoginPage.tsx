import { Container, Title, Paper, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { verifyAdminLogin } from '../../api/reports';
import { notifications } from '@mantine/notifications';

function LoginPage() {
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length > 0 ? null : 'Username tidak boleh kosong'),
      password: (value) => (value.length > 0 ? null : 'Password tidak boleh kosong'),
    },
  });

  const mutation = useMutation({
    mutationFn: verifyAdminLogin,
    onSuccess: (_data, variables) => {
      // Jika verifikasi berhasil, panggil fungsi login dari useAuth
      // untuk menyimpan kredensial dan melakukan navigasi.
      login(variables.username, variables.password);
    },
    onError: () => {
      // Jika verifikasi gagal, tampilkan notifikasi error.
      notifications.show({
        title: 'Login Gagal',
        message: 'Username atau password yang Anda masukkan salah.',
        color: 'red',
      });
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Panggil mutasi dengan data dari form
    mutation.mutate(values);
  };

  return (
    <Container size="xs" my={100}>
      <Title ta="center">Admin Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Username Anda"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password Anda"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl" loading={mutation.isPending}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;