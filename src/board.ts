import {Container, interaction, LineStyle} from 'pixi.js';
import {Cell, CellState} from './cell';

console.log('ws://' + document.location.hostname + ':8080/ws');
const conn = new WebSocket('ws://' + document.location.hostname + ':8080/ws');

/**
 * Board Class
 */
export class Board {
  _board: Cell[][] = []; 
  _state: number;
  /**
   * Reverse Board object
   */
  constructor() {
    const size = 8;
    for (let i = 0; i < size; i++) {
      this._board[i] = [];
      for (let j = 0; j < size; j++) {
        this._board[i][j] = new Cell(j, i, 0, CellState.None, conn);
      }
    }

    conn.onmessage = (event) => {
      console.log(`response: ${event.data}`)
      const data = JSON.parse(event.data);
      if (data['status'] == 0) {
        this.state = data['color'];
      }
      data['board'].forEach((line) => {
        line.forEach((c) => {
          const cell = this.fetch(c['x'], c['y']);
          cell.color = this.state;
          cell.state = c['state'];
        });
      });
    };
  }

  set state(n: number) {
    this._state = n;
  }

  get state(): number {
    return this._state;
  }

  /**
   * Start Reverse game
   * @param {Container} stage - app.stage
   */
  start(stage: Container) {
    this._board.forEach((line) => {
      line.forEach((cell) => {
        cell.reload();
        stage.addChild(cell.sprite);
      });
    });
  }

  /**
   * return specified cell
   * @param {number} x - board x index
   * @param {number} y - board y index
   * @return {Cell} - correspond cell object
   */
  fetch(x: number, y: number): Cell {
    return this._board[y][x];
  }
}