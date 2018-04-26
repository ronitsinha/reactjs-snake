import * as Util from './util';

function Player (x, y){
	this.x = x;
	this.y = y;
	this.xspeed = 0;
	this.yspeed = 0;
	this.tail = [];
}

Player.prototype.move = function (grid, score) {
	if (this.x + this.xspeed < Util.COLUMNS && this.x + this.xspeed >= 0) {
		if (this.xspeed !== 0 && grid[this.y][this.x + this.xspeed].getState() !== 'tile-snake') {
			this.x += this.xspeed;
		} else if (this.xspeed !== 0 && grid[this.y][this.x + this.xspeed].getState() === 'tile-snake') {
			alert ('You lose!\nYour score: ' + score);
			this.xspeed = 0;
			this.yspeed = 0;
			return false;
		}
	} else {
		alert ('You lose!\nYour score: ' + score);
		this.xspeed = 0;
		this.yspeed = 0;
		return false;
	}
	
	if (this.y + this.yspeed < Util.ROWS && this.y + this.yspeed >= 0) {
		if (this.yspeed !== 0 && grid[this.y + this.yspeed][this.x].getState() !== 'tile-snake') {
			this.y += this.yspeed;
		} else if (this.yspeed !== 0 && grid[this.y + this.yspeed][this.x].getState() === 'tile-snake') {
			alert ('You lose!\nYour score: ' + score);
			this.xspeed = 0;
			this.yspeed = 0;
			return false;
		}
	} else {
		alert ('You lose!\nYour score: ' + score);
		this.xspeed = 0;
		this.yspeed = 0;
		return false;
	}


	var prevx = this.x - this.xspeed;
	var prevy = this.y - this.yspeed;

	if (this.xspeed !== 0 || this.yspeed !== 0) {
		for (var i = 0; i < this.tail.length; i ++) {
			var px = this.tail[i].x;
			var py = this.tail[i].y;

			this.tail[i].move (prevx, prevy);

			prevx = px;
			prevy = py;
		}
	}

	return true;
}

Player.prototype.grow = function () {
	this.tail.push (new Body(this.x - this.xspeed, this.y - this.yspeed));
}

Player.prototype.keyPress = function (key, grid) {
	switch (key) {
		case 'ArrowRight':
			if (grid[this.y][this.x + 1] !== undefined) {
				if (grid[this.y][this.x + 1].getState() !== 'tile-snake') {
					this.xspeed = 1;
					this.yspeed = 0;
				}
			}
			break;
		case 'ArrowLeft':
			if (grid[this.y][this.x - 1] !== undefined) {
				if (grid[this.y][this.x - 1].getState() !== 'tile-snake') {
					this.xspeed = -1;
					this.yspeed = 0;
				}
			}
			break;
		case 'ArrowDown':
			if (grid[this.y + 1] !== undefined) {
				if (grid[this.y + 1][this.x].getState() !== 'tile-snake') {
					this.xspeed = 0;
					this.yspeed = 1;
				}
			}
			break;
		case 'ArrowUp':
			if (grid[this.y - 1] !== undefined) {
				if (grid[this.y - 1][this.x].getState() !== 'tile-snake') {
					this.xspeed = 0;
					this.yspeed = -1;
				}
			}
			break;
		default:
			break;
	}

	return true;
}

function Body (x, y) {
	this.x = x;
	this.y = y;
}

Body.prototype.move = function (x, y) {
	this.x = x;
	this.y = y;
}


export default Player;