import "./env";
import "./db";
import app from "./server";

const { PORT } = process.env;

const handleServerListening = () => {
  console.log(`✅ Server Listening at port ${PORT}`);
};

app.listen(PORT, handleServerListening);
