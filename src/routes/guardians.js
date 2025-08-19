import express from "express";
const router = express.Router();

let guardians = [
  { id: "u-1", name: "Agnieszka", role: "leader", guildId: "g-1", joinedAt: new Date().toISOString() }
];

/**
 * @swagger
 * tags:
 *   name: Guardians
 *   description: Members of the Guilds
 */

/**
 * @swagger
 * /guardians:
 *   get:
 *     tags: [Guardians]
 *     summary: Get all guardians
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(guardians));

/**
 * @swagger
 * /guardians/{id}:
 *   get:
 *     tags: [Guardians]
 *     summary: Get a guardian by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = guardians.find(g => g.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Guardian not found" });
  res.json(item);
});

/**
 * @swagger
 * /guardians:
 *   post:
 *     tags: [Guardians]
 *     summary: Create a guardian
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               role: { type: string, enum: [leader, tester, scribe] }
 *               guildId: { type: string }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `u-${Date.now()}`,
    name: req.body.name,
    role: req.body.role || "tester",
    guildId: req.body.guildId || null,
    joinedAt: new Date().toISOString()
  };
  guardians.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /guardians/{id}:
 *   patch:
 *     tags: [Guardians]
 *     summary: Update a guardian
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               role: { type: string }
 *               guildId: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = guardians.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Guardian not found" });
  guardians[idx] = { ...guardians[idx], ...req.body };
  res.json(guardians[idx]);
});

/**
 * @swagger
 * /guardians/{id}/assignments:
 *   post:
 *     tags: [Guardians]
 *     summary: Assign guardian to a guild
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [guildId, role]
 *             properties:
 *               guildId: { type: string }
 *               role: { type: string, enum: [leader, tester, scribe] }
 *     responses:
 *       201: { description: Assigned }
 */
router.post("/:id/assignments", (req, res) => {
  const idx = guardians.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Guardian not found" });
  guardians[idx].guildId = req.body.guildId;
  guardians[idx].role = req.body.role || guardians[idx].role;
  res.status(201).json({ message: "Assigned", guardian: guardians[idx] });
});

/**
 * @swagger
 * /guardians/{id}:
 *   delete:
 *     tags: [Guardians]
 *     summary: Delete a guardian
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       204: { description: Deleted }
 */
router.delete("/:id", (req, res) => {
  guardians = guardians.filter(g => g.id !== req.params.id);
  res.status(204).end();
});

export default router;
