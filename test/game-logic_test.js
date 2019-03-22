import {expect} from 'chai';
import {
  coordinatesMatch,
  checkForShip,
  validateLocation,
  validateLocations,
  placeShip,
  generateLocations
} from '../engine/game-logic';

describe('GAME LOGIC', function() {
  describe('coordinatesMatch', function() {
    it('Should return true if array values match', function() {
      expect(coordinatesMatch([1, 1], [1, 1])).to.be.true;
    });
    it('Should return false if array values differ', function() {
      expect(coordinatesMatch([1, 1], [1, 2])).to.be.false;
    });
  });
  describe('checkForShip', function() {
    let player;

    before(function() {
      player = {
        ships: [
          {
            locations: [[0, 0], [0, 1]]
          },
          {
            locations: [[1, 0], [1, 1]]
          },
          {
            locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
          }
        ]
      };
    });

    // Report a Miss - No Ship at coordinate
    it('Should correctly report no ship at a given player\'s coordinate', function() {
      expect(checkForShip(player, [9, 9])).to.be.false;
    });

    // Report a Hit - Ship at coordinate
    it('Should correctly report a ship at a given player\'s coordinate', function() {
      expect(checkForShip(player, [0, 0])).to.equal(0);
    });

    // More than one coordinate
    it('Should handle ships located at more than one coordinate', function() {
      expect(checkForShip(player, [0, 1])).to.equal(0);
      expect(checkForShip(player, [0, 0])).to.equal(0);
      expect(checkForShip(player, [9, 9])).to.be.false;
    });

    // Check multiple ships
    it('Should handle checking multiple ships', function() {
      expect(checkForShip(player, [0, 1])).to.equal(0);
  		expect(checkForShip(player, [0, 0])).to.equal(0);
  		expect(checkForShip(player, [1, 0])).to.equal(1);
  		expect(checkForShip(player, [1, 1])).to.equal(1);
  		expect(checkForShip(player, [2, 3])).to.equal(2);
  		expect(checkForShip(player, [9, 9])).to.be.false;
    });
  });

  describe('validateLocation', function () {
    // var validateLocation = require('../game_logic/player_methods.js').validateLocation;
    var player;

    beforeEach(function () {
      player = {
        ships: [
          {
            locations: [[9, 9]]
          }
        ]
      };
    });

    it('shoud return true for unoccupied locations in range', function () {
      var location = [0, 0];
      var actual = validateLocation(player, location);

      expect(actual).to.be.true;
    });

    it('shoud confirm INvalid for occupied locations in range', function () {
      var location = [9, 9];
      var actual = validateLocation(player, location);

      expect(actual).to.be.false;
    });

    it('shoud confirm INvalid for UNoccupied locations OUT of range', function () {
      var locationHigh = [10, 10];
      var locationLow = [-1, -1];

      expect(validateLocation(player, locationHigh)).to.be.false;
      expect(validateLocation(player, locationLow)).to.be.false;
    });
  });

  describe('validateLocations', function () {
    // var validateLocations = require('../game_logic/player_methods.js').validateLocations;
    var player;

    beforeEach(function () {
      player = {
        ships: [
          {
            locations: [[0, 0]]
          }
        ]
      };
    });

    it('should correctly report a list of unoccupied locations is valid', function () {
      var locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
      expect(validateLocations(player, locations)).to.be.ok;
    });

    it('should correctly report a a problem if any location in the list is invalid', function () {
      var locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
      expect(validateLocations(player, locations)).to.be.false;

      locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
      expect(validateLocations(player, locations)).to.be.false;
    });
  });

  describe('generateLocations', function() {
    it('Should return an array where the first nested array matches the passed startingCoordinates', function() {
      expect(generateLocations([2, 3], 3, 'horizontal')[0]).to.deep.equal([2, 3]);
    });
    it('Should return an array with the length matching the passed size', function() {
      expect(generateLocations([1, 1], 5, 'vertical')).to.have.lengthOf(5);
      expect(generateLocations([0, 0], 3, 'horizontal')).to.have.lengthOf(3);
    });
    it('Should incement y value of nested arrays if `vertical` is passed', function() {
      const locations = [[0, 1], [0, 2], [0, 3], [0, 4]];
      expect(generateLocations([0, 1], 4, 'vertical')).to.deep.equal(locations);
    });
    it('Should incement x value of nested arrays if `horizontal` is passed', function() {
      const locations = [[0, 1], [1, 1], [2, 1], [3, 1]];
      expect(generateLocations([0, 1], 4, 'horizontal')).to.deep.equal(locations);
    });
  });
});
