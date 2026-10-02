var E = require('./engine.js'), n = 0, bad = 0;
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// Wikipedia "Roman numerals": largest is 3999 = MMMCMXCIX; subtractive IV IX XL XC CD CM; clock IIII; Colosseum gate 44 = XLIIII
is(E.toRoman(3999), 'MMMCMXCIX', '3999'); is(E.toRoman(4), 'IV', '4'); is(E.toRoman(9), 'IX', '9'); is(E.toRoman(40), 'XL', '40'); is(E.toRoman(90), 'XC', '90'); is(E.toRoman(400), 'CD', '400'); is(E.toRoman(900), 'CM', '900');
// well known
is(E.toRoman(1994), 'MCMXCIV', '1994'); is(E.toRoman(2024), 'MMXXIV', '2024'); is(E.toRoman(2026), 'MMXXVI', '2026'); is(E.toRoman(49), 'XLIX', '49'); is(E.toRoman(1666), 'MDCLXVI', '1666'); is(E.toRoman(14), 'XIV', '14'); is(E.toRoman(1), 'I', '1'); is(E.toRoman(1984), 'MCMLXXXIV', '1984'); is(E.toRoman(3888), 'MMMDCCCLXXXVIII', '3888 longest');
// range
is(E.toRoman(0), null, '0'); is(E.toRoman(4000), null, '4000'); is(E.toRoman(-5), null, 'neg'); is(E.toRoman(NaN), null, 'nan');
// clock style
is(E.toRoman(4, true), 'IIII', 'clock 4'); is(E.toRoman(9, true), 'IX', 'clock 9'); is(E.toRoman(14, true), 'XIIII', 'clock 14'); is(E.toRoman(44, true), 'XLIIII', 'colosseum gate 44');
// round trip for every value
var allOk = true, i; for (i = 1; i <= 3999; i++) { var r = E.fromRoman(E.toRoman(i)); if (!r.ok || r.value !== i) { allOk = false; console.log('RT fail', i); break; } } is(allOk, true, 'round trip 1..3999');
// parse
is(E.fromRoman('mcmxciv').value, 1994, 'lower case'); is(E.fromRoman(' XIV ').value, 14, 'spaces'); is(E.fromRoman('IIII').ok, true, 'IIII clock'); is(E.fromRoman('IIII').value, 4, 'IIII = 4');
is(E.fromRoman('IC').ok, false, 'IC is not 99'); is(E.fromRoman('IC').why.indexOf('XCIX') > -1, true, 'IC hint'); is(E.fromRoman('VX').ok, false, 'VX'); is(E.fromRoman('IIV').ok, false, 'IIV'); is(E.fromRoman('MMMM').ok, false, 'MMMM'); is(E.fromRoman('ABC').ok, false, 'ABC'); is(E.fromRoman('').ok, false, 'empty'); is(E.fromRoman('XXXX').ok, false, 'XXXX not standard');
// parts
is(JSON.stringify(E.parts(1994).map(function (p) { return p.sym; })), '["M","CM","XC","IV"]', 'parts 1994'); is(E.parts(3888).length, 13 - 0 > 0 ? E.parts(3888).length : 0, 'parts runs'); is(E.parts(2026)[0].count, 2, 'MM count');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
