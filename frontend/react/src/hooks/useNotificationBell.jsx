import { useState, useEffect, useRef } from "react";
import notificationSound from "@/assets/notification.mp3";

export function useNotificationBell() {
  const [count, setCount] = useState(0);
  const audio = useRef(new Audio(notificationSound));

  useEffect(() => {
    const source = new EventSource("http://localhost:5000/api/notificacoes/stream");

    source.onmessage = (event) => {
      setCount((prev) => prev + 1);
      audio.current.play().catch(() => {}); 
      console.log("Notificacao!")
    };

    source.onerror = () => {
      console.log("Conexao SSE perdida. Tentando novamente...");
      source.close();
      setTimeout(() => {
        new EventSource("http://localhost:5000/api/notificacoes/stream");
      }, 2000);
    };

    return () => source.close();
  }, []);

  return { count, setCount};
}
