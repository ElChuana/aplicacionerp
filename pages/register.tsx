import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { useRouter } from 'next/router';
import { message, Typography, Card } from 'antd';

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        message.success('Usuario creado');
        router.push('/login');
      } else {
        message.error(data.message || 'Error al crear usuario');
      }
    } catch (err) {
      console.error(err);
      message.error('Error en el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm p-4">
        <Title level={2} className="text-center mb-4">
          Crear Cuenta
        </Title>
        <RegisterForm onSubmit={handleRegister} />
      </Card>
    </div>
  );
};

export default RegisterPage;