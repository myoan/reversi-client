import { cellAsset } from './assets/loader';
import * as PIXI from 'pixi.js';
import {Board} from './board';
 
interface CellAsset {
  none: string[];
  black: string[];
  white: string[];
}
 
export const CellState = {
  None: 0,
  Black: 1,
  White: 2,
};

const asset: CellAsset = cellAsset;

/**
 Cell: Reverse Cell Object
 */
export class Cell {
  _x: number;
  _y: number;
  idxX: number;
  idxY: number;
  _state: number;
  _sprite: PIXI.Sprite;
  _color: number;
  /**
   *
   * @param {number} x - board x index
   * @param {number} y - board y index
   * @param {number} state - cell status
   * @param {WebSocket} conn - websock
   */
  constructor(board: Board, x: number, y: number, color: number, state: number) {
    this._x = 66 * x;
    this._y = 66 * y;
    this.idxX = x;
    this.idxY = y;
    this._color = color;
    this._state = state;

    this._sprite = PIXI.Sprite.from(this.getTexture());
    this._sprite.interactive = true;
    this._sprite.buttonMode = true;

    this._sprite.on('pointerdown', () => {
      board.putStone(this)
    });

    this.reload();
  }

  /**
   * @return {number} - return player color
   */
  get color(): number {
    return this._color;
  }

  /**
   * @param {number} n - set player color
   */
  set color(n: number) {
    this._color = n;
  }


  /**
   * @return {number} - return x index
   */
  get x(): number {
    return this._x;
  }

  /**
   * @param {number} n - new x index
   */
  set x(n: number) {
    this._x = n;
  }

  /**
   * @return {number} - return x index
   */
  get y(): number {
    return this._y;
  }

  /**
   * @param {number} n - new y index
   */
  set y(n: number) {
    this._y = n;
  }

  /**
   * @return {number} - return x index
   */
  get state(): number {
    return this._state;
  }

  /**
   * @param {number} state - new cell state
   */
  set state(state: number) {
    this._state = state;
    this.reload();
  }

  /**
   * @return {boolean} - if cell is empty, it returns true
   */
  isEmpty(): boolean {
    return (this.state == 0);
  }

  /**
   * @return {PIXI.Sprite} - return sprite
   */
  get sprite(): PIXI.Sprite {
    return this._sprite;
  }

  /**
   * reload cell
   */
  reload(): void {
    this._sprite.texture = this.getTexture();
    this._sprite.x = this._x;
    this._sprite.y = this._y;
  }

  /**
   * @return {PIXI.Texture} - return texture object
   */
  private getTexture(): PIXI.Texture {
    switch (this._state) {
      case CellState.None:
        return PIXI.Texture.from(asset.none.join(''));
      case CellState.Black:
        return PIXI.Texture.from(asset.black.join(''));
      case CellState.White:
        return PIXI.Texture.from(asset.white.join(''));
    }
  }
}