(function (root) {
  'use strict';
  // Standard Roman numerals 1-3999. Subtractive forms: IV IX XL XC CD CM (Wikipedia, Roman numerals).
  var TABLE = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  var VAL = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  function toRoman(n, clockStyle) {
    n = Math.floor(n); if (!(n >= 1 && n <= 3999)) return null;
    var s = '', i; for (i = 0; i < TABLE.length; i++) while (n >= TABLE[i][0]) { s += TABLE[i][1]; n -= TABLE[i][0]; }
    return clockStyle ? s.replace(/^(.*?)IV/, '$1IIII') : s;
  }
  // Strict parse: accepts only the canonical form, and reports why otherwise.
  function fromRoman(str) {
    var t = String(str).trim().toUpperCase(); if (!t) return { ok: false, why: 'Empty' };
    if (!/^[IVXLCDM]+$/.test(t)) return { ok: false, why: 'Only the letters I V X L C D M are used' };
    var total = 0, i; for (i = 0; i < t.length; i++) { var v = VAL[t[i]], nx = VAL[t[i + 1]] || 0; total += v < nx ? -v : v; }
    var canon = toRoman(total);
    if (canon === t) return { ok: true, value: total };
    if (total >= 1 && total <= 3999 && toRoman(total, true) === t) return { ok: true, value: total, note: 'IIII for 4 is the clock-face style' };
    return { ok: false, why: canon ? 'Not the standard form. The standard form of ' + total + ' is ' + canon : 'Out of range' , value: total };
  }
  // Breakdown by place: e.g. 1994 -> M, CM, XC, IV
  function parts(n) { var out = [], i; n = Math.floor(n); for (i = 0; i < TABLE.length; i++) { var c = 0; while (n >= TABLE[i][0]) { c++; n -= TABLE[i][0]; } if (c) out.push({ sym: TABLE[i][1], count: c, each: TABLE[i][0] }); } return out; }
  var api = { toRoman: toRoman, fromRoman: fromRoman, parts: parts };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Rom = api;
})(typeof window !== 'undefined' ? window : this);
