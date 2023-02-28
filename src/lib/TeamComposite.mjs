import Team from "./Team.mjs";

/**
 * The TeamComposite class.
 *
 * @class
 * @classdesc This class implements the Composite pattern to contain Team and Employee objects.
 * It also implements the Symbol.iterator interface to allow be accesed through loops.
 */
class TeamComposite {
  /**
   * @private
   * @type {Array}
   *    The teams container iterator.
   */
  #teams;

  /**
   * The TeamComposite constructor.
   *
   * @param {Array} teams
   *    A teams container to initialise with.
   */
  constructor(teams = []) {
    this.init(teams);
  }

  /**
   * Initialise the composite container of objects.
   *
   * @param {Array} teams
   *    A teams container to initialise.
   * @returns {this}
   *    this reference.
   */
  init(teams) {
    this.#teams = [];

    if (teams instanceof Array) {
      for (let index = 0; index < teams.length; index++) {
        const team = teams[index];
        if (team instanceof Team) {
          this.#teams.push(team);
        }
      }
    }

    return this;
  }

  /**
   * Gets the teams container.
   *
   * @returns {Array}
   *    The teams composite container.
   */
  getAll() {
    return this.#teams;
  }

  /**
   * Gets access to a Team element in the composite container by a given index.
   *
   * @param {integer} index
   *    The index in the teams array.
   * @returns {Team}
   *    The correspondent Team object.
   */
  get(index) {
    let team = undefined;
    if (Number.isInteger(index) && index < this.#teams.length) {
      team = this.#teams[index];
    }
    return team;
  }

  /**
   * Add a given Team at the end of the composite container.
   *
   * @param {Team} team
   *    A team object to add.
   * @returns {this}
   *    this reference.
   */
  add(team) {
    if (team instanceof Team) {
      this.#teams.push(team);
    }
    return this;
  }

  /**
   * Removes a given Team from the composite container.
   *
   * @param {Team} team
   *    A Team object to remove.
   * @returns {this}
   *    this reference.
   */
  remove(team) {
    if (team instanceof Team) {
      this.#teams = this.#teams.filter((teamArr) => teamArr !== team);
    }
    return this;
  }

  /**
   * Clears the composite container, leaving it empty.
   *
   * @returns {this}
   *    this reference.
   */
  clear() {
    this.#teams = [];
    return this;
  }

  /**
   * Implements the iterator for the composite container.
   *
   * @returns {{done: boolean, value?: Team}}
   *    An object to be used by Symbol.iterator API.
   */
  [Symbol.iterator]() {
    let [current, end, teams] = [0, this.#teams.length, this.#teams];
    return {
      next() {
        if (current < end) {
          return { value: teams[current++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

export default TeamComposite;
