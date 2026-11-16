(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports){module.exports=api;}
  root.DerivativesPayoff=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
  const positions={long_call:'Long Call',short_call:'Short Call',long_put:'Long Put',short_put:'Short Put'};
  function validate(position,strike,premium,terminal){
    if(!Object.prototype.hasOwnProperty.call(positions,position)) throw new Error('未知部位：'+position);
    for(const [name,value] of Object.entries({strike,premium,terminal})){
      if(typeof value!=='number'||!Number.isFinite(value)) throw new Error(name+' 必須是有限數字');
      if(value<0) throw new Error(name+' 不可小於零');
    }
    if(strike===0) throw new Error('履約價必須大於零');
  }
  function intrinsic(position,strike,terminal){
    if(position==='long_call'||position==='short_call')return Math.max(terminal-strike,0);
    return Math.max(strike-terminal,0);
  }
  function payoff(position,strike,premium,terminal){
    validate(position,strike,premium,terminal);
    const iv=intrinsic(position,strike,terminal);
    return (position.startsWith('long_')?iv-premium:premium-iv);
  }
  function breakeven(position,strike,premium){
    if(!Object.prototype.hasOwnProperty.call(positions,position))throw new Error('未知部位');
    if(!Number.isFinite(strike)||strike<=0||!Number.isFinite(premium)||premium<0)throw new Error('無效參數');
    return position.includes('call')?strike+premium:strike-premium;
  }
  return Object.freeze({positions,payoff,intrinsic,breakeven});
});
