import {Scene, SceneState} from "../src/scene";

describe("Scene.run", (): void => {
  describe("when state is Initial", (): void => {
    test("change state to waiting", (): void => {
        const scene = new Scene();
        const num = 0;
        scene.step(num);
        expect(scene.stateID).toBe(SceneState.Waiting);
    });
  });

  describe("when state is Waiting", (): void => {
    test("change state to BlackTurn", (): void => {
        const scene = new Scene();
        scene.stateID = SceneState.Waiting;
        const num = 0;
        scene.step(num);
        expect(scene.stateID).toBe(SceneState.BlackTurn);
    });
  });

  describe("when state is BlackTurn", (): void => {
    test("when not putable, change state to Finish", (): void => {
        const scene = new Scene();
        scene.stateID = SceneState.BlackTurn;
        const num = 0;
        scene.step(num);
        expect(scene.stateID).toBe(SceneState.Finish);
    });

    test("when putable, change state to WhiteTurn", (): void => {
        const scene = new Scene();
        scene.stateID = SceneState.BlackTurn;
        const num = 1;
        scene.step(num);
        expect(scene.stateID).toBe(SceneState.WhiteTurn);
    });
  });

  describe("when state is WhiteTurn", (): void => {
    test("when not putable, change state to Finish", (): void => {
        const scene = new Scene();
        scene.stateID = SceneState.WhiteTurn;
        const num = 0;
        scene.step(num);
        expect(scene.stateID).toBe(SceneState.Finish);
    });

    test("when putable, change state to BlackTurn", (): void => {
        const scene = new Scene();
        scene.stateID = SceneState.WhiteTurn;
        const num = 1;
        scene.step(num);
        expect(scene.stateID).toBe(SceneState.BlackTurn);
    });
  });

});