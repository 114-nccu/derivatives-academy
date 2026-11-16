(function(){'use strict';
  const $=id=>document.getElementById(id);
  const ui={position:$('position'),strike:$('strike'),premium:$('premium'),terminal:$('terminal'),k:$('strike-value'),p:$('premium-value'),s:$('terminal-value'),profit:$('profit'),intrinsic:$('intrinsic'),breakeven:$('breakeven'),explain:$('scenario'),chart:$('payoff-chart')};
  if(!ui.chart)return;
  const fmt=x=>Number(x).toFixed(2);
  function draw(){
    const pos=ui.position.value,k=+ui.strike.value,p=+ui.premium.value,st=+ui.terminal.value;
    ui.k.textContent=fmt(k);ui.p.textContent=fmt(p);ui.s.textContent=fmt(st);
    const result=DerivativesPayoff.payoff(pos,k,p,st),iv=DerivativesPayoff.intrinsic(pos,k,st),be=DerivativesPayoff.breakeven(pos,k,p);
    ui.profit.textContent=(result>0?'+':'')+fmt(result);ui.profit.className=result>=0?'profit':'loss';
    ui.intrinsic.textContent=fmt(iv);ui.breakeven.textContent=be>=0?fmt(be):'無非負損益兩平價';
    const isLong=pos.startsWith('long');
    ui.explain.textContent=`${DerivativesPayoff.positions[pos]}：到期標的價格 ${fmt(st)}，內含價值 ${fmt(iv)}，${isLong?'支付':'收取'}權利金 ${fmt(p)}，因此每單位標的到期淨損益為 ${fmt(result)}。`;
    // SVG chart is generated locally with DOM-safe numbers only. No external APIs.
    const W=660,H=320,pad={l:63,r:22,t:20,b:48};const xmin=0,xmax=160;
    const prices=Array.from({length:81},(_,i)=>xmin+(xmax-xmin)*i/80);
    const values=prices.map(x=>DerivativesPayoff.payoff(pos,k,p,x));
    const low=Math.min(...values,0),high=Math.max(...values,0),gap=Math.max((high-low)*.12,5),ymin=low-gap,ymax=high+gap;
    const xScale=x=>pad.l+(x-xmin)/(xmax-xmin)*(W-pad.l-pad.r);
    const yScale=y=>H-pad.b-(y-ymin)/(ymax-ymin)*(H-pad.b-pad.t);
    const points=prices.map((x,i)=>(i?'L':'M')+xScale(x).toFixed(2)+' '+yScale(values[i]).toFixed(2)).join(' ');
    const yy=yScale(0),xmark=xScale(st),ymark=yScale(result);
    const yTick=[ymin,0,ymax].map(v=>`<g><line x1="${pad.l}" y1="${yScale(v)}" x2="${W-pad.r}" y2="${yScale(v)}" stroke="#4f6476" stroke-dasharray="3 6" opacity=".65"/><text x="${pad.l-12}" y="${yScale(v)+4}" text-anchor="end" fill="#aabdc8" font-size="12">${v.toFixed(0)}</text></g>`).join('');
    const xTick=[0,40,80,120,160].map(v=>`<text x="${xScale(v)}" y="${H-19}" text-anchor="middle" fill="#aabdc8" font-size="12">${v}</text>`).join('');
    ui.chart.setAttribute('viewBox',`0 0 ${W} ${H}`);
    ui.chart.innerHTML=`<title>到期損益曲線：${DerivativesPayoff.positions[pos]}</title><desc>橫軸為到期標的價格，縱軸為每單位到期淨損益，點為目前情境。</desc>`+
      `${yTick}<line x1="${pad.l}" y1="${yy}" x2="${W-pad.r}" y2="${yy}" stroke="#a7c3c4" opacity=".8"/><path d="${points}" fill="none" stroke="#7ee0be" stroke-width="3" stroke-linecap="round"/>`+
      `<line x1="${xmark}" y1="${pad.t}" x2="${xmark}" y2="${H-pad.b}" stroke="#e8c88d" stroke-dasharray="5 6" opacity=".7"/>`+
      `<circle cx="${xmark}" cy="${ymark}" r="6" fill="#e8c88d" stroke="#102236" stroke-width="2"/>${xTick}`+
      `<text x="${W/2}" y="${H-2}" text-anchor="middle" fill="#c1d4df" font-size="13">到期標的價格 Sₜ</text>`+
      `<text x="13" y="${H/2}" transform="rotate(-90 13 ${H/2})" text-anchor="middle" fill="#c1d4df" font-size="13">淨損益</text>`;
  }
  [ui.position,ui.strike,ui.premium,ui.terminal].forEach(el=>el.addEventListener('input',draw));
  draw();
})();
