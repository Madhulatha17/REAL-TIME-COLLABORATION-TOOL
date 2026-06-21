module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("draw", (data) => {

      socket.broadcast.emit("draw", data);

    });

    socket.on("clearBoard", () => {

      io.emit("clearBoard");

    });

    socket.on("disconnect", () => {

      console.log("User Disconnected");

    });

  });

};
