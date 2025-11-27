import React, { useRef, useEffect, useState } from 'react';
import './VideoStream.css';

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

    try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

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
        if (pcRef.current) pcRef.current.close();
    }
  };

  useEffect(() => {
    return () => {
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  const getStatusClass = () => {
    if (status === "Transmitindo") return "transmitindo";
    if (status === "Conectando...") return "conectando";
    if (status.includes("Erro")) return "erro";
    return "";
  };

  return (
    <div className="video-stream-container">
      <div className="video-card">
        <div className="video-header">
            <h2>
                <i className="bi bi-camera-video" style={{color: 'var(--primary)'}}></i>
                Monitoramento da Sala
            </h2>
            <div className={`status-badge ${getStatusClass()}`}>
                <span className="status-dot"></span>
                {status}
            </div>
        </div>

        <div className="video-wrapper">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="video-element"
            />
            {status === "Parado" && (
                <div className="video-overlay" style={{background: 'rgba(0,0,0,0.8)', zIndex: 1, color: 'white'}}>
                    <span>Câmera desligada</span>
                </div>
            )}
        </div>

        <div className="control-panel">
            <div className="control-spacer"></div>

            <button 
                className="btn-start" 
                onClick={startStream}
                disabled={status === "Transmitindo" || status === "Conectando..."}
            >
                {status === "Transmitindo" ? (
                    <><i className="bi bi-activity"></i> Ao Vivo</>
                ) : (
                    <><i className="bi bi-play-circle-fill"></i> Iniciar Transmissão</>
                )}
            </button>

            <div className="room-selector-wrapper">
                <i className="bi bi-geo-alt" style={{color: 'var(--text-gray)'}}></i>
                <select className="room-select" defaultValue="1">
                    <option value="1">Sala 1</option>
                    <option value="2">Sala 2</option>
                    <option value="3">Sala 3</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStream;