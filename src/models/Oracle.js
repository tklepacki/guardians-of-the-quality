/**
 * @class Oracle
 * @description Represents an AI scan or prophecy
 */
class Oracle {
  /**
   * @constructor
   * @param {Object} oracleData - The oracle data
   * @param {string} oracleData.id - Unique identifier for the oracle
   * @param {string} oracleData.target - Target of the scan (e.g., 'staging', 'production')
   * @param {string} oracleData.kind - Kind of oracle (e.g., 'security', 'performance')
   * @param {string} oracleData.createdAt - ISO date string of when the oracle was created
   * @param {string} oracleData.prophecy - The prophecy or result of the scan
   */
  constructor({
    id,
    target = 'unknown',
    kind = 'generic',
    createdAt = new Date().toISOString(),
    prophecy = 'Scan scheduled...'
  }) {
    this.id = id || `o-${Date.now()}`;
    this.target = target;
    this.kind = kind;
    this.createdAt = createdAt;
    this.prophecy = prophecy;
  }

  /**
   * @method validate
   * @description Validates the oracle data
   * @returns {boolean} Whether the oracle data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.target) {
      throw new Error('Oracle target is required');
    }

    if (!this.kind) {
      throw new Error('Oracle kind is required');
    }

    return true;
  }

  /**
   * @method predict
   * @description Generates a prophecy
   * @param {string} [prophecy] - Custom prophecy to set
   * @returns {Oracle} The updated oracle instance
   */
  predict(prophecy) {
    if (prophecy) {
      this.prophecy = prophecy;
    } else {
      const outcomes = ['success', 'turmoil', 'caution'];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      this.prophecy = `Omens suggest ${randomOutcome}.`;
    }
    return this;
  }

  /**
   * @method toJSON
   * @description Converts the oracle instance to a plain object
   * @returns {Object} The oracle as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      target: this.target,
      kind: this.kind,
      createdAt: this.createdAt,
      prophecy: this.prophecy
    };
  }
}

export default Oracle;
