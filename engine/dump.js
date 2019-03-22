import _ from 'lodash';
import {
  checkForShip,
  damageShip,
  fire,
  validateLocation,
  validateLocations,
  placeShip
} from './game-logic';

import MODEL from '../model/battleship-model';

export class BattleshipEngine {
  constructor() {
    this.model = MODEL;
    // this is what will be exposed to an interface to consume?
    this.gameState = {};
    this.numberOfPlayers = 2;
    this.currentTurn = 0;
    this.currentRound = 0;
    // 0 = player 1, 1 = player 2
    this.currentPlayerIndex = 0;

  }
  placeShip(args) {
    const {
      shipName,
      startingCoordinates,
      direction
    } = args;
    let player = this.model.players[this.currentPlayerIndex];
    let shipIndex = _.findIndex(player.ships, {name: shipName});

    let newShipObject = placeShip(player, player.ships[shipIndex], startingCoordinates, direction);

    if (newShipObject) {
      this.model.players[this.currentPlayerIndex].ships[shipIndex].locations = newShipObject.locations;
      this.model.players[this.currentPlayerIndex].ships[shipIndex].placed = true;
    }
  }
  updateModel(partial = {}) {
    if (typeof partial === 'object' ||
        typeof partial === 'function') {
      _.assignIn(this.model, partial);
    }
  }
  endGameCondition() {
    for (let i = 0; i < this.model.ships)
  }
  startGame() {
    this.currentRound = 1;
    this.currentTurn = 1;
    // let actions = this.populateActions()
    // this.actions = this.registerActions();
  }
  nextTurn() {
    // up then turn counter
    this.currentTurn++;
    this.currentPlayerIndex++;
    // check if last player for the round is ending their turn
    if (this.currentPlayerIndex === this.numberOfPlayers) {
      this.currentPlayerIndex = 0;
      this.currentRound++;
    }
      // if so, up the round counter

    // check win/lose conditions for game over.
  }
}

// Game Start
// Game Over
// Turns

// ORDER OF GAMEPLAY
  // Game Setup
    // Players place all ships
    // Players report they are ready
  // Game Start
    // Players take turns firing
  // Game Over
    // One player loses all ships

class Game {
  constructor() {
    // The stuff to fill in via sub-class
    this.model = {};
    this.numberOfPlayers = 0;
    // action population
    this.actions = this.registerActions(this.populateActions());
    this.AllReqActionsFired = false;
    this.currentTurn = 0;
    this.currentRound = 0;
    this.currentPlayerIndex = 0;
  }
  populateActions() {
    return {
      testAction: {
        function: (args) => {
          this.updateModel({test: args.test});
        },
        required: true
      }
    };
  }
  updateModel(partial = {}) {
    if (typeof partial === 'object') {
      _.assignIn(this.model, partial);
    }
  }
  registerActions(actions) {
    let output;
    for (let key in actions) {
      output[key] = {
        callback: actions[key].function,
        required: actions[key].required,
        fired: false
      };
    }
    return output;
  }
  checkFiredActions(requiredOnly = false) {
    for (let key in this.actions) {
      if (requiredOnly && this.actions[key].required) {
        continue;
      } else {
        return false;
      }
      if (this.actions[key].fired) {
        continue;
      } else {
        return false;
      }

    }
    return true;
  }
  action(name, args) {
    this.actions[name].callback(args);
    this.actions[name].fired = true;

    if (this.checkFiredActions(true)) {
      this.allReqActionsFired = true;
    }
  }
  nextTurn() {
    // check if all required actions have been taken
    // up then turn counter
    this.currentTurn++
    // check if last player for the round is ending their turn
      // if so, up the round counter

    // check win/lose conditions for game over.

    // populate the actions for the next turn.
    this.actions = this.registerActions(this.populateActions());
  }
}


class Stage {
  constructor(actions) {
    this.actions = registerActions(actions);
    this.allActionsFired = false;
  }
  registerActions(actions) {
    let output;
    for (let key in actions) {
      output[key] = {
        callback: actions[key],
        fired: false
      };
    }
    return output;
  }
  checkFiredActions() {
    for (let key in this.actions) {
      if (!this.actions[key].fired) {
        return false;
      } else {
        continue;
      }
    }
    return true;
  }
  action(name, args) {
    this.actions[name].callback(args);
    this.actions[name].fired = true;

    if (this.checkFiredActions()) {
      this.allActionsFired = true;
    }
  }
}
