(function(){'use strict';
  const out=document.getElementById('test-results'),summary=document.getElementById('test-summary');
  if(!out)return;
  let passed=0;
  for(const [name,pos,k,p,st,expected] of PAYOFF_TEST_CASES){
    let actual,ok=false;
    try{actual=DerivativesPayoff.payoff(pos,k,p,st);ok=Math.abs(actual-expected)<1e-10;}catch(e){actual=String(e);}
    if(ok)passed++;
    const el=document.createElement('div');el.className='test-row '+(ok?'pass':'fail');
    const label=document.createElement('span');label.textContent=`${name}｜預期 ${expected.toFixed(2)} / 實際 ${typeof actual==='number'?actual.toFixed(2):actual}`;
    const state=document.createElement('strong');state.className='state';state.textContent=ok?'PASS':'FAIL';
    el.append(label,state);out.appendChild(el);
  }
  let rejects=false;
  try{DerivativesPayoff.payoff('long_call',100,5,-1);}catch(e){rejects=true;}
  const el=document.createElement('div');el.className='test-row '+(rejects?'pass':'fail');
  const label=document.createElement('span');label.textContent='輸入驗證｜負數標的價格應拒絕';const state=document.createElement('strong');state.className='state';state.textContent=rejects?'PASS':'FAIL';el.append(label,state);out.appendChild(el);
  if(rejects)passed++;const total=PAYOFF_TEST_CASES.length+1;
  summary.textContent=`${passed} / ${total} 項通過`;
  summary.className=passed===total?'profit':'loss';
})();
