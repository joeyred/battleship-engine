import _ from 'lodash';
import {
  coordinatesMatch,
  checkForShip,
  validateLocation,
  validateLocations,
  generateLocations,
  spaceCanBeFiredOn,
  endGameCondition
} from './engine';
import * as factories from 'factories';

class BattleshipGame {
  constructor(options = {}) {
    this.options = _.extend(BattleshipGame.DEFAULTS, options);
    this.actions = ['placeShip', 'fire', 'startGame', 'nextTurn'];
    this.players = [];
    this.numberOfPlayers = 2;
    this.currentTurn = 0;
    this.currentRound = 0;
    this.activePlayerIndex = 0;
    this.inactivePlayerIndex = (this.activePlayerIndex === 0) ? 1 : 0;
    this.gameOver = false;
    buildDataModel();
  }

  buildDataModel() {
    const ships = this.options.ships;
    for (let i = 0; i < this.numberOfPlayers; i++) {
      shipsArray = [];
      for (let shipIndex = 0; shipIndex < ships.length; shipIndex++) {
        shipsArray.push(factories.ship(ships[shipIndex].name, ships[shipIndex].size));
      }
      this.players.push(factories.player(shipsArray));
    }
  }
  getState() {
    return {
      players: this.players,
      // numberOfPlayers: this.numberOfPlayers,
      currentRound: this.currentRound,
      currentTurn: this.currentTurn,
      activePlayerIndex: this.activePlayerIndex,
      inactivePlayerIndex: this.inactivePlayerIndex,
      gameOver: this.gameOver
    };
  }
  action(name, args) {
    if (_.includes(this.actions, name)) {
      // fire the method
      if (args) {
        this[name](args);
      } else {
        this[name]();
      }
      if (endGameCondition(this.players[this.inactivePlayerIndex].ships)) {
        this.gameOver = true;
      }
    }
  }
  check(name) {}


  // ACTIONS
  // ====================== //
  placeShip(args) {
    const {
      shipName,
      startingCoordinates,
      orientation
    } = args;
    let player = this.players[this.activePlayerIndex];
    const shipIndex = _.findIndex(player.ships, {name: shipName});
    const proposedLocations = generateLocations(
      startingCoordinates,
      player.ships[shipIndex].size,
      orientation
    );

    if (validateLocations(player, proposedLocations)) {
      this.players[this.activePlayerIndex].ships[shipIndex].locations = proposedLocations;
      this.players[this.activePlayerIndex].ships[shipIndex].placed = true;
    }
  }

  startGame() {
    this.currentRound = 1;
    this.currentTurn = 1;
  }

  nextTurn() {
    // up then turn counter
    this.currentTurn++;
    this.activePlayerIndex++;
    // check if last player for the round is ending their turn
    if (this.activePlayerIndex === this.numberOfPlayers) {
      this.activePlayerIndex = 0;
      this.currentRound++;
    }
  }

  fire(args) {
    let {coordinates} = args;
    const inactivePlayer = this.players[this.inactivePlayerIndex];
    const unavailableSpaces = _.concat(inactivePlayer.misses, inactivePlayer.hits);
    const shipIndex = checkForShip(this.players[this.inactivePlayerIndex], coordinates);

    if (spaceCanBeFiredOn(coordinates, unavailableSpaces)) {
      if (shipIndex) {
        let ship = this.players[this.inactivePlayerIndex].ships[shipIndex];

        // Add coordinates to locations array in damage object.
        ship.damage.locations.push(coordinates);

        // Add coordinates to hits array.
        this.players[this.inactivePlayerIndex].hits.push(coordinates);

        // Up the damage counter
        ship.damage.count++;

        // If the damage count equals the size of the ship,
        // then the ship has been destroyed.
        if (ship.size === ship.damage.count) {
          ship.destroyed = true;
        }
      } else {
        this.players[this.inactivePlayerIndex].misses.push(coordinates);
      }
    }
  }

  // CHECKS
  // ====================== //

}

BattleshipGame.DEFAULTS = {
  difficulty: 0,
  // numberOfPlayers: 2,
  ships: [
    {name: 'carrier', size: 5},
    {name: 'battleship', size: 4},
    {name: 'cruiser', size: 3},
    {name: 'submarine', size: 3},
    {name: 'destroyer', size: 2}
  ]
};

export default BattleshipGame;
