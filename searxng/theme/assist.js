
;(()=>{
  if(window.__ddgRun)return;window.__ddgRun=1;
  const ago=s=>{const d=new Date(s.replace(' ','T'));if(isNaN(d))return s;const x=(Date.now()-d)/864e5;if(x<1)return 'today';if(x<30)return Math.floor(x)+'d';if(x<365)return Math.floor(x/30)+'mo';return Math.floor(x/365)+'yr'};
  const el=(t,c,txt)=>{const e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e};
  const host=u=>{try{return new URL(u,location.href).hostname.replace(/^www\./,'')}catch(e){return ''}};
  const svgNS='http://www.w3.org/2000/svg';
  const icon=(d,cls)=>{const s=document.createElementNS(svgNS,'svg');s.setAttribute('viewBox','0 0 24 24');s.setAttribute('class','ddg-ic '+(cls||''));d.split('|').forEach(p=>{const e=document.createElementNS(svgNS,'path');e.setAttribute('d',p);s.appendChild(e)});return s};
  const IC={
    search:'M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.25 4.25 1.41-1.41-4.25-4.25A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z',
    chev:'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z',
    right:'M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z',
    play:'M8 5v14l11-7z',
    spark:'M10 2l1.6 4.4L16 8l-4.4 1.6L10 14l-1.6-4.4L4 8l4.4-1.6zM18 12l.9 2.1L21 15l-2.1.9L18 18l-.9-2.1L15 15l2.1-.9z|M3 18h8v2H3z',
    chat:'M12 3C6.9 3 3 6.6 3 11c0 2.3 1.1 4.4 2.9 5.8L5.2 21l4.2-2.2c.8.2 1.7.3 2.6.3 5.1 0 9-3.6 9-8s-3.9-8.1-9-8.1Zm0 2c4 0 7 2.7 7 6s-3 6-7 6c-.9 0-1.7-.1-2.5-.4l-1.6.8.3-1.8C6.2 14.5 5 12.9 5 11c0-3.3 3-6 7-6Z|M12 7.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z',
    copy:'M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z',
    info:'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8Z',
    sliders:'M3 6h9v2H3zM17 6h4v2h-4zM12 4h3v6h-3z|M3 16h4v2H3zM12 16h9v2h-9zM7 14h3v6H7z',
    arrow:'M12 4l-1.4 1.4 5.6 5.6H4v2h12.2l-5.6 5.6L12 20l8-8z',
    x:'M18.3 5.7 12 12l6.3 6.3-1.4 1.4L12 13.4l-6.3 6.3-1.4-1.4L10.6 12 4.3 5.7l1.4-1.4L12 10.6l6.3-6.3z',
    gear:'M19.4 13a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.4zM13 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'
  };
  const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
  const mqLight=matchMedia('(prefers-color-scheme: light)');
  const applyTheme=()=>{const t=store.get('ddg-theme')||'system';const light=t==='light'||(t==='system'&&mqLight.matches);const r=document.documentElement;r.classList.toggle('ddg-light',light);r.classList.toggle('ddg-dark',!light);document.querySelectorAll('img[data-ddg-logo]').forEach(i=>{i.src='/static/themes/simple/ddg/'+i.dataset.ddgLogo+'-'+(light?'light':'dark')+'.svg'})};
  applyTheme();mqLight.addEventListener('change',applyTheme);
  window.addEventListener('storage',e=>{if(e.key==='ddg-theme')applyTheme()});
  const svg16=(paths,vb)=>{const s=document.createElementNS(svgNS,'svg');s.setAttribute('viewBox',vb||'0 0 16 16');s.setAttribute('aria-hidden','true');paths.split('|').forEach(d=>{const p=document.createElementNS(svgNS,'path');p.setAttribute('d',d);p.setAttribute('fill','currentColor');p.setAttribute('fill-rule','evenodd');s.appendChild(p)});return s};
  const D16={
    search:'M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7c1.708 0 3.273-.612 4.488-1.628l3.445 3.445c.244.244.64.244.884 0s.244-.64 0-.884l-3.445-3.445C13.388 10.273 14 8.708 14 7c0-3.866-3.134-7-7-7M1.25 7c0-3.176 2.574-5.75 5.75-5.75S12.75 3.824 12.75 7 10.176 12.75 7 12.75 1.25 10.176 1.25 7',
    ai:'m10.54 12.57-.047.02c-.81.372-2.323.786-4.064 1.174-1.12.25-2.284.478-3.324.67l.297-.343c.781-.901.554-2.169-.215-2.85-1.22-1.08-1.937-2.539-1.937-4.116C1.25 4.013 4.132 1.25 8 1.25s6.75 2.763 6.75 5.875c0 2.372-1.644 4.514-4.161 5.427zm.475 1.157c-1.891.868-6.545 1.75-9.2 2.206-.665.114-1.092-.66-.65-1.17l1.293-1.491c.28-.322.22-.813-.1-1.096C.902 10.886 0 9.1 0 7.125 0 3.19 3.582 0 8 0s8 3.19 8 7.125c0 2.985-2.061 5.541-4.985 6.602|M7.62 3.271c.099-.396.661-.396.76 0l.22.878c.292 1.17 1.206 2.084 2.376 2.376l.878.22c.396.099.396.661 0 .76l-.878.22c-1.17.292-2.084 1.206-2.377 2.377l-.219.877c-.099.396-.661.396-.76 0l-.22-.877c-.292-1.17-1.206-2.085-2.377-2.377l-.877-.22c-.396-.099-.396-.661 0-.76l.877-.22C6.193 6.233 7.108 5.32 7.4 4.15z',
    burger:'M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75m0 10.5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75m.75-6a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z',
    x:'M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06'
  };
  const pid=Math.random().toString(36).slice(2);
  const ask=(body,onText,signal,onHead)=>fetch('/assist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({pid},body)),signal}).then(async r=>{
    if(!r.ok||!r.body)throw 0;if(onHead)onHead(r.headers);const rd=r.body.getReader(),dec=new TextDecoder();let t='';
    for(;;){const{done,value}=await rd.read();if(done)break;t+=dec.decode(value,{stream:true});if(onText&&t.trim())onText(t.replace(/^\s+/,''))}
    if(!t.trim())throw 0;return t.trim();
  });
  const skel=n=>{const s=el('div','ddg-skel');for(let i=0;i<n;i++)s.appendChild(el('span'));return s};

  const header=()=>{
    const cc=document.getElementById('categories_container');
    if(!cc||cc.dataset.ddg)return;cc.dataset.ddg=1;
    const btns=[...cc.querySelectorAll('.category_button')];
    const keep=['general','images','videos','news'];
    const label={general:'All',images:'Images',videos:'Videos',news:'News',map:'Maps',music:'Music',it:'IT',science:'Science',files:'Files','social media':'Social'};
    const more=el('div','ddg-more');const mb=el('button','ddg-more-btn','More');mb.type='button';mb.appendChild(icon(IC.chev));
    const menu=el('div','ddg-more-menu');more.append(mb,menu);
    btns.forEach(b=>{
      const k=(b.name||'').replace('category_','');const n=b.querySelector('.category_name');
      if(n)n.textContent=label[k]||n.textContent;
      if(k==='general')b.prepend(icon(IC.search,'ddg-ic-all'));
      if(!keep.includes(k)){menu.appendChild(b);if(b.classList.contains('selected'))mb.classList.add('selected')}
    });
    cc.insertBefore(more,cc.querySelector('#selected-categories'));
    mb.addEventListener('click',e=>{e.stopPropagation();more.classList.toggle('open')});
    document.addEventListener('click',()=>more.classList.remove('open'));
    const right=el('div','ddg-tabs-right');
    const sa=el('a','ddg-sa-toggle','Search Assist');sa.href='#';sa.prepend(icon(IC.spark));
    const outer=()=>document.querySelector('.ddg-sa-outer');
    const shown=()=>{const o=outer();return !!o&&!o.hidden};
    const sync=()=>sa.classList.toggle('on',shown());
    const setParam=v=>{const u=new URL(location.href);u.searchParams.set('assist',v);history.replaceState(null,'',u.pathname+u.search);sa.href=(()=>{const x=new URL(u);x.searchParams.set('assist',v==='true'?'false':'true');return x.pathname+x.search})()};
    sa.addEventListener('click',e=>{e.preventDefault();
      if(shown()){outer().hidden=true;setParam('false')}
      else{const o=outer();if(o&&(assistStarted||o.querySelector('.ddg-sa-go'))){o.hidden=false;const g=o.querySelector('.ddg-sa-go');if(g)g.click()}else{if(o)o.remove();assistStarted=false;assist(true,true)}setParam('true');const n=outer();if(n)n.scrollIntoView({block:'nearest'})}
      sync()});
    new MutationObserver(sync).observe(document.getElementById('urls')||document.body,{childList:true,subtree:false,attributes:true,attributeFilter:['hidden']});
    setTimeout(sync,0);
    right.appendChild(sa);
    const ai=el('a','ddg-ai-link','Ask AI');ai.href='#';ai.prepend(icon(IC.chat));
    ai.addEventListener('click',e=>{e.preventDefault();const q=((document.getElementById('q')||{}).value||'').trim();openChat([],q)});
    right.appendChild(ai);
    const pref=document.querySelector('#links_on_top .link_on_top_preferences');
    if(pref){const g=el('a','ddg-gear');g.href=pref.href;g.title='Settings';g.appendChild(icon(IC.gear));right.appendChild(g)}
    cc.appendChild(right);
  };

  const dropdowns=f=>{
    const all=[];
    f.querySelectorAll('select').forEach(sel=>{
      const dd=el('div','ddg-dd');const btn=el('button','ddg-dd-btn');btn.type='button';
      const lab=el('span');const cur=()=>sel.options[sel.selectedIndex];lab.textContent=cur()?cur().textContent:'';
      btn.append(lab,icon(IC.chev));
      const menu=el('div','ddg-dd-menu');
      [...sel.options].forEach(o=>{const it=el('button','ddg-dd-item'+(o.selected?' on':''),o.textContent);it.type='button';
        it.addEventListener('click',e=>{e.stopPropagation();if(o.selected){dd.classList.remove('open');return}sel.value=o.value;lab.textContent=o.textContent;dd.classList.remove('open');sel.form?sel.form.submit():null});
        menu.appendChild(it)});
      btn.addEventListener('click',e=>{e.stopPropagation();const was=dd.classList.contains('open');all.forEach(d=>d.classList.remove('open'));if(!was){dd.classList.add('open');const on=menu.querySelector('.on');if(on)menu.scrollTop=on.offsetTop-menu.clientHeight/2}});
      dd.append(btn,menu);sel.style.display='none';sel.after(dd);all.push(dd);
    });
    document.addEventListener('click',()=>all.forEach(d=>d.classList.remove('open')));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')all.forEach(d=>d.classList.remove('open'))});
  };

  const focusSuggest=()=>{
    const qi=document.getElementById('q');const ac=document.querySelector('.search_box .autocomplete');if(!qi||!ac)return;
    let ul=ac.querySelector('ul');if(!ul){ul=el('ul');ac.appendChild(ul)}
    qi.addEventListener('focus',()=>{
      const v=qi.value.trim();if(!v)return;
      fetch('/autocompleter?q='+encodeURIComponent(v)).then(r=>r.json()).then(j=>{
        if(document.activeElement!==qi||qi.value.trim()!==v)return;
        const list=(Array.isArray(j)?j[1]:[])||[];if(!list.length)return;
        ul.textContent='';
        list.slice(0,8).forEach(s=>{const li=el('li',null,s);li.addEventListener('mousedown',e=>{e.preventDefault();qi.value=s;ac.classList.remove('open');qi.form.submit()});ul.appendChild(li)});
        ac.classList.add('open');
      }).catch(()=>{});
    });
    qi.addEventListener('blur',()=>setTimeout(()=>ac.classList.remove('open'),150));
  };

  const filters=()=>{
    const f=document.querySelector('.search_filters');if(!f||f.dataset.ddg)return;f.dataset.ddg=1;
    const form=f.closest('form');const res=document.getElementById('results');
    if(form&&res&&document.body.classList.contains('results_endpoint')){if(!form.id)form.id='ddg-form';f.querySelectorAll('select,input,button').forEach(x=>x.setAttribute('form',form.id));res.before(f);f.classList.add('ddg-filters-out')}
    setTimeout(()=>dropdowns(f),0);
    const lang=f.querySelector('#language');
    if(lang){[...lang.options].forEach(o=>{let t=o.textContent.replace(/\s+/g,' ').replace(/\[[^\]]*\]/g,'').replace(/[\u{1F1E6}-\u{1F1FF}\u{1F310}]/gu,'').trim();const m=t.match(/^[^-]+-(.+)$/);if(m)t=m[1];if(o.value==='all')t='All regions';if(o.value==='auto')t='Auto region';o.textContent=t})}
    const safe=f.querySelector('#safesearch');
    if(safe)[...safe.options].forEach(o=>{o.textContent='Safe search: '+o.textContent.trim().replace(/^safe\s*search:?\s*/i,'').toLowerCase().replace('none','off')});
    const tr=f.querySelector('#time_range');
    if(tr)[...tr.options].forEach(o=>{const t=o.textContent.trim();o.textContent=/^anytime$/i.test(t)?'Any time':t});
  };

  const results=()=>{
    document.querySelectorAll('#urls article.result').forEach(a=>{
      if(a.dataset.ddg)return;a.dataset.ddg=1;
      const w=a.querySelector('.url_wrapper');const l=a.querySelector('.url_header');
      if(w&&l){const n=el('span','ddg-site',host(l.href));w.prepend(n);const o1=w.querySelector('.url_i1');if(o1)o1.textContent=o1.textContent.replace(/\/$/,'')}
      const th=a.querySelector('.thumbnail_link');
      if(th){
        const vid=/(^|\.)(youtube\.com|youtu\.be|dailymotion\.com|vimeo\.com|twitch\.tv|tiktok\.com|rumble\.com|bilibili\.com)$/.test(l?host(l.href):'')||a.classList.contains('video-result')||!!a.querySelector('.result_length,.length');
        if(!vid)th.remove();
        else if(!th.querySelector('.ddg-play')){a.classList.add('ddg-has-thumb');const p=el('span','ddg-play');p.appendChild(icon(IC.play));th.appendChild(p);
          const len=((a.querySelector('.result_length,.length')||{}).textContent||'').replace(/^[^0-9]*/,'').trim();if(len)th.appendChild(el('span','ddg-tlen',len))}
      }
    });
  };

  const BRAND={'youtube.com':'YouTube','youtu.be':'YouTube','dailymotion.com':'Dailymotion','vimeo.com':'Vimeo','twitch.tv':'Twitch','tiktok.com':'TikTok','rumble.com':'Rumble','bilibili.com':'bilibili'};
  const catKind=()=>{const s=document.querySelector('.category_button.selected');const k=s?(s.name||'').replace('category_',''):'general';return ['images','videos','news'].includes(k)?k:'general'};
  const catLayout=()=>{
    const kind=catKind();document.documentElement.dataset.cat=kind;
    document.querySelectorAll('#urls article.result-images:not([data-ddgi])').forEach(a=>{
      a.dataset.ddgi=1;const link=a.querySelector(':scope > a');if(!link)return;
      const res=(link.querySelector('.image_resolution')||{}).textContent||'';const m=res.match(/(\d+)\s*[×x]\s*(\d+)/);
      const r=m&&+m[2]?Math.min(Math.max(+m[1]/+m[2],.5),2.6):1.4;a.style.setProperty('--r',r.toFixed(3));
      const img=link.querySelector('img.image_thumbnail');if(!img)return;
      const w=el('span','ddg-iw');img.before(w);w.appendChild(img);
      const rs=link.querySelector('.image_resolution');if(rs){if(m)rs.textContent=m[1]+' × '+m[2];w.appendChild(rs)}
    });
    document.querySelectorAll('#urls article.category-news:not([data-ddgn])').forEach(a=>{
      a.dataset.ddgn=1;const meta=a.querySelector('.result_inner > div.highlight');const site=a.querySelector('.ddg-site');
      if(meta){const p=meta.textContent.split('|').map(s=>s.trim());if(p[1]&&site)site.textContent=p[1];
        const c=a.querySelector('.content');if(c&&p[0])c.prepend(el('span','ddg-ndate',p[0]+' | '));meta.remove()}
      else{const t=a.querySelector('time.published_date');const c=a.querySelector('.content');if(t&&c&&t.textContent.trim()){const g=ago(t.textContent.trim());c.prepend(el('span','ddg-ndate',(/^\d+(d|mo|yr)$/.test(g)?g.replace(/^1d$/,'1 day ago').replace(/^1mo$/,'1 month ago').replace(/^1yr$/,'1 year ago').replace(/(\d)d$/,'$1 days ago').replace(/(\d)mo$/,'$1 months ago').replace(/(\d)yr$/,'$1 years ago'):g)+' | '))}}
      a.querySelector('time.published_date')?.remove();
    });
    document.querySelectorAll('#urls article.category-videos:not([data-ddgv])').forEach(a=>{
      a.dataset.ddgv=1;const l=a.querySelector('.url_header');const site=a.querySelector('.ddg-site');const h=l?host(l.href):'';
      if(site)site.textContent=BRAND[h]||h;
      const meta=[];const t=a.querySelector('time');if(t&&t.textContent.trim())meta.push(ago(t.textContent.trim()));
      const vw=a.querySelector('.result_views');const vn=vw&&+vw.textContent.replace(/\D/g,'');if(vn)meta.push((vn>=1e6?(vn/1e6).toFixed(vn>=1e7?0:1)+'M':vn>=1e3?(vn/1e3).toFixed(vn>=1e4?0:1)+'K':vn)+' views');
      const h3=a.querySelector('h3');if(h3&&meta.length)h3.after(el('div','ddg-vmeta2',meta.join(' | ')));
      const len=a.querySelector('.thumbnail_length');if(len&&!len.querySelector('svg'))len.prepend(icon(IC.play));
    });
  };
  const answersBox=()=>{
    const box=document.getElementById('answers');if(!box||box.dataset.ddg)return;box.dataset.ddg=1;
    box.querySelectorAll('.answer').forEach(x=>{if(x.querySelector('.answer-url'))x.remove()});
    if(!box.querySelector('.answer')){box.remove();return}
    box.querySelector('.title')?.remove();const urls=document.getElementById('urls');if(urls)urls.prepend(box);
  };

  const items=()=>[...document.querySelectorAll('#urls article.result')].slice(0,5).map(a=>{
    const l=a.querySelector('h3 a');
    return{title:l?l.textContent.trim():'',url:l?l.href:'',content:((a.querySelector('.content')||{}).textContent||'').replace(/\s+/g,' ').trim()};
  }).filter(r=>r.url&&r.content.length>30).slice(0,4);

  const sidebar=()=>{
    const sb=document.getElementById('sidebar');if(!sb)return null;
    let side=document.getElementById('ddg-side');if(side)return side;
    side=el('div');side.id='ddg-side';
    const det=sb.querySelector('details.sidebar-collapsible');if(det&&det.querySelector('.infobox'))det.after(side);else sb.prepend(side);
    sb.querySelectorAll('.infobox:not([data-ddg])').forEach(ib=>{ib.dataset.ddg=1;
      const p=ib.querySelector(':scope > p');const wl=[...ib.querySelectorAll('.urls a')].find(a=>/wikipedia\.org/.test(a.href));
      if(p){const t=p.textContent.trim();const cut=t.length>320?t.slice(0,t.lastIndexOf(' ',300))+'…':t;p.textContent=cut+' ';if(wl){const a=el('a','ddg-ib-more','Continued in Wikipedia');a.href=wl.href;a.rel='noreferrer';p.appendChild(a)}}
      const urls=ib.querySelector('.urls');if(urls){const ls=[...urls.querySelectorAll('a')].filter(a=>a!==wl||!p);if(!ls.length)urls.remove();else{urls.prepend(el('div','ddg-ib-ql','Quick links'))}}
    });
    const q=(document.getElementById('q')||{}).value||'';
    const ql=q.trim().toLowerCase();
    let sug=[...sb.querySelectorAll('#suggestions input.suggestion')].map(i=>i.value.trim()).filter(Boolean);
    const ex=sug.filter(s=>s.toLowerCase()!==ql&&s.length>ql.length+2).slice(0,3);
    if(ex.length>=2&&mode()!=='never')sug=sug.filter(s=>!ex.includes(s));
    if(sug.length){
      const rel=el('div','ddg-related');const h=el('div','ddg-related-h','Searches related to ');h.appendChild(el('b',null,q));rel.appendChild(h);
      sug.slice(0,10).forEach(s=>{const a=el('a','ddg-related-row');const u=new URL('/search',location.href);u.searchParams.set('q',s);a.href=u.pathname+u.search;a.appendChild(icon(IC.search));a.appendChild(el('span',null,s));rel.appendChild(a)});
      side.appendChild(rel);
    }
    return side;
  };

  let assistDone;const assistGate=new Promise(r=>{assistDone=r});setTimeout(()=>assistDone(),20000);
  let assistStarted=false;
  const mode=()=>store.get('ddg-sa-mode')||'often';
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const SA_STATUS=[[0,['Searching the web…','Looking it up…','Searching…']],[1400,['Reading the sources…','Checking the sources…','Reading up…']],[5500,['Writing an answer…','Putting it together…','Pulling it together…']],[12000,['Almost there…','Nearly done…','Still on it…']]];
  const CHAT_STATUS=[[0,['Thinking…','On it…','Working on it…']],[9000,['Still thinking…','Nearly there…']]];
  const status=steps=>{const s=el('div','ddg-sa-status');const d=el('span','ddg-dots');for(let i=0;i<3;i++)d.appendChild(el('i'));const t=el('span');s.append(d,t);
    const tm=steps.map(([ms,a])=>setTimeout(()=>{t.textContent=pick(a)},ms));s.stop=()=>{tm.forEach(clearTimeout);s.remove()};return s};
  const srcPills=(it,n)=>{const src=el('span','ddg-assist-src');const seen=new Set();
    it.forEach(r=>{const h=host(r.url);if(!h||seen.has(h)||seen.size>=n)return;seen.add(h);const a=el('a');a.href=r.url;a.rel='noreferrer';
      const fi=document.querySelector(`#urls a.url_header[href="${CSS.escape(r.url)}"] .favicon img`);if(fi){const i=el('img');i.src=fi.src;i.alt='';a.appendChild(i)}
      a.appendChild(document.createTextNode(h));src.appendChild(a)});return src};
  const followup=(ctx,closable)=>{
    const f=el('form','ddg-fu');const box=el('div','ddg-fu-box');const inp=el('input');inp.placeholder='Ask a follow-up';inp.maxLength=500;inp.autocomplete='off';
    const go=el('button','ddg-fu-go');go.type='submit';go.title='Send';go.appendChild(icon(IC.arrow));box.append(inp,go);
    if(closable){const x=el('button','ddg-fu-x');x.type='button';x.title='Close';x.appendChild(icon(IC.x));x.addEventListener('click',()=>f.onclose&&f.onclose());f.appendChild(x)}
    f.appendChild(box);f.inp=inp;
    f.addEventListener('submit',e=>{e.preventDefault();const v=inp.value.trim();if(!v)return;inp.value='';openChat(ctx(),v)});
    return f;
  };
  let calcAnswer='',calcPlain='',calcStart='';
  const tween=render=>{
    let target='',shown=0,timer=0,waiters=[];
    const step=()=>{timer=0;
      if(shown>=target.length){waiters.splice(0).forEach(r=>r());return}
      const rest=target.slice(shown);const words=rest.match(/\s*\S+/g)||[rest];
      const n=Math.max(1,Math.floor(words.length/25));const add=words.slice(0,n).join('');
      shown+=add.length;render(target.slice(0,shown),add);timer=setTimeout(step,32)};
    return{set(t){if(!t.startsWith(target.slice(0,shown))){shown=0}target=t;if(!timer)step()},finish(){return new Promise(r=>{waiters.push(r);if(!timer)step()})}};
  };
  const assist=(force,explicit)=>{
    if(assistStarted)return;
    const ap=new URLSearchParams(location.search).get('assist');
    if(ap==='false'&&!explicit)return;
    if(ap==='true'){force=true;explicit=true}
    const q=((document.getElementById('q')||{}).value||'').trim();
    const page=new URLSearchParams(location.search).get('pageno')||'1';
    const sel=document.querySelector('.category_button.selected');
    if(!q||page!=='1'||(sel&&!/general/.test(sel.name||'')))return;
    const it=items();if(it.length<2&&!calcAnswer)return;
    if(!explicit&&!calcAnswer&&q.split(/\s+/).filter(w=>w.length>1).length<2&&!document.querySelector('#sidebar .infobox'))return;
    const side=sidebar();const urls=document.getElementById('urls');if(!side||!urls)return;
    if(mode()==='never'&&!explicit)return;
    let card=document.getElementById('ddg-assist');
    if(!card){
      card=el('div','ddg-sa');card.id='ddg-assist';
      const top=el('div','ddg-sa-top');
      const head=el('div','ddg-sa-h');head.appendChild(icon(IC.spark));head.appendChild(el('span',null,'Search Assist'));
      const tools=el('div','ddg-sa-tools');
      const tb=(ic,title,fn)=>{const b=el('button','ddg-sa-tb');b.type='button';b.title=title;b.appendChild(icon(ic));b.addEventListener('click',fn);tools.appendChild(b);return b};
      card.head=head;card.copyB=tb(IC.copy,'Copy',()=>{const t=(card.querySelector('.ddg-assist-body')||{}).textContent||'';if(t&&navigator.clipboard)navigator.clipboard.writeText(t).catch(()=>{})});
      tb(IC.info,'Auto-generated based on listed sources. May contain inaccuracies.',()=>{});
      const pills=el('div','ddg-sa-modes');pills.hidden=true;pills.appendChild(el('span','ddg-sa-show','Show'));
      [['never','Never'],['demand','On Demand'],['sometimes','Sometimes'],['often','Often']].forEach(([k,t])=>{const b=el('button','ddg-sa-mode'+(mode()===k?' on':''),t);b.type='button';b.dataset.k=k;
        b.addEventListener('click',()=>{store.set('ddg-sa-mode',k);pills.querySelectorAll('.ddg-sa-mode').forEach(x=>x.classList.toggle('on',x.dataset.k===k));
          if(k==='never'){card.parentNode.remove();document.querySelector('.ddg-tabs-right .ddg-sa-toggle')?.classList.remove('on')}else if(!assistStarted){const g=card.querySelector('.ddg-sa-go');if(k==='often'&&g)g.click();else if(!g)assist()}});pills.appendChild(b)});
      const x=el('button','ddg-sa-x');x.type='button';x.title='Close';x.appendChild(icon(IC.x));
      x.addEventListener('click',()=>{pills.hidden=true;tools.hidden=false});pills.appendChild(x);
      tb(IC.sliders,'Settings',()=>{tools.hidden=true;pills.hidden=false});
      top.append(head,tools,pills);card.appendChild(top);
      const outer=el('div','ddg-sa-outer');outer.appendChild(card);
      outer.appendChild(el('div','ddg-sa-foot','Auto-generated based on listed sources. May contain inaccuracies.'));
      urls.prepend(outer);
    }
    const asky=/^(who|what|when|where|why|how|which|is|are|was|were|do|does|did|can|could|should|will|would|has|have|explain|define)\b/i.test(q)||/\?$/.test(q);
    if(!force&&!calcAnswer&&(mode()==='demand'||(mode()==='sometimes'&&!asky))){
      if(card.querySelector('.ddg-sa-go'))return;
      card.classList.add('ddg-sa-demand');card.head.textContent='';card.head.append('Generate answer for ',el('b',null,q));card.copyB.hidden=true;
      const go=el('button','ddg-sa-go');go.type='button';go.append(icon(IC.spark),el('span',null,'Search Assist'));
      go.addEventListener('click',()=>{go.remove();card.classList.remove('ddg-sa-demand');card.head.textContent='';card.head.append(icon(IC.spark),el('span',null,'Search Assist'));card.copyB.hidden=false;assist(true)});card.appendChild(go);return;
    }
    assistStarted=true;
    let answer='';
    const line=el('div','ddg-sa-line');const body=el('span','ddg-assist-body');line.appendChild(body);
    const ctl=el('div','ddg-sa-morew');ctl.hidden=true;
    const chatb=el('button','ddg-sa-chatb');chatb.type='button';chatb.title='Ask a follow-up';chatb.appendChild(icon(IC.chat));
    const ext=el('div','ddg-sa-ext');ext.hidden=true;
    const ctx=()=>[{role:'user',content:q},{role:'assistant',content:answer}];
    const fu=followup(ctx,true);fu.hidden=true;
    fu.onclose=()=>{fu.hidden=true;ctl.hidden=false};
    chatb.addEventListener('click',()=>{ctl.hidden=true;fu.hidden=false;fu.inp.focus()});
    card.append(line,ctl,fu);
    const more=el('button','ddg-sa-more');more.type='button';const ml=el('span',null,'More');const mi=el('span','ddg-sa-mi');mi.appendChild(icon(IC.chev));more.append(ml,mi);
    ctl.append(more,chatb);
    const fu2=followup(ctx,false);fu2.hidden=true;
    const long=el('div','ddg-sa-long');
    const explore=el('div','ddg-explore');explore.hidden=true;
    explore.appendChild(el('div','ddg-explore-h','Explore More'));
    ext.append(long,explore,fu2);
    const rows=[];let exploreReady=false;
    let longText='',longState='idle',ctrl=null,ltw=null;
    const setBtn=s=>{longState=s;mi.textContent='';chatb.hidden=s!=='idle';
      if(s==='run'){ml.textContent='Stop';mi.appendChild(el('i','ddg-sq'))}
      else if(s==='paused'){ml.textContent='Resume';mi.appendChild(icon(IC.play))}
      else if(s==='done')ctl.classList.add('ddg-sa-ctl-done');
      else{ml.textContent='More';mi.appendChild(icon(IC.chev))}};
    const longPrompt=()=>calcAnswer
      ?'Explain step by step how to work out '+calcPlain+'. The answer is '+calcAnswer.replace(/^.*[=≈]\s*/,'')+' Start with a short "## " heading, then a short numbered list of steps. No LaTeX.'
      :'Write a detailed answer about: '+q+'\nStart with a short "## " heading, then 2 short paragraphs or a list. No LaTeX. Use these search results:\n'+it.slice(0,3).map(r=>'- '+r.content.slice(0,140)).join('\n');
    const runLong=()=>{
      setBtn('run');ctrl=new AbortController();const sig=ctrl.signal;
      if(calcAnswer&&calcStart){
        if(!ltw)ltw=tween(t=>md(t,long));
        const st2=status(CHAT_STATUS);if(!longText)long.appendChild(st2);
        setTimeout(()=>{st2.stop();longText=calcSteps(calcStart,calcAnswer.replace(/^.*[=≈]\s*/,'').replace(/\.$/,''));ltw.set(longText);ltw.finish().then(finishLong)},longText?0:700);
        return;
      }
      const base=longText;const msgs=[{role:'user',content:longPrompt()}];
      if(base)msgs.push({role:'assistant',content:base.slice(-500)},{role:'user',content:'Continue exactly where you stopped. Do not repeat anything.'});
      const st2=status(CHAT_STATUS);long.appendChild(st2);
      if(!ltw)ltw=tween(t=>md(t,long));
      ask({q,mode:'chat',messages:msgs},t=>{st2.stop();longText=base+(base&&!/\s$/.test(base)?' ':'')+t;ltw.set(longText)},sig)
        .then(()=>ltw.finish())
        .then(()=>{if(!sig.aborted)finishLong()})
        .catch(()=>{st2.stop();if(longState==='run')setBtn('paused')});
    };
    const finishLong=()=>{
      setBtn('done');fu2.hidden=false;exploreReady=true;
      if(calcAnswer)return;
      if(rows.length){explore.hidden=false;return prefetch()}
      ask({q,results:it,mode:'questions'}).then(t=>{const qs=t.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,3);if(qs.length){addQs(qs);return prefetch()}}).catch(()=>{});
    };
    more.addEventListener('click',()=>{
      if(longState==='idle'){card.classList.add('expanded');ext.hidden=false;ctl.after(ext);fu.hidden=true;runLong()}
      else if(longState==='run'){ctrl&&ctrl.abort();setBtn('paused')}
      else if(longState==='paused')runLong();
    });
    if(calcAnswer){
      answer=calcAnswer;
      const tw=tween((t,add)=>body.appendChild(el('span','ddg-w',add)));tw.set(calcAnswer);
      tw.finish().then(()=>{const m=calcAnswer.match(/^(.*[=≈] )(.*)$/);if(m){body.textContent='';body.append(m[1],el('b',null,m[2]))}line.append(' ',srcPills(it,2));ctl.hidden=false});
      assistDone();return;
    }
    const st=status(SA_STATUS);card.insertBefore(st,line);
    const addQs=qs=>{
      qs.forEach(qq=>{
        const row=el('div','ddg-q');const b=el('button','ddg-q-btn');b.type='button';b.appendChild(el('span',null,qq));b.appendChild(icon(IC.chev));
        const ans=el('div','ddg-q-a');ans.hidden=true;row.append(b,ans);explore.insertBefore(row,explore.querySelector('.ddg-foot'));
        const st={qq,text:'',job:null,shown:false,at:null,s2:null};rows.push(st);
        const show=()=>{if(!st.at){st.s2=skel(2);st.at=el('div');ans.append(st.s2,st.at)}if(st.text){st.s2&&st.s2.remove();st.at.textContent=st.text}};
        st.render=show;
        b.addEventListener('click',()=>{
          row.classList.toggle('open');ans.hidden=!row.classList.contains('open');if(ans.hidden)return;
          st.shown=true;show();
          if(!st.job&&!st.text)st.job=ask({q:qq,results:it,mode:'answer',sub:1},x=>{st.text=x;show()}).catch(()=>{st.job=null;if(!st.text){st.s2&&st.s2.remove();st.at.textContent='busy'}});
        });
      });
      explore.hidden=!exploreReady;
    };
    const prefetch=async()=>{for(const st of rows){if(st.text||st.job)continue;st.job=ask({q:st.qq,results:it,mode:'answer',sub:1},x=>{st.text=x;if(st.shown)st.render()}).catch(()=>{st.job=null});await st.job}};
    const qlow=q.toLowerCase();
    const sugg=[...document.querySelectorAll('#sidebar #suggestions input.suggestion')].map(i=>i.value.trim()).filter(s=>s&&s.toLowerCase()!==qlow&&s.length>q.length+2);
    const fromSugg=sugg.length>=2;
    if(fromSugg)addQs(sugg.slice(0,3).map(s=>s.charAt(0).toUpperCase()+s.slice(1)));
    const tw=tween((t,add)=>body.appendChild(el('span','ddg-w',add)));
    ask({q,results:it,mode:'answer'},t=>{st.stop();answer=t;tw.set(t.replace(/\*\*/g,''))})
      .then(()=>tw.finish())
      .then(()=>{assistDone();body.textContent='';answer.trim().split(/\*\*(.+?)\*\*/).forEach((x,i)=>{x=x.replace(/\*\*/g,'');if(x)body.append(i%2?el('b',null,x):x)});line.append(' ',srcPills(it,1));ctl.hidden=false})
      .catch(()=>{assistDone();st.stop();if(!answer)card.parentNode&&card.parentNode.remove()});
  };

  const calcLex=s=>{
    s=s.toLowerCase().replace(/\s+/g,'').replace(/[×∗·]|(?<![a-z])x(?![a-z])/g,'*').replace(/[÷:]/g,'/').replace(/[−–]/g,'-').replace(/\*\*/g,'^').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/,(?=\d{3}\b)/g,'');
    const t=[];let i=0;
    while(i<s.length){
      const r=s.slice(i);let m;
      if(m=r.match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/)){t.push({k:'n',v:parseFloat(m[0])});i+=m[0].length;continue}
      if(m=r.match(/^(asin|acos|atan|sinh|cosh|tanh|sin|cos|tan|sqrt|cbrt|ln|log|abs|exp)/)){t.push({k:'f',v:m[0]});i+=m[0].length;continue}
      if(m=r.match(/^(pi|ans|e)/)){t.push({k:'c',v:m[0]});i+=m[0].length;continue}
      if('+-*/^()%!'.includes(s[i])){t.push({k:s[i]});i++;continue}
      return null;
    }
    return t;
  };
  const calcEval=(src,deg,ans,log)=>{const L=(a,o,b,r)=>{if(log)log.push([a,o,b,r]);return r};
    const t=calcLex(src);if(!t||!t.length)return null;let p=0;
    const pk=()=>t[p]||{},nx=()=>t[p++]||{};
    const rad=x=>deg?x*Math.PI/180:x,arc=x=>deg?x*180/Math.PI:x;
    const F={sin:x=>Math.sin(rad(x)),cos:x=>Math.cos(rad(x)),tan:x=>Math.tan(rad(x)),asin:x=>arc(Math.asin(x)),acos:x=>arc(Math.acos(x)),atan:x=>arc(Math.atan(x)),sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,sqrt:Math.sqrt,cbrt:Math.cbrt,ln:Math.log,log:Math.log10,abs:Math.abs,exp:Math.exp};
    const fact=n=>{if(n<0||n%1||n>170)return NaN;let r=1;for(let i=2;i<=n;i++)r*=i;return r};
    const expr=()=>{let v=term();while(pk().k==='+'||pk().k==='-'){const o=nx().k,r=term();v=L(v,o,r,o==='+'?v+r:v-r)}return v};
    const starts=k=>['n','f','c','('].includes(k);
    const term=()=>{let v=unary();for(;;){const k=pk().k;if(k==='*'||k==='/'){nx();const r=unary();v=L(v,k,r,k==='*'?v*r:v/r)}else if(starts(k)){const r=unary();v=L(v,'*',r,v*r)}else return v}};
    const unary=()=>{if(pk().k==='-'){nx();return -unary()}if(pk().k==='+'){nx();return unary()}return power()};
    const power=()=>{const b=post();if(pk().k==='^'){nx();const e=unary();return L(b,'^',e,Math.pow(b,e))}return b};
    const post=()=>{let v=prim();for(;;){if(pk().k==='%'){nx();v=L(v,'%',null,v/100)}else if(pk().k==='!'){nx();v=L(v,'!',null,fact(v))}else return v}};
    const prim=()=>{const x=nx();
      if(x.k==='n')return x.v;
      if(x.k==='c')return x.v==='pi'?Math.PI:x.v==='e'?Math.E:(ans||0);
      if(x.k==='('){const v=expr();if(pk().k===')')nx();return v}
      if(x.k==='f'){const a=pk().k==='^'?null:power();return L(a,x.v,null,F[x.v](a))}
      throw 0};
    try{const v=expr();return p===t.length&&isFinite(v)?v:null}catch(e){return null}
  };
  const calcFmt=v=>{if(Object.is(v,-0))v=0;const a=Math.abs(v);if(a!==0&&(a>=1e15||a<1e-9))return v.toExponential(9).replace(/\.?0+e/,'e');return String(parseFloat(v.toPrecision(12)))};
  const calcShow=s=>calcLex(s)?s.toLowerCase().replace(/\s+/g,'').replace(/[×∗·]|(?<![a-z])x(?![a-z])/g,'*').replace(/sqrt/g,'√').replace(/pi/g,'π').replace(/ans/g,'Ans').replace(/\*\*/g,'^').replace(/\*/g,' * ').replace(/\//g,' / ').replace(/\+/g,' + ').replace(/([\d)πAns])-/g,'$1 - ').replace(/\s+/g,' ').trim():s;  const calcQuery=q=>{
    let s=q.trim().replace(/^(calc(ulator)?|calculate|what\s+is|whats)\s*/i,'').replace(/[=?]+$/,'').trim();
    if(!s&&/^calc(ulator)?$/i.test(q.trim()))return '';
    if(!/[\d)]\s*([-+*/^×x÷%!]|\*\*)\s*|^(sqrt|sin|cos|tan|ln|log|√)|[\d.](pi|π)|^-?\d+(\.\d+)?\s*!$/i.test(s))return null;
    return calcEval(s,true)==null?null:s;
  };
  const calcSteps=(src,final)=>{
    const log=[];const v=calcEval(src,store.get('ddg-calc-deg')==='1',0,log);if(v==null)return '';
    const f=calcFmt,sym={'+':'+','-':'−','*':'×','/':'÷','^':'^'};
    const lines=log.map(([a,o,b,r],i)=>{let s;
      if(o==='%')s=f(a)+'%';else if(o==='!')s=f(a)+'!';else if(b==null)s=(o==='sqrt'?'√':o==='cbrt'?'∛':o)+'('+f(a)+')';else s=f(a)+' '+(sym[o]||o)+' '+f(b);
      return (i+1)+'. **'+s+'** = '+f(r)});
    return '## Calculation of '+calcPlain+'\n'+(lines.length>1?'Brackets first, then left to right:\n':'')+lines.join('\n')+'\n\n**Answer:** '+final;
  };
  const calcSwap=async(urls,pct)=>{
    const old=[...urls.querySelectorAll('article.result')];old.forEach(a=>a.hidden=true);
    document.getElementById('pagination')?.remove();
    const u=new URL('/search',location.href);u.searchParams.set('q',pct?'percentage calculator':'online calculator');
    const lang=document.getElementById('language');if(lang)u.searchParams.set('language',lang.value);
    try{
      const html=await(await fetch(u.pathname+u.search,{credentials:'same-origin'})).text();
      const fresh=[...new DOMParser().parseFromString(html,'text/html').querySelectorAll('#urls article.result')].slice(0,10);
      if(fresh.length<3)throw 0;
      const anchor=old[0]||null;fresh.forEach(a=>{const n=document.importNode(a,true);anchor?anchor.before(n):urls.appendChild(n)});
      old.forEach(a=>a.remove());
    }catch(e){old.forEach(a=>a.hidden=false)}
  };
  const calc=()=>{
    const q=((document.getElementById('q')||{}).value||'').trim();
    const page=new URLSearchParams(location.search).get('pageno')||'1';
    const sel=document.querySelector('.category_button.selected');
    const urls=document.getElementById('urls');
    if(!q||!urls||page!=='1'||(sel&&!/general/.test(sel.name||''))||document.getElementById('ddg-calc'))return false;
    const start=calcQuery(q);if(start==null)return false;
    let deg=store.get('ddg-calc-deg')==='1',ans=0,cur=start,done=false;
    const box=el('div','ddg-calc');box.id='ddg-calc';box.tabIndex=-1;
    const main=el('div','ddg-calc-main');
    const disp=el('div','ddg-calc-disp');const ex=el('div','ddg-calc-ex');const out=el('div','ddg-calc-out');disp.append(ex,out);
    const pad=el('div','ddg-calc-pad');main.append(disp,pad);
    const hist=el('div','ddg-calc-hist');
    box.append(main,hist);
    const fmtExpr=s=>calcShow(s);
    const render=()=>{
      if(done){const v=calcEval(cur,deg,ans);ex.textContent=fmtExpr(cur);out.textContent=v==null?'Error':calcFmt(v);return}
      ex.textContent='';out.textContent=fmtExpr(cur)||'0';
    };
    const addHist=(s,v)=>{
      const r=el('button','ddg-calc-h');r.type='button';r.append(el('div','ddg-calc-he',fmtExpr(s)),el('div','ddg-calc-hv',calcFmt(v)));
      r.addEventListener('click',()=>{cur=s;done=true;render();ans=v;box.focus({preventScroll:true})});
      hist.prepend(r);while(hist.children.length>8)hist.lastChild.remove();
    };
    const equals=()=>{if(!cur||done)return;const open=(cur.match(/\(/g)||[]).length-(cur.match(/\)/g)||[]).length;if(open>0)cur+=')'.repeat(open);const v=calcEval(cur,deg,ans);done=true;render();if(v!=null){ans=v;addHist(cur,v)}};
    const put=s=>{
      if(done){const v=calcEval(cur,deg,ans);done=false;cur=/^[-+*/^%!)]/.test(s)&&v!=null?calcFmt(v):''}
      cur+=s;render();
    };
    const back=()=>{if(done){done=false;cur='';render();return}cur=cur.replace(/(asin|acos|atan|sqrt|sin|cos|tan|ln|log|ans|pi)\($|ans$|pi$|.$/,'');render()};
    const clear=()=>{cur='';done=false;render()};
    const keys=[
      ['deg',null,'sw'],['(','(','fn'],[')',')','fn'],['C','C','clr'],['%','%','pct'],['/','÷','op'],
      ['sin(','sin','fn'],['cos(','cos','fn'],['tan(','tan','fn'],['pi','π','fn pi'],['7'],['8'],['9'],['*','×','op'],
      ['!','x!','fn'],['^2','x²','fn'],['^3','x³','fn'],['^','xʸ','fn'],['4'],['5'],['6'],['-','−','op'],
      ['^(-1)','1/x','fn'],['sqrt(','√x','fn'],['^(1/','ˣ√y','fn'],['e','EE','fn'],['1'],['2'],['3'],['+','+','op'],
      ['log(','log','fn'],['ln(','ln','fn'],['e^','eˣ','fn'],['e','e','fn'],['0','0','zero'],['.'],['=','=','op']
    ];
    keys.forEach(([v,lab,cls])=>{
      const b=el('button','ddg-calc-k'+(cls?' '+cls.split(' ').map(c=>'ddg-calc-'+c).join(' '):''));b.type='button';
      if(v==='deg'){
        const sw=el('span','ddg-calc-tog');b.append(el('span',null,'RAD'),sw,el('span',null,'DEG'));b.classList.toggle('on',deg);
        b.addEventListener('click',()=>{deg=!deg;store.set('ddg-calc-deg',deg?'1':'');b.classList.toggle('on',deg);render();box.focus({preventScroll:true})});
      }else{
        b.textContent=lab||v;
        b.addEventListener('click',()=>{if(v==='=')equals();else if(v==='C')clear();else put(v);box.focus({preventScroll:true})});
      }
      pad.appendChild(b);
    });
    box.addEventListener('keydown',e=>{
      if(e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key;
      if(/^[0-9.+\-*/^()%!]$/.test(k))put(k);else if(k==='x')put('*');else if(k==='Enter'||k==='=')equals();else if(k==='Backspace')back();else if(k==='Escape'||k==='Delete')clear();else return;
      e.preventDefault();
    });
    if(start)equals();else render();
    urls.prepend(box);
    if(!start)return null;
    const pct=/\/.*\*100$/.test(start.replace(/[×x]/gi,'*').replace(/\s+/g,''));
    const v=calcEval(start,deg,0);
    if(v!=null){const a=Math.abs(v),r=Number.isInteger(v)?v.toLocaleString('en-GB'):a>=1?(+v.toFixed(2)).toLocaleString('en-GB',{maximumFractionDigits:2}):String(+v.toPrecision(3));
      calcPlain=calcShow(start).replace(/ \* /g,' × ').replace(/ \/ /g,' ÷ ');calcStart=start;
      calcAnswer=calcPlain+(parseFloat(r.replace(/,/g,''))===v?' = ':' ≈ ')+r+(pct?'%':'')+'.'}
    return calcSwap(urls,pct);
    return true;
  };

  const md=(t,root)=>{
    root.textContent='';let list=null;
    t=t.replace(/\\[()[\]]/g,'').replace(/\\times/g,'×').replace(/\\div/g,'÷').replace(/\\cdot/g,'·').replace(/\\approx/g,'≈').replace(/\\left|\\right/g,'')
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,'$1/$2').replace(/\\(?:text|mathrm|mathbf)\{([^{}]*)\}/g,'$1').replace(/\\sqrt\{([^{}]*)\}/g,'√($1)').replace(/\\\\/g,'');
    const inline=(s,p)=>s.split(/(\*\*[^*]+\*\*|`[^`]+`)/).forEach(x=>{if(/^\*\*[^*]+\*\*$/.test(x))p.appendChild(el('b',null,x.slice(2,-2)));else if(/^`[^`]+`$/.test(x))p.appendChild(el('code',null,x.slice(1,-1)));else if(x)p.appendChild(document.createTextNode(x))});
    t.split('\n').forEach(l=>{let m;
      if(m=l.match(/^\s*#{1,4}\s+(.*)/)){list=null;const h=el('div','ddg-md-h');inline(m[1],h);root.appendChild(h)}
      else if(m=l.match(/^\s*(?:[-*•]|(\d+)[.)])\s+(.*)/)){const tag=m[1]?'ol':'ul';if(!list||list.tagName.toLowerCase()!==tag){list=el(tag,'ddg-md-l');root.appendChild(list)}const li=el('li');if(m[1])li.value=+m[1];inline(m[2],li);list.appendChild(li)}
      else if(l.trim()){list=null;const p=el('p','ddg-md-p');inline(l,p);root.appendChild(p)}
      else list=null;
    });
  };
  const AI_IC={
    edit:'M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25ZM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z',
    up:'M11 20V7.8l-5.6 5.6L4 12l8-8 8 8-1.4 1.4L13 7.8V20z',
    side:'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v12h4V6H5Zm6 0v12h8V6h-8Z',
    newc:'M5 5h7v2H5v12h12v-7h2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm11.6-2.4 2.8 2.8-8 8H8.6v-2.8l8-8Z',
    del:'M7 21a2 2 0 0 1-2-2V7H4V5h5V4h6v1h5v2h-1v12a2 2 0 0 1-2 2H7Zm0-14v12h10V7H7Zm2 2h2v8H9V9Zm4 0h2v8h-2V9Z',
    fire:'M12 23c-4.4 0-8-3.1-8-7.6 0-3.1 2.3-6.2 6.7-9.5L12 5l1.3 1C17.7 9.2 20 12.3 20 15.4 20 19.9 16.4 23 12 23Zm0-15.5c-3.3 2.6-6 5.2-6 7.9C6 18.8 8.6 21 12 21s6-2.2 6-5.6c0-2.7-2.7-5.3-6-7.9Z|M12 19.5c-1.7 0-3-1.2-3-2.8 0-1.2.9-2.4 3-4 2.1 1.6 3 2.8 3 4 0 1.6-1.3 2.8-3 2.8Z',
    kebab:'M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'
  };
  let chatFilter='';
  let chatEl=null,chatHist=[],chatBusy=false,chatId=null;
  const chatsLoad=()=>{try{const a=JSON.parse(store.get('ddg-chats')||'[]');return Array.isArray(a)?a:[]}catch(e){return []}};
  const chatsSave=a=>store.set('ddg-chats',JSON.stringify(a.slice(0,30)));
  const chatTitle=()=>{const u=chatHist.find(m=>m.role==='user');chatEl.ttl.textContent=u?u.content.slice(0,120):'';chatEl.classList.toggle('ddg-ai-empty',!chatEl.list.children.length);chatEl.inp.placeholder=chatEl.list.children.length?'Ask anything':'Ask anything privately'};
  const chatSaveCur=()=>{
    const u=chatHist.find(m=>m.role==='user');if(!u)return;
    if(!chatId)chatId=Date.now().toString(36)+Math.random().toString(36).slice(2,5);
    const all=chatsLoad();const old=all.find(c=>c.id===chatId);const a=all.filter(c=>c.id!==chatId);
    a.unshift({id:chatId,title:old&&old.title?old.title:u.content.slice(0,80),msgs:chatHist.slice(-20)});chatsSave(a);chatSide();chatHash();
  };
  const closeMenus=()=>chatEl&&chatEl.querySelectorAll('.ddg-ai-menu').forEach(m=>m.remove());
  const chatSide=()=>{
    const r=chatEl.recent;r.textContent='';const f=chatFilter.toLowerCase();
    const list=chatsLoad();chatEl.chatsH.hidden=!list.length;
    list.filter(c=>!f||String(c.title||'').toLowerCase().includes(f)).forEach(c=>{
      const it=el('div','ddg-ai-item'+(c.id===chatId?' on':''));const b=el('button','ddg-ai-open',String(c.title||''));b.type='button';
      b.addEventListener('click',()=>{if(chatBusy)return;chatLoad(c)});
      const k=el('button','ddg-ai-kebab');k.type='button';k.title='More';k.appendChild(icon(AI_IC.kebab));
      k.addEventListener('click',e=>{e.stopPropagation();const open=it.querySelector('.ddg-ai-menu');closeMenus();if(open)return;
        const m=el('div','ddg-ai-menu');
        const rn=el('button',null,'Rename');rn.type='button';rn.prepend(icon(AI_IC.edit));
        rn.addEventListener('click',ev=>{ev.stopPropagation();closeMenus();const inp=el('input','ddg-ai-rename');inp.value=String(c.title||'');inp.maxLength=80;b.replaceWith(inp);inp.focus();inp.select();
          let done=false;const save=ok=>{if(done)return;done=true;const v=inp.value.trim();if(ok&&v){const a=chatsLoad();const x=a.find(y=>y.id===c.id);if(x){x.title=v;chatsSave(a)}}chatSide()};
          inp.addEventListener('keydown',ev2=>{if(ev2.key==='Enter')save(true);else if(ev2.key==='Escape'){ev2.stopPropagation();save(false)}});inp.addEventListener('blur',()=>save(true))});
        const dl=el('button','ddg-ai-menu-del','Delete');dl.type='button';dl.prepend(icon(AI_IC.del));
        dl.addEventListener('click',ev=>{ev.stopPropagation();closeMenus();if(chatBusy&&c.id===chatId)return;chatsSave(chatsLoad().filter(x=>x.id!==c.id));if(c.id===chatId)chatNew();else chatSide()});
        m.append(rn,dl);it.appendChild(m)});
      it.append(b,k);r.appendChild(it);
    });
  };
  const chatHash=()=>{if(!chatEl||chatEl.hidden)return;const h='#chat'+(chatId?'='+chatId:'');if(location.hash!==h)history.replaceState(null,'',location.pathname+location.search+h)};
  const chatNew=()=>{if(chatBusy)return;chatHist=[];chatId=null;chatEl.list.textContent='';chatTitle();chatSide();chatHash();chatEl.inp.focus()};
  const chatLoad=c=>{chatHist=[];chatId=c.id;chatEl.list.textContent='';(c.msgs||[]).forEach(m=>{if(m&&(m.role==='user'||m.role==='assistant')&&m.content){chatHist.push({role:m.role,content:String(m.content)});chatMsg(m.role,String(m.content))}});chatTitle();chatSide();chatHash();chatEl.inp.focus()};
  const chatMsg=(role,text)=>{
    const m=el('div','ddg-chat-m ddg-chat-'+role);
    if(role==='assistant'){const hd=el('div','ddg-chat-who');hd.appendChild(icon(IC.spark));m.who=el('span',null,store.get('ddg-ai-model')||'AI Chat');hd.appendChild(m.who);m.appendChild(hd)}
    const b=el('div','ddg-chat-b');m.appendChild(b);m.body=b;
    if(role==='user')b.textContent=text;else if(text)md(text,b);
    const acts=el('div','ddg-chat-acts');
    const cp=el('button','ddg-chat-act');cp.type='button';cp.title='Copy';cp.appendChild(icon(IC.copy));
    cp.addEventListener('click',()=>{const t=role==='user'?b.textContent:(m.raw||b.innerText);if(navigator.clipboard)navigator.clipboard.writeText(t).catch(()=>{})});
    acts.appendChild(cp);
    if(role==='user'){const ed=el('button','ddg-chat-act');ed.type='button';ed.title='Edit';ed.appendChild(icon(AI_IC.edit));
      ed.addEventListener('click',()=>{chatEl.inp.value=b.textContent;chatEl.inp.dispatchEvent(new Event('input'));chatEl.inp.focus()});acts.appendChild(ed)}
    m.appendChild(acts);m.raw=text;
    chatEl.list.appendChild(m);chatEl.list.scrollTop=chatEl.list.scrollHeight;return m;
  };
  const chatSend=text=>{
    text=(text||'').trim();if(!text||chatBusy)return;chatBusy=true;chatEl.inp.value='';chatEl.inp.style.height='';
    chatMsg('user',text);chatHist.push({role:'user',content:text});chatTitle();
    const a=chatMsg('assistant','');a.classList.add('ddg-chat-wait');const st=status(CHAT_STATUS);a.body.appendChild(st);
    const stick=()=>{const l=chatEl.list;if(l.scrollHeight-l.scrollTop-l.clientHeight<120)l.scrollTop=l.scrollHeight};
    const tw=tween(t=>{md(t,a.body);stick()});
    const SEP='\n\x1eACTIONS ';
    ask({q:text,mode:'chat',messages:chatHist},t=>{st.stop();tw.set(t.split(SEP)[0])},undefined,h=>{const mdl=h.get('X-Model');if(mdl){a.who.textContent=mdl;store.set('ddg-ai-model',mdl)}})
      .then(full=>{const t=full.split(SEP)[0];return tw.finish().then(()=>{a.raw=t;chatHist.push({role:'assistant',content:t});chatSaveCur()})})
      .catch(()=>{st.stop();a.body.textContent='busy';chatHist.pop()})
      .finally(()=>{a.classList.remove('ddg-chat-wait');chatBusy=false;chatEl.inp.focus()});
  };
  const closeChat=()=>{if(!chatEl)return;chatEl.hidden=true;document.documentElement.classList.remove('ddg-chat-on');if(location.hash.startsWith('#chat'))history.replaceState(null,'',location.pathname+location.search)};
  const openChat=(hist,text)=>{
    if(!chatEl){
      chatEl=el('div','ddg-chat');chatEl.hidden=true;
      if(store.get('ddg-ai-side')==='0'||innerWidth<760)chatEl.classList.add('ddg-ai-collapsed');
      const toggle=()=>{const c=chatEl.classList.toggle('ddg-ai-collapsed');if(innerWidth>=760)store.set('ddg-ai-side',c?'0':'1')};
      const side=el('div','ddg-ai-side');
      const st=el('div','ddg-ai-stop');const brand=el('a','ddg-ai-brand');brand.href='#';brand.title='Back to search';
      const logo=el('img');logo.src='/static/themes/simple/ddg/logo.svg';logo.alt='';brand.append(logo,el('span',null,'AI Chat'));
      brand.addEventListener('click',e=>{e.preventDefault();closeChat()});
      const tg=el('button','ddg-ai-tg');tg.type='button';tg.title='Hide sidebar';tg.appendChild(icon(AI_IC.side));tg.addEventListener('click',toggle);
      st.append(brand,tg);
      const nw=el('button','ddg-ai-nav');nw.type='button';nw.append(icon(AI_IC.newc),el('span',null,'New Chat'));nw.addEventListener('click',chatNew);
      const chatsH=el('div','ddg-ai-chats-h');chatsH.appendChild(el('span',null,'Chats'));
      const hb=(ic,t,fn)=>{const x=el('button','ddg-ai-hb');x.type='button';x.title=t;x.appendChild(icon(ic));x.addEventListener('click',fn);chatsH.appendChild(x);return x};
      hb(AI_IC.fire,'Clear all chats',()=>{if(chatBusy)return;if(!confirm('Clear all chats? This can\'t be undone.'))return;chatsSave([]);chatNew()});
      const sf=el('input','ddg-ai-search');sf.placeholder='Search chats';sf.hidden=true;
      sf.addEventListener('input',()=>{chatFilter=sf.value;chatSide()});
      sf.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();sf.value='';chatFilter='';sf.hidden=true;chatSide()}});
      hb(IC.search,'Search chats',()=>{sf.hidden=!sf.hidden;if(sf.hidden){sf.value='';chatFilter='';chatSide()}else sf.focus()});
      const recent=el('div','ddg-ai-recent');
      side.append(st,nw,chatsH,sf,recent);
      chatEl.addEventListener('click',closeMenus);
      const main=el('div','ddg-ai-main');
      const head=el('div','ddg-ai-head');
      const tg2=el('button','ddg-ai-tg ddg-ai-tg2');tg2.type='button';tg2.title='Show sidebar';tg2.appendChild(icon(AI_IC.side));tg2.addEventListener('click',toggle);
      const title=el('div','ddg-ai-title');
      const x=el('button','ddg-chat-x');x.type='button';x.title='Back to search';x.appendChild(icon(IC.x));x.addEventListener('click',closeChat);
      head.append(tg2,title,x);
      const hero=el('div','ddg-ai-hero');const hl=el('img');hl.src='/static/themes/simple/ddg/logo.svg';hl.alt='';hero.append(hl,el('div','ddg-ai-hero-t','AI Chat, by DuckDuckXNG'));
      const list=el('div','ddg-chat-list');
      const f=el('form','ddg-chat-in');const inp=el('textarea');inp.rows=1;inp.placeholder='Ask anything';inp.maxLength=1500;
      const row=el('div','ddg-chat-row');const go=el('button','ddg-ai-go');go.type='submit';go.title='Send';go.appendChild(icon(AI_IC.up));row.appendChild(go);
      f.append(inp,row);
      inp.addEventListener('input',()=>{inp.style.height='';inp.style.height=Math.min(inp.scrollHeight,200)+'px'});
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();chatSend(inp.value)}});
      f.addEventListener('submit',e=>{e.preventDefault();chatSend(inp.value)});
      chatEl.addEventListener('keydown',e=>{if(e.key==='Escape')closeChat()});
      main.append(head,hero,list,f);chatEl.append(side,main);document.body.appendChild(chatEl);
      chatEl.list=list;chatEl.inp=inp;chatEl.ttl=title;chatEl.recent=recent;chatEl.chatsH=chatsH;
      chatSide();chatTitle();
    }
    chatEl.hidden=false;document.documentElement.classList.add('ddg-chat-on');setTimeout(chatHash,0);
    if(hist&&!chatBusy){chatHist=[];chatId=null;chatEl.list.textContent='';hist.forEach(m=>{if(m.content){chatHist.push(m);chatMsg(m.role,m.content)}});chatTitle();chatSide()}
    if(text)chatSend(text);else chatEl.inp.focus();
  };
  const goChat=text=>{
    text=(text||'').trim();if(!text)return;
    if(document.body.classList.contains('results_endpoint'))openChat([],text);
    else{const u=new URL('/search',location.href);u.searchParams.set('q',text);u.searchParams.set('duckai','1');location.href=u.pathname+u.search}
  };
  const aiRow=(ac,qi)=>{
    const ul=ac.querySelector('ul');if(!ul)return;
    let row=ul.querySelector('li.ddg-ai-row');const others=ul.querySelectorAll('li:not(.ddg-ai-row)').length;const v=qi.value.trim();
    if(!others||!v){if(row)row.remove();return}
    if(!row){
      row=el('li','ddg-ai-row');row.appendChild(icon(IC.chat));row.append(el('b'),el('span','ddg-ai-tag','– Ask AI.ai'),el('span','ddg-ai-key','Alt+Enter'));
      row.addEventListener('mousedown',e=>{e.preventDefault();e.stopPropagation();ac.classList.remove('open');goChat(qi.value)});
      row.addEventListener('click',e=>{e.preventDefault();e.stopPropagation()});
    }
    if(row.querySelector('b').textContent!==v)row.querySelector('b').textContent=v;
    if(ul.lastElementChild!==row)ul.appendChild(row);
  };

  const videos=()=>{
    const urls=document.getElementById('urls');
    const q=((document.getElementById('q')||{}).value||'').trim();
    const page=new URLSearchParams(location.search).get('pageno')||'1';
    const sel=document.querySelector('.category_button.selected');
    if(!urls||!q||page!=='1'||(sel&&!/general/.test(sel.name||''))||document.getElementById('ddg-videos'))return;
    const u=new URL('/search',location.href);u.searchParams.set('q',q);u.searchParams.set('category_videos','1');
    const lang=document.getElementById('language');if(lang)u.searchParams.set('language',lang.value);
    const sec=el('section');sec.id='ddg-videos';sec.hidden=true;
    const anchor=urls.querySelectorAll('article.result')[2];if(!anchor)return;anchor.after(sec);
    assistGate.then(()=>fetch(u.pathname+u.search,{credentials:'same-origin'})).then(r=>r.text()).then(html=>{
      const doc=new DOMParser().parseFromString(html,'text/html');
      const vs=[...doc.querySelectorAll('article.result')].map(a=>{
        const l=a.querySelector('h3 a');const img=a.querySelector('img.thumbnail')||a.querySelector('.thumbnail_link img');
        const len=(a.querySelector('.result_length, .length')||{}).textContent||'';
        const pub=(a.querySelector('time')||{}).textContent||'';
        const auth=(a.querySelector('.result_author, .author')||{}).textContent||'';
        return{t:l?l.textContent.trim():'',h:l?l.getAttribute('href'):'',img:img?img.getAttribute('src'):'',len:len.replace(/^[^0-9]*/,'').trim(),pub:pub.trim(),auth:auth.replace(/^[^:]*:\s*/,'').trim(),site:host(l?l.getAttribute('href'):'')};
      }).filter(v=>v.t&&v.h&&v.img).slice(0,10);
      if(vs.length<3)return sec.remove();
      const h=el('div','ddg-videos-h');h.appendChild(icon(IC.play));h.appendChild(document.createTextNode('Videos for '));h.appendChild(el('b',null,q));
      const wrap=el('div','ddg-videos-wrap');const row=el('div','ddg-videos-row');
      vs.forEach(v=>{
        const c=el('a','ddg-vcard');c.href=v.h;c.rel='noreferrer';
        const th=el('div','ddg-vthumb');const im=el('img');im.loading='lazy';im.alt='';im.src=v.img;th.appendChild(im);
        if(v.len){const b=el('span','ddg-vlen');b.appendChild(icon(IC.play));b.appendChild(document.createTextNode(v.len));th.appendChild(b)}
        const tt=el('div','ddg-vtitle',v.t);
        const meta=el('div','ddg-vmeta',[v.pub?ago(v.pub):'',v.auth].filter(Boolean).join(' | '));
        const site=el('div','ddg-vsite',v.site);
        c.append(th,tt,meta,site);row.appendChild(c);
      });
      const nx=el('button','ddg-vnext');nx.type='button';nx.appendChild(icon(IC.right));
      nx.addEventListener('click',()=>row.scrollBy({left:row.clientWidth*0.8}));
      row.addEventListener('scroll',()=>{nx.hidden=row.scrollLeft+row.clientWidth>=row.scrollWidth-4});
      wrap.append(row,nx);
      const mv=el('a','ddg-vmore','More Videos');mv.href=u.pathname+u.search;mv.appendChild(icon(IC.right));
      const mvw=el('div','ddg-vmore-wrap');mvw.appendChild(mv);
      sec.append(h,wrap,mvw);sec.hidden=false;
    }).catch(()=>sec.remove());
  };

  const ddgParams=()=>{
    const p=new URLSearchParams(location.search);
    if(p.get('kk'))store.set('ddg-kk',p.get('kk'));
    if(p.get('kae')){const m={d:'dark','-1':'light',r:'system'};if(m[p.get('kae')]){store.set('ddg-theme',m[p.get('kae')]);applyTheme()}}
    const keys=['ia','iax','kp','kl','df'];
    const q=p.get('q');
    if(!q||!(keys.some(k=>p.has(k))||location.pathname==='/'))return false;
    const u=new URLSearchParams();p.forEach((v,k)=>{if(!keys.includes(k)&&!['t','kk','kae'].includes(k))u.set(k,v)});
    const ia=(p.get('iax')||p.get('ia')||'').toLowerCase();
    const cat={images:'images',videos:'videos',news:'news',maps:'map',map:'map'}[ia];if(cat)u.set('categories',cat);
    if(ia==='chat')u.set('duckai','1');
    const kp=p.get('kp');if(kp)u.set('safesearch',{'1':'2','-1':'1','-2':'0'}[kp]||'1');
    const kl=(p.get('kl')||'').toLowerCase();
    if(kl){if(kl==='wt-wt')u.set('language','all');else{const m=kl.match(/^([a-z]{2})-([a-z]{2})$/);if(m){const reg=m[1]==='uk'?'GB':m[1].toUpperCase();u.set('language',m[2]+'-'+reg)}}}
    const df=p.get('df');const tr={d:'day',w:'week',m:'month',y:'year'}[df];if(tr)u.set('time_range',tr);
    location.replace('/search?'+u.toString());return true;
  };
  let kbSel=-1;
  const kbItems=()=>[...document.querySelectorAll('#urls article.result')].filter(a=>!a.hidden&&a.offsetParent);
  const kbMark=i=>{const it=kbItems();if(!it.length)return;kbSel=Math.max(0,Math.min(it.length-1,i));it.forEach((a,j)=>a.classList.toggle('ddg-kb',j===kbSel));const a=it[kbSel];const r=a.getBoundingClientRect();const hh=(document.getElementById('search')||{}).offsetHeight||0;if(r.top<hh+10||r.bottom>innerHeight-10)scrollBy({top:r.top-hh-innerHeight*.25})};
  const kbLink=()=>{const a=kbItems()[kbSel];return a&&a.querySelector('h3 a, a.url_header')};
  const shortcuts=()=>{
    document.addEventListener('keydown',e=>{
      if(store.get('ddg-kk')==='-1'||!document.body.classList.contains('results_endpoint'))return;
      if(document.documentElement.classList.contains('ddg-chat-on')||document.documentElement.classList.contains('ddg-menu-open'))return;
      const t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))){if(e.key==='Escape')t.blur();return}
      if(e.altKey||e.metaKey&&e.key!=='Enter')return;
      const k=e.key;const open=bg=>{const l=kbLink();if(!l)return;if(bg)window.open(l.href,'_blank','noopener');else location.href=l.href};
      if(e.ctrlKey||e.metaKey){if(k==='Enter'&&kbSel>=0){e.preventDefault();open(true)}return}
      if(k==='j'||k==='ArrowDown')kbMark(kbSel+1);
      else if(k==='k'||k==='ArrowUp'){if(kbSel<=0&&k==='ArrowUp')return;kbMark(kbSel-1)}
      else if(k==='/'||k==='h'){const q=document.getElementById('q');if(!q)return;q.focus();q.setSelectionRange(q.value.length,q.value.length)}
      else if(k==='t'){scrollTo({top:0});kbSel=-1;kbItems().forEach(a=>a.classList.remove('ddg-kb'))}
      else if(k==='m')kbMark(0);
      else if((k==='Enter'||k==='l'||k==='o')&&kbSel>=0)open(false);
      else if((k==='\''||k==='v')&&kbSel>=0)open(true);
      else if(k==='d'&&kbSel>=0){const l=kbLink();const h=l&&host(l.href);const q=((document.getElementById('q')||{}).value||'').replace(/\s*site:\S+/g,'').trim();if(h)location.href='/search?q='+encodeURIComponent(q+' site:'+h)}
      else return;
      e.preventDefault();
    });
  };
  const UNITS={
    length:{m:[1,'Metre','m metre metres meter meters'],km:[1e3,'Kilometre','km kms kilometre kilometres kilometer kilometers'],cm:[.01,'Centimetre','cm centimetre centimetres centimeter centimeters'],mm:[.001,'Millimetre','mm millimetre millimetres millimeter millimeters'],mi:[1609.344,'Mile','mi mile miles'],yd:[.9144,'Yard','yd yard yards'],ft:[.3048,'Foot','ft foot feet \''],in:[.0254,'Inch','in inch inches "'],nmi:[1852,'Nautical mile','nmi nautical']},
    mass:{kg:[1,'Kilogram','kg kgs kilo kilos kilogram kilograms'],g:[.001,'Gram','g gram grams'],mg:[1e-6,'Milligram','mg milligram milligrams'],t:[1e3,'Tonne','tonne tonnes'],lb:[.45359237,'Pound','lb lbs pound pounds'],oz:[.028349523125,'Ounce','oz ounce ounces'],st:[6.35029318,'Stone','st stone stones']},
    volume:{l:[1,'Litre','l litre litres liter liters'],ml:[.001,'Millilitre','ml millilitre millilitres milliliter milliliters'],gal:[4.54609,'Gallon (UK)','gal gallon gallons'],usgal:[3.785411784,'Gallon (US)','usgal'],pt:[.56826125,'Pint (UK)','pt pint pints'],floz:[.0284130625,'Fluid ounce (UK)','floz'],cup:[.25,'Cup','cup cups'],tbsp:[.015,'Tablespoon','tbsp tablespoon tablespoons'],tsp:[.005,'Teaspoon','tsp teaspoon teaspoons']},
    speed:{kmh:[1/3.6,'Kilometres per hour','kmh kph km/h'],mph:[.44704,'Miles per hour','mph'],ms:[1,'Metres per second','m/s mps'],kn:[.514444,'Knot','kn knot knots']},
    data:{b:[1,'Byte','b byte bytes'],kb:[1e3,'Kilobyte','kb kilobyte kilobytes'],mb:[1e6,'Megabyte','mb megabyte megabytes'],gb:[1e9,'Gigabyte','gb gigabyte gigabytes'],tb:[1e12,'Terabyte','tb terabyte terabytes'],kib:[1024,'Kibibyte','kib'],mib:[1048576,'Mebibyte','mib'],gib:[1073741824,'Gibibyte','gib']},
    time:{s:[1,'Second','s sec secs second seconds'],min:[60,'Minute','min mins minute minutes'],h:[3600,'Hour','h hr hrs hour hours'],d:[86400,'Day','day days'],wk:[604800,'Week','wk week weeks'],yr:[31557600,'Year','yr year years']},
    temperature:{c:[0,'Celsius','c °c celsius centigrade'],f:[0,'Fahrenheit','f °f fahrenheit'],k:[0,'Kelvin','k kelvin']}
  };
  const unitFind=w=>{w=w.trim().toLowerCase().replace(/\.$/,'');for(const[cat,us]of Object.entries(UNITS))for(const[k,u]of Object.entries(us))if(k===w||u[2].split(' ').includes(w))return[cat,k];return null};
  const unitConv=(cat,v,a,b)=>{if(cat==='temperature'){const c=a==='c'?v:a==='f'?(v-32)*5/9:v-273.15;return b==='c'?c:b==='f'?c*9/5+32:c+273.15}return v*UNITS[cat][a][0]/UNITS[cat][b][0]};
  const numFmt=v=>{if(!isFinite(v))return '';const a=Math.abs(v);return a!==0&&(a>=1e12||a<1e-6)?v.toExponential(6).replace(/\.?0+e/,'e'):String(parseFloat(v.toPrecision(7)))};
  const iaCard=(cls)=>{const c=el('div','ddg-ia '+(cls||''));c.id='ddg-ia';return c};
  const iaUnits=q=>{
    const m=q.match(/^(?:convert\s+)?(-?[\d.,]+)\s*([a-z°"'/ ]+?)\s+(?:in|to|into|as|=)\s+([a-z°"'/ ]+?)\??$/i);if(!m)return null;
    const A=unitFind(m[2]),B=unitFind(m[3]);if(!A||!B||A[0]!==B[0])return null;
    const cat=A[0];const card=iaCard('ddg-ia-units');
    const side=(k,val)=>{const s=el('div','ddg-ia-uside');const i=el('input');i.inputMode='decimal';i.value=val;const sl=el('select');Object.entries(UNITS[cat]).forEach(([kk,u])=>{const o=el('option',null,u[1]);o.value=kk;sl.appendChild(o)});sl.value=k;s.append(i,sl);s.i=i;s.s=sl;return s};
    const v0=parseFloat(m[1].replace(/,/g,''));const L=side(A[1],numFmt(v0)),R=side(B[1],numFmt(unitConv(cat,v0,A[1],B[1])));
    const sw=el('button','ddg-ia-swap');sw.type='button';sw.title='Swap';sw.textContent='⇄';
    const fromL=()=>{const v=parseFloat(L.i.value);R.i.value=isNaN(v)?'':numFmt(unitConv(cat,v,L.s.value,R.s.value))};
    const fromR=()=>{const v=parseFloat(R.i.value);L.i.value=isNaN(v)?'':numFmt(unitConv(cat,v,R.s.value,L.s.value))};
    L.i.addEventListener('input',fromL);L.s.addEventListener('change',fromL);R.i.addEventListener('input',fromR);R.s.addEventListener('change',fromL);
    sw.addEventListener('click',()=>{const a=L.s.value;L.s.value=R.s.value;R.s.value=a;fromL()});
    const row=el('div','ddg-ia-urow');row.append(L,sw,R);card.appendChild(row);return card;
  };
  const iaColour=q=>{
    let m=q.trim().replace(/^(colou?r|hex|rgb)\s+/i,'');let r,g,b,x;
    if(x=m.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)){if(!/^#|colou?r|hex/i.test(q)&&!/[a-f]/i.test(x[1])&&!/^#/.test(m))return null;let h=x[1];if(h.length===3)h=h.split('').map(c=>c+c).join('');r=parseInt(h.slice(0,2),16);g=parseInt(h.slice(2,4),16);b=parseInt(h.slice(4),16)}
    else if(x=m.match(/^rgb\s*\(?\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)?$/i)){[r,g,b]=[+x[1],+x[2],+x[3]];if(r>255||g>255||b>255)return null}
    else return null;
    const hex='#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
    const R=r/255,G=g/255,B=b/255,mx=Math.max(R,G,B),mn=Math.min(R,G,B),l=(mx+mn)/2,d=mx-mn;let h=0,s=0;
    if(d){s=d/(1-Math.abs(2*l-1));h=mx===R?((G-B)/d)%6:mx===G?(B-R)/d+2:(R-G)/d+4;h=Math.round(h*60);if(h<0)h+=360}
    const k=1-mx,cm=k===1?[0,0,0]:[(1-R-k)/(1-k),(1-G-k)/(1-k),(1-B-k)/(1-k)];
    const card=iaCard('ddg-ia-colour');const sw=el('div','ddg-ia-swatch');sw.style.background=hex;
    const info=el('div','ddg-ia-cinfo');info.appendChild(el('div','ddg-ia-big',hex));
    [['RGB',`rgb(${r}, ${g}, ${b})`],['HSL',`hsl(${h}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`],['CMYB',`cmyk(${cm.map(v=>Math.round(v*100)+'%').join(', ')}, ${Math.round(k*100)}%)`]].forEach(([a,v])=>{const p=el('div','ddg-ia-cl');p.append(el('span','ddg-ia-ck',a+' '),el('span',null,v));info.appendChild(p)});
    info.lastChild.firstChild.textContent='CMYK ';card.append(sw,info);return card;
  };
  const hsv2rgb=(h,s,v)=>{const f=n=>{const k=(n+h/60)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1))};return [f(5),f(3),f(1)].map(x=>Math.round(x*255))};
  const rgb2hsv=(r,g,b)=>{r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;let h=0;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return [h,mx?d/mx:0,mx]};
  const toHex=rgb=>rgb.map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('');
  const iaPicker=q=>{
    const t=q.trim();let rgb=null,x;
    const m=t.replace(/^(colou?r|hex|rgb)\s+/i,'');
    if(x=m.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)){if(/^#|colou?r|hex/i.test(t)||/[a-f]/i.test(x[1])){let h=x[1];if(h.length===3)h=h.split('').map(c=>c+c).join('');rgb=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}}
    else if(x=m.match(/^rgb\s*\(?\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)?$/i)){rgb=[+x[1],+x[2],+x[3]];if(rgb.some(v=>v>255))rgb=null}
    if(!rgb){if(!/^(colou?r\s*(picker|wheel|chooser|selector)|pick\s+a\s+colou?r|colou?r\s*code|hex\s*colou?r)s?$/i.test(t))return null;rgb=hsv2rgb(rnd(360),.6+rnd(40)/100,.3+rnd(60)/100)}
    let [h,s,v]=rgb2hsv(...rgb);
    const card=iaCard('ddg-ia-picker');
    const sv=el('div','ddg-pk-sv');const svm=el('i','ddg-pk-svm');sv.appendChild(svm);
    const hue=el('div','ddg-pk-hue');const hm=el('i','ddg-pk-hm');hue.appendChild(hm);
    const mid=el('div','ddg-pk-mid');const prev=el('div','ddg-pk-prev');
    const grid=el('div','ddg-pk-grid');const f={};
    [['r','R',255],['h','H',360],['c','C',100],['g','G',255],['s','S',100],['m','M',100],['b','B',255],['v','V',100],['y','Y',100],[null],[null],['k','K',100]].forEach(([k,lab,max])=>{
      if(!k){grid.appendChild(el('span'));return}
      const w=el('label','ddg-pk-f');const i=el('input');i.inputMode='numeric';i.maxLength=3;w.append(el('span',null,lab+':'),i);grid.appendChild(w);f[k]=i;i.dataset.max=max;
      i.addEventListener('input',()=>{const n=Math.max(0,Math.min(+max,parseInt(i.value)||0));
        if('rgb'.includes(k)){const c=[+f.r.value||0,+f.g.value||0,+f.b.value||0];c['rgb'.indexOf(k)]=n;[h,s,v]=rgb2hsv(...c)}
        else if('hsv'.includes(k)){if(k==='h')h=n%360;else if(k==='s')s=n/100;else v=n/100}
        else{const C=+f.c.value/100,M=+f.m.value/100,Y=+f.y.value/100,K=+f.k.value/100;const o={c:C,m:M,y:Y,k:K};o[k]=n/100;[h,s,v]=rgb2hsv(...[o.c,o.m,o.y].map(z=>Math.round(255*(1-z)*(1-o.k))))}
        draw(k)});
    });
    const hexw=el('label','ddg-pk-hex');const hexi=el('input');hexi.maxLength=7;hexw.append(el('span',null,'#'),hexi);
    hexi.addEventListener('input',()=>{const c=hexi.value.replace('#','');if(/^[0-9a-f]{6}$/i.test(c)){[h,s,v]=rgb2hsv(...[0,2,4].map(i=>parseInt(c.slice(i,i+2),16)));draw('hex')}});
    mid.append(prev,grid,hexw);
    const right=el('div','ddg-pk-right');const sch=el('select','ddg-pk-sch');
    const SCH={Analogous:[0,30,-30],Complementary:[0,180],'Split complementary':[0,150,210],Triadic:[0,120,240],Tetradic:[0,90,180,270],Monochromatic:['m']};
    Object.keys(SCH).forEach(k=>{const o=el('option',null,k);o.value=k;sch.appendChild(o)});
    const sw=el('div','ddg-pk-sws');right.append(sch,sw);
    sch.addEventListener('change',()=>draw());
    card.append(sv,hue,mid,right);
    const draw=skip=>{
      const rgb=hsv2rgb(h,s,v);const hx=toHex(rgb);
      sv.style.background=`linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,hsl(${h},100%,50%))`;
      svm.style.left=(s*100)+'%';svm.style.top=((1-v)*100)+'%';hm.style.top=(h/360*100)+'%';prev.style.background='#'+hx;
      const k=1-Math.max(...rgb)/255,cm=k>=1?[0,0,0]:rgb.map(c=>(1-c/255-k)/(1-k));
      const vals={r:rgb[0],g:rgb[1],b:rgb[2],h:Math.round(h),s:Math.round(s*100),v:Math.round(v*100),c:Math.round(cm[0]*100),m:Math.round(cm[1]*100),y:Math.round(cm[2]*100),k:Math.round(k*100)};
      Object.entries(vals).forEach(([kk,val])=>{if(kk!==skip)f[kk].value=val});if(skip!=='hex')hexi.value=hx;
      sw.textContent='';const list=SCH[sch.value];
      const cols=list[0]==='m'?[Math.max(.1,v*.55),v,Math.min(1,v+.35)].map(vv=>hsv2rgb(h,s,vv)):list.map(d=>hsv2rgb((h+d+360)%360,s,v));
      cols.forEach(c=>{const x=toHex(c);const b=el('button','ddg-pk-sw');b.type='button';b.style.background='#'+x;b.title='Use #'+x;b.addEventListener('click',()=>{[h,s,v]=rgb2hsv(...c);draw()});const lab=el('label','ddg-pk-hex');const li=el('input');li.value=x;li.readOnly=true;li.addEventListener('focus',()=>li.select());lab.append(el('span',null,'#'),li);sw.append(b,lab)});
    };
    const drag=(elm,fn)=>{elm.addEventListener('pointerdown',e=>{e.preventDefault();elm.setPointerCapture(e.pointerId);const mv=ev=>{const r=elm.getBoundingClientRect();fn(Math.max(0,Math.min(1,(ev.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(ev.clientY-r.top)/r.height)));draw()};mv(e);elm.onpointermove=mv;elm.onpointerup=()=>{elm.onpointermove=null}})};
    drag(sv,(px,py)=>{s=px;v=1-py});drag(hue,(px,py)=>{h=Math.min(359.9,py*360)});
    draw();return card;
  };
  const rnd=n=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n};
  const iaPassword=q=>{
    const m=q.trim().match(/^(?:random\s+)?(?:password|pw|pwgen)(?:\s+(\d{1,3}))?(?:\s+(strong|basic|average))?$/i);if(!m)return null;
    const n=Math.min(Math.max(+(m[1]||8),4),64);const strong=(m[2]||'').toLowerCase()==='strong';
    const set='abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'+(strong?'!@#$%^&*-_=+?':'');
    const gen=()=>Array.from({length:n},()=>set[rnd(set.length)]).join('');
    const card=iaCard('ddg-ia-pass');const big=el('div','ddg-ia-big ddg-ia-mono',gen());
    const sub=el('div','ddg-ia-sub',n+' characters'+(strong?', strong':'')+'. Generated in your browser.');
    const again=el('button','ddg-ia-btn','Generate again');again.type='button';again.addEventListener('click',()=>{big.textContent=gen()});
    card.append(big,sub,again);return card;
  };
  const iaRandom=q=>{
    const m=q.trim().match(/^random\s+(?:number|integer)(?:\s+(?:between|from)\s+(-?\d+)\s+(?:and|to|-)\s+(-?\d+))?$/i);if(!m)return null;
    let a=m[1]!=null?+m[1]:0,b=m[2]!=null?+m[2]:100;if(a>b)[a,b]=[b,a];
    const card=iaCard();const big=el('div','ddg-ia-big');const roll=()=>{big.textContent=String(a+rnd(b-a+1))};roll();
    const again=el('button','ddg-ia-btn','Again');again.type='button';again.addEventListener('click',roll);
    card.append(big,el('div','ddg-ia-sub','Random number between '+a+' and '+b),again);return card;
  };
  const fmtMs=(ms,cs)=>{const t=Math.max(0,ms);const h=Math.floor(t/36e5),m=Math.floor(t/6e4)%60,s=Math.floor(t/1e3)%60,c=Math.floor(t/10)%100;const p=v=>String(v).padStart(2,'0');return (h?h+':'+p(m):p(m))+':'+p(s)+(cs?'.'+p(c):'')};
  const iaStopwatch=q=>{
    if(!/^(stopwatch|stop watch|chronometer)$/i.test(q.trim()))return null;
    const card=iaCard('ddg-ia-clock');const big=el('div','ddg-ia-clockt','00:00.00');const laps=el('ol','ddg-ia-laps');
    let t0=0,acc=0,run=false,raf=0;const now=()=>acc+(run?performance.now()-t0:0);
    const tick=()=>{big.textContent=fmtMs(now(),true);if(run)raf=requestAnimationFrame(tick)};
    const go=el('button','ddg-ia-btn ddg-ia-pri','Start');go.type='button';const lap=el('button','ddg-ia-btn','Reset');lap.type='button';
    go.addEventListener('click',()=>{if(run){acc=now();run=false;go.textContent='Start';lap.textContent='Reset'}else{t0=performance.now();run=true;go.textContent='Stop';lap.textContent='Lap';tick()}});
    lap.addEventListener('click',()=>{if(run){laps.prepend(el('li',null,fmtMs(now(),true)))}else{acc=0;laps.textContent='';tick()}});
    const bt=el('div','ddg-ia-btns');bt.append(go,lap);card.append(big,bt,laps);return card;
  };
  const iaTimer=q=>{
    const m=q.trim().match(/^(?:timer|countdown|set\s+(?:a\s+)?timer(?:\s+for)?)(?:\s+(.+))?$/i)||q.trim().match(/^(.+?)\s+timer$/i);if(!m)return null;
    let ms=0;const spec=(m[1]||'').toLowerCase();
    if(spec){const re=/(\d+(?:\.\d+)?)\s*(h|hr|hrs|hours?|m|mins?|minutes?|s|secs?|seconds?)\b/g;let x,any=false;while(x=re.exec(spec)){any=true;const v=+x[1];ms+=v*(x[2][0]==='h'?36e5:x[2][0]==='m'?6e4:1e3)}if(!any){if(/^\d+$/.test(spec))ms=+spec*6e4;else return null}}
    if(!ms)ms=5*6e4;
    const card=iaCard('ddg-ia-clock');const big=el('div','ddg-ia-clockt',fmtMs(ms));
    let left=ms,end=0,run=false,iv=0;
    const beep=()=>{try{const a=new AudioContext();[0,.35,.7].forEach(d=>{const o=a.createOscillator(),g=a.createGain();o.frequency.value=880;g.gain.value=.15;o.connect(g).connect(a.destination);o.start(a.currentTime+d);o.stop(a.currentTime+d+.2)})}catch(e){}};
    const tick=()=>{left=end-Date.now();if(left<=0){left=0;run=false;clearInterval(iv);go.textContent='Start';card.classList.add('ddg-ia-done');beep()}big.textContent=fmtMs(Math.ceil(left/1e3)*1e3);document.title=(run?fmtMs(Math.ceil(left/1e3)*1e3)+' · ':'')+q+' at DuckDuckXNG'};
    const go=el('button','ddg-ia-btn ddg-ia-pri','Start');go.type='button';const rs=el('button','ddg-ia-btn','Reset');rs.type='button';
    go.addEventListener('click',()=>{card.classList.remove('ddg-ia-done');if(run){run=false;clearInterval(iv);go.textContent='Start'}else{if(left<=0)left=ms;end=Date.now()+left;run=true;go.textContent='Pause';iv=setInterval(tick,200);tick()}});
    rs.addEventListener('click',()=>{run=false;clearInterval(iv);left=ms;go.textContent='Start';card.classList.remove('ddg-ia-done');big.textContent=fmtMs(ms)});
    const bt=el('div','ddg-ia-btns');bt.append(go,rs);card.append(big,bt);return card;
  };
  const iaTime=q=>{
    const m=q.trim().match(/^(?:what(?:'s| is)?\s+(?:the\s+)?)?(?:current\s+)?(time|date|day|today'?s date)(?:\s+(?:is\s+it\s+)?(?:now\s+)?(?:in|at)\s+(.+?))?\??$/i);if(!m)return null;
    let tz=Intl.DateTimeFormat().resolvedOptions().timeZone,place='';
    if(m[2]){const w=m[2].trim().toLowerCase().replace(/\s+/g,'_');const all=(Intl.supportedValuesOf?Intl.supportedValuesOf('timeZone'):[]);const ALIAS={london:'Europe/London',uk:'Europe/London',england:'Europe/London',wales:'Europe/London',cardiff:'Europe/London',scotland:'Europe/London',ireland:'Europe/Dublin',usa:'America/New_York',new_york:'America/New_York',nyc:'America/New_York',la:'America/Los_Angeles',los_angeles:'America/Los_Angeles',california:'America/Los_Angeles',japan:'Asia/Tokyo',china:'Asia/Shanghai',beijing:'Asia/Shanghai',india:'Asia/Kolkata',delhi:'Asia/Kolkata',mumbai:'Asia/Kolkata',australia:'Australia/Sydney',france:'Europe/Paris',germany:'Europe/Berlin',spain:'Europe/Madrid',italy:'Europe/Rome',russia:'Europe/Moscow',brazil:'America/Sao_Paulo',canada:'America/Toronto',dubai:'Asia/Dubai',uae:'Asia/Dubai',korea:'Asia/Seoul',south_korea:'Asia/Seoul',utc:'UTC',gmt:'UTC'};
      tz=ALIAS[w]||all.find(z=>z.toLowerCase().split('/').pop()===w);if(!tz)return null;place=m[2].trim().replace(/\b\w/g,c=>c.toUpperCase())}
    const isDate=/date|day/i.test(m[1]);const card=iaCard('ddg-ia-time');const big=el('div','ddg-ia-clockt');const sub=el('div','ddg-ia-sub');
    const upd=()=>{const d=new Date();big.textContent=isDate?d.toLocaleDateString('en-GB',{timeZone:tz,weekday:'long',day:'numeric',month:'long',year:'numeric'}):d.toLocaleTimeString('en-GB',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit'});
      sub.textContent=(isDate?'':d.toLocaleDateString('en-GB',{timeZone:tz,weekday:'long',day:'numeric',month:'long',year:'numeric'})+' · ')+(place||tz.replace(/_/g,' '))+' ('+(new Intl.DateTimeFormat('en-GB',{timeZone:tz,timeZoneName:'short'}).formatToParts(d).find(p=>p.type==='timeZoneName')||{}).value+')'};
    upd();if(!isDate)setInterval(upd,1000);card.append(big,sub);return card;
  };
  const CUR={usd:'US Dollar',gbp:'British Pound',eur:'Euro',jpy:'Japanese Yen',cny:'Chinese Yuan',inr:'Indian Rupee',aud:'Australian Dollar',cad:'Canadian Dollar',chf:'Swiss Franc',sek:'Swedish Krona',nok:'Norwegian Krone',dkk:'Danish Krone',pln:'Polish Zloty',nzd:'New Zealand Dollar',hkd:'Hong Kong Dollar',sgd:'Singapore Dollar',krw:'South Korean Won',mxn:'Mexican Peso',brl:'Brazilian Real',zar:'South African Rand',try:'Turkish Lira',aed:'UAE Dirham',btc:'Bitcoin'};
  const CSYM={'£':'gbp','$':'usd','€':'eur','¥':'jpy','pounds':'gbp','pound':'gbp','dollars':'usd','dollar':'usd','euros':'eur','euro':'eur','yen':'jpy','quid':'gbp'};
  const curCode=s=>{s=(s||'').trim().toLowerCase();return CSYM[s]||(CUR[s]?s:/^[a-z]{3}$/.test(s)?s:null)};
  const rateCache={};
  const getRate=(a,b)=>{const k=a+b;if(rateCache[k])return rateCache[k];return rateCache[k]=fetch('/search?format=json&engines=currency&q='+encodeURIComponent('1 '+a.toUpperCase()+' to '+b.toUpperCase()),{credentials:'same-origin'}).then(r=>r.json()).then(j=>{const t=((j.answers||[])[0]||{}).answer||'';const m=t.match(/\(1 [^:]+ : ([\d.e+-]+) /);if(!m)throw 0;return +m[1]})};
  const iaCurrency=async q=>{
    const m=q.trim().match(/^(?:convert\s+)?([£$€¥])?\s*([\d.,]+)?\s*([a-z£$€¥]+)?\s+(?:to|in|into)\s+([a-z£$€¥]+)$/i);if(!m)return null;
    const a=curCode(m[1]||m[3]),b=curCode(m[4]);if(!a||!b||a===b||(!m[2]&&!m[3]))return null;if(!CUR[a]&&!CUR[b])return null;
    const amt=m[2]?parseFloat(m[2].replace(/,/g,'')):1;const rate=await getRate(a,b);
    const card=iaCard('ddg-ia-units ddg-ia-cur');
    const opts=[...new Set([a,b,...Object.keys(CUR)])];
    const side=(k,val)=>{const s=el('div','ddg-ia-uside');const i=el('input');i.inputMode='decimal';i.value=val;const sl=el('select');opts.forEach(c=>{const o=el('option',null,c.toUpperCase()+(CUR[c]?' – '+CUR[c]:''));o.value=c;sl.appendChild(o)});sl.value=k;s.append(i,sl);s.i=i;s.s=sl;return s};
    const f2=v=>isFinite(v)?(Math.abs(v)>=1?v.toFixed(2):String(+v.toPrecision(4))):'';
    const L=side(a,String(amt)),R=side(b,f2(amt*rate));
    const sub=el('div','ddg-ia-sub');const setSub=r=>{sub.textContent='1 '+L.s.value.toUpperCase()+' = '+String(+r.toPrecision(6))+' '+R.s.value.toUpperCase()};setSub(rate);
    let cur=rate;
    const fromL=()=>{const v=parseFloat(L.i.value);R.i.value=isNaN(v)?'':f2(v*cur)};
    const fromR=()=>{const v=parseFloat(R.i.value);L.i.value=isNaN(v)?'':f2(v/cur)};
    const repick=()=>getRate(L.s.value,R.s.value).then(r=>{cur=r;setSub(r);fromL()}).catch(()=>{sub.textContent='no rate'});
    L.i.addEventListener('input',fromL);R.i.addEventListener('input',fromR);L.s.addEventListener('change',repick);R.s.addEventListener('change',repick);
    const sw=el('button','ddg-ia-swap');sw.type='button';sw.title='Swap';sw.textContent='⇄';sw.addEventListener('click',()=>{const x=L.s.value;L.s.value=R.s.value;R.s.value=x;repick()});
    const row=el('div','ddg-ia-urow');row.append(L,sw,R);card.append(row,sub);return card;
  };
  const iaDefine=async q=>{
    const m=q.trim().match(/^(?:define|definition\s+of|meaning\s+of|what\s+does\s+(.+?)\s+mean)\s*(.*?)\??$/i)||q.trim().match(/^(.+?)\s+(?:meaning|definition|define)$/i);if(!m)return null;
    const w=(m[2]||m[1]||'').trim();if(!w||w.split(/\s+/).length>3)return null;
    const r=await fetch('/assist?ia=define&q='+encodeURIComponent(w));if(r.status!==200)return null;const d=await r.json();
    const card=iaCard('ddg-ia-def');card.appendChild(el('div','ddg-ia-big',d.word));
    d.entries.forEach(e=>{card.appendChild(el('div','ddg-ia-pos',e.pos));const ol=el('ol','ddg-ia-defs');e.defs.forEach(x=>ol.appendChild(el('li',null,x)));card.appendChild(ol)});
    const src=el('a','ddg-ia-src','Wiktionary');src.href='https://en.wiktionary.org/wiki/'+encodeURIComponent(d.word.replace(/ /g,'_'));src.rel='noreferrer';card.appendChild(src);return card;
  };
  const WMO={0:'Clear',1:'Mostly clear',2:'Partly cloudy',3:'Cloudy',45:'Fog',48:'Freezing fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',56:'Freezing drizzle',57:'Freezing drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Freezing rain',71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Showers',81:'Showers',82:'Heavy showers',85:'Snow showers',86:'Snow showers',95:'Thunderstorm',96:'Thunderstorm',99:'Thunderstorm'};
  const wxIcon=(code,day)=>{const s=document.createElementNS(svgNS,'svg');s.setAttribute('viewBox','0 0 32 32');s.setAttribute('class','ddg-wx');const add=(t,a)=>{const e=document.createElementNS(svgNS,t);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));s.appendChild(e)};
    const sun=()=>day===0?add('path',{d:'M20 6a9 9 0 1 0 6 15A10 10 0 0 1 20 6z',fill:'#c7d3ff'}):add('circle',{cx:13,cy:13,r:6,fill:'#ffb800'});const cloud=(c)=>add('path',{d:'M9 25h15a5 5 0 0 0 0-10 7 7 0 0 0-13.4 1.6A4.2 4.2 0 0 0 9 25z',fill:c||'#b8c2cc'});
    if(code<=1)sun();else if(code<=3){sun();cloud()}else if(code<=48){cloud('#9aa4ad')}else{cloud('#8a95a0');const snow=code>=71&&code<=86&&code!==80&&code!==81&&code!==82;for(let i=0;i<3;i++)add(snow?'circle':'path',snow?{cx:12+i*5,cy:29,r:1.3,fill:'#dfe8ff'}:{d:`M${12+i*5} 27l-1.5 3`,stroke:'#5b9dff','stroke-width':1.6,'stroke-linecap':'round'})}
    return s};
  const iaWeather=async q=>{
    const m=q.trim().match(/^weather(?:\s+(?:in|for|at))?\s+(.+?)\??$/i)||q.trim().match(/^(.+?)\s+weather(?:\s+(?:today|tomorrow|forecast))?$/i);if(!m)return null;
    const place=m[1].replace(/\b(today|tomorrow|forecast|this week)\b/gi,'').trim();if(!place)return null;
    const r=await fetch('/assist?ia=weather&q='+encodeURIComponent(place));if(r.status!==200)return null;const d=await r.json();
    const imp=store.get('ddg-units')==='imperial';const T=c=>Math.round(imp?c*9/5+32:c)+'°';const W=k=>imp?Math.round(k/1.609)+' mph':Math.round(k)+' km/h';
    const c=d.current||{};const card=iaCard('ddg-ia-wx');
    const top=el('div','ddg-ia-wxtop');top.appendChild(wxIcon(c.weather_code,c.is_day));
    const tt=el('div','ddg-ia-wxt',T(c.temperature_2m));
    const info=el('div','ddg-ia-wxi');info.append(el('div','ddg-ia-wxp',[d.place,d.region,d.country].filter((x,i,a)=>x&&a.indexOf(x)===i).join(', ')),el('div',null,WMO[c.weather_code]||''),el('div','ddg-ia-sub','Feels like '+T(c.apparent_temperature)+' · Wind '+W(c.wind_speed_10m)+' · Humidity '+c.relative_humidity_2m+'%'));
    top.append(tt,info);card.appendChild(top);
    const dy=d.daily||{};const row=el('div','ddg-ia-wxdays');
    (dy.time||[]).forEach((t,i)=>{const x=el('div','ddg-ia-wxd');x.append(el('div','ddg-ia-wxdn',i?new Date(t+'T12:00').toLocaleDateString('en-GB',{weekday:'short'}):'Today'),wxIcon(dy.weather_code[i],1));const hl=el('div','ddg-ia-wxhl');hl.append(el('b',null,T(dy.temperature_2m_max[i])),el('span',null,' '+T(dy.temperature_2m_min[i])));x.appendChild(hl);if(dy.precipitation_probability_max&&dy.precipitation_probability_max[i]>=20)x.appendChild(el('div','ddg-ia-wxr',dy.precipitation_probability_max[i]+'%'));row.appendChild(x)});
    const src=el('a','ddg-ia-src','Open-Meteo');src.href='https://open-meteo.com/';src.rel='noreferrer';
    card.append(row,src);return card;
  };
  const instantAsync=()=>{
    const q=((document.getElementById('q')||{}).value||'').trim();const urls=document.getElementById('urls');
    const page=new URLSearchParams(location.search).get('pageno')||'1';const sel=document.querySelector('.category_button.selected');
    if(!q||!urls||page!=='1'||(sel&&!/general/.test(sel.name||''))||document.getElementById('ddg-ia')||document.getElementById('ddg-calc'))return;
    (async()=>{for(const f of [iaCurrency,iaWeather,iaDefine]){let c=null;try{c=await f(q)}catch(e){}if(c){if(!document.getElementById('ddg-ia'))urls.prepend(c);return}}})();
  };
  const instant=()=>{
    const q=((document.getElementById('q')||{}).value||'').trim();const urls=document.getElementById('urls');
    const page=new URLSearchParams(location.search).get('pageno')||'1';const sel=document.querySelector('.category_button.selected');
    if(!q||!urls||page!=='1'||(sel&&!/general/.test(sel.name||''))||document.getElementById('ddg-ia'))return false;
    for(const f of [iaUnits,iaPicker,iaPassword,iaRandom,iaStopwatch,iaTimer,iaTime]){let c=null;try{c=f(q)}catch(e){}if(c){urls.prepend(c);return true}}
    return false;
  };
  const applyPrefs=()=>{
    const r=document.documentElement;const off=k=>store.get(k)==='0';
    r.classList.toggle('ddg-tu',store.get('ddg-tu')==='1');r.classList.toggle('ddg-noicons',off('ddg-icons'));r.classList.toggle('ddg-nonames',off('ddg-names'));
    r.classList.toggle('ddg-noai',off('ddg-duckai'));r.classList.toggle('ddg-noexplore',off('ddg-explore'));
    r.dataset.fs=store.get('ddg-fs')||'large';
  };
  applyPrefs();
  const settingsPage=()=>{
    const f=document.querySelector('form[action$="/preferences"]')||document.querySelector('main form');
    if(!f||document.getElementById('ddg-set'))return;
    const fld=n=>f.querySelector('[name="'+n+'"]');
    let saving=null;
    const save=()=>{clearTimeout(saving);saving=setTimeout(()=>fetch(f.action,{method:'POST',body:new URLSearchParams(new FormData(f)),credentials:'same-origin',redirect:'manual'}).catch(()=>{}),120)};
    const root=el('div');root.id='ddg-set';
    const head=el('header','ddg-set-head');
    const lg=el('a','ddg-set-logo');lg.href='/';const li=el('img');li.src='/static/themes/simple/ddg/logo.svg';li.alt='DuckDuckXNG';lg.appendChild(li);
    const sf=el('form','ddg-set-search');sf.action='/search';sf.method='get';const si=el('input');si.name='q';si.placeholder='Search DuckDuckXNG';si.autocomplete='off';
    const sb=el('button');sb.type='submit';sb.title='Search';sb.appendChild(svg16(D16.search));sf.append(si,sb);
    const bb=el('button','ddg-burger');bb.type='button';bb.title='Menu';bb.appendChild(svg16(D16.burger,'0 0 20 20'));
    bb.addEventListener('click',()=>{menu();requestAnimationFrame(()=>document.documentElement.classList.add('ddg-menu-open'))});
    head.append(lg,sf,bb);
    const col=el('div','ddg-set-col');const top=el('div','ddg-set-top');top.appendChild(el('h1',null,'Search Settings'));
    const tabs=el('div','ddg-set-tabs');top.appendChild(tabs);col.appendChild(top);
    const panes={};
    [['general','General'],['appearance','Appearance'],['privacy','Privacy'],['aifeatures','AI Features']].forEach(([id,t])=>{
      const b=el('button','ddg-set-tab',t);b.type='button';b.dataset.id=id;tabs.appendChild(b);
      const p=el('div','ddg-set-pane');p.hidden=true;panes[id]=p;col.appendChild(p);
      b.addEventListener('click',()=>{history.replaceState(null,'','#'+id);show(id)});
    });
    const show=id=>{if(!panes[id])id='general';tabs.querySelectorAll('.ddg-set-tab').forEach(b=>b.classList.toggle('on',b.dataset.id===id));Object.entries(panes).forEach(([k,p])=>p.hidden=k!==id)};
    let grp=null;
    const group=p=>{grp=el('div','ddg-set-grp');panes[p].appendChild(grp)};
    const row=(label,desc,ctl,id)=>{const r=el('div','ddg-set-row');if(id)r.id=id;const t=el('div','ddg-set-txt');t.appendChild(el('div','ddg-set-l',label));if(desc)t.appendChild(el('div','ddg-set-d',desc));r.append(t,ctl);grp.appendChild(r);return r};
    const sel=(opts,get,set)=>{const s=el('select','ddg-set-sel');opts.forEach(([v,t])=>{const o=el('option',null,t);o.value=v;s.appendChild(o)});s.value=get();if(s.selectedIndex<0)s.selectedIndex=0;s.addEventListener('change',()=>{set(s.value)});return s};
    const tog=(get,set)=>{const b=el('button','ddg-set-tog');b.type='button';const r=()=>{const on=get();b.textContent=on?'On':'Off';b.classList.toggle('on',on)};r();b.addEventListener('click',()=>{set(!get());r()});return b};
    const sxSel=n=>[()=>fld(n)?fld(n).value:'',v=>{if(fld(n)){fld(n).value=v;save()}}];
    const sxChk=(n,inv)=>[()=>{const c=fld(n);return c?(inv?!c.checked:c.checked):false},v=>{const c=fld(n);if(c){c.checked=inv?!v:v;save()}}];
    const lsTog=(k,def)=>[()=>(store.get(k)||def)==='1',v=>{store.set(k,v?'1':'0');applyPrefs()}];
    const lang=fld('language');
    const regions=lang?[...lang.options].map(o=>{let t=o.textContent.replace(/\s+/g,' ').replace(/\[[^\]]*\]/g,'').replace(/[\u{1F1E6}-\u{1F1FF}\u{1F310}]/gu,'').trim();const m=t.match(/^[^-]+-(.+)$/);if(m)t=m[1].trim()+(o.value.includes('-')?' ('+t.split('-')[0].trim()+')':'');if(o.value==='all')t='All regions';if(o.value==='auto')t='Auto region';return [o.value,t]}):[];
    group('general');
    if(lang)row('Region','Changes the preferred region for search results',sel(regions,...sxSel('language')));
    group('general');
    row('Safe Search','Omits objectionable (mostly adult) material',sel([['2','Strict'],['1','Moderate'],['0','Off']],...sxSel('safesearch')));
    row('Instant Answers','Automatically open relevant Instant Answers',tog(...lsTog('ddg-ia','1')));
    group('general');
    if(fld('plugin_infiniteScroll'))row('Infinite Scroll','Loads more results when scrolling',tog(...sxChk('plugin_infiniteScroll',true)));
    if(fld('autocomplete'))row('Autocomplete Suggestions','Shows suggestions under the search box as you type',tog(()=>!!fld('autocomplete').value,v=>{fld('autocomplete').value=v?'brave':'';save()}));
    if(fld('results_on_new_tab'))row('New window','Opens results in a new window or tab',tog(...sxChk('results_on_new_tab')));
    row('Keyboard Shortcuts','Navigate with your keyboard',tog(()=>store.get('ddg-kk')!=='-1',v=>store.set('ddg-kk',v?'1':'-1')));
    row('Units of Measure','Used in instant answers',sel([['metric','Metric'],['imperial','Imperial']],()=>store.get('ddg-units')||'metric',v=>store.set('ddg-units',v)));
    group('appearance');
    const th=el('div','ddg-set-themes');
    [['system','Default'],['light','Light'],['dark','Dark']].forEach(([k,t])=>{const b=el('button','ddg-set-theme ddg-set-theme-'+k);b.type='button';const pv=el('span','ddg-set-pv');pv.append(el('i'),el('i'),el('i'));b.append(pv,el('span',null,t));
      const r=()=>th.querySelectorAll('.ddg-set-theme').forEach(x=>x.classList.toggle('on',x.classList.contains('ddg-set-theme-'+(store.get('ddg-theme')||'system'))));
      b.addEventListener('click',()=>{store.set('ddg-theme',k);applyTheme();r()});th.appendChild(b);setTimeout(r)});
    grp.appendChild(th);th.id='ddg-theme';
    group('appearance');
    row('Font size',null,sel([['small','Small'],['medium','Medium'],['large','Large'],['larger','Larger'],['largest','Largest']],()=>store.get('ddg-fs')||'large',v=>{store.set('ddg-fs',v);applyPrefs()}));
    row('Title Underline',null,tog(...lsTog('ddg-tu','0')));
    if(fld('url_formatting'))row('URL Format',null,sel([['pretty','Pretty'],['full','Full'],['host','Domain only']],...sxSel('url_formatting')));
    row('Site Icons',null,tog(...lsTog('ddg-icons','1')));
    row('Site Names',null,tog(...lsTog('ddg-names','1')));
    group('privacy');
    if(fld('method'))row('GET Requests','Uses GET requests so searches show up in browser history and can be shared',tog(()=>fld('method').value==='GET',v=>{fld('method').value=v?'GET':'POST';save()}));
    if(fld('image_proxy'))row('Image Proxy','Loads result images through this server',tog(...sxChk('image_proxy')));
    group('aifeatures');
    row('AI Chat','Shows AI Chat entry points in search',tog(...lsTog('ddg-duckai','1')));
    row('Search Assist','Shows AI-assisted answers in search results',sel([['never','Never'],['demand','On demand'],['sometimes','Sometimes'],['often','Often']],()=>store.get('ddg-sa-mode')||'often',v=>store.set('ddg-sa-mode',v)));
    row('Explore More','Shows related questions with Search Assist',tog(...lsTog('ddg-explore','1')));
    const wrap=el('div','ddg-set-wrap');wrap.appendChild(col);root.append(head,wrap);
    document.body.classList.add('ddg-set-on');document.body.prepend(root);
    show(location.hash.slice(1));
    addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(id==='ddg-theme'){show('appearance')}else show(id)});
    if(location.hash==='#ddg-theme')show('appearance');
    document.title='DuckDuckXNG Settings';
  };
  const menu=()=>{
    if(document.querySelector('.ddg-menu'))return;
    const bg=el('div','ddg-menu-bg');const m=el('nav','ddg-menu');
    const x=el('button','ddg-menu-x');x.type='button';x.title='Close';x.appendChild(svg16(D16.x));
    const close=()=>document.documentElement.classList.remove('ddg-menu-open');
    x.addEventListener('click',close);bg.addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    const sec=(h,links)=>{m.appendChild(el('h2',null,h));links.forEach(([t,href,fn])=>{const a=el('a',null,t);a.href=href;if(fn)a.addEventListener('click',e=>{e.preventDefault();close();fn()});m.appendChild(a)})};
    m.appendChild(x);
    sec('Search',[['Homepage','./'],['Themes','/preferences#ddg-theme'],['Settings','/preferences']]);
    sec('More',[['AI Chat','#',()=>openChat([],'')]]);
    document.body.append(bg,m);
  };
  const home=()=>{
    const idx=document.querySelector('.index_endpoint .index');const form=document.getElementById('search');const qi=document.getElementById('q');
    if(!idx||!form||!qi||document.querySelector('.ddg-home-head'))return;
    const head=el('header','ddg-home-head');
    const logo=el('a','ddg-home-logo');logo.href='./';const li=el('img');li.alt='DuckDuckXNG';li.dataset.ddgLogo='logo-h';logo.appendChild(li);
    const slot=el('div','ddg-home-slot');slot.appendChild(form);
    const right=el('div','ddg-home-right');
    const ai=el('a','ddg-home-ai');ai.href='#';ai.append(svg16(D16.ai),el('span',null,'AI Chat'));ai.addEventListener('click',e=>{e.preventDefault();openChat([],'')});
    const bb=el('button','ddg-burger');bb.type='button';bb.title='Menu';bb.appendChild(svg16(D16.burger,'0 0 20 20'));
    bb.addEventListener('click',()=>{menu();requestAnimationFrame(()=>document.documentElement.classList.add('ddg-menu-open'))});
    right.append(ai,bb);head.append(right);
    const mid=el('div','ddg-home-mid');mid.append(logo,slot);
    idx.textContent='';idx.append(head,mid);
    let aiMode=false;
    const box=form.querySelector('.search_box');const md=el('div','ddg-mode');
    const chip=(t,ic,on)=>{const b=el('button',on?'on':'');b.type='button';b.append(svg16(ic),el('span',null,t));md.appendChild(b);return b};
    const cs=chip('Search',D16.search,true),ca=chip('Ask AI',D16.ai,false);
    const setMode=a=>{aiMode=a;cs.classList.toggle('on',!a);ca.classList.toggle('on',a);qi.placeholder=a?'Ask privately':'Search privately';qi.focus()};
    cs.addEventListener('click',()=>setMode(false));ca.addEventListener('click',()=>setMode(true));
    if(box)box.appendChild(md);
    form.addEventListener('submit',e=>{if(aiMode){e.preventDefault();e.stopImmediatePropagation();goChat(qi.value)}},true);
    qi.placeholder='Search privately';
    applyTheme();
  };
  const run=()=>{
    if(ddgParams())return;
    shortcuts();
    const qi=document.getElementById('q');if(qi)qi.placeholder='Search without being tracked';
    document.querySelectorAll('link[rel~="icon"]').forEach(l=>l.remove());
    const fav=el('link');fav.rel='icon';fav.href='/static/themes/simple/ddg/logo.svg';document.head.appendChild(fav);
    const ac=document.querySelector('.search_box .autocomplete');
    focusSuggest();
    if(qi)qi.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.altKey){e.preventDefault();e.stopImmediatePropagation();ac&&ac.classList.remove('open');goChat(qi.value)}},true);
    if(ac&&qi){let busy=false;new MutationObserver(()=>{if(busy)return;busy=true;const typed=qi.value.toLowerCase();
      aiRow(ac,qi);
      ac.querySelectorAll('li:not(.ddg-ai-row)').forEach(li=>{if(li.dataset.ddg===li.textContent)return;const t=li.textContent;li.textContent='';
        if(typed&&t.toLowerCase().startsWith(typed)){li.appendChild(el('span',null,t.slice(0,typed.length)));li.appendChild(el('b',null,t.slice(typed.length)))}else li.appendChild(el('b',null,t));
        li.dataset.ddg=li.textContent});busy=false}).observe(ac,{childList:true,subtree:true})}
    if(document.body.classList.contains('index_endpoint'))home();
    if(document.body.classList.contains('preferences_endpoint')){settingsPage();return}
    if(location.hash.startsWith('#chat')){const id=decodeURIComponent(location.hash.slice(6));setTimeout(()=>{openChat(null,'');const c=id&&chatsLoad().find(x=>x.id===id);if(c)chatLoad(c)},0)}
    if(!document.body.classList.contains('results_endpoint')){document.title='DuckDuckXNG';return}
    if(qi&&qi.value.trim())document.title=qi.value.trim()+' at DuckDuckXNG';
    header();filters();answersBox();results();catLayout();sidebar();
    const urls0=document.getElementById('urls');
    if(urls0&&qi&&qi.value.trim()&&!urls0.querySelector('article.result')){[...urls0.children].forEach(c=>c.hidden=true);const nr=el('div','ddg-noresults');nr.append('No results found for ',el('b',null,qi.value.trim()),'.');urls0.prepend(nr)}
    const iaOn=store.get('ddg-ia')!=='0';
    const cp=iaOn?calc():null;
    if(cp)cp.then(()=>{results();assist();if(!assistStarted)assistDone()});
    else if(iaOn&&instant()){assistDone()}
    else{if(iaOn)instantAsync();if(!new URLSearchParams(location.search).get('duckai'))assist();if(!assistStarted)assistDone();videos()}
    if(new URLSearchParams(location.search).get('duckai')&&qi&&qi.value.trim()){const u=new URL(location.href);u.searchParams.delete('duckai');history.replaceState(null,'',u.pathname+u.search+(location.hash.startsWith('#chat')?'':'#chat'));if(location.hash.length<=5)openChat([],qi.value.trim())}
    const urls=document.getElementById('urls');
    if(urls)new MutationObserver(()=>{results();catLayout()}).observe(urls,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
