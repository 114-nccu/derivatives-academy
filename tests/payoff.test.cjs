'use strict';
const assert=require('node:assert/strict');
const P=require('../assets/payoff.js');
const cases=require('./test-cases.js');
for(const [label,position,k,p,terminal,expected] of cases){
  assert.ok(Math.abs(P.payoff(position,k,p,terminal)-expected)<1e-10,label);
}
assert.throws(()=>P.payoff('long_call',100,5,-1));
assert.throws(()=>P.payoff('long_call',0,5,100));
assert.throws(()=>P.payoff('whatever',100,5,100));
console.log(`PASS: ${cases.length} payoff cases + 3 invalid-input checks`);
