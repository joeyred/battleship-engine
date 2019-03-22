export function coordinatesMatch(firstSet, secondSet) {
  if (firstSet) {
    return (firstSet[0] === secondSet[0] && firstSet[1] === secondSet[1]);
  }
  return false;
}

export function checkForShip(player, coordinates) {
  let shipCoordinates;
  for (let shipIndex = 0; shipIndex < player.ships.length; shipIndex++) {
    for (
      let locationsIndex = 0;
      locationsIndex < player.ships[shipIndex].locations.length;
      locationsIndex++
    ) {
      shipCoordinates = player.ships[shipIndex].locations[locationsIndex];
      if (coordinatesMatch(shipCoordinates, coordinates)) {
        return shipIndex;
      }
    }
  }
  return false;
}

export function validateLocation (player, coordinates) {
  const x = coordinates[0];
  const y = coordinates[1];
  const spaceAvailable = checkForShip(player, coordinates);
  if ((x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
    if (typeof spaceAvailable !== 'number') {
      return true;
    }
  }
  return false;
}

export function validateLocations (player, locations) {
  const validated = locations.map(function (location) {
    return validateLocation(player, location);
  });
  return validated.indexOf(false) === -1;
}

export function generateLocations(startingCoordinates, size, orientation) {
  let locations = [];
  let previousLocation,
    x,
    y;

  for (let i = 0; i < size; i++) {
    if (i === 0) {
      locations[i] = startingCoordinates;
    } else {
      // console.log(`iteration ${i}`);
      previousLocation = locations[i - 1];
      x = previousLocation[0];
      y = previousLocation[1];

      if (orientation === 'horizontal') {
        locations[i] = [++x, y];
      }
      if (orientation === 'vertical') {
        locations[i] = [x, ++y];
      }
    }

  }
  return locations;
}

/**
 * Determines if a space can still be fired upon, or if it already has been fired on.
 *
 * @method spaceCanBeFiredOn
 *
 * @param  {Array}          coordinates       - Coordinates of the grid space to check.
 * @param  {Array}          unavailableSpaces - Array of spaces that have already been fired on.
 * @return {Boolean}                          - True if the space can be fired on, false if not.
 */
export function spaceCanBeFiredOn(coordinates, unavailableSpaces) {
  for (let i = 0; i < unavailableSpaces.length; i++) {
    if (coordinatesMatch(unavailableSpaces[i], coordinates)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks whether all of a players ships have been destroyed, thus ending the game.
 *
 * @method endGameCondition
 *
 * @param  {Array}         ships - The array containing the ship data objects of
 *                                 the player being checked.
 *
 * @return {Boolean}             - True if the game is over, False if not.
 */
export function endGameCondition(ships) {
  for (let i = 0; i < ships.length; i++) {
    if (ships[i].destroyed === false) {
      return false;
    }
  }
  return true;
}
