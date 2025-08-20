/**
 * @class Guardian
 * @description Represents a guardian in the quality realm - a member of a guild
 */
class Guardian {
  /**
   * @constructor
   * @param {Object} guardianData - The guardian data
   * @param {string} guardianData.id - Unique identifier for the guardian
   * @param {string} guardianData.name - Name of the guardian
   * @param {string} guardianData.role - Role of the guardian (leader, tester, scribe)
   * @param {string|null} guardianData.guildId - ID of the guild the guardian belongs to
   * @param {string} guardianData.joinedAt - ISO date string of when the guardian joined
   */
  constructor({ id, name, role = 'tester', guildId = null, joinedAt = new Date().toISOString() }) {
    this.id = id || `u-${Date.now()}`;
    this.name = name;
    this.role = role;
    this.guildId = guildId;
    this.joinedAt = joinedAt;
  }

  /**
   * @method validate
   * @description Validates the guardian data
   * @returns {boolean} Whether the guardian data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Guardian name is required');
    }
    
    if (this.role && !['leader', 'tester', 'scribe'].includes(this.role)) {
      throw new Error('Guardian role must be leader, tester, or scribe');
    }

    return true;
  }

  /**
   * @method toJSON
   * @description Converts the guardian instance to a plain object
   * @returns {Object} The guardian as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      guildId: this.guildId,
      joinedAt: this.joinedAt
    };
  }
}

export default Guardian;
