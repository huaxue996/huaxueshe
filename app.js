// ===== 花学社 v3 原生版（不依赖任何外部库，页面能打开就一定能用）=====
const BOARDS=[
 {key:'note',name:'📒 笔记'},{key:'feihualing',name:'🌸 飞花令'},{key:'jiqiao',name:'💡 技巧&方法'},
 {key:'chigua',name:'🍉 吃瓜'},{key:'suibi',name:'✍️ 随笔'},{key:'tiwen',name:'🙋 提问解答'},{key:'youxiu',name:'🏆 好评专区'}];
const RULES=`《花学社社区总版规》v1.0
一、总则：花学社是面向大众学习者的学习交流社区，提倡真诚分享、友善互助、专注学习。注册即视为同意本版规。
二、账号：仅支持QQ邮箱(@qq.com)注册登录；一人一号，严禁小号规避处罚；妥善保管账号。
三、发帖：内容与板块相符；标题简明；禁止水帖刷屏灌水。好评专区仅展示管理员精选好帖。
四、红线（从严处理）：
1.禁止任何形式的链接与二维码（含变体写法），帖子与评论均经检测，检测到一律拦截打回；
2.禁止黄赌毒；3.禁止辱骂、人身攻击、引战；4.禁止造谣、传谣、诽谤；5.禁止政治敏感/时政议题；
6.禁止广告推广引流（官方QQ群/频道除外）；7.禁止泄露他人隐私；8.禁止脚本刷硬币/等级/信誉分。
五、奖励：签到领硬币（连续递增）；发帖+2硬币日限10；评论+1硬币日限10；解题被认可+5信誉分（满分则+10硬币）；收到打赏得好评或硬币。
六、信誉分（满分100）与处罚：
· 骂人/造谣：扣10分+禁言1天，再犯+2天循环累加；议政：一次扣50分；
· 涉黄赌毒：扣完分+永久封号；恶意发链接/二维码：视情节扣10~50分+禁言/封号。
扣分即处罚，不额外禁言，可通过解题恢复信誉分。严重违规封号+封设备。
七、举报与审核：所有内容经审核拦截链接/二维码；人人可举报违规；管理员处理举报。
八、附则：本版规最终解释权归管理员；修订后公示。`;
const COURSES=[
 {t:'高中数学 · 基础精讲',s:'B站 免费系统课',p:'bili',u:'https://space.bilibili.com'},
 {t:'英语语法 · 从零到通',s:'B站 免费系统课',p:'bili',u:'https://www.bilibili.com'},
 {t:'物理思维 · 解题技巧',s:'抖音 短视频课',p:'douyin',u:'https://www.douyin.com'},
 {t:'学习方法 · 高效记忆',s:'抖音 短视频课',p:'douyin',u:'https://www.douyin.com'}];

