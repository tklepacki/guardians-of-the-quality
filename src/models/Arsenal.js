/**
 * @class Arsenal
 * @description Represents a collection of weapons (test suite)
 */
class Arsenal {
  /**
   * @constructor
   * @param {Object} arsenalData - The arsenal data
   * @param {string} arsenalData.id - Unique identifier for the arsenal
   * @param {string} arsenalData.name - Name of the arsenal
   * @param {string} arsenalData.description - Description of the arsenal
   * @param {string} arsenalData.createdAt - ISO date string of when the arsenal was created
   * @param {Array<string>} [arsenalData.weaponIds] - Array of weapon IDs included in this arsenal
   */
  constructor({ id, name, description, createdAt = new Date().toISOString(), weaponIds = [] }) {
    this.id = id || `a-${Date.now()}`;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.weaponIds = weaponIds;
  }

  /**
   * @method validate
   * @description Validates the arsenal data
   * @returns {boolean} Whether the arsenal data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.name) {
      throw new Error('Arsenal name is required');
    }
    
    return true;
  }

  /**
   * @method addWeapon
   * @description Adds a weapon to the arsenal
   * @param {string} weaponId - The ID of the weapon to add
   * @returns {boolean} Whether the weapon was added
   */
  addWeapon(weaponId) {
    if (!this.weaponIds.includes(weaponId)) {
      this.weaponIds.push(weaponId);
      return true;
    }
    return false;
  }

  /**
   * @method removeWeapon
   * @description Removes a weapon from the arsenal
   * @param {string} weaponId - The ID of the weapon to remove
   * @returns {boolean} Whether the weapon was removed
   */
  removeWeapon(weaponId) {
    const index = this.weaponIds.indexOf(weaponId);
    if (index !== -1) {
      this.weaponIds.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * @method toJSON
   * @description Converts the arsenal instance to a plain object
   * @returns {Object} The arsenal as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      weaponIds: this.weaponIds
    };
  }
}

export default Arsenal;
