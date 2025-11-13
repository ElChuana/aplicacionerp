// components/ProviderForm.tsx
import React from 'react';
import { Form, Input } from 'antd';
import { RutInput } from './RutInput';

export const ProviderForm: React.FC = () => (
  <>
    <Form.Item
      name="name"
      label="Nombre del Proveedor"
      rules={[{ required: true, message: 'Ingresa el nombre del proveedor' }]}
    >
      <Input />
    </Form.Item>

       <Form.Item
    name="rut"
     label="RUT"
     rules={[
       {
         pattern: /^\d{1,3}(\.\d{3})*-[0-9Kk]$/,
         message: 'RUT inválido (ej: 11.111.111-1)',
       },
     ]}
   >
     <RutInput placeholder="11.111.111-1" />
 </Form.Item>

    <Form.Item
      name="address"
      label="Dirección"
      rules={[{ required: false }]}
    >
      <Input />
    </Form.Item>

    {/* Solo campos de contacto */}
    <Form.Item
      name="contact_name"
      label="Nombre de Contacto"
      rules={[{ required: true, message: 'Ingresa el nombre del contacto' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="contact_email"
      label="Email de Contacto"
      rules={[{ 
        required: true, 
        message: 'Ingresa el email del contacto',
        type: 'email'
      }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="contact_phone"
      label="Teléfono de Contacto"
      rules={[{ required: true, message: 'Ingresa el teléfono del contacto' }]}
    >
      <Input />
    </Form.Item>
  </>
);
