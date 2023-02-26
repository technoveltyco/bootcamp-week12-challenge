import TeamComposite from "./lib/TeamComposite.mjs";

class App {
  static ERROR_COSTRUCTOR =
    "App is a singleton and its constructor is not constructable.";
  static #isInternalContructing = false;
  static #instance = null;
  #settings;
  #teams;

  constructor(composite, settings = {}) {
    if (!App.#isInternalContructing) {
      throw new TypeError(App.ERROR_SINGLETON_COSTRUCTOR);
    }

    this.#teams = composite;
    this.#settings = settings;
  }

  static getInstance() {
    if (!App.#instance) {
      App.#isInternalContructing = true;
      const composite = new TeamComposite();
      App.#instance = new App(composite);
      App.#isInternalContructing = false;
    }

    return App.#instance;
  }

  getSettings() {
    return this.#settings;
  }

  getSetting(key, defaultValue = false) {
    return this.#settings[key] || defaultValue;
  }

  setSettings(settings) {
    this.#settings = settings;
    return this;
  }

  setSetting(key, value) {
    this.#settings[key] = value;
    return this;
  }

  getTeams() {
    return this.#teams;
  }
}

export default App;
