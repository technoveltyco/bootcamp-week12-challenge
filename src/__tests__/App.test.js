import { expect } from "@jest/globals";
import App from "../App";
import TeamComposite from "../lib/TeamComposite";

describe("App singleton contruct", () => {
  it("App.constructor() should not be callable and return TypeError.", () => {
    const expectedErrorType = TypeError;
    const expectedErrorMessage = App.ERROR_COSTRUCTOR;
    const receivedAppCallback = () => new App(new TeamComposite());

    expect(receivedAppCallback).toThrow(expectedErrorType);
    expect(receivedAppCallback).toThrowError(expectedErrorMessage);
  });

  it("App.getInstance() should instantiate the App only once.", () => {
    const expectedInstanceOf = App;
    const receivedApp1 = App.getInstance();
    const receivedApp2 = App.getInstance();

    expect(receivedApp1).toBeInstanceOf(expectedInstanceOf);
    expect(receivedApp2).toBeInstanceOf(expectedInstanceOf);
    expect(receivedApp1 === receivedApp2).toBeTruthy();
  });
});

describe("App settings", () => {
  it("App.getSettings() should return empty Object when creating an App instance.", () => {
    const receivedSettings = App.getInstance().getSettings();
    const expectedSettings = {};

    expect(receivedSettings).toStrictEqual(expectedSettings);
  });

  it("App.setSettings({ key: value }) should add key, value pair to the settings object.", () => {
    const inputSettings = { foo1: "bar1", foo2: "bar2" },
      expectedSettings = inputSettings;
    const receivedSettings = App.getInstance()
      .setSettings(inputSettings)
      .getSettings();

    expect(receivedSettings).toStrictEqual(expectedSettings);

    // Clear the settings for next tests.
    App.getInstance().setSettings({});
  });

  it("App.getSetting(key) should return falsy when the given key does not exists in settings object.", () => {
    const inputKey = "foo";
    const receivedValue = App.getInstance().getSetting(inputKey);

    expect(receivedValue).toBeFalsy();
  });

  it("App.getSetting(key, default) should return default when the given key does not exists in settings object.", () => {
    const inputKey = "foo",
      inputDefaultValue = "default",
      expectedValue = inputDefaultValue;
    const receivedValue = App.getInstance().getSetting(
      inputKey,
      inputDefaultValue
    );

    expect(receivedValue).toStrictEqual(expectedValue);
  });

  it("App.getSetting(key) should return the value of given key setting, when the key exists in settings object.", () => {
    const inputSettings = { foo: "bar" },
      expectedSettings = inputSettings;
    const receivedSettings = App.getInstance()
      .setSettings(inputSettings)
      .getSetting();

    expect(receivedSettings).toStrictEqual(expectedSettings);
  });

  it("App.setSetting(key, value) should add key, value pair to the settings object.", () => {
    const inputKey = "foo",
      inputValue = "bar",
      expectedSettings = { [inputKey]: inputValue };
    const receivedSettings = App.getInstance()
      .setSetting(inputKey, inputValue)
      .getSettings();

    expect(receivedSettings).toStrictEqual(expectedSettings);

    // Clear the settings for next tests.
    App.getInstance().setSettings({});
  });
});

describe("App teams", () => {
  it("App.getTeams() should return a default TeamComposite object after creating an App instance.", () => {
    const expectedInstanceOf = TeamComposite;
    const expectedTeams = new TeamComposite();
    const receivedTeams = App.getInstance().getTeams();

    expect(receivedTeams).toBeInstanceOf(expectedInstanceOf);
    expect(receivedTeams).toEqual(expectedTeams);
  });
});
