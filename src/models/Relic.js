/**
 * @class Relic
 * @description Represents an artifact or battle relic (report, log, screenshot)
 */
class Relic {
  /**
   * @constructor
   * @param {Object} relicData - The relic data
   * @param {string} relicData.id - Unique identifier for the relic
   * @param {string} relicData.type - Type of the relic (report, log, screenshot)
   * @param {string} relicData.name - Name of the relic
   * @param {string|null} relicData.battleId - ID of the battle associated with the relic
   * @param {string|null} relicData.url - URL to the relic resource
   * @param {string} relicData.createdAt - ISO date string of when the relic was created
   */
  constructor({
    id,
    type = 'report',
    name,
    battleId = null,
    url = null,
    createdAt = new Date().toISOString()
  }) {
    this.id = id || `r-${Date.now()}`;
    this.type = type;
    this.name = name;
    this.battleId = battleId;
    this.url = url;
    this.createdAt = createdAt;
  }

  /**
   * @method validate
   * @description Validates the relic data
   * @returns {boolean} Whether the relic data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Relic name is required');
    }
    
    if (!['report', 'log', 'screenshot'].includes(this.type)) {
      throw new Error('Relic type must be report, log, or screenshot');
    }

    return true;
  }

  /**
   * @method setUrl
   * @description Sets the URL for the relic
   * @param {string} url - The URL to set
   * @returns {Relic} The updated relic instance
   */
  setUrl(url) {
    this.url = url;
    return this;
  }

  /**
   * @method toJSON
   * @description Converts the relic instance to a plain object
   * @returns {Object} The relic as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      battleId: this.battleId,
      url: this.url,
      createdAt: this.createdAt
    };
  }
}

export default Relic;
