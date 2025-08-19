import express from "express";
const router = express.Router();

let bosses = [
  { id: "b-1", title: "Intermittent 500 on checkout", status: "new", severity: "high", createdAt: new Date().toISOString() }
];

/**
 * @swagger
 * tags:
 *   name: Bosses
 *   description: Enemy bugs attacking the Guilds
 */

/**
 * @swagger
 * /bosses:
 *   get:
 *     tags: [Bosses]
 *     summary: Get all bosses
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(bosses));

/**
 * @swagger
 * /bosses/{id}:
 *   get:
 *     tags: [Bosses]
 *     summary: Get a boss by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = bosses.find(b => b.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Boss not found" });
  res.json(item);
});

/**
 * @swagger
 * /bosses:
 *   post:
 *     tags: [Bosses]
 *     summary: Create a boss (bug)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               severity: { type: string, enum: [low, medium, high, critical] }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `b-${Date.now()}`,
    title: req.body.title,
    severity: req.body.severity || "medium",
    status: "new",
    createdAt: new Date().toISOString()
  };
  bosses.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /bosses/{id}:
 *   patch:
 *     tags: [Bosses]
 *     summary: Update a boss
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               severity: { type: string }
 *               status: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = bosses.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Boss not found" });
  bosses[idx] = { ...bosses[idx], ...req.body };
  res.json(bosses[idx]);
});

/**
 * @swagger
 * /bosses/{id}/status:
 *   post:
 *     tags: [Bosses]
 *     summary: Change boss status
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [new, triage, in_progress, verified, slain] }
 *     responses:
 *       200: { description: OK }
 */
router.post("/:id/status", (req, res) => {
  const idx = bosses.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Boss not found" });
  bosses[idx].status = req.body.status;
  res.json(bosses[idx]);
});

export default router;
