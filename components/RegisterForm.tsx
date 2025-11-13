import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

interface RegisterFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { email: string; password: string; confirm: string }) => {
    onSubmit(values.email, values.password);
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      className="w-full max-w-xs mx-auto mt-20 p-6 bg-white rounded shadow"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Por favor ingresa tu email' },
          { type: 'email', message: 'Email no válido' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar Contraseña"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: 'Confirma tu contraseña' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirmar contraseña" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};