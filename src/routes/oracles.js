import express from "express";
const router = express.Router();

let oracles = [
  { id: "o-1", target: "staging", kind: "security", createdAt: new Date().toISOString(), prophecy: "All green." }
];

/**
 * @swagger
 * tags:
 *   name: Oracles
 *   description: AI scans and prophecies
 */

/**
 * @swagger
 * /oracles:
 *   get:
 *     tags: [Oracles]
 *     summary: Get all oracles (scans)
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(oracles));

/**
 * @swagger
 * /oracles/{id}:
 *   get:
 *     tags: [Oracles]
 *     summary: Get oracle by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = oracles.find(o => o.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Oracle not found" });
  res.json(item);
});

/**
 * @swagger
 * /oracles:
 *   post:
 *     tags: [Oracles]
 *     summary: Create a new AI scan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               target: { type: string }
 *               kind: { type: string, example: security }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `o-${Date.now()}`,
    target: req.body.target || "unknown",
    kind: req.body.kind || "generic",
    createdAt: new Date().toISOString(),
    prophecy: "Scan scheduled..."
  };
  oracles.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /oracles/{id}/predict:
 *   post:
 *     tags: [Oracles]
 *     summary: Generate prophecy for a scan
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 */
router.post("/:id/predict", (req, res) => {
  const idx = oracles.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Oracle not found" });
  oracles[idx].prophecy = `Omens suggest ${["success", "turmoil", "caution"].sort(() => 0.5 - Math.random())[0]}.`;
  res.json(oracles[idx]);
});

export default router;
