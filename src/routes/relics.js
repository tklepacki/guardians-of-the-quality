import express from "express";
const router = express.Router();

let relics = [
  { id: "r-1", type: "report", name: "Battle report bt-1", battleId: "bt-1", createdAt: new Date().toISOString(), url: null }
];

/**
 * @swagger
 * tags:
 *   name: Relics
 *   description: Artifacts and battle relics (reports, logs, screenshots)
 */

/**
 * @swagger
 * /relics:
 *   get:
 *     tags: [Relics]
 *     summary: Get all relics
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(relics));

/**
 * @swagger
 * /relics/{id}:
 *   get:
 *     tags: [Relics]
 *     summary: Get relic by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = relics.find(r => r.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Relic not found" });
  res.json(item);
});

/**
 * @swagger
 * /relics:
 *   post:
 *     tags: [Relics]
 *     summary: Create a relic metadata record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type: { type: string, enum: [report, log, screenshot] }
 *               name: { type: string }
 *               battleId: { type: string }
 *               url: { type: string }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `r-${Date.now()}`,
    type: req.body.type || "report",
    name: req.body.name,
    battleId: req.body.battleId || null,
    url: req.body.url || null,
    createdAt: new Date().toISOString()
  };
  relics.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /relics/{id}:
 *   delete:
 *     tags: [Relics]
 *     summary: Delete a relic
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       204: { description: Deleted }
 */
router.delete("/:id", (req, res) => {
  relics = relics.filter(r => r.id !== req.params.id);
  res.status(204).end();
});

export default router;
