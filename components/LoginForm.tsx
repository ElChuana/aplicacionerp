import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormProps { onSubmit: (email: string, password: string) => void; }
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => onSubmit(values.email, values.password);
  return (
    <Form form={form} name="login" onFinish={onFinish} layout="vertical" className="w-full max-w-xs mx-auto mt-20 p-6 bg-white rounded shadow">
      <Form.Item name="email" label="Email" rules={[{required:true},{type:'email'}]}>
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" label="Contraseña" rules={[{required:true}]}>  
        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
      </Form.Item>
      <Form.Item><Button type="primary" htmlType="submit" block>Iniciar Sesión</Button></Form.Item>
    </Form>
  );
};