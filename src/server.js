import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

// Import routes
import guilds from "./routes/guilds.js";
import guardians from "./routes/guardians.js";
import bosses from "./routes/bosses.js";
import arsenals from "./routes/arsenals.js";
import weapons from "./routes/weapons.js";
import campaigns from "./routes/campaigns.js";
import wounds from "./routes/wounds.js";
import battles from "./routes/battles.js";
import oracles from "./routes/oracles.js";
import relics from "./routes/relics.js";
import alliances from "./routes/alliances.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Routes
app.use("/api/v1/guilds", guilds);
app.use("/api/v1/guardians", guardians);
app.use("/api/v1/bosses", bosses);
app.use("/api/v1/arsenals", arsenals);
app.use("/api/v1/weapons", weapons);
app.use("/api/v1/campaigns", campaigns);
app.use("/api/v1/wounds", wounds);
app.use("/api/v1/battles", battles);
app.use("/api/v1/oracles", oracles);
app.use("/api/v1/relics", relics);
app.use("/api/v1/alliances", alliances);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`⚔️ API running on http://localhost:${PORT}`);
  console.log(`📜 Swagger docs: http://localhost:${PORT}/docs`);
});
