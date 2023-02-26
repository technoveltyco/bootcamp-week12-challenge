import TeamComposite from "../lib/TeamComposite.mjs";
import Team from "../lib/Team.mjs";

function toBeStrictTeamsEqual(receivedTeams, expectedTeams) {
  expect(receivedTeams.length).toBe(expectedTeams.length);

  let index = 0;
  for (const receivedTeam of receivedTeams) {
    const expectedTeam = expectedTeams[index++];

    expect(receivedTeam).toBeInstanceOf(Team);
    expect(receivedTeam).toStrictEqual(expectedTeam);
  }
}

describe("TeamComposite", () => {
  it("should initialise teams as empty array in default contructor", () => {
    const expectedTeams = [];
    const receivedTeams = new TeamComposite().getAll();

    expect(receivedTeams).toStrictEqual(expectedTeams);
  });

  it("should initialise teams as empty when given array does not contain Team objects in contructor per value", () => {
    const inputTeams = [1, 2, 3, 4, 5];
    const expectedTeams = [];
    const receivedTeams = new TeamComposite(inputTeams).getAll();

    expect(receivedTeams).toStrictEqual(expectedTeams);
  });

  it("should initialise teams with given array of Team objects in contructor per value", () => {
    const inputTeams = [new Team(), new Team(), new Team()],
      expectedTeams = inputTeams;
    const receivedTeams = new TeamComposite(inputTeams).getAll();

    toBeStrictTeamsEqual(receivedTeams, expectedTeams);
  });

  it("should get the Team object at the given index position, when index is integer and inside the array length", () => {
    const inputTeams = [new Team(), new Team(), new Team()],
      expectedTeams = inputTeams,
      numItems = inputTeams.length;
    const teamComposite = new TeamComposite(inputTeams);
    const receivedTeams = [];
    for (let index = 0; index < numItems; index++) {
      receivedTeams.push(teamComposite.get(index));
    }

    toBeStrictTeamsEqual(receivedTeams, expectedTeams);
  });

  it("should not get a Team object when the given index position is out of boundary of the array length", () => {
    const inputTeams = [new Team(), new Team(), new Team()],
      indexOutOfBoundary = inputTeams.length;
    const receivedTeam = new TeamComposite(inputTeams).get(indexOutOfBoundary);

    expect(receivedTeam).not.toBeInstanceOf(Team);
    expect(receivedTeam).toBeUndefined();
  });

  it("should not get a Team object when the given index position is not an integer", () => {
    const inputTeams = [new Team(), new Team(), new Team()],
      noValidIndex = "foo";
    const receivedTeam = new TeamComposite(inputTeams).get(noValidIndex);

    expect(receivedTeam).not.toBeInstanceOf(Team);
    expect(receivedTeam).toBeUndefined();
  });

  it("should add a given Team object at the end of the array", () => {
    const initTeams = [new Team()],
      inputTeam = new Team(),
      expectedTeam = inputTeam,
      lastIndex = initTeams.length;
    const receivedTeam = new TeamComposite(initTeams)
      .add(inputTeam)
      .get(lastIndex);

    expect(receivedTeam).toBeInstanceOf(Team);
    expect(receivedTeam).toBe(expectedTeam);
  });

  it("should not add a given team which is not a Team object", () => {
    const initTeams = [new Team()],
      inputTeam = 1,
      lastIndex = initTeams.length;
    const receivedTeam = new TeamComposite(initTeams)
      .add(inputTeam)
      .get(lastIndex);

    expect(receivedTeam).not.toBeInstanceOf(Team);
    expect(receivedTeam).toBeUndefined();
  });

  it("should remove a given Team object that is in the array", () => {
    const inputTeam = new Team(),
      initTeam1 = new Team(),
      initTeam2 = new Team(),
      initTeams = [initTeam1, inputTeam, initTeam2],
      expectedTeams = [initTeam1, initTeam2];
    const receivedTeams = new TeamComposite(initTeams)
      .remove(inputTeam)
      .getAll();

    toBeStrictTeamsEqual(receivedTeams, expectedTeams);
  });

  it("should not remove a given Team object that is not in the array", () => {
    const inputTeam = Team(),
      initTeam1 = new Team(),
      initTeam2 = new Team(),
      initTeams = [initTeam1, initTeam2],
      expectedTeams = [initTeam1, initTeam2];
    const receivedTeams = new TeamComposite(initTeams)
      .remove(inputTeam)
      .getAll();

    expect(receivedTeams).not.toContain(inputTeam);
    toBeStrictTeamsEqual(receivedTeams, expectedTeams);
  });

  it("should not remove a given team which is not a Team object", () => {
    const inputTeam = 1,
      initTeam1 = new Team(),
      initTeam2 = new Team(),
      initTeams = [initTeam1, initTeam2],
      expectedTeams = [initTeam1, initTeam2];
    const receivedTeams = new TeamComposite(initTeams)
      .remove(inputTeam)
      .getAll();

    expect(receivedTeams).not.toContain(inputTeam);
    toBeStrictTeamsEqual(receivedTeams, expectedTeams);
  });

  it("should set the array empty when called clear()", () => {
    const initTeams = [new Team(), new Team(), new Team()];
    const expectedTeams = [];
    const receivedTeams = new TeamComposite(initTeams).clear().getAll();

    expect(receivedTeams).toBe(expectedTeams);
  });
});
