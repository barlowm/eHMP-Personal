(function(){
// drilldown.js
// simple nevernull alternative
'use strict';

/**
 * drilldown
 * Safely accesses deep properties of objects.
 *
 * var foo;
 * foo.bar;
 * // TypeError: Cannot read property 'bar' of undefined
 *
 * var foo = {abc: {def: {ghi: 'jkl'}}};
 * dd(foo)('abc')('def')('ghi').val is 'jkl'
 * dd(foo)('abc')('zzz')('yyy').val is undefined
 *
 * Check if a deep property exists:
 * dd(foo)('abc').exists
 *
 * Works with arrays too:
 * var foo = {abc: [ {bar: 'def'},{bar: 'ghi'} ]};
 * dd(foo)('abc')(0)('bar') is 'def'
 *
 * Safely call functions:
 * var foo = {abc: {addOne: function(x) { return x + 1; }}};
 * dd(foo)('abc')('addOne').func(5); returns 6
 * dd(foo)('zzz')('aaa').func(5); returns undefined
 *
 * Set values if the original value exists:
 * var foo = {abc: {def: {ghi: 'jkl'}}};
 * var newValue = {ping: 'pong'};
 * dd(foo)('abc')('def').set(newValue);
 *   - foo is now {abc: {def: {ping: 'pong'}}}
 *   - {ping: 'pong'} is returned
 * dd(foo)('abc')('zzz').set(5);
 *   - foo is unchanged
 *   - undefined is returned
 *
 * Available properties:
 *  - val - the value
 *  - exists - true if val is defined
 *  - set function(value) - sets the value if the value exists
 *  - func - the value if the value is a function, or else a dummy function
 *
 * @param {object} object
 * @param _context
 * @param _key
 * @returns {Function}
 */
function dd(object, _context, _key) {
    var drill = function(key) {
        return dd(object && object[key], object, key);
    };
    drill.val = object;
    drill.exists = typeof object !== 'undefined';
    drill.set = function(value) {
        if(drill.exists) {
            _context[_key] = value;
            drill.val = value;
            return value;
        }
    };
    drill.func = _.isFunction(object) ? object : console.log.bind(null, 'dd', object);
    return drill;
}

window.dd = dd;

})();
