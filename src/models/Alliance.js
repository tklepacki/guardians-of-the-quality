/**
 * @class Alliance
 * @description Represents an alliance between guilds
 */
class Alliance {
  /**
   * @constructor
   * @param {Object} allianceData - The alliance data
   * @param {string} allianceData.id - Unique identifier for the alliance
   * @param {string} allianceData.name - Name of the alliance
   * @param {string|null} allianceData.purpose - Purpose of the alliance
   * @param {Array<string>} allianceData.guildIds - IDs of the guilds in the alliance
   * @param {string} allianceData.createdAt - ISO date string of when the alliance was created
   */
  constructor({
    id,
    name,
    purpose = null,
    guildIds = [],
    createdAt = new Date().toISOString()
  }) {
    this.id = id || `al-${Date.now()}`;
    this.name = name;
    this.purpose = purpose;
    this.guildIds = guildIds;
    this.createdAt = createdAt;
  }

  /**
   * @method validate
   * @description Validates the alliance data
   * @returns {boolean} Whether the alliance data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Alliance name is required');
    }
    
    if (!Array.isArray(this.guildIds)) {
      throw new Error('Alliance guildIds must be an array');
    }

    return true;
  }

  /**
   * @method addGuild
   * @description Adds a guild to the alliance
   * @param {string} guildId - The ID of the guild to add
   * @returns {boolean} Whether the guild was added
   */
  addGuild(guildId) {
    if (!this.guildIds.includes(guildId)) {
      this.guildIds.push(guildId);
      return true;
    }
    return false;
  }

  /**
   * @method removeGuild
   * @description Removes a guild from the alliance
   * @param {string} guildId - The ID of the guild to remove
   * @returns {boolean} Whether the guild was removed
   */
  removeGuild(guildId) {
    const index = this.guildIds.indexOf(guildId);
    if (index !== -1) {
      this.guildIds.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * @method toJSON
   * @description Converts the alliance instance to a plain object
   * @returns {Object} The alliance as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      purpose: this.purpose,
      guildIds: this.guildIds,
      createdAt: this.createdAt
    };
  }
}

export default Alliance;
