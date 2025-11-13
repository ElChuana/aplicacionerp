import { notification } from 'antd';

export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errMsg = await res.text();
      throw new Error(errMsg || 'Error al obtener datos');
    }

    return res.json();
  } catch (error: any) {
    notification.error({
      message: 'Error de conexión',
      description: error.message,
    });
    throw error;
  }
};
