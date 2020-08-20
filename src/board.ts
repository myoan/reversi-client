import {Container, interaction, LineStyle} from 'pixi.js';
import {Cell, CellState} from './cell';
import {Subject} from './observer';

/**
 * Board Class
 */
export class Board extends Subject {
  _board: Cell[][] = []; 
  _state: number;
  _conn: WebSocket;
  /**
   * Reverse Board object
   */
  constructor() {
    super();
    const size = 8;
    for (let i = 0; i < size; i++) {
      this._board[i] = [];
      for (let j = 0; j < size; j++) {
        this._board[i][j] = new Cell(this, j, i, 0, CellState.None);
      }
    }
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
   * 
   * @param {Cell} cell - selected cell object
   */
  putStone(cell: Cell) {
    if (this.state == null) return;
    const obj = {
      cmd: 'set_stone',
      body: {
        color: cell.color,
        cell: {x: cell.idxX, y: cell.idxY, state: cell.state }
      }
    };
    const msg = JSON.stringify(obj);
    console.log(`request: ${msg}`)
    this._conn.send(msg);
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

  /**
   * @return {WebSocket} - return connection
   */
  get conn(): WebSocket {
    return this._conn;
  }

  setConn(conn: WebSocket) {
    console.log('set websocket')
    this._conn = conn;
    this._conn.onmessage = (event) => {
      console.log(`response: ${event.data}`)
      this.notifyObservers();
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

  /**
   * @param {WebSocket} conn - websocket
   */
  set conn(conn: WebSocket) {
    this._conn = conn;
    this._conn.onmessage = (event) => {
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

  cellNum():number {
    let size = 8;
    this._board.forEach((line) => {
      line.forEach((cell) => {
        if (!cell.isEmpty()) {
          size++;
        }
      });
    });
    console.log("empty cell: " + size);
    return size;
  }
}