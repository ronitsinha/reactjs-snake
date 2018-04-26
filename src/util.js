// TODO: use this to set tile width/height in css or vice versa.
export const TILE_SIZE = 20;

export const ROWS = 20; // Math.floor(window.innerWidth / TILE_SIZE);
export const COLUMNS = 20; // Math.floor(window.innerHeight / TILE_SIZE);

export const FPS = 10;

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}