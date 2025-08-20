/**
 * @class Campaign
 * @description Represents a test campaign (CI/CD executions)
 */
class Campaign {
  /**
   * @constructor
   * @param {Object} campaignData - The campaign data
   * @param {string} campaignData.id - Unique identifier for the campaign
   * @param {string} campaignData.name - Name of the campaign
   * @param {string|null} campaignData.schedule - Cron expression for the campaign schedule
   * @param {string} campaignData.createdAt - ISO date string of when the campaign was created
   * @param {string|null} campaignData.lastTriggeredAt - ISO date string of when the campaign was last triggered
   */
  constructor({ id, name, schedule = null, createdAt = new Date().toISOString(), lastTriggeredAt = null }) {
    this.id = id || `c-${Date.now()}`;
    this.name = name;
    this.schedule = schedule;
    this.createdAt = createdAt;
    this.lastTriggeredAt = lastTriggeredAt;
  }

  /**
   * @method validate
   * @description Validates the campaign data
   * @returns {boolean} Whether the campaign data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Campaign name is required');
    }
    
    // Basic validation for cron schedule format if present
    if (this.schedule) {
      const cronRegex = /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/;
      if (!cronRegex.test(this.schedule)) {
        throw new Error('Invalid cron schedule format');
      }
    }

    return true;
  }

  /**
   * @method updateLastTriggered
   * @description Updates the lastTriggeredAt timestamp to now
   */
  updateLastTriggered() {
    this.lastTriggeredAt = new Date().toISOString();
  }

  /**
   * @method toJSON
   * @description Converts the campaign instance to a plain object
   * @returns {Object} The campaign as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      schedule: this.schedule,
      createdAt: this.createdAt,
      lastTriggeredAt: this.lastTriggeredAt
    };
  }
}

export default Campaign;
