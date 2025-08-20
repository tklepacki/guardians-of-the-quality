/**
 * @class Wound
 * @description Represents a wound or injury from a battle (test failure)
 */
class Wound {
  /**
   * @constructor
   * @param {Object} woundData - The wound data
   * @param {string} woundData.id - Unique identifier for the wound
   * @param {string} woundData.guardianId - ID of the guardian who received the wound
   * @param {string} woundData.severity - Severity of the wound (minor, moderate, major, critical)
   * @param {string} woundData.status - Status of the wound (open, healing, healed)
   * @param {string} woundData.description - Description of the wound
   * @param {string|null} woundData.battleId - ID of the battle where the wound was received
   * @param {string|null} woundData.bossId - ID of the boss that caused the wound
   * @param {string|null} woundData.notes - Additional notes about the wound
   * @param {string} woundData.createdAt - ISO date string of when the wound was created
   * @param {string|null} woundData.healedAt - ISO date string of when the wound was healed
   */
  constructor({
    id,
    guardianId,
    severity = 'minor',
    status = 'open',
    description,
    battleId = null,
    bossId = null,
    notes = null,
    createdAt = new Date().toISOString(),
    healedAt = null
  }) {
    this.id = id || `wd-${Date.now()}`;
    this.guardianId = guardianId;
    this.severity = severity;
    this.status = status;
    this.description = description;
    this.battleId = battleId;
    this.bossId = bossId;
    this.notes = notes;
    this.createdAt = createdAt;
    this.healedAt = healedAt;
  }

  /**
   * @method validate
   * @description Validates the wound data
   * @returns {boolean} Whether the wound data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.guardianId) {
      throw new Error('Wound guardianId is required');
    }

    if (!this.description) {
      throw new Error('Wound description is required');
    }
    
    if (!['minor', 'moderate', 'major', 'critical'].includes(this.severity)) {
      throw new Error('Wound severity must be minor, moderate, major, or critical');
    }

    if (!['open', 'healing', 'healed'].includes(this.status)) {
      throw new Error('Wound status must be open, healing, or healed');
    }

    return true;
  }

  /**
   * @method heal
   * @description Marks the wound as healed
   * @returns {Wound} The updated wound instance
   */
  heal() {
    this.status = 'healed';
    this.healedAt = new Date().toISOString();
    return this;
  }

  /**
   * @method toJSON
   * @description Converts the wound instance to a plain object
   * @returns {Object} The wound as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      guardianId: this.guardianId,
      severity: this.severity,
      status: this.status,
      description: this.description,
      battleId: this.battleId,
      bossId: this.bossId,
      notes: this.notes,
      createdAt: this.createdAt,
      healedAt: this.healedAt
    };
  }
}

export default Wound;
