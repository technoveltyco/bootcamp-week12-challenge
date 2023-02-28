import TeamComposite from "./lib/TeamComposite.mjs";

/**
 * The Team Profile Generator application.
 *
 * @class
 * @classdesc This class implements the Singleton pattern.
 */
class App {
  /**
   * @static
   * @type {String}
   *    The non-callable constructor error.
   */
  static ERROR_COSTRUCTOR =
    "App is a singleton and its constructor is not constructable.";

  /**
   * @static
   * @private
   * @type {boolean}
   *    The internal construct flag.
   *    Used to implement the Singleton pattern.
   */
  static #isInternalContructing = false;

  /**
   * @static
   * @private
   * @type {App}
   *    The App instance.
   */
  static #instance = null;

  /**
   * @private
   * @type {Object}
   *    The app settings container.
   */
  #settings;

  /**
   * @type {TeamComposite}
   *    The composite container of Team objects.
   */
  #teams;

  /**
   * App constructor.
   *
   * @param {TeamComposite} composite
   *    The composite container.
   * @param {Object} settings
   *    The settings container.
   */
  constructor(composite, settings = {}) {
    if (!App.#isInternalContructing) {
      throw new TypeError(App.ERROR_COSTRUCTOR);
    }

    this.#teams = composite;
    this.#settings = settings;
  }

  /**
   * Gets the instance of the application.
   *
   * It uses lazy loading in case the application needs to be instantiated.
   *
   * @returns {App}
   *    The application instance.
   */
  static getInstance() {
    if (!App.#instance) {
      App.#isInternalContructing = true;
      const composite = new TeamComposite();
      App.#instance = new App(composite);
      App.#isInternalContructing = false;
    }

    return App.#instance;
  }

  /**
   * Get the app settings container.
   *
   * @returns {Object}
   *    An object wit key,value pairs of the application settings.
   */
  getSettings() {
    return this.#settings;
  }

  /**
   * Gets the value of a given key setting, or return default value.
   *
   * @param {String} key
   *    The key setting to retrieve.
   * @param {any} defaultValue
   *    The default value to return when the key is not found.
   * @returns {any}
   *    The setting value, or default.
   */
  getSetting(key, defaultValue = false) {
    return this.#settings[key] || defaultValue;
  }

  /**
   * Sets a settings container in the app instance.
   *
   * @param {Object} settings
   *    The settings container.
   * @returns {this}
   *    This instance.
   */
  setSettings(settings) {
    this.#settings = settings;
    return this;
  }

  /**
   * Sets the given key,value pair in settings container.
   *
   * @param {String} key
   *    The key.
   * @param {any} value
   *    The value.
   * @returns {this}
   *    This instance.
   */
  setSetting(key, value) {
    this.#settings[key] = value;
    return this;
  }

  /**
   * Gets the teams container.
   *
   * @returns {TeamComposite}
   *    The composite container of Team objects.
   */
  getTeams() {
    return this.#teams;
  }
}

export default App;
