import React, { useState, useEffect } from "react";

function Streaming() {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.15.24:8000/video");
    ws.binaryType = "arraybuffer";

    ws.onmessage = (event) => {
      const bytes = new Uint8Array(event.data);
      const blob = new Blob([bytes], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImgUrl(url);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <img src={imgUrl} style={{ width: "640px", border: "1px solid black" }} />
    </div>
  );
}

export default Streaming;
