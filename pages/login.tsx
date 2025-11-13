import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { useRouter } from 'next/router';
import { message, Typography, Card } from 'antd';
const { Title } = Typography;
const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleLogin = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const data = await res.json();
    if (res.ok) {
      message.success('Bienvenido');
      router.push('/');
    } else {
      message.error(data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-xs p-4">
        <Title level={2} className="text-center mb-4">Iniciar Sesión</Title>
        <LoginForm onSubmit={handleLogin} />
      </Card>
    </div>
  );
};
export default LoginPage;