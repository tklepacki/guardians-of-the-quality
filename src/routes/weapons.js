import express from "express";
const router = express.Router();

let weapons = [
  { id: "w-1", name: "Login test", type: "e2e", createdAt: new Date().toISOString(), lastRunAt: null }
];

/**
 * @swagger
 * tags:
 *   name: Weapons
 *   description: Single test cases (weapons of Guardians)
 */

/**
 * @swagger
 * /weapons:
 *   get:
 *     tags: [Weapons]
 *     summary: Get all weapons
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(weapons));

/**
 * @swagger
 * /weapons/{id}:
 *   get:
 *     tags: [Weapons]
 *     summary: Get a weapon by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const weapon = weapons.find(w => w.id === req.params.id);
  if (!weapon) return res.status(404).json({ message: "Weapon not found" });
  res.json(weapon);
});

/**
 * @swagger
 * /weapons:
 *   post:
 *     tags: [Weapons]
 *     summary: Create a new weapon (test case)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               type: { type: string, example: e2e }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const weapon = {
    id: `w-${Date.now()}`,
    name: req.body.name,
    type: req.body.type || "generic",
    createdAt: new Date().toISOString(),
    lastRunAt: null
  };
  weapons.push(weapon);
  res.status(201).json(weapon);
});

/**
 * @swagger
 * /weapons/{id}:
 *   patch:
 *     tags: [Weapons]
 *     summary: Update a weapon
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               type: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = weapons.findIndex(w => w.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Weapon not found" });
  weapons[idx] = { ...weapons[idx], ...req.body };
  res.json(weapons[idx]);
});

/**
 * @swagger
 * /weapons/{id}:
 *   delete:
 *     tags: [Weapons]
 *     summary: Delete a weapon
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       204: { description: Deleted }
 */
router.delete("/:id", (req, res) => {
  weapons = weapons.filter(w => w.id !== req.params.id);
  res.status(204).end();
});

/**
 * @swagger
 * /weapons/{id}/run:
 *   post:
 *     tags: [Weapons]
 *     summary: Execute a weapon (single test)
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               target: { type: string, description: "Environment or service" }
 *     responses:
 *       202: { description: Execution started }
 */
router.post("/:id/run", (req, res) => {
  const weapon = weapons.find(w => w.id === req.params.id);
  if (!weapon) return res.status(404).json({ message: "Weapon not found" });
  weapon.lastRunAt = new Date().toISOString();
  const execution = { executionId: `x-${Date.now()}`, status: "running", weaponId: weapon.id, target: req.body?.target || "default" };
  res.status(202).json(execution);
});

export default router;
