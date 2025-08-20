/**
 * @class Weapon
 * @description Represents a test case (weapon) used by guardians
 */
class Weapon {
  /**
   * @constructor
   * @param {Object} weaponData - The weapon data
   * @param {string} weaponData.id - Unique identifier for the weapon
   * @param {string} weaponData.name - Name of the weapon (test case)
   * @param {string} weaponData.type - Type of the weapon (e2e, unit, integration, etc.)
   * @param {string} weaponData.createdAt - ISO date string of when the weapon was created
   * @param {string|null} weaponData.lastRunAt - ISO date string of when the weapon was last run
   */
  constructor({ id, name, type = 'generic', createdAt = new Date().toISOString(), lastRunAt = null }) {
    this.id = id || `w-${Date.now()}`;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.lastRunAt = lastRunAt;
  }

  /**
   * @method validate
   * @description Validates the weapon data
   * @returns {boolean} Whether the weapon data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Weapon name is required');
    }
    
    return true;
  }

  /**
   * @method updateLastRun
   * @description Updates the lastRunAt timestamp to now
   */
  updateLastRun() {
    this.lastRunAt = new Date().toISOString();
  }

  /**
   * @method toJSON
   * @description Converts the weapon instance to a plain object
   * @returns {Object} The weapon as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      createdAt: this.createdAt,
      lastRunAt: this.lastRunAt
    };
  }
}

export default Weapon;
