// The reason we disable equal strict because we want a no strict for comparisons operator.
/* eslint eqeqeq:0 */

'use strict';

/**
 * Unstrict Operator
 * @param {string} operator
 * @param {*} v     this is the property value
 * @param {*} s     this is the search value
 * @return {bool}
 */
function unstrict (operator, v, s) {
  switch (operator) {
    case '=':
      return v == s;
    case '==':
      return v == s;
    case '!=':
      return v != s;
    default:
      throw new Error('Comparisons operator is not available!');
  }
}

module.exports = {
  unstrict
};
