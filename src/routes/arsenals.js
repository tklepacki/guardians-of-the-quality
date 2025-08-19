import express from "express";
const router = express.Router();

let arsenals = [
  { id: "a-1", name: "Regression Suite", description: "Full regression", createdAt: new Date().toISOString() }
];

/**
 * @swagger
 * tags:
 *   name: Arsenals
 *   description: Collections of weapons (test suites)
 */

/**
 * @swagger
 * /arsenals:
 *   get:
 *     tags: [Arsenals]
 *     summary: Get all arsenals
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(arsenals));

/**
 * @swagger
 * /arsenals/{id}:
 *   get:
 *     tags: [Arsenals]
 *     summary: Get an arsenal by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = arsenals.find(a => a.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Arsenal not found" });
  res.json(item);
});

/**
 * @swagger
 * /arsenals:
 *   post:
 *     tags: [Arsenals]
 *     summary: Create a new arsenal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const arsenal = {
    id: `a-${Date.now()}`,
    name: req.body.name,
    description: req.body.description,
    createdAt: new Date().toISOString()
  };
  arsenals.push(arsenal);
  res.status(201).json(arsenal);
});

/**
 * @swagger
 * /arsenals/{id}:
 *   patch:
 *     tags: [Arsenals]
 *     summary: Update an arsenal
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = arsenals.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Arsenal not found" });
  arsenals[idx] = { ...arsenals[idx], ...req.body };
  res.json(arsenals[idx]);
});

/**
 * @swagger
 * /arsenals/{id}:
 *   delete:
 *     tags: [Arsenals]
 *     summary: Delete an arsenal
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       204: { description: Deleted }
 */
router.delete("/:id", (req, res) => {
  arsenals = arsenals.filter(a => a.id !== req.params.id);
  res.status(204).end();
});

export default router;
