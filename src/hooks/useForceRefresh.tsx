import { useEffect, useRef, useState } from 'react';
import { useSocket } from './useSocket';

const UPDATE_DELAY = 7;

export function useForceRefreshReload() {
  const socket = useSocket();
  const [visible, setVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(UPDATE_DELAY);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleForceRefresh = () => {
      // evita múltiplos updates simultâneos
      if (visible) return;

      setVisible(true);
      setSecondsLeft(UPDATE_DELAY);

      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        setSecondsLeft(UPDATE_DELAY);

        if ('caches' in window) {
          caches.keys().then((keys) => {
            keys.forEach((key) => caches.delete(key));
          });
        }

        window.location.replace(window.location.href);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, UPDATE_DELAY * 1000);
    };

    socket.on('force-refresh', handleForceRefresh);

    return () => {
      socket.off('force-refresh', handleForceRefresh);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [socket]);

  return {
    visible,
    secondsLeft,
  };
}
