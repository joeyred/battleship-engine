/**
 * Factory for generating the player data model
 *
 * @method player
 *
 * @param  {Array} ships  - The array of ship objects the player will have
 *
 * @return {Object}       - The built data object of a player
 */
function player(ships) {
  return {
    misses: [],
    hits: [],
    ships: ships
  };
}

/**
 * Factory for generating the ship data model
 *
 * @method ship
 *
 * @param  {String} name - The name of the ship
 * @param  {Number} size - The size of the ship in number of cells
 *
 * @return {Object}      - The built data object of a ship
 */
function ship(name, size) {
  return {
    name: name,
    size: size,
    locations: [],
    damage: {
      locations: [],
      count: 0
    },
    destroyed: false,
    placed: false
  };
}

// const factories = {player, ship};

export default {player, ship};
