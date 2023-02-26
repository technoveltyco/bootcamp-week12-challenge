import Team from "./Team.mjs";

class TeamComposite {
  #teams;

  constructor(teams = []) {
    this.init(teams);
  }

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

  getAll() {
    return this.#teams;
  }

  get(index) {
    let team = undefined;
    if (Number.isInteger(index) && index >= this.#teams.length) {
      team = this.#teams[index];
    }
    return team;
  }

  add(team) {
    if (team instanceof Team) {
      this.#teams.push(team);
    }
    return this;
  }

  remove(team) {
    if (team instanceof Team) {
      this.#teams = this.#teams.filter((teamArr) => teamArr !== team);
    }
    return this;
  }

  clear() {
    this.#teams = [];
    return this;
  }

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