let currentBoard='note',currentPost=null,myProfile=null,pomoTimer=null,pomoLeft=1500,currentTipAmount=1,currentRank='good',currentPan='uc';
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fmtTime(t){if(!t)return'';const d=new Date(t),n=new Date(),p=x=>String(x).padStart(2,'0');return d.toDateString()===n.toDateString()?p(d.getHours())+':'+p(d.getMinutes()):(d.getMonth()+1)+'月'+d.getDate()+'日';}
function toast(m){const t=$('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2200);}
function getDeviceId(){let d=localStorage.getItem('did');if(!d){d='dev-'+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('did',d);}return d;}
function goPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('#bottomNav .nav-item').forEach(n=>n.classList.toggle('on',n.dataset.p===id));if(id==='mainPage')loadPosts();if(id==='postPage')initPostForm();if(id==='mePage')loadMe();if(id==='signPage')loadSignPage();if(id==='rankPage')loadRank(currentRank);if(id==='rulesPage')$('rulesBox').innerHTML=RULES.replace(/\n/g,'<br>');if(id==='resourcePage'){loadResources();if(myProfile&&myProfile.role==='admin')$('resAdminBox').style.display='block';}if(id==='adminPage')loadAdmin('reports');if(id==='coursePage')renderCourses();}
document.querySelectorAll('#bottomNav .nav-item').forEach(n=>n.onclick=()=>goPage(n.dataset.p));

// ============ 核心请求封装（原生 fetch，不依赖任何库） ============
function authHeaders(){const h={'apikey':SUPABASE_ANON_KEY,'Content-Type':'application/json'};const t=localStorage.getItem('sb_token');if(t)h['Authorization']='Bearer '+t;return h;}
async function api(path,options={}){
  const res=await fetch(SUPABASE_URL+path,{...options,headers:{...authHeaders(),...(options.headers||{})}});
  if(!res.ok){let msg='HTTP '+res.status;try{const j=await res.json();msg=j.msg||j.error_description||j.message||j.hint||msg;}catch(e){}throw new Error(msg);}
  const txt=await res.text();
  if(!txt)return null;
  try{return JSON.parse(txt);}catch(e){return txt;}
}
const enc=encodeURIComponent;
function qs(obj){return Object.entries(obj).map(([k,v])=>k+'='+enc(v)).join('&');}
function dbSelect(table,params=''){return api('/rest/v1/'+table+'?select=*'+params);}
function dbInsert(table,body){return api('/rest/v1/'+table,{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});}
function dbUpdate(table,filter,body){return api('/rest/v1/'+table+'?'+filter,{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});}
function dbDelete(table,filter){return api('/rest/v1/'+table+'?'+filter,{method:'DELETE'});}
function dbRpc(fn,args){return api('/rest/v1/rpc/'+fn,{method:'POST',body:JSON.stringify(args||{})});}

// ============ 登录（QQ邮箱验证码） ============
async function sendCode(){
  const email=$('loginEmail').value.trim().toLowerCase();
  if(!/^[a-z0-9._%+-]+@qq\.com$/i.test(email)){$('loginErr').textContent='仅支持 QQ 邮箱（@qq.com）哦';return;}
  $('loginErr').textContent='';const b=$('sendCodeBtn');b.disabled=true;b.textContent='发送中…';
  try{await api('/auth/v1/otp',{method:'POST',body:JSON.stringify({email,create_user:true})});b.textContent='已发送 ✅';setTimeout(()=>{b.disabled=false;b.textContent='发送验证码';},60000);}
  catch(e){b.disabled=false;b.textContent='发送验证码';$('loginErr').textContent='发送失败：'+e.message;}
}
async function doLogin(){
  const email=$('loginEmail').value.trim().toLowerCase(),token=$('loginCode').value.trim();
  if(!email||!token){$('loginErr').textContent='请先填邮箱和验证码';return;}
  try{
    const j=await api('/auth/v1/verify',{method:'POST',body:JSON.stringify({type:'email',email,token})});
    if(!j.access_token){$('loginErr').textContent='验证码错误或已过期';return;}
    localStorage.setItem('sb_token',j.access_token);localStorage.setItem('sb_user',JSON.stringify(j.user));
    const banned=await dbRpc('is_device_banned',{dev:getDeviceId()});
    if(banned){await logout();toast('🚫 该设备已被封禁，无法使用');return;}
    await dbUpdate('profiles','id=eq.'+j.user.id,{device_id:getDeviceId()});
    showMain();
  }catch(e){$('loginErr').textContent='验证失败：'+e.message;}
}
async function logout(){localStorage.removeItem('sb_token');localStorage.removeItem('sb_user');location.reload();}
function currentUser(){try{return JSON.parse(localStorage.getItem('sb_user'));}catch(e){return null;}}
async function fetchProfile(){const u=currentUser();if(!u)return null;try{const r=await dbSelect('profiles','&id=eq.'+u.id);return r&&r[0]||null;}catch(e){return null;}}
async function showMain(){myProfile=await fetchProfile();if(!myProfile){myProfile={nickname:'花友',level:1,exp:0,coins:0,credit:100,role:'user'};}goPage('mainPage');}

// ============ 板块 & 帖子 ============
function renderBoards(){const box=$('boards');box.innerHTML=BOARDS.map(b=>`<div class="board-tab ${b.key===currentBoard?'on':''}" data-k="${b.key}">${b.name}</div>`).join('');box.querySelectorAll('.board-tab').forEach(t=>t.onclick=()=>{currentBoard=t.dataset.k;renderBoards();loadPosts();});}
async function loadPosts(){
  renderBoards();const list=$('postList');list.innerHTML='<div class="empty">加载中...</div>';
  try{
    const cond=currentBoard==='youxiu'?qs({status:'eq.published',is_featured:'eq.true',select:'*,author_id(nickname,level)',order:'created_at.desc',limit:'50'}):qs({status:'eq.published',board:'eq.'+currentBoard,select:'*,author_id(nickname,level)',order:'created_at.desc',limit:'50'});
    const data=await api('/rest/v1/posts?'+cond);
    if(!data||!data.length){list.innerHTML='<div class="empty">这个板块还没有帖子，来发第一帖吧 ✨</div>';return;}
    list.innerHTML=data.map(p=>`<div class="post-card" onclick="openPost(${p.id})"><div class="pc-title">${esc(p.title)}${p.is_featured?' 🏆':''}</div><div class="pc-body">${esc(p.content)}</div><div class="pc-meta"><span>👤 ${esc(p.author_id?.nickname||'花友')} <span class="lv">Lv${p.author_id?.level||1}</span></span><span>👍${p.like_count}</span><span>❤️${p.good_count}</span><span>🪙${p.coin_count}</span><span style="margin-left:auto">${fmtTime(p.created_at)}</span></div></div>`).join('');
  }catch(e){list.innerHTML='<div class="empty">加载失败：'+esc(e.message)+'</div>';}
}
async function openPost(id){
  try{const r=await api('/rest/v1/posts?'+qs({id:'eq.'+id,select:'*,author_id(nickname,level)'}));if(!r||!r[0])return;currentPost=r[0];}catch(e){return;}
  const data=currentPost;
  $('detailBox').innerHTML=`<div class="detail-title">${esc(data.title)}${data.is_featured?' 🏆':''}</div><div class="detail-meta"><span>👤 ${esc(data.author_id?.nickname||'花友')}</span><span class="lv">Lv${data.author_id?.level||1}</span><span style="margin-left:auto">${fmtTime(data.created_at)}</span></div><div class="detail-body">${esc(data.content)}</div><div class="detail-actions"><button class="action-btn ${isLiked(data.id)?'on':''}" onclick="likePost()">👍 ${data.like_count}</button><button class="action-btn warn" onclick="openTip()">🎁 打赏</button><button class="action-btn" onclick="openReport()">🚩 举报</button></div>`;
  if(myProfile&&myProfile.role==='admin'){$('detailBox').insertAdjacentHTML('beforeend',`<div class="detail-actions"><button class="action-btn" onclick="toggleFeatured()">${data.is_featured?'移出':'加入'}好评专区</button></div>`);}
  $('cmBar').style.display='flex';loadComments(id);goPage('detailPage');
}
function isLiked(id){return(JSON.parse(localStorage.getItem('liked')||'[]')).includes(id);}
async function likePost(){const l=JSON.parse(localStorage.getItem('liked')||'[]');if(l.includes(currentPost.id))return;l.push(currentPost.id);localStorage.setItem('liked',JSON.stringify(l));try{await dbUpdate('posts','id=eq.'+currentPost.id,{like_count:currentPost.like_count+1});currentPost.like_count++;document.querySelector('.action-btn').classList.add('on');document.querySelector('.action-btn').textContent='👍 '+currentPost.like_count;}catch(e){toast('点赞失败');}}
async function toggleFeatured(){if(!myProfile||myProfile.role!=='admin')return;try{await dbUpdate('posts','id=eq.'+currentPost.id,{is_featured:!currentPost.is_featured});currentPost.is_featured=!currentPost.is_featured;toast(currentPost.is_featured?'已加入好评专区 🏆':'已移出好评专区');openPost(currentPost.id);}catch(e){toast('操作失败');}}

// ============ 评论 ============
async function loadComments(pid){const box=$('commentList');try{const data=await api('/rest/v1/comments?'+qs({post_id:'eq.'+pid,status:'eq.published',select:'*,author_id(nickname,level)',order:'created_at.asc'}));box.innerHTML=(!data||!data.length)?'<div class="empty" style="padding:20px 0">还没有评论，抢沙发～</div>':data.map(c=>`<div class="comment-box"><div class="cb-name">👤 ${esc(c.author_id?.nickname||'花友')} <span class="lv">Lv${c.author_id?.level||1}</span></div><div class="cb-text">${esc(c.content)}</div><div class="cb-time">${fmtTime(c.created_at)}</div></div>`).join('');}catch(e){box.innerHTML='<div class="empty">评论加载失败</div>';}}
async function submitComment(){const content=$('cmInput').value.trim();if(!content||!myProfile)return;try{const r=await dbInsert('comments',{post_id:currentPost.id,author_id:myProfile.id,content});if(r&&r[0]&&r[0].status==='rejected')toast('🚫 评论包含链接，已拦截');else{$('cmInput').value='';loadComments(currentPost.id);}}catch(e){toast('发布失败：'+e.message);}}

// ============ 发帖 ============
function initPostForm(){const c=$('boardChips');c.innerHTML=BOARDS.slice(0,6).map(b=>`<div class="chip ${b.key===currentBoard?'on':''}" data-k="${b.key}">${b.name}</div>`).join('');c.querySelectorAll('.chip').forEach(x=>x.onclick=()=>{c.querySelectorAll('.chip').forEach(y=>y.classList.remove('on'));x.classList.add('on');currentBoard=x.dataset.k;});$('postErr').textContent='';}
async function submitPost(){
  if(myProfile&&myProfile.banned_until&&new Date(myProfile.banned_until)>new Date()){toast('⛔ 你正被禁言中，无法发帖');return;}
  if(myProfile&&myProfile.is_banned){toast('⛔ 账号已封禁');return;}
  const title=$('pTitle').value.trim(),content=$('pContent').value.trim();
  if(!title){$('postErr').textContent='请填写标题';return;}if(!content){$('postErr').textContent='请填写内容';return;}
  try{const r=await dbInsert('posts',{author_id:myProfile.id,board:currentBoard,title,content});
    if(r&&r[0]&&r[0].status==='rejected'){$('postErr').textContent='🚫 '+r[0].reject_reason;return;}
    $('postErr').textContent='✅ 发布成功 +2硬币';$('pTitle').value='';$('pContent').value='';setTimeout(()=>goPage('mainPage'),900);
  }catch(e){$('postErr').textContent='发布失败：'+e.message;}
}

// ============ 打赏 & 举报 ============
function openTip(){if(!myProfile){toast('请先登录');return;}if(currentPost.author_id===myProfile.id){toast('不能打赏自己');return;}$('tipCoins').innerHTML=[1,2,5,10].map(n=>`<div class="chip ${n===currentTipAmount?'on':''}" data-n="${n}" onclick="pickTip(${n})">🪙${n}</div>`).join('');$('tipModal').classList.add('show');}
function pickTip(n){currentTipAmount=n;document.querySelectorAll('#tipCoins .chip').forEach(c=>c.classList.toggle('on',+c.dataset.n===n));}
function hideTip(){$('tipModal').classList.remove('show');}
async function doTip(kind,amount){try{const r=await dbRpc('tip_post',{p_post_id:currentPost.id,p_kind:kind,p_amount:amount||currentTipAmount});toast(r||'操作失败');hideTip();setTimeout(()=>openPost(currentPost.id),800);}catch(e){toast('失败：'+e.message);}}
async function openReport(){if(!myProfile){toast('请先登录');return;}const reasons=['辱骂/人身攻击','造谣/诽谤','链接/二维码广告','黄赌毒','政治敏感','其他'];const r=prompt('请选择举报原因（输入序号）：\n'+reasons.map((x,i)=>`${i+1}.${x}`).join('\n'));if(!r)return;const i=parseInt(r)-1;if(i<0||i>=reasons.length){toast('序号无效');return;}try{await dbInsert('reports',{target_type:'post',target_id:currentPost.id,reason:reasons[i],reporter_id:myProfile.id});toast('🚩 举报成功，管理员会尽快处理');}catch(e){toast('举报失败');}}

// ============ 我的（含修改昵称） ============
async function loadMe(){if(!myProfile)return;const p=myProfile;
$('meCard').innerHTML=`<div class="stat-card"><div><div class="stat-num" style="color:#2D7FF9">Lv${p.level}</div><div class="stat-label">等级</div></div><div><div class="stat-num" style="color:#ff9500">🪙${p.coins}</div><div class="stat-label">硬币</div></div><div><div class="stat-num" style="color:#7C6FF0">💯${p.credit}</div><div class="stat-label">信誉分</div></div></div><div class="menu-card"><div class="menu-item" style="justify-content:center;cursor:pointer" onclick="renameMe()"><span class="mi-ico">👤</span><b style="font-size:16px">${esc(p.nickname)}</b>${p.role==='admin'?' <span class="lv" style="background:#e5484d">管理员</span>':''}<span class="mi-arrow" style="font-size:12px">改昵称</span></div></div>`;
$('adminEntry').style.display=p.role==='admin'?'block':'none';}
async function renameMe(){const n=prompt('输入新昵称（2~12个字）',myProfile.nickname);if(!n)return;const v=n.trim();if(v.length<2||v.length>12){toast('昵称长度2~12');return;}try{await dbUpdate('profiles','id=eq.'+myProfile.id,{nickname:v});myProfile.nickname=v;toast('✅ 昵称已更新');loadMe();}catch(e){toast('修改失败');}}

// ============ 签到 ============
async function loadSignPage(){try{const data=await api('/rest/v1/checkins?'+qs({user_id:'eq.'+myProfile.id,order:'checkin_date.desc',limit:'7'}));const today=new Date().toISOString().slice(0,10);const todayDone=data&&data[0]&&data[0].checkin_date===today;const streak=data&&data[0]?data[0].streak:0;let hist='';if(data)hist=data.map(c=>`<span style="margin:0 4px;font-size:20px">${c.checkin_date===today?'✅':'📅'}</span>`).join('');
$('signBox').innerHTML=`<div style="font-size:20px;font-weight:700;margin-bottom:6px">当前连续签到：<span style="color:#ff9500">${streak} 天</span></div><div style="margin-bottom:10px">${hist}</div><div class="tip" style="margin-bottom:20px">连签越久奖励越多：基础1枚，每连续7天+2，每连续30天+5</div>`;
if(todayDone)$('signBox').innerHTML+='<div style="color:#999;padding:20px 0">今天已经签过啦，明天再来～</div>';else $('signBox').innerHTML+='<button class="btn" style="max-width:240px" onclick="doCheckin()">📅 立即签到</button>';}catch(e){$('signBox').innerHTML='<div class="empty">加载失败</div>';}}
async function doCheckin(){try{const r=await dbInsert('checkins',{user_id:myProfile.id});const c=r[0];toast(`✅ 签到成功！连续 ${c.streak} 天，+${c.reward} 硬币 🪙`);myProfile=await fetchProfile();loadSignPage();}catch(e){toast(e.message&&e.message.includes('23505')||e.message.includes('duplicate')?'今天已经签过啦':'签到失败');}}

// ============ 排行榜 ============
async function loadRank(type){currentRank=type;$('tabGood').classList.toggle('on',type==='good');$('tabLevel').classList.toggle('on',type==='level');const box=$('rankList');box.innerHTML='<div class="empty">加载中...</div>';
try{if(type==='good'){const data=await api('/rest/v1/posts?'+qs({status:'eq.published',select:'*,author_id(nickname,level)',order:'good_count.desc',limit:'20'}));box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((p,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:10px"><div style="font-size:14px">${esc(p.title)}</div><div style="font-size:12px;color:#999">👤 ${esc(p.author_id?.nickname||'')} · ${fmtTime(p.created_at)}</div></div><div class="rank-val">❤️ ${p.good_count}</div></div>`).join('');}
else{const data=await api('/rest/v1/profiles?'+qs({order:'exp.desc',limit:'20'}));box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((u,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:10px;font-size:15px">${esc(u.nickname)}${u.role==='admin'?' <span class="lv" style="background:#e5484d">管理</span>':''}</div><div class="rank-val"><span class="lv" style="background:#2D7FF9">Lv${u.level}</span> ⚡${u.exp}</div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}

// ============ 番茄钟 ============
function pomoStart(){const b=$('pomoBtn');if(pomoTimer){clearInterval(pomoTimer);pomoTimer=null;b.textContent='继续';$('pomoState').textContent='已暂停';return;}b.textContent='暂停';$('pomoState').textContent='专注中…保持安静';pomoTimer=setInterval(()=>{pomoLeft--;if(pomoLeft<=0){clearInterval(pomoTimer);pomoTimer=null;b.textContent='开始';$('pomoState').textContent='🍅 专注完成！休息一下吧';pomoLeft=1500;pomoRender();toast('🍅 番茄完成！');return;}pomoRender();},1000);}
function pomoReset(){if(pomoTimer){clearInterval(pomoTimer);pomoTimer=null;}$('pomoBtn').textContent='开始';$('pomoState').textContent='专注 25 分钟';pomoLeft=1500;pomoRender();}
function pomoRender(){const m=String(Math.floor(pomoLeft/60)).padStart(2,'0'),s=String(pomoLeft%60).padStart(2,'0');$('pomoTime').textContent=m+':'+s;}

// ============ 课程 & 引流 ============
function renderCourses(){const box=$('courseList');box.innerHTML=COURSES.map(c=>`<div class="course-card" onclick="location.href='${c.u}'"><div class="cc-ico" style="background:${c.p==='bili'?'#fb7299':'#161823'}">${c.p==='bili'?'B':'抖'}</div><div><div class="cc-title">${c.t}</div><div class="cc-sub">${c.s}</div></div></div>`).join('');}
function joinQQ(){if(navigator.clipboard)navigator.clipboard.writeText(QQ_GROUP).then(()=>toast('QQ群号已复制：'+QQ_GROUP+'，打开QQ搜索加群'));else toast('QQ群号：'+QQ_GROUP+'，请到QQ搜索加群');location.href='mqqapi://card/show_pslcard?src_type=internal&version=1&uin='+QQ_GROUP+'&card_type=group&source=qrcode';}
function joinChannel(){if(QQ_CHANNEL&&QQ_CHANNEL.startsWith('http'))location.href=QQ_CHANNEL;else toast('频道链接待管理员配置');}

// ============ 资源专区 ============
function renderPanChips(){const c=$('panChips');c.innerHTML=['UC','百度','夸克','迅雷'].map((p,i)=>`<div class="chip ${i===0?'on':''}" data-k="${['uc','baidu','quark','xunlei'][i]}" onclick="pickPan(this,'${['uc','baidu','quark','xunlei'][i]}')">${p}</div>`).join('');}
function pickPan(el,k){currentPan=k;document.querySelectorAll('#panChips .chip').forEach(x=>x.classList.remove('on'));el.classList.add('on');}
async function loadResources(){renderPanChips();try{const data=await api('/rest/v1/resources?'+qs({select:'*,created_by(nickname)',order:'created_at.desc'}));const box=$('resList');if(!data||!data.length){box.innerHTML='<div class="empty">资源专区建设中，管理员发布后可见</div>';return;}const PAN={uc:'UC',baidu:'百度',quark:'夸克',xunlei:'迅雷'};box.innerHTML=data.map(r=>`<div class="res-card"><div class="res-title">📦 ${esc(r.title)}<span class="res-tag">${PAN[r.pan_type]||''}</span></div><div class="res-desc">${esc(r.description||'')}</div><a class="res-link" href="${esc(r.link)}" target="_blank">查看/转存 ↗</a></div>`).join('');}catch(e){$('resList').innerHTML='<div class="empty">加载失败</div>';}}
async function submitResource(){if(!myProfile||myProfile.role!=='admin'){toast('仅管理员可发布');return;}const title=$('rTitle').value.trim(),desc=$('rDesc').value.trim(),link=$('rLink').value.trim();if(!title||!link){toast('请填标题和链接');return;}try{await dbInsert('resources',{title,description:desc,pan_type:currentPan,link,created_by:myProfile.id});toast('✅ 资源已发布');$('rTitle').value='';$('rDesc').value='';$('rLink').value='';loadResources();}catch(e){toast('发布失败：'+e.message);}}

// ============ 管理员后台 ============
async function loadAdmin(tab){$('aTab1').classList.toggle('on',tab==='reports');$('aTab2').classList.toggle('on',tab==='punish');const box=$('adminBox');
if(tab==='reports'){try{const data=await api('/rest/v1/reports?'+qs({status:'eq.pending',order:'created_at.desc'}));if(!data||!data.length){box.innerHTML='<div class="empty">没有待处理的举报 🎉</div>';return;}
let html='<div class="tip" style="margin-bottom:10px">共 '+data.length+' 条待处理举报</div>';
for(const r of data){let target='',content='',pid=null;try{if(r.target_type==='post'){const p=await api('/rest/v1/posts?'+qs({id:'eq.'+r.target_id}));if(p&&p[0]){target='帖子：'+p[0].title;content=p[0].content;pid=p[0].author_id;}}else{const c=await api('/rest/v1/comments?'+qs({id:'eq.'+r.target_id}));if(c&&c[0]){target='评论#'+r.target_id;content=c[0].content;pid=c[0].author_id;}}}catch(e){}
html+=`<div class="report-card"><div class="rc-title">🚩 举报（${esc(r.reason)}）</div><div style="font-size:12px;color:#999;margin-bottom:6px">${esc(target)}</div><div class="rc-body">${esc(content)}</div><div class="rc-btns"><button class="btn" style="background:#999" onclick="handleReport(${r.id},'ignore')">忽略</button><button class="btn" onclick="handleReport(${r.id},'delete')">删内容</button><button class="btn" style="background:#e5484d" onclick="handleReport(${r.id},'punish')">删+扣10分</button></div></div>`;}
box.innerHTML=html;}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
else{box.innerHTML=`<div class="tip" style="margin-bottom:10px">按邮箱查找用户，然后选择处罚</div><input id="punishEmail" class="inp" placeholder="输入用户 QQ 邮箱"><button class="btn" onclick="findUser()">查找用户</button><div id="userInfo" style="margin-top:14px"></div>`;}}
async function findUser(){const email=$('punishEmail').value.trim().toLowerCase();const box=$('userInfo');try{const data=await api('/rest/v1/profiles?'+qs({email:'eq.'+email,limit:'1'}));if(!data||!data.length){box.innerHTML='<div class="empty">没找到该用户</div>';return;}const u=data[0];
box.innerHTML=`<div class="report-card"><div class="rc-title">👤 ${esc(u.nickname)} (${esc(u.email)})</div><div class="rc-body" style="margin-bottom:10px">等级Lv${u.level} · 硬币${u.coins} · 信誉分${u.credit}${u.is_banned?' · ⛔已封号':''}${u.banned_until?' · ⏳禁言至'+String(u.banned_until).slice(0,16).replace('T',' '):''}</div><div class="rc-btns"><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','credit',10,'管理员扣分')">扣10分</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','credit',50,'议政扣分')">扣50分</button><button class="btn" onclick="punish('${u.id}','mute',1,'禁言')">禁言1天</button><button class="btn" onclick="punish('${u.id}','mute',2,'禁言')">禁言2天</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','ban',0,'封号')">永久封号</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','device_ban',0,'封设备')">封设备</button><button class="btn" style="background:#999" onclick="punish('${u.id}','unban',0,'解封')">解封</button><button class="btn" style="background:#999" onclick="punish('${u.id}','unmute',0,'解禁')">解禁</button></div></div>`;}catch(e){box.innerHTML='<div class="empty">查询失败</div>';}}
async function punish(uid,action,amount,detail){const d=action==='mute'?prompt('禁言几天？','1'):detail;const amt=action==='mute'?(parseInt(d)||1):amount;try{const r=await dbRpc('admin_punish',{p_user_id:uid,p_action:action,p_amount:amt,p_detail:detail});toast(r==='OK'?'✅ 处罚已执行':('⚠️ '+r));setTimeout(()=>findUser(),600);}catch(e){toast('操作失败');}}
async function handleReport(rid,act){try{if(act==='ignore'){await dbUpdate('reports','id=eq.'+rid,{status:'ignored'});toast('已忽略');}
else{const r=await api('/rest/v1/reports?'+qs({id:'eq.'+rid}));const rep=r&&r[0];if(rep){if(rep.target_type==='post'){const p=await api('/rest/v1/posts?'+qs({id:'eq.'+rep.target_id}));if(p&&p[0]){if(act==='punish')await dbRpc('admin_punish',{p_user_id:p[0].author_id,p_action:'credit',p_amount:10,p_detail:'举报成立：'+rep.reason});await dbDelete('posts','id=eq.'+rep.target_id);}}else{await dbDelete('comments','id=eq.'+rep.target_id);}await dbUpdate('reports','id=eq.'+rid,{status:'handled'});toast('✅ 已处理');}}
loadAdmin('reports');}catch(e){toast('处理失败');}}

// ============ 启动 ============
(function init(){if(currentUser())showMain();else goPage('loginPage');})();