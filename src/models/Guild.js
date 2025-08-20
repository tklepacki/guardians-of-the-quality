/**
 * @class Guild
 * @description Represents a guild of quality guardians
 */
class Guild {
  /**
   * @constructor
   * @param {Object} guildData - The guild data
   * @param {string} guildData.id - Unique identifier for the guild
   * @param {string} guildData.name - Name of the guild
   * @param {string} guildData.motto - Motto of the guild
   * @param {string} guildData.createdAt - ISO date string of when the guild was created
   */
  constructor({ id, name, motto, createdAt = new Date().toISOString() }) {
    this.id = id || `g-${Date.now()}`;
    this.name = name;
    this.motto = motto;
    this.createdAt = createdAt;
  }

  /**
   * @method validate
   * @description Validates the guild data
   * @returns {boolean} Whether the guild data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Guild name is required');
    }
    
    return true;
  }

  /**
   * @method toJSON
   * @description Converts the guild instance to a plain object
   * @returns {Object} The guild as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      motto: this.motto,
      createdAt: this.createdAt
    };
  }
}

export default Guild;
