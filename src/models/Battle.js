/**
 * @class Battle
 * @description Represents a battle between a guild and a boss using an arsenal
 */
class Battle {
  /**
   * @constructor
   * @param {Object} battleData - The battle data
   * @param {string} battleData.id - Unique identifier for the battle
   * @param {string} battleData.guildId - ID of the guild fighting in the battle
   * @param {string} battleData.bossId - ID of the boss (bug) being fought
   * @param {string} battleData.arsenalId - ID of the arsenal being used
   * @param {string} battleData.environment - Environment where the battle is taking place
   * @param {string} battleData.startedAt - ISO date string of when the battle started
   * @param {string|null} battleData.outcome - Outcome of the battle (victory, defeat, stalemate)
   * @param {string|null} battleData.notes - Notes about the battle
   */
  constructor({
    id,
    guildId,
    bossId,
    arsenalId,
    environment = 'staging',
    startedAt = new Date().toISOString(),
    outcome = null,
    notes = null
  }) {
    this.id = id || `bt-${Date.now()}`;
    this.guildId = guildId;
    this.bossId = bossId;
    this.arsenalId = arsenalId;
    this.environment = environment;
    this.startedAt = startedAt;
    this.outcome = outcome;
    this.notes = notes;
  }

  /**
   * @method validate
   * @description Validates the battle data
   * @returns {boolean} Whether the battle data is valid
   * @throws {Error} If validation fails
   */
  validate() {
    if (!this.guildId) {
      throw new Error('Battle guildId is required');
    }

    if (!this.bossId) {
      throw new Error('Battle bossId is required');
    }

    if (!this.arsenalId) {
      throw new Error('Battle arsenalId is required');
    }

    if (!['development', 'staging', 'production'].includes(this.environment)) {
      throw new Error('Battle environment must be development, staging, or production');
    }

    if (this.outcome && !['victory', 'defeat', 'stalemate'].includes(this.outcome)) {
      throw new Error('Battle outcome must be victory, defeat, stalemate, or null');
    }

    return true;
  }

  /**
   * @method resolve
   * @description Resolves the battle with an outcome
   * @param {string} outcome - The outcome of the battle
   * @param {string} [notes] - Notes about the battle outcome
   * @returns {Battle} The updated battle instance
   */
  resolve(outcome, notes) {
    if (!['victory', 'defeat', 'stalemate'].includes(outcome)) {
      throw new Error('Battle outcome must be victory, defeat, or stalemate');
    }

    this.outcome = outcome;
    if (notes) {
      this.notes = notes;
    }

    return this;
  }

  /**
   * @method toJSON
   * @description Converts the battle instance to a plain object
   * @returns {Object} The battle as a plain object
   */
  toJSON() {
    return {
      id: this.id,
      guildId: this.guildId,
      bossId: this.bossId,
      arsenalId: this.arsenalId,
      environment: this.environment,
      startedAt: this.startedAt,
      outcome: this.outcome,
      notes: this.notes
    };
  }
}

export default Battle;
