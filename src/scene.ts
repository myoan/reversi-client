import * as PIXI from 'pixi.js';
import {Board} from './board';
import {Observer} from './observer';

export enum SceneState {
  Initial,
  Waiting,
  BlackTurn,
  WhiteTurn,
  Finish
}

export class Scene extends Observer {
  stateID: number;
  states: ISceneState[];

  constructor() {
    super();
    this.stateID = SceneState.Initial;
    this.states = new Array(
      new InitialSceneState(),
      new WaitingSceneState(),
      new BlackTurnSceneState(),
      new WhiteTurnSceneState(),
      new FinishSceneState()
    )
  }

  update(s: Subject) {
    console.log("update!!");
    let board = s as Board;
    this.step(board.cellNum());
  }

  step(num: number) {
      if (this.stateID < 0) return
      var mtd = this.states[this.stateID];
      this.stateID = mtd.onExec(num);
  }

  run() {
    while(true) {
      this.step(1);
    }
  }
}

interface ISceneState {
  onExec(number):number;
}

class InitialSceneState implements ISceneState {
  constructor() {
  }

  onExec(_: number): number {
    console.log("onExec: initialize > waiting")
    return SceneState.Waiting;
  }
}

class WaitingSceneState implements ISceneState {
  constructor() {
  }

  onExec(_: number): number {
    console.log("onExec: waiting > blackTurn")
    return SceneState.BlackTurn;
  }
}

class BlackTurnSceneState implements ISceneState {
  constructor() {
  }

  onExec(puttableCount: number): number {
    if (puttableCount > 0) {
      console.log("onExec: blackTurn > whiteTurn");
      return SceneState.WhiteTurn;
    } else {
      console.log("onExec: blackTurn > Finish");
    }
    return SceneState.Finish;
  }
}

class WhiteTurnSceneState implements ISceneState {
  constructor() {
  }

  onExec(puttableCount: number): number {
    if (puttableCount > 0) {
      console.log("onExec: whiteTurn > blackTurn");
      return SceneState.BlackTurn;
    } else {
      console.log("onExec: whiteTurn > Finish");
    }
    return SceneState.Finish;
  }
}

class FinishSceneState implements ISceneState {
  constructor() {
  }

  onExec(_: number): number {
    console.log("onExec: finish")
    return -1;
  }
}