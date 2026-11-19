(function(){var d=document,b=d.body;
d.getElementById('burger').onclick=function(){var o=b.classList.toggle('nav-open');this.setAttribute('aria-expanded',o)};
d.querySelectorAll('.chev').forEach(function(c){c.onclick=function(){var li=c.parentNode,o=li.classList.toggle('open');c.setAttribute('aria-expanded',o)}});
d.addEventListener('keydown',function(e){if(e.key=='Escape'){d.querySelectorAll('li.open').forEach(function(l){l.classList.remove('open')});if(d.activeElement)d.activeElement.blur()}});
var esc=function(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var nl=d.getElementById('nl');
if(nl){var all=[],cat=new URLSearchParams(location.search).get('cat')||'',q='',shown=0,N=12,chips=d.getElementById('chips');
fetch('/news-index.json').then(function(r){return r.json()}).then(function(j){all=j;draw(true)});
var f=function(){return all.filter(function(p){return(!cat||p.c.indexOf(cat)>-1)&&(!q||(p.t+' '+p.x).toLowerCase().indexOf(q)>-1)})};
function draw(reset){if(reset){shown=0;nl.innerHTML=''}var l=f(),s=l.slice(shown,shown+N);shown+=s.length;
nl.insertAdjacentHTML('beforeend',s.map(function(p){return '<article class="card"><div class="meta">'+p.d+'</div><h3><a href="'+p.u+'">'+esc(p.t)+'</a></h3><p>'+esc(p.x)+'</p></article>'}).join(''));
d.getElementById('more').style.display=shown<l.length?'':'none';
chips.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x.dataset.c==cat)})}
chips.onclick=function(e){if(e.target.dataset.c!==undefined){cat=e.target.dataset.c;draw(true)}};
d.getElementById('nq').oninput=function(){q=this.value.toLowerCase();draw(true)};d.getElementById('more').onclick=function(){draw()}}
var sq=d.getElementById('sq');
if(sq){var idx=[];fetch('/search-index.json').then(function(r){return r.json()}).then(function(j){idx=j;sq.value=new URLSearchParams(location.search).get('q')||'';run()});
function run(){var q=sq.value.toLowerCase().trim(),o=d.getElementById('sr');if(q.length<2){o.innerHTML='';return}
var r=idx.filter(function(p){return(p.t+' '+p.x).toLowerCase().indexOf(q)>-1}).sort(function(a,b){return(b.t.toLowerCase().indexOf(q)>-1)-(a.t.toLowerCase().indexOf(q)>-1)}).slice(0,40);
o.innerHTML=r.length?r.map(function(p){return '<li><a href="'+p.u+'">'+esc(p.t)+'</a><small>'+esc(p.x.slice(0,140))+'</small></li>'}).join(''):'<li>No results.</li>'}
sq.oninput=run}
})();
