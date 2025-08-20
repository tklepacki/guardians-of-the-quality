/**
 * @class Boss
 * @description Represents a bug (enemy) in the quality realm
 */
class Boss {
  /**
   * @constructor
   * @param {Object} bossData - The boss data
   * @param {string} bossData.id - Unique identifier for the boss
   * @param {string} bossData.title - Title of the boss (bug)
   * @param {string} bossData.severity - Severity of the boss (low, medium, high, critical)
   * @param {string} bossData.status - Status of the boss (new, in-progress, resolved, etc.)
   * @param {string} bossData.createdAt - ISO date string of when the boss was created
   */
  constructor({ id, title, severity = 'medium', status = 'new', createdAt = new Date().toISOString() }) {
    this.id = id || `b-${Date.now()}`;
    this.title = title;
    this.severity = severity;
    this.status = status;
    this.createdAt = createdAt;
  }

  /**
   * @method validate
   * @description Validates the boss data
   * @returns {boolean} Whether the boss data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.title) {
      throw new Error('Boss title is required');
    }
    
    if (!['low', 'medium', 'high', 'critical'].includes(this.severity)) {
      throw new Error('Boss severity must be low, medium, high, or critical');
    }

    if (!['new', 'in-progress', 'resolved', 'wont-fix'].includes(this.status)) {
      throw new Error('Boss status must be new, in-progress, resolved, or wont-fix');
    }

    return true;
  }

  /**
   * @method toJSON
   * @description Converts the boss instance to a plain object
   * @returns {Object} The boss as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      severity: this.severity,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

export default Boss;
