import React, { Component } from 'react';
import Style from './styles';

function Tile (x, y, style) {
  this.x = x;
  this.y = y;
  this.style = style || Style['tile-empty'];
}

Tile.prototype.JSX = function() {
  return <td style={this.style} key={this.x+', '+this.y} coords={this.x+', '+this.y}></td>
};

Tile.prototype.empty = function () {
  this.style = Style['tile-empty'];
}

Tile.prototype.food = function () {
  this.style = Style['tile-food'];
}

Tile.prototype.snake = function () {
  this.style = Style['tile-snake'];
}

Tile.prototype.getState = function () {
	if (this.style === Style['tile-empty']) {
		return 'tile-empty';
	} else if (this.style === Style['tile-food']) {
		return 'tile-food';
	}

	return 'tile-snake';
}

export default Tile;