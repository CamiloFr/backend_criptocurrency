import app from ".";

// port
const port = 1000;

// server online
const server = app.listen(port, () => {
  console.log(`SERVER ON PORT ${port}`);
});

export default server;
