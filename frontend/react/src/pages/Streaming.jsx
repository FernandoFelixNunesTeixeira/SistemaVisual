import React, { useRef, useEffect, useState } from 'react';

const VideoStream = () => {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const [status, setStatus] = useState("Parado");

  const startStream = async () => {
    setStatus("Conectando...");
    
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    pc.ontrack = (event) => {
      if (event.track.kind === 'video' && videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        setStatus("Transmitindo");
      }
    };

    pc.addTransceiver('video', { direction: 'recvonly' });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    try {
        const response = await fetch('http://127.0.0.1:8000/offer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sdp: pc.localDescription.sdp,
                type: pc.localDescription.type
            })
        });

        const answer = await response.json();
        
        await pc.setRemoteDescription(answer);
        
    } catch (error) {
        console.error("Erro na conexão:", error);
        setStatus("Erro ao conectar");
    }
  };

  useEffect(() => {
    return () => {
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Câmera de Sala</h2>
      <p>Status: {status}</p>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        style={{ width: '640px', height: '480px', background: 'black' }} 
      />
      <br />
      <button onClick={startStream}>Iniciar Câmera</button>
    </div>
  );
};

export default VideoStream;