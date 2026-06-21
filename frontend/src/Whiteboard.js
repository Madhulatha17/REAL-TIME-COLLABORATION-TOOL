import React, { useRef, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Whiteboard() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let drawing = false;

    const startDraw = (e) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e) => {

      if (!drawing) return;

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      socket.emit("draw", {
        x: e.offsetX,
        y: e.offsetY
      });
    };

    const stopDraw = () => {
      drawing = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);

    socket.on("draw", (data) => {

      ctx.lineTo(data.x, data.y);
      ctx.stroke();

    });

  }, []);

  const clearBoard = () => {

    const canvas = canvasRef.current;

    canvas
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);

    socket.emit("clearBoard");
  };

  socket.on("clearBoard", () => {

    const canvas = canvasRef.current;

    canvas
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);

  });

  return (
    <>
      <canvas
        ref={canvasRef}
        width="900"
        height="500"
        className="board"
      />

      <br />

      <button onClick={clearBoard}>
        Clear Board
      </button>
    </>
  );
}

export default Whiteboard;
