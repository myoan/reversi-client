import * as PIXI from 'pixi.js';
import {Board} from './board';

const opt = {width: 1038, height: 1038, backgroundColor: 0x000000};
const app = new PIXI.Application(opt);
document.body.appendChild(app.view);

const board = new Board();
board.start(app.stage);
