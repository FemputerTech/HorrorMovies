/**
 * Validation helper functions
 */

class Validation {
  constructor() {
    this.subgenres = {
      "analog-horror": 319324,
      "body-horror": 283085,
      "creature-feature": 158126,
      "folk-horror": 178856,
      "found-footage": 163053,
      "horror-comedy": 224636,
      giallo: 272242,
      gothic: 33505,
      occult: 156174,
      paranormal: 9853,
      psychological: 295907,
      slasher: 12339,
      supernatural: 6152,
      "survival-horror": 50009,
      vampire: 3133,
      werewolf: 12564,
      zombie: 12377,
    };

    this.moods = {
      creepy: 210458,
      mystery: 316332,
      nostalgia: 5609,
      ghost: 162846,
      witch: 616,
      dreamlike: 232997,
      ominous: 325839,
      macabre: 162810,
      halloween: 3335,
    };
  }

  validateMovieId(movieId) {
    return movieId && !isNaN(movieId);
  }

  validateSubgenre(subgenre) {
    return !!this.subgenres[subgenre.toLowerCase()];
  }

  validateMood(mood) {
    return !!this.moods[mood.toLowerCase()];
  }
}
module.exports = new Validation();
