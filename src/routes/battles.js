import express from "express";
const router = express.Router();

let battles = [
  { id: "bt-1", guildId: "g-1", bossId: "b-1", arsenalId: "a-1", environment: "staging", startedAt: new Date().toISOString(), outcome: null }
];

/**
 * @swagger
 * tags:
 *   name: Battles
 *   description: Battles between guilds and bosses
 */

/**
 * @swagger
 * /battles:
 *   get:
 *     tags: [Battles]
 *     summary: Get all battles
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(battles));

/**
 * @swagger
 * /battles:
 *   post:
 *     tags: [Battles]
 *     summary: Start a new battle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [guildId, bossId, arsenalId, environment]
 *             properties:
 *               guildId: { type: string }
 *               bossId: { type: string }
 *               arsenalId: { type: string }
 *               environment: { type: string, example: staging }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const battle = {
    id: `bt-${Date.now()}`,
    guildId: req.body.guildId,
    bossId: req.body.bossId,
    arsenalId: req.body.arsenalId,
    environment: req.body.environment || "staging",
    startedAt: new Date().toISOString(),
    outcome: null,
    notes: null
  };
  battles.push(battle);
  res.status(201).json(battle);
});

/**
 * @swagger
 * /battles/{id}:
 *   get:
 *     tags: [Battles]
 *     summary: Get a battle by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const battle = battles.find(b => b.id === req.params.id);
  if (!battle) return res.status(404).json({ message: "Battle not found" });
  res.json(battle);
});

/**
 * @swagger
 * /battles/{id}/resolve:
 *   post:
 *     tags: [Battles]
 *     summary: Resolve a battle (set outcome)
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [outcome]
 *             properties:
 *               outcome: { type: string, enum: [victory, defeat, stalemate] }
 *               notes: { type: string }
 *     responses:
 *       200: { description: OK }
 */
router.post("/:id/resolve", (req, res) => {
  const idx = battles.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Battle not found" });
  battles[idx].outcome = req.body.outcome;
  battles[idx].notes = req.body.notes || null;
  battles[idx].endedAt = new Date().toISOString();
  res.json(battles[idx]);
});

export default router;
