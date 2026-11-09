/* Static guide: no analytics, network requests, accounts or remote storage. */
(() => {
  'use strict';
  const G=window.GUIDE, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const usd=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const local=(n,c)=>new Intl.NumberFormat('en-US',{style:'currency',currency:c.currency,maximumFractionDigits:0}).format(n*c.rate);
  const byId=id=>G.countries.find(c=>c.slug===id);
  const total=(c,t=1)=>c.budgets[t].reduce((a,b)=>a+b,0);
  const options=G.countries.map(c=>`<option value="${c.slug}">${esc(c.name)}</option>`).join('');
  $('#country-filter').insertAdjacentHTML('beforeend',options);
  $('#calc-country').innerHTML=options;$('#calc-country').value='thailand';
  $('#role-filter').innerHTML='<option value="all">All school leads</option><option value="primary">Primary / elementary postings</option><option value="secondary">Secondary / subject postings</option><option value="support">Learning support / EAL postings</option>';
  $('#country-cards').innerHTML=G.countries.map(c=>`<article class="country-card" id="country-${c.slug}" data-country="${c.slug}"><div class="country-title"><h3>${esc(c.name)}</h3><span class="country-code" aria-hidden="true">${c.code}</span></div><p class="tagline">${esc(c.tagline)}</p><p class="country-summary">${esc(c.summary)}</p>${c.notice?`<p class="notice">${esc(c.notice)} <a href="https://travel.state.gov/en/international-travel/travel-advisories/united-arab-emirates.html" target="_blank" rel="noopener">Current advisory ↗</a></p>`:''}<div class="country-facts"><div><span>Comfortable planning budget</span><strong>${usd(total(c))} / month</strong></div><div><span>Local-currency equivalent</span><strong>${local(total(c),c)} / month</strong></div></div><details class="country-body"><summary>Read the ${esc(c.name)} field notes</summary><p class="small">Research checked November 8, 2026. Neighborhood choices are scouting suggestions. Budgets are planning scenarios; school and immigration approval remain individual decisions.</p>${c.sections.map(s=>`<section><h4>${esc(s.title)}</h4>${s.html}</section>`).join('')}</details></article>`).join('');
  $('#comparison tbody').innerHTML=G.countries.map(c=>`<tr><td><a href="#country-${c.slug}">${esc(c.name)}</a></td><td>${c.teach}</td><td>${c.independent}</td><td>${usd(total(c))}</td><td>${esc(c.opportunity)}</td><td>${esc(c.gate)}</td></tr>`).join('');
  function rank(mode){
    const key=mode==='teaching'?'teach':'independent';
    const list=[...G.countries].sort((a,b)=>a[key]-b[key]);
    $('#ranking-cards').innerHTML=list.slice(0,3).map((c,i)=>`<article class="rank-card"><span class="rank-number" aria-hidden="true">0${i+1}</span><p class="eyebrow">${mode==='teaching'?'TEACHING SEARCH':'INDEPENDENT-INCOME SEARCH'} / ${i+1}</p><h3>${esc(c.name)}</h3><p class="rank-city">${esc(c.city)}</p><p>${esc(mode==='teaching'?c.reason:c.livingReason)}</p><p><strong>${usd(total(c))}/month</strong> comfortable scenario<br><span class="small">${usd(c.setup+2*c.budgets[1][0]+8*total(c))} upfront baseline with a six-month reserve; adjust in the calculator.</span></p><a href="#country-${c.slug}">Read the field notes ↗</a></article>`).join('');
    $('#rank-note').textContent=mode==='teaching'?'Start with Thailand, Mexico and Greece for school-led research under the assumed profile. The UAE offers strong documented compensation but currently carries a Level 3 travel advisory. A verified vacancy is not yet a job offer.':'Start with Spain, Portugal and Mexico if independent income meets the specific visa rules. “Independent income” does not mean automatic permission to teach. Panama can rise into the top three if qualifying lifetime pension income is confirmed.';
    $$('[data-rank]').forEach(b=>{b.classList.toggle('active',b.dataset.rank===mode);b.setAttribute('aria-pressed',String(b.dataset.rank===mode));});
  }
  $$('[data-rank]').forEach(b=>b.addEventListener('click',()=>rank(b.dataset.rank)));rank('teaching');
  function filter(){
    const country=$('#country-filter').value,role=$('#role-filter').value;let n=0;
    G.countries.forEach(c=>{const show=(country==='all'||country===c.slug)&&(role==='all'||c.roles.includes(role));$(`#country-${c.slug}`).hidden=!show;if(show)n++;});
    $('#filter-status').textContent=`${n} ${n===1?'country':'countries'} shown. ${role==='all'?'School leads include current postings, local-only roles and schools to monitor; each is labeled.':'Role filters show countries with matching researched postings. Subject fit, sponsorship, deadlines and school-specific qualifications still need confirmation.'}${n===0?' Try another role or reset the filters.':''}`;
  }
  $('#country-filter').addEventListener('change',filter);$('#role-filter').addEventListener('change',filter);
  $('#reset-filters').addEventListener('click',()=>{$('#country-filter').value='all';$('#role-filter').value='all';filter();});filter();
  function revealHash(){const slug=location.hash.replace('#country-','');if(!location.hash.startsWith('#country-')||!byId(slug))return;$('#country-filter').value='all';$('#role-filter').value='all';filter();$(`#country-${slug} details`).open=true;}
  window.addEventListener('hashchange',revealHash);revealHash();
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#country-"]');if(a){const id=a.getAttribute('href');$('#country-filter').value='all';$('#role-filter').value='all';filter();$(`${id} details`).open=true;}});
  const residence={greece:['Potentially after 5 qualifying years','Usually 7 years; some residence categories require 12'],italy:['Potentially after 5 qualifying years','Generally 10 years for non-EU nationals; B1 and other conditions'],thailand:['May apply after 3 qualifying annual nonimmigrant permissions; category and quota apply','Separate, discretionary process; official timeline descriptions conflict'],uae:['Renewable ordinary or qualifying long-term residence','Exceptional nomination; no ordinary teacher-to-citizen timeline'],spain:['Generally 5 qualifying continuous years','Generally 10 years; renunciation declaration rules matter'],portugal:['Generally 5 years holding temporary residence','New U.S. scenario: 10 years under May 2026 law'],mexico:['Conversion may be requested after 4 consecutive temporary-resident years','Generally 5 qualifying years; Spanish/history and travel rules'],panama:['Route-specific; Pensionado can be indefinite if qualified','Constitutional 5-year residence application route; counting and renunciation need advice']};
  $('#residence-comparison').innerHTML='<table><thead><tr><th>Country</th><th>Permanent or stronger residence</th><th>Citizenship application milestone</th></tr></thead><tbody>'+G.countries.map(c=>`<tr><td><a href="#country-${c.slug}">${esc(c.name)}</a></td><td>${residence[c.slug][0]}</td><td>${residence[c.slug][1]}</td></tr>`).join('')+'</tbody></table>';
  $('#salary-evidence').innerHTML=G.countries.map(c=>`<article class="salary-card"><h4>${esc(c.name)}</h4><p>${esc(c.salary)}</p><a href="#country-${c.slug}">Evidence, terms & school links ↗</a></article>`).join('');
  function number(id,max=1000000){const n=Number($(id).value);return Number.isFinite(n)?Math.min(max,Math.max(0,n)):0;}
  function calculate(){
    const c=byId($('#calc-country').value),tier=Number($('#calc-tier').value),b=[...c.budgets[tier]],gross=b.reduce((a,x)=>a+x,0),extra=number('#calc-extra');
    const housing=Math.min(number('#calc-housing'),b[0]),insurance=Math.min(number('#calc-insurance'),b[5]);
    b[0]-=housing;b[5]-=insurance;
    const spending=b.reduce((a,x)=>a+x,0)+extra,income=number('#calc-income'),balance=income-spending,reserve=Math.min(24,Math.max(1,Math.floor(number('#calc-reserve',24)||1)));
    const deposit=2*c.budgets[tier][0],bridge=2*spending,emergency=reserve*(gross+extra),upfront=c.setup+deposit+bridge+emergency;
    $('#calc-surplus').textContent=usd(balance);$('.money-main').classList.toggle('negative',balance<0);
    $('#calc-surplus-note').textContent=balance<0?'Monthly shortfall: revise the offer or spending before committing.':`${local(balance,c)} local equivalent; before any omitted obligations.`;
    $('#calc-total').textContent=usd(spending);$('#calc-upfront').textContent=usd(upfront);
    $('#calc-upfront-note').textContent=`${usd(c.setup)} arrival/setup + ${usd(deposit)} housing deposit/advance placeholder + ${usd(bridge)} two-month pay bridge + ${usd(emergency)} ${reserve}-month reserve without employer benefits. Excludes a car or home purchase and investment-visa capital.`;
    $('#budget-lines').innerHTML=b.map((v,i)=>`<tr><td>${G.categories[i]}${(i===0&&housing)||(i===5&&insurance)?' (after direct benefit)':''}</td><td>${usd(v)}</td></tr>`).join('')+`<tr><td>Extra costs / debt</td><td>${usd(extra)}</td></tr>`;
  }
  $$('.calculator input,.calculator select').forEach(e=>e.addEventListener('input',calculate));calculate();
  $('#budget-comparison').innerHTML='<table><caption>All-country monthly planning scenarios — USD, one adult, no employer subsidy</caption><thead><tr><th>Country</th><th>Modest</th><th>Comfortable</th><th>Higher comfort</th><th>Comfortable housing allowance</th></tr></thead><tbody>'+G.countries.map(c=>`<tr><td>${esc(c.name)}</td>${c.budgets.map((x,i)=>`<td>${usd(total(c,i))}</td>`).join('')}<td>${usd(c.budgets[1][0])}</td></tr>`).join('')+'</tbody></table>';
  const tasks=['Confirm citizenship, age, degree, license and years of experience.','Request a pension estimate before giving notice.','Verify three schools, their vacancies and sponsorship routes.','Compare written annual cash compensation and benefits.','Price individual health insurance and check medication rules.','Run a budget including debt, taxes and return trips.','Obtain the correct consular and credential checklists.','Test the school commute and inspect housing.','Set aside arrival funds, an emergency reserve and return airfare.','Record work/residence renewals, tax dates and credential expiry.'];
  const storageKey='agnes-abroad-checklist-v1';let saved={},storageOK=true;
  try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}');if(!saved||typeof saved!=='object'||Array.isArray(saved))saved={};}catch{saved={};storageOK=false;}
  $('#checklist').innerHTML=tasks.map((t,i)=>`<label class="check-item"><input type="checkbox" data-task="${i}" ${saved[i]?'checked':''}><span>${esc(t)}</span></label>`).join('');
  function progress(){const n=$$('#checklist input:checked').length;$('#check-progress').textContent=`${n} of ${tasks.length} complete. ${storageOK?'Saved only in this browser.':'Browser storage unavailable; ticks will last for this visit only.'}`;}
  $('#checklist').addEventListener('change',e=>{saved[e.target.dataset.task]=e.target.checked;try{localStorage.setItem(storageKey,JSON.stringify(saved));storageOK=true;}catch{storageOK=false;}progress();});
  $('#reset-checklist').addEventListener('click',()=>{saved={};$$('#checklist input').forEach(c=>c.checked=false);try{localStorage.removeItem(storageKey);}catch{storageOK=false;}progress();});progress();
  $('#sources-list').innerHTML=G.sources.map(s=>`<div class="source-item" data-source-search="${esc((s.title+' '+s.country+' '+s.url+' '+s.number).toLowerCase())}" id="source-${s.number}"><a href="${esc(s.url)}" target="_blank" rel="noopener">[${s.number}] ${esc(s.title)} ↗</a><span>${esc(new URL(s.url).hostname)} · checked November 8, 2026</span></div>`).join('');
  function sourceFilter(){const q=$('#source-search').value.trim().toLowerCase();let n=0;$$('.source-item').forEach(e=>{e.hidden=!e.dataset.sourceSearch.includes(q);if(!e.hidden)n++;});$('#source-count').textContent=`${n} of ${G.sources.length} source entries shown. Some sources support more than one section.`;}
  $('#source-search').addEventListener('input',sourceFilter);sourceFilter();
  const toggle=$('.menu-toggle'),nav=$('#navigation');function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  $$('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
  let printState=null;
  function beforePrint(){if(printState)return;printState=$$('details').map(d=>[d,d.open]);$$('details').forEach(d=>d.open=true);}
  function afterPrint(){if(!printState)return;printState.forEach(([d,open])=>d.open=open);printState=null;}
  window.addEventListener('beforeprint',beforePrint);window.addEventListener('afterprint',afterPrint);
  $('#print-guide').addEventListener('click',()=>{beforePrint();window.print();});
})();
