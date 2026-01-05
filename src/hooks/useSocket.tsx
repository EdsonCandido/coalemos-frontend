import { socket } from '@/libs/socket';
import { useEffect } from 'react';

export function useSocket() {
  useEffect(() => {
    const onConnect = () => {
      console.log('Socket conectado com sucesso:', socket.id);
    };

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, []);

  return socket;
}
