import {Observer, Subject} from "../src/observer";

class Mission {
  id: number;
  title: string;
  state: number;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.state = 0;
  }

  print(): string {
    if (this.state == 0) {
      return "[Unachieved] (" + this.id + ") " + this.title;
    } else {
      return "[Achieved] ("+ this.id + ") " + this.title;
    }
  }

  achieve() {
    this.state = 1;
  }
}

class MissionManager extends Observer {
  missions: Mission[];

  constructor(missions: Mission[]) {
    super();
    this.missions = missions;
  }

  update(s: Subject) {
    const a = s as Action;
    const id = a.missionID;
    let mission = this.missionsByID(id);

    if (mission == null) return

    mission.achieve();
  }

  missionsByID(id: number): Mission {
    const ret = this.missions.filter((m) => { return (m.id == id); })
    if (ret.length == 0) {
      return null;
    }
    return ret[0];
  }

  list(): string[] {
    let ret: string[] = [];
    this.missions.forEach(m => {
      ret.push(m.print());
    });
    return ret;
  }
}

class Action extends Subject {
  missionID: number;

  constructor(missionID: number) {
    super();
    this.missionID = missionID;
  }

  exec() {
    this.notifyObservers();
  }
}

describe("Observer.update", (): void => {
  describe("when not call update", (): void => {
    test("return as unachieved", (): void => {
      const mission1 = new Mission(1, "hoge")
      const manager = new MissionManager([mission1])
      const action = new Action(mission1.id);
      action.addObserver(manager);
      expect(manager.list()).toEqual(["[Unachieved] (1) hoge"]);
    });
  });

  describe("when call update", (): void => {
    test("return as achieved", (): void => {
      const mission1 = new Mission(1, "hoge")
      const manager = new MissionManager([mission1])
      const action = new Action(mission1.id);
      action.addObserver(manager);
      action.exec();
      expect(manager.list()).toEqual(["[Achieved] (1) hoge"]);
    });
  });
});