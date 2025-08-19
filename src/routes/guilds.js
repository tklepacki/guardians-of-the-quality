import express from "express";
const router = express.Router();

let guilds = [
  { id: "g-1", name: "Krakow Guild", motto: "Knowledge and Steel", createdAt: new Date().toISOString() }
];

/**
 * @swagger
 * tags:
 *   name: Guilds
 *   description: Guilds of Quality Guardians
 */

/**
 * @swagger
 * /guilds:
 *   get:
 *     tags: [Guilds]
 *     summary: Get all guilds
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", (req, res) => res.json(guilds));

/**
 * @swagger
 * /guilds/{id}:
 *   get:
 *     tags: [Guilds]
 *     summary: Get a guild by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const guild = guilds.find(g => g.id === req.params.id);
  if (!guild) return res.status(404).json({ message: "Guild not found" });
  res.json(guild);
});

/**
 * @swagger
 * /guilds:
 *   post:
 *     tags: [Guilds]
 *     summary: Create a new guild
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               motto: { type: string }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const guild = {
    id: `g-${Date.now()}`,
    name: req.body.name,
    motto: req.body.motto,
    createdAt: new Date().toISOString()
  };
  guilds.push(guild);
  res.status(201).json(guild);
});

export default router;
