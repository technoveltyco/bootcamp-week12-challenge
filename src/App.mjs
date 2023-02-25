import TeamComposite from "./lib/TeamComposite.mjs";

class App {
  constructor(teamsContainer) {
    this.teamsInstance = teamsContainer;
  }

  static getInstance() {
    if (!this.teamsInstance) {
      const teamsContainer = new TeamComposite();
      this.teamsInstance = new App(teamsContainer);
    }
    return this.teamsInstance;
  }
}

export default App;
