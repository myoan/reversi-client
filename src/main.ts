import * as PIXI from 'pixi.js';
import {Board} from './board';

const opt = {width: 526, height: 526, backgroundColor: 0x000000};
const app = new PIXI.Application(opt);
document.body.appendChild(app.view);

const board = new Board();
board.start(app.stage);

const btn = new PIXI.Container();
btn.x = 223
btn.y = 283
app.stage.addChild(btn);

var graphics = new PIXI.Graphics();
graphics.beginFill(0x1f1f1f);
graphics.drawRect(0, 0, 80, 40);

btn.addChild(graphics);

let text = new PIXI.Text('Start',{fontFamily : 'Arial', fontSize: 24, fill : 0xf1f1f1, align : 'center'});
text.x = 40 - text.width / 2
text.y = 20 - text.height / 2
btn.addChild(text);

btn.interactive = true;
btn.buttonMode = true;

btn.on('pointerdown', () => {
  console.log('button pushed!')
  const conn = new WebSocket('ws://' + document.location.hostname + ':8080/ws');
  // board.conn = conn;
  board.setConn(conn);
  app.stage.removeChild(btn)
});