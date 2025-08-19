import express from "express";
const router = express.Router();

let alliances = [
  {
    id: "al-1",
    name: "Northern Pact",
    purpose: "Share test infrastructure and reports",
    guildIds: ["g-1"],
    createdAt: new Date().toISOString()
  }
];

/**
 * @swagger
 * tags:
 *   name: Alliances
 *   description: Alliances between Guilds
 */

/**
 * @swagger
 * /alliances:
 *   get:
 *     tags: [Alliances]
 *     summary: Get all alliances
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(alliances));

/**
 * @swagger
 * /alliances/{id}:
 *   get:
 *     tags: [Alliances]
 *     summary: Get an alliance by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = alliances.find(a => a.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Alliance not found" });
  res.json(item);
});

/**
 * @swagger
 * /alliances:
 *   post:
 *     tags: [Alliances]
 *     summary: Create a new alliance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               purpose: { type: string }
 *               guildIds: { type: array, items: { type: string } }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `al-${Date.now()}`,
    name: req.body.name,
    purpose: req.body.purpose || null,
    guildIds: Array.isArray(req.body.guildIds) ? req.body.guildIds : [],
    createdAt: new Date().toISOString()
  };
  alliances.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /alliances/{id}:
 *   patch:
 *     tags: [Alliances]
 *     summary: Update an alliance
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               purpose: { type: string }
 *               guildIds: { type: array, items: { type: string } }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = alliances.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Alliance not found" });
  const payload = { ...req.body };
  if (payload.guildIds && !Array.isArray(payload.guildIds)) payload.guildIds = [];
  alliances[idx] = { ...alliances[idx], ...payload };
  res.json(alliances[idx]);
});

/**
 * @swagger
 * /alliances/{id}/members:
 *   post:
 *     tags: [Alliances]
 *     summary: Add a guild to an alliance
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [guildId]
 *             properties:
 *               guildId: { type: string }
 *     responses:
 *       201: { description: Added }
 */
router.post("/:id/members", (req, res) => {
  const idx = alliances.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Alliance not found" });
  const { guildId } = req.body || {};
  if (!guildId) return res.status(400).json({ message: "guildId is required" });
  if (!alliances[idx].guildIds.includes(guildId)) alliances[idx].guildIds.push(guildId);
  res.status(201).json(alliances[idx]);
});

/**
 * @swagger
 * /alliances/{id}/members/{guildId}:
 *   delete:
 *     tags: [Alliances]
 *     summary: Remove a guild from an alliance
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *       - { in: path, name: guildId, required: true, schema: { type: string } }
 *     responses:
 *       204: { description: Removed }
 *       404: { description: Not found }
 */
router.delete("/:id/members/:guildId", (req, res) => {
  const idx = alliances.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Alliance not found" });
  alliances[idx].guildIds = alliances[idx].guildIds.filter(g => g !== req.params.guildId);
  res.status(204).end();
});

/**
 * @swagger
 * /alliances/{id}:
 *   delete:
 *     tags: [Alliances]
 *     summary: Delete an alliance
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       204: { description: Deleted }
 */
router.delete("/:id", (req, res) => {
  alliances = alliances.filter(a => a.id !== req.params.id);
  res.status(204).end();
});

export default router;
