import express from "express";
const router = express.Router();

let campaigns = [
  { id: "c-1", name: "Nightly run", schedule: "0 2 * * *", createdAt: new Date().toISOString(), lastTriggeredAt: null }
];

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Test run campaigns (CI/CD executions)
 */

/**
 * @swagger
 * /campaigns:
 *   get:
 *     tags: [Campaigns]
 *     summary: Get all campaigns
 *     responses:
 *       200: { description: OK }
 */
router.get("/", (req, res) => res.json(campaigns));

/**
 * @swagger
 * /campaigns/{id}:
 *   get:
 *     tags: [Campaigns]
 *     summary: Get a campaign by ID
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.get("/:id", (req, res) => {
  const item = campaigns.find(c => c.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Campaign not found" });
  res.json(item);
});

/**
 * @swagger
 * /campaigns:
 *   post:
 *     tags: [Campaigns]
 *     summary: Create a campaign definition
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               schedule: { type: string, description: Cron expression }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", (req, res) => {
  const item = {
    id: `c-${Date.now()}`,
    name: req.body.name,
    schedule: req.body.schedule || null,
    createdAt: new Date().toISOString(),
    lastTriggeredAt: null
  };
  campaigns.push(item);
  res.status(201).json(item);
});

/**
 * @swagger
 * /campaigns/{id}:
 *   patch:
 *     tags: [Campaigns]
 *     summary: Update a campaign
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               schedule: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 */
router.patch("/:id", (req, res) => {
  const idx = campaigns.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Campaign not found" });
  campaigns[idx] = { ...campaigns[idx], ...req.body };
  res.json(campaigns[idx]);
});

/**
 * @swagger
 * /campaigns/{id}/run:
 *   post:
 *     tags: [Campaigns]
 *     summary: Trigger campaign run
 *     parameters: [{ in: path, name: id, required: true, schema: { type: string } }]
 *     responses:
 *       202: { description: Accepted }
 */
router.post("/:id/run", (req, res) => {
  const idx = campaigns.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Campaign not found" });
  campaigns[idx].lastTriggeredAt = new Date().toISOString();
  res.status(202).json({ message: "Triggered", campaign: campaigns[idx] });
});

export default router;
