# RomanYear

Roman numeral converter for 1 to 3999, both directions.

Standard form with subtractive pairs IV, IX, XL, XC, CD, CM; maximum 3999 = MMMCMXCIX (https://en.wikipedia.org/wiki/Roman_numerals). Clock style writes 4 as IIII (also XLIIII for 44, the Colosseum gate example on that page).
Tests: 40 checks, including a round trip for every value from 1 to 3999. The reader is strict: it accepts the standard form and the clock style, and reports the standard form for others (IC is not 99; XCIX is).
Out of scope: numbers above 3999 (vinculum), zero, and mixed additive styles beyond IIII.

Static client-side. `node test-engine.js` runs the tests.
