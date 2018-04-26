import React, { Component } from 'react';
import Style from './styles';
import Tile from './Tile';
import Player from './Player';
import * as Util from './util';

class Grid extends Component {
  constructor (props) {
    super(props);
    var rows = [];

    for (var y = 0; y < Util.COLUMNS; y++) {
      var temp = [];
      for (var x = 0; x < Util.ROWS; x++) {
        temp.push (new Tile (x, y, Style['tile-empty']));
      }

      rows.push (temp);
    }

    var fx = Util.getRandomInt(0,19),
        fy = Util.getRandomInt(0,19);

    while (fx === 1 && fy === 1) {
      fx = Util.getRandomInt(0,19);
      fy = Util.getRandomInt(0,19);
    }

    this.state = {
      grid: rows,
      score: 0,
      player: new Player(1, 1),
      foodx: fx,
      foody: fy,
    };

  }

  componentDidMount() {
    // preserve "this" context in setInterval, use arrow function wrapper
    setInterval (() => this.update(), 1000 / Util.FPS);
  }

  update () {
    this.clear ();
    this.setTile(this.state.foodx, this.state.foody, 'tile-food');

    this.addPlayer ();

    if (!this.state.player.move(this.state.grid, this.state.score)) {
      //game over
      this.restartGame();
    }

    if (this.state.player.y === this.state.foody && this.state.player.x === this.state.foodx) {
      this.state.grid[this.state.player.y][this.state.player.x].empty();
      this.state.player.grow();
      var foodCoords = this.getNewFoodLocation ();
      this.setState ({
        score: ++this.state.score,
        player: this.state.player,
        foodx: foodCoords.fx,
        foody: foodCoords.fy,
      });
    }

  }

  restartGame() {
    this.clear();
    var foodCoords = this.getNewFoodLocation ();

    this.setState ({
      score: 0,
      player: new Player(1, 1),
      foodx: foodCoords.fx,
      foody: foodCoords.fy,
    });

  }

  getNewFoodLocation () {
    var x = Util.getRandomInt(0,19),
        y = Util.getRandomInt(0,19);

    while (this.state.grid[y][x].getState() !== 'tile-empty') {
      x = Util.getRandomInt(0,19);
      y = Util.getRandomInt(0,19);
    }

    return {fx: x, fy: y};
  }

  clear () {
    for (var i = 0; i < this.state.grid.length; i ++) {
      for (var j = 0; j < this.state.grid[i].length; j ++) {
        this.state.grid[i][j].empty();
      }
    }

    this.setState ({grid: this.state.grid})
  }

  addPlayer () {
    for (var i = 0; i < this.state.grid.length; i ++) {
      for (var j = 0; j < this.state.grid[i].length; j ++) {
        for (var k = 0; k < this.state.player.tail.length; k++) {
          if (this.state.grid[i][j].x === this.state.player.tail[k].x && this.state.grid[i][j].y === this.state.player.tail[k].y) {
            this.state.grid[i][j].snake();
          }
        }

       if (this.state.grid[i][j].x === this.state.player.x && this.state.grid[i][j].y === this.state.player.y) {
          this.state.grid[i][j].snake();
       }
      }
    }

    this.setState ({grid: this.state.grid})
  }

  setTile (tilex, tiley, state) {
    for (var i = 0; i < this.state.grid.length; i ++) {
      for (var j = 0; j < this.state.grid[i].length; j ++) {
       if (this.state.grid[i][j].x === tilex && this.state.grid[i][j].y === tiley) {
          if (state === 'tile-food') {
            this.state.grid[i][j].food();
          } else if (state === 'tile-empty') {
            this.state.grid[i][j].empty();
          } else if (state === 'tile-snake') {
            this.state.grid[i][j].snake();
          }
       }
      }
    }

    this.setState ({grid: this.state.grid})
  }

  handleKeyPress (event) {
    this.state.player.keyPress (event.key, this.state.grid);
  }

  render () {
    var preppedGrid = [];
    for (var i = 0; i < this.state.grid.length; i ++) {
      var row = [];
      for (var j = 0; j < this.state.grid[i].length; j ++) {
        row.push (this.state.grid[i][j].JSX());
      }
      preppedGrid.push (<tr key={i}>{row}</tr>)
    }

    return (
      <div tabIndex="0" style={Style['wrapper']} onKeyDown={(e) => this.handleKeyPress(e)}>
        <table cellSpacing = "0" align="center" style={Style['grid']} >
          <tbody>{preppedGrid}</tbody>
        </table>
        <div style={Style['score']}>Score: {this.state.score}</div>
      </div>
    );

  }
}

export default Grid;