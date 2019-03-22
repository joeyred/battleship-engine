import {expect} from 'chai';
import {BattleshipEngine} from '../engine/game.js';

describe('BATTLESHIP ENGINE', function() {
  describe('buildDataModel', function() {
    it('Should create two player objects', function() {
      let engine = new BattleshipEngine();
      // console.log(engine.model);
      expect(engine.model).to.have.property('players').with.lengthOf(2);
      expect(engine.model.players[0]).to.be.an('object');
      expect(engine.model.players[1]).to.be.an('object');
    });
    it('Should create identical player objects', function() {
      let engine = new BattleshipEngine();

      expect(engine.model.players[0]).to.deep.equal(engine.model.players[1]);
    });
  });

  describe('action', function() {
    it('Should fire method with no passed params if `args` isn\'t passed', function() {
      let engine = new BattleshipEngine();
      engine.actions = ['test'];
      engine.testProp = 'foo';
      engine.test = () => {
        engine.testProp = 'bar';
      }
      engine.action('test');
      expect(engine.testProp).to.equal('bar');
    });
    it('Should fire method with no passed params if `args` isn\'t passed', function() {
      let engine = new BattleshipEngine();
      engine.actions = ['test'];
      engine.testProp = 'foo';
      engine.test = () => {
        engine.testProp = 'bar';
      }
      engine.action('test');
      expect(engine.testProp).to.equal('bar');
    });
  });



  // describe('action:placeShip', function() {
  //   beforeEach(function() {
  //
  //   });
  //
  //   it('Should place ship if coordinates are empty', function() {
  //     let engine = new BattleshipEngine();
  //     engine.startGame();
  //     console.log(engine.model.players[0].ships[0].locations);
  //     const carrierLocations = [
  //       [1, 1],
  //       [1, 2],
  //       [1, 3],
  //       [1, 4],
  //       [1, 5]
  //     ];
  //
  //     engine.placeShip(
  //       {
  //         shipName: 'Carrier',
  //         startingCoordinates: [1, 1],
  //         direction: 'vertical'
  //       }
  //     );
  //     console.log(engine.model.players[0].ships[0].locations);
  //     expect(engine.model.players[0].ships[0].locations).to.deep.equal(carrierLocations);
  //   });
  // });
});
