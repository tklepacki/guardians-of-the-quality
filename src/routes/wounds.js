import express from "express";
const router = express.Router();

let wounds = [
  { id: "wd-1", guardianId: "u-1", severity: "minor", status: "open", description: "Flaky test fatigue", battleId: "bt-1", createdAt: new Date().toISOString(), healedAt: null, notes: null }
];

/**
 * @swagger
 * tags:
 *   name: Wounds
 *   description: Wounds and injuries from battles (test failures/incidents)
 */

/**
 * @swagger
 * /wounds:
 *   get:
 *     tags: [Wounds]
 *     summary: Get all wounds
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(wounds));

/**
 * @swagger
 * /wounds/{id}:
 *   get:
 *     tags: [Wounds]
 *     summary: Get a wound by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = wounds.find(w => w.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Wound not found" });
  res.json(item);
});

/**
 * @swagger
 * /wounds:
 *   post:
 *     tags: [Wounds]
 *     summary: Report a new wound
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [guardianId, severity, description]
 *             properties:
 *               guardianId: { type: string }
 *               severity: { type: string, enum: [minor, moderate, major, critical] }
 *               description: { type: string }
 *               battleId: { type: string }
 *               bossId: { type: string }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `wd-${Date.now()}`,
    guardianId: req.body.guardianId,
    severity: req.body.severity || "minor",
    status: "open",
    description: req.body.description || "",
    battleId: req.body.battleId || null,
    bossId: req.body.bossId || null,
    notes: null,
    createdAt: new Date().toISOString(),
    healedAt: null
  };
  wounds.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /wounds/{id}:
 *   patch:
 *     tags: [Wounds]
 *     summary: Update a wound (severity/status/notes)
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               severity: { type: string }
 *               status: { type: string, enum: [open, healing, healed] }
 *               notes: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = wounds.findIndex(w => w.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Wound not found" });
  wounds[idx] = { ...wounds[idx], ...req.body };
  if (wounds[idx].status === "healed" && !wounds[idx].healedAt) wounds[idx].healedAt = new Date().toISOString();
  res.json(wounds[idx]);
});

/**
 * @swagger
 * /wounds/{id}/heal:
 *   post:
 *     tags: [Wounds]
 *     summary: Mark a wound as healed
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.post("/:id/heal", (req, res) => {
  const idx = wounds.findIndex(w => w.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Wound not found" });
  wounds[idx].status = "healed";
  wounds[idx].healedAt = new Date().toISOString();
  res.json(wounds[idx]);
});

/**
 * @swagger
 * /wounds/{id}:
 *   delete:
 *     tags: [Wounds]
 *     summary: Delete a wound
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       204: { description: Deleted }
 */
router.delete("/:id", (req, res) => {
  wounds = wounds.filter(w => w.id !== req.params.id);
  res.status(204).end();
});

export default router;
