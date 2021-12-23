import app from ".";

// port
const port = process.env.PORT || 3000;

// server online
const server = app.listen(port, () => {
  console.log(`SERVER ON PORT ${port}`);
});

export default server;
