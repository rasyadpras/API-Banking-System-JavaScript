require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./routes/route");
const { errorHandler } = require("./middlewares/error-handling");
const { initSuperAdmin } = require("./services/init-superadmin");

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.use(errorHandler);

async function startServer() {
    await initSuperAdmin();
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}

startServer().catch((e) => {
    console.error("Failed to initialize the application:", e);
    process.exit(1);
});
