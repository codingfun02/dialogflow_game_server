import "./env";
import "./db";
import app from "./server";

const PORT = process.env.PORT || 3000;

const handleServerListening = () => {
  console.log(`✅ Server Listening at port ${PORT}`);
};

app.listen(PORT, handleServerListening);
