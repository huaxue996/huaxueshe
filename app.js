// ===== 花学社 v6 完整版 =====
const BOARDS=[
 {key:'jinghua',name:'✨ 精华'},{key:'youxiu',name:'🏆 好评'},{key:'note',name:'📒 笔记'},
 {key:'jiqiao',name:'💡 技巧'},{key:'tiwen',name:'🙋 提问'},{key:'suibi',name:'✍️ 随笔'},
 {key:'feihualing',name:'🌸 飞花令'},{key:'ruozhiba',name:'🤪 弱智吧'},{key:'chigua',name:'🍉 吃瓜灌水'},
 {key:'meishi',name:'🍜 美食'}];
const POST_BOARDS=BOARDS.filter(b=>b.key!=='jinghua'&&b.key!=='youxiu');
const ADS=[
 {t:'📶 广电正规卡',s:'39元/月·60G·发全国',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12539&agent_id=2783784'},
 {t:'📶 联通碧海卡',s:'29元/月·110G+100分钟·仅发海南',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12543&agent_id=2783784'},
 {t:'📶 联通大禹卡',s:'39元/月·60G+200分钟·只发重庆',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12542&agent_id=2783784'},
 {t:'📶 广电奔马卡',s:'39元/月·60G·只发陕西',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12540&agent_id=2783784'},
 {t:'📶 联通川速卡',s:'39元/月·60G+50分钟·只发四川',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12541&agent_id=2783784'}];
const COURSES=[
 {t:'高中数学·基础精讲',s:'B站免费系统课',p:'bili',u:'https://space.bilibili.com'},
 {t:'英语语法·从零到通',s:'B站免费系统课',p:'bili',u:'https://www.bilibili.com'},
 {t:'物理思维·解题技巧',s:'抖音短视频课',p:'douyin',u:'https://www.douyin.com'},
 {t:'学习方法·高效记忆',s:'抖音短视频课',p:'douyin',u:'https://www.douyin.com'}];
const REPORT_REASONS=['辱骂/人身攻击','造谣/诽谤','链接/二维码广告','黄赌毒','政治敏感','广告引流','侵犯隐私','恶意刷屏','其他'];
const RULES=`《花学社社区总版规》v2.0
一、总则：花学社是面向大众学习者的学习交流社区，提倡真诚分享、友善互助、专注学习。注册即视为同意本版规。
二、账号：一人一号严禁小号；Lv.1新用户24h内仅可浏览；昵称头像不得含违法/广告内容。
三、发帖：内容与板块相符、标题简明、主题帖最低2汉字；禁止水帖/刷屏/恶意填分类；好评专区仅管理员精选。
四、红线（从严）：1.链接/二维码：首次拦截不扣分；24h内累计3次→扣30分+禁言7天；5次以上→永久封号+封设备。2.黄赌毒→信誉分清零+永久封号+封设备。3.辱骂/人身攻击/地域黑/引战→首次扣10分+禁言1天；再犯扣20分+禁言3天累加。4.造谣/诽谤→同第3条。5.政治敏感/时政→扣50分+永久封号。6.广告引流→扣10~50分+禁言/封号。7.侵犯隐私→扣20分+禁言3天。8.脚本刷积分→清零+永久封号+封设备。9.挂机→弹验证码/扣20分。10.恶意刷屏/刷分类→扣20分+禁言3天。11.无意义评论24h超10条→扣20分+禁言3天。12.24h频繁删帖≥5次→禁言1天。13.恶意举报→按引战处理。
五、奖励：签到+2经验+1硬币（连续7天+1/+2，30天+3/+5）；发帖+1经验+2硬币（日限1）；评论+1经验+1硬币（日限1）；被好评+2经验+2信誉分；解题+5经验+5信誉分（日限2）；邀请+25硬币（月限5）；举报成立+3经验+3信誉分+10硬币；阅读简报+1经验+1硬币（日限1）；分享长图+1硬币（日限1）。
六、等级(Lv1~10)：0/30/80/160/300/500/800/1200/1800/2500经验。
七、硬币：打赏他人1~10枚/次；硬币商店后期。
八、信誉分(满分100)：被好评+2→满100转4硬币；解题+5→满100转10硬币；举报+3→满100转6硬币。区间权限:80~100正常；60~80发帖评论减半；40~60禁言3天+人工审核；20~40禁言7天+仅浏览；0~20永久禁言需申诉。
九、好评与点赞：好评每用户每帖仅1次/日限1次；点赞无限制无积分。排行榜:好评榜/点赞榜(评论点赞不计)/等级榜。
十、评论删除：扣回全部奖励+额外50%罚金。
十一、附则：最终解释权归管理员。`;
const WELCOME=`版规·处罚·硬币·等级·信誉分规则

📜 红线：链接/二维码累计3次→扣30分+禁言7天，5次→封号封设备；黄赌毒→清分封号封设备；辱骂→首次扣10+禁1天再犯扣20+禁3天；政治→扣50封号。
🪙 每日：签到+1硬币、发帖+2、评论+1、阅读简报+1；诸项日限1次。
⚡ 每日经验上限4点：签到+2、发帖+1、评论+1。
💯 信誉分满分100，低于80权限受限。被好评+2分、解题+5分、举报+3分。
⛔ 挂机超2h弹验证码，不验证强制下线扣20分。
👶 Lv.1新用户24h内仅可浏览。`;

const SUPABASE_URL_CONFIG=SUPABASE_URL;
const SUPABASE_ANON_KEY_CONFIG=SUPABASE_ANON_KEY;
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fmtTime(t){if(!t)return'';const d=new Date(t),n=new Date(),p=x=>String(x).padStart(2,'0');return d.toDateString()===n.toDateString()?p(d.getHours())+':'+p(d.getMinutes()):(d.getMonth()+1)+'月'+d.getDate()+'日';}
function toast(m,sec){const t=$('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',(sec||2)*1000);}
function getDeviceId(){let d=localStorage.getItem('did');if(!d){d='dev-'+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('did',d);}return d;}
function applyBg(){const b=localStorage.getItem('hxs_bg')||'';document.body.style.background=b?b:'#f4f6fa';}
function authHeaders(){const h={'apikey':SUPABASE_ANON_KEY_CONFIG,'Content-Type':'application/json'};const t=localStorage.getItem('sb_token');if(t)h['Authorization']='Bearer '+t;return h;}
async function api(path,options={}){const res=await fetch(SUPABASE_URL_CONFIG+path,{...options,headers:{...authHeaders(),...(options.headers||{})}});if(!res.ok){let msg='HTTP '+res.status;try{const j=await res.json();msg=j.msg||j.error_message||j.message||j.hint||msg;}catch(e){}throw new Error(msg);}const txt=await res.text();if(!txt)return null;try{return JSON.parse(txt);}catch(e){return txt;}}
const enc=encodeURIComponent;
function qs(obj){return Object.entries(obj).map(([k,v])=>k+'='+enc(v)).join('&');}
function dbInsert(table,body){return api('/rest/v1/'+table,{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});}
function dbUpdate(table,filter,body){return api('/rest/v1/'+table+'?'+filter,{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});}
function dbDelete(table,filter){return api('/rest/v1/'+table+'?'+filter,{method:'DELETE'});}
function dbRpc(fn,args){return api('/rest/v1/rpc/'+fn,{method:'POST',body:JSON.stringify(args||{})});}

let currentBoard='jinghua',currentPost=null,myProfile=null,currentSort='new',currentTipAmount=1,currentRank='good',currentResType='video',curFavType='app',searchMode=false,isReg=false,captchaCode='',adIdx=0,adTimer=null,cmImageData=null,currentUserPage=null,replyingTo=null,afkTimer=null,afkCode='',replyToName='';

applyBg();
function goPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');
  document.querySelectorAll('#bottomNav .nav-item').forEach(n=>n.classList.toggle('on',n.dataset.p===id));
  if(id==='mainPage'){if(!searchMode)loadPosts();}
  if(id==='postPage')initPostForm();
  if(id==='mePage'){loadMe();loadHistory();}
  if(id==='editPage')initEdit();
  if(id==='invitePage')loadInvite();
  if(id==='signPage')loadSignPage();
  if(id==='rankPage')loadRank(currentRank);
  if(id==='rulesPage')$('rulesBox').innerHTML=RULES.replace(/\n/g,'<br>');
  if(id==='resourcePage'){loadResources(currentResType);$('resPostBtn').style.display=(myProfile&&myProfile.role==='admin')?'block':'none';}
  if(id==='resPostPage')initResPost();
  if(id==='adminPage')loadAdmin('reports');
  if(id==='coursePage')renderCourses();
  if(id==='infoPage')loadInfo();
  if(id==='favPage')loadFavs(curFavType);
  if(id!=='detailPage'){$('cmBar').style.display='none';replyingTo=null;}
}
document.querySelectorAll('#bottomNav .nav-item').forEach(n=>n.onclick=()=>goPage(n.dataset.p));
function exitDetail(){goPage('mainPage');$('cmBar').style.display='none';replyingTo=null;}

// ============ 登录 ============
function randCode(){const s='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let r='';for(let i=0;i<4;i++)r+=s[Math.floor(Math.random()*s.length)];return r;}
function drawCaptcha(){captchaCode=randCode();const c=$('captcha'),ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='#eef2f7';ctx.fillRect(0,0,c.width,c.height);for(let i=0;i<3;i++){ctx.strokeStyle='#c9d4e0';ctx.beginPath();ctx.moveTo(Math.random()*c.width,Math.random()*c.height);ctx.lineTo(Math.random()*c.width,Math.random()*c.height);ctx.stroke();}ctx.font='bold 22px Arial';for(let i=0;i<captchaCode.length;i++){ctx.fillStyle=['#2D7FF9','#e5484d','#ff9500','#7C6FF0'][i%4];ctx.save();ctx.translate(18+i*20,26);ctx.rotate((Math.random()-0.5)*0.4);ctx.fillText(captchaCode[i],0,0);ctx.restore();}}
function toggleReg(){isReg=!isReg;$('loginName').style.display=isReg?'block':'none';$('loginPass2').style.display=isReg?'block':'none';$('loginInvite').style.display=isReg?'block':'none';$('captchaRow').style.display=isReg?'block':'none';$('loginBtn').textContent=isReg?'注 册':'登 录';$('regToggle').textContent=isReg?'已有账号？登录':'没有账号？注册';$('loginErr').textContent='';if(isReg)drawCaptcha();}
function toFakeEmail(qq){return 'qq'+String(qq).trim()+'@qq.local';}
async function doLogin(){
  const qq=$('loginQQ').value.trim(),pass=$('loginPass').value,err=$('loginErr');
  if(!/^\d{5,12}$/.test(qq)){err.textContent='请输入正确的 QQ 号';return;}
  if(pass.length<6){err.textContent='密码至少 6 位';return;}
  const email=toFakeEmail(qq);
  try{
    if(isReg){
      const name=$('loginName').value.trim(),pass2=$('loginPass2').value,invite=$('loginInvite').value.trim();
      if(name.length<2||name.length>12){err.textContent='用户名 2~12 个字';return;}
      if(pass!==pass2){err.textContent='两次密码不一致';return;}
      if(!captchaCode||$('loginCaptcha').value.trim().toUpperCase()!==captchaCode){err.textContent='验证码错误';drawCaptcha();return;}
      const r=await api('/auth/v1/signup',{method:'POST',body:JSON.stringify({email,password:pass,data:{nickname:name,qq}})});
      if(r&&r.access_token){localStorage.setItem('sb_token',r.access_token);localStorage.setItem('sb_user',JSON.stringify(r.user));await afterLogin(r.user);if(invite)dbRpc('apply_invite',{p_invite_code:invite.toUpperCase()}).then(x=>{if(x==='OK')toast('🎉邀请成功，对方+25硬币');}).catch(()=>{});}
      else{err.textContent='注册失败：该QQ号可能已注册';}
    }else{
      const r=await api('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password:pass})});
      if(r&&r.access_token){localStorage.setItem('sb_token',r.access_token);localStorage.setItem('sb_user',JSON.stringify(r.user));afterLogin(r.user);}
      else{err.textContent='登录失败：QQ号或密码错误';}
    }
  }catch(e){err.textContent='操作失败：'+e.message;}
}
async function afterLogin(user){try{const banned=await dbRpc('is_device_banned',{dev:getDeviceId()});if(banned){await logout();toast('🚫该设备已被封禁');return;}await dbUpdate('profiles','id=eq.'+user.id,{device_id:getDeviceId()});}catch(e){}showMain();}
async function logout(){localStorage.removeItem('sb_token');localStorage.removeItem('sb_user');location.reload();}
function currentUser(){try{return JSON.parse(localStorage.getItem('sb_user'));}catch(e){return null;}}
async function fetchProfile(){const u=currentUser();if(!u)return null;try{const r=await api('/rest/v1/profiles?select=*&id=eq.'+u.id);return r&&r[0]||null;}catch(e){return null;}}
async function showMain(){
  myProfile=await fetchProfile();if(!myProfile)myProfile={nickname:'花友',level:1,exp:0,coins:0,credit:100,role:'user'};
  $('topAvatar').textContent=myProfile.nickname?myProfile.nickname[0]:'友';
  loadInfoCount();goPage('mainPage');initAds();loadSpotlight();resetAfk();
  if(!localStorage.getItem('hxs_welcomed')){$('welcomeBody').innerHTML=WELCOME.replace(/\n/g,'<br>');$('welcomeModal').classList.add('show');localStorage.setItem('hxs_welcomed','1');}
}
function closeWelcome(){$('welcomeModal').classList.remove('show');}

// ============ 挂机检测 ============
function resetAfk(){if(afkTimer)clearTimeout(afkTimer);afkTimer=setTimeout(()=>showAfk(),7200000);}
function showAfk(){$('afkOverlay').classList.add('show');drawAfkCaptcha();}
function drawAfkCaptcha(){afkCode=randCode();const c=$('afkCaptcha'),ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='#eef2f7';ctx.fillRect(0,0,c.width,c.height);for(let i=0;i<4;i++){ctx.strokeStyle='#c9d4e0';ctx.beginPath();ctx.moveTo(Math.random()*c.width,Math.random()*c.height);ctx.lineTo(Math.random()*c.width,Math.random()*c.height);ctx.stroke();}ctx.font='bold 24px Arial';for(let i=0;i<afkCode.length;i++){ctx.fillStyle=['#2D7FF9','#e5484d','#ff9500','#7C6FF0'][i%4];ctx.save();ctx.translate(24+i*24,28);ctx.rotate((Math.random()-0.5)*0.4);ctx.fillText(afkCode[i],0,0);ctx.restore();}}
function checkAfk(){if($('afkInput').value.trim().toUpperCase()===afkCode){$('afkOverlay').classList.remove('show');$('afkInput').value='';resetAfk();}else{toast('验证码错误');drawAfkCaptcha();}}
document.addEventListener('click',resetAfk);document.addEventListener('keydown',resetAfk);document.addEventListener('scroll',resetAfk);

// ============ 广告 ============
function initAds(){$('adTrack').innerHTML=ADS.map(a=>`<div class="ad-item" onclick="location.href='${a.u}'"><div class="at" style="font-size:14px;font-weight:700">${a.t}</div><div class="as" style="font-size:12px;opacity:.9;margin-top:2px">${a.s}</div></div>`).join('');$('adDots').innerHTML=ADS.map((_,i)=>`<span class="${i===0?'on':''}" data-i="${i}"></span>`).join('');adIdx=0;if(adTimer)clearInterval(adTimer);adTimer=setInterval(()=>{adIdx=(adIdx+1)%ADS.length;$('adTrack').style.transform='translateX(-'+(adIdx*100)+'%)';document.querySelectorAll('#adDots span').forEach((s,i)=>s.classList.toggle('on',i===adIdx));},4000);}

// ============ 日报 ============
async function loadSpotlight(){if(currentBoard!=='jinghua'){$('spotlight').style.display='none';return;}$('spotlight').style.display='block';try{const r=await api('/rest/v1/resources?select=*&type=eq.video&order=created_at.desc&limit=8');let newsHtml='';try{const n=await fetch('https://60s.viki.moe/v2/60s');const nj=await n.json();if(nj&&nj.data){newsHtml='<div style="font-size:15px;font-weight:700;margin-bottom:8px">🗞️ 每日速递 '+nj.data.date+'</div>';if(nj.data.news)nj.data.news.slice(0,10).forEach((x,i)=>{newsHtml+=`<div class="sp-item" onclick="quickPost('${esc(x.title)}')">${i+1}. ${esc(x.title)}</div>`;});if(nj.data.history){newsHtml+='<div style="font-weight:700;margin-top:8px">📅 历史上的今天</div>';nj.data.history.slice(0,3).forEach(e=>{newsHtml+=`<div class="sp-item">📌 ${esc(e.date)} ${esc(e.event)}</div>`;});}if(nj.data.daily_sentence)newsHtml+=`<div style="font-style:italic;color:#888;margin-top:6px">📝 ${esc(nj.data.daily_sentence)}</div>`;if(!localStorage.getItem('hxs_spotlight_'+new Date().toISOString().slice(0,10))){localStorage.setItem('hxs_spotlight_'+new Date().toISOString().slice(0,10),'1');try{await dbRpc('notify_user',{p_user_id:myProfile.id,p_type:'coin',p_content:'阅读今日简报 +1经验 +1硬币'});await dbUpdate('profiles','id=eq.'+myProfile.id,{exp:myProfile.exp+1,coins:myProfile.coins+1});myProfile.exp+=1;myProfile.coins+=1;}catch(e){}}}}catch(e){newsHtml='<div class="empty">简报加载中，稍后更新</div>';}$('spotlight').innerHTML=newsHtml;}catch(e){$('spotlight').innerHTML='<div class="empty">日报加载失败</div>';}}
function quickPost(title){if(!myProfile){toast('请先登录');return;}goPage('postPage');$('pTitle').value=title.slice(0,40);$('pContent').focus();}

// ============ 板块 & 帖子 ============
function renderBoards(){const box=$('boards');box.innerHTML=BOARDS.map(b=>`<div class="board-tab ${b.key===currentBoard&&!searchMode?'on':''}" data-k="${b.key}">${b.name}</div>`).join('');box.querySelectorAll('.board-tab').forEach(t=>t.onclick=()=>{searchMode=false;$('searchInput').value='';currentBoard=t.dataset.k;renderBoards();loadPosts();});}
function doSearch(){searchMode=true;setSearchTab('post');}
function setSearchTab(t){const kw=$('searchInput').value.trim();const box=$('postList');box.innerHTML='<div class="empty">搜索中...</div>';api('/rest/v1/posts?select=*,author_id(nickname,level,qq,id)&status=eq.published&or=(title.ilike.*'+enc(kw)+'*,content.ilike.*'+enc(kw)+'*)&order=created_at.desc&limit=50').then(data=>renderPostCards(data,box,'没搜到相关帖子')).catch(e=>box.innerHTML='<div class="empty">搜索失败</div>');}
async function loadPosts(){
  renderBoards();initAds();loadSpotlight();
  if(searchMode){doSearch();return;}
  const list=$('postList');list.innerHTML='<div class="empty">加载中...</div>';
  try{
    let order='created_at.desc';if(currentSort==='like')order='like_count.desc';else if(currentSort==='fav')order='good_count.desc';
    let cond;
    if(currentBoard==='jinghua')cond=qs({status:'eq.published',is_featured:'eq.true',select:'*,author_id(nickname,level,qq,id)',order,limit:'50'});
    else if(currentBoard==='youxiu')cond=qs({status:'eq.published',is_featured:'eq.true',select:'*,author_id(nickname,level,qq,id)',order,limit:'50'});
    else cond=qs({status:'eq.published',board:'eq.'+currentBoard,select:'*,author_id(nickname,level,qq,id)',order,limit:'50'});
    const data=await api('/rest/v1/posts?'+cond);
    renderPostCards(data,list,'这个板块还没有帖子，来发第一帖吧✨');
  }catch(e){list.innerHTML='<div class="empty">加载失败</div>';}
}
document.querySelectorAll('#sortBar span').forEach(s=>s.onclick=()=>{currentSort=s.dataset.s;document.querySelectorAll('#sortBar span').forEach(x=>x.classList.toggle('on',x.dataset.s===currentSort));loadPosts();});
function renderPostCards(data,box,emptyTxt){
  if(!data||!data.length){box.innerHTML='<div class="empty">'+(emptyTxt||'暂无帖子')+'</div>';return;}
  box.innerHTML=data.map(p=>{
    const img=p.images&&p.images[0]?`<div class="wm"><img class="pc-img" src="${esc(p.images[0])}" onerror="this.parentNode.style.display='none'"><div class="watermark">🌸花学社·${esc(p.author_id?.nickname||'')}·${esc(p.author_id?.qq||'')}</div></div>`:'';
    return `<div class="post-card" onclick="openPost(${p.id})"><div class="pc-title">${esc(p.title)}${p.is_featured?'🏆':''}</div><div class="pc-body">${esc(p.content)}</div>${img}<div class="pc-meta"><span style="cursor:pointer" onclick="event.stopPropagation();openUserPage('${p.author_id?.id||''}')">👤${esc(p.author_id?.nickname||'花友')}<span class="lv">Lv${p.author_id?.level||1}</span></span><span>👍${p.like_count}</span><span>❤️${p.good_count}</span><span>🪙${p.coin_count}</span><span style="margin-left:auto">${fmtTime(p.created_at)}</span></div></div>`;
  }).join('');
}
async function openPost(id){
  try{const r=await api('/rest/v1/posts?select=*,author_id(nickname,level,qq,id)&id=eq.'+id);if(!r||!r[0])return;currentPost=r[0];}catch(e){return;}
  if(myProfile)dbInsert('history',{user_id:myProfile.id,post_id:id}).catch(()=>{});
  const data=currentPost,fav=await isFaved('post',data.id);const isAuthor=myProfile&&data.author_id&&data.author_id.id===myProfile.id;
  const img=(data.images&&data.images[0])?`<div class="wm" style="margin-top:8px"><img src="${esc(data.images[0])}" style="width:100%;border-radius:8px" onerror="this.parentNode.style.display='none'">${isAuthor?'':`<div class="watermark">🌸花学社·${esc(data.author_id?.nickname||'')}·${esc(data.author_id?.qq||'')}</div>`}</div>`:'';
  let acts=`<div class="detail-actions"><button class="action-btn ${isLiked(data.id)?'on':''}" onclick="likePost()">👍${data.like_count}</button><button class="action-btn warn" onclick="openTip()">🎁打赏</button><button class="action-btn" onclick="openReport('post',${data.id})">🚩举报</button><button class="action-btn fav ${fav?'on':''}" onclick="toggleFav()">⭐${fav?'已收藏':'收藏'}</button>`;
  if(isAuthor||(myProfile&&myProfile.role==='admin'))acts+=`<button class="action-btn" style="color:#e5484d" onclick="deletePost(${data.id})">🗑删除</button>`;
  acts+=`</div>`;
  if(myProfile&&myProfile.role==='admin')acts+=`<div class="detail-actions"><button class="action-btn" onclick="toggleFeatured()">${data.is_featured?'移出':'加入'}精华</button></div>`;
  $('detailBox').innerHTML=`<div class="detail-title">${esc(data.title)}${data.is_featured?'🏆':''}</div><div class="detail-meta"><span style="cursor:pointer" onclick="openUserPage('${data.author_id?.id||''}')">👤${esc(data.author_id?.nickname||'花友')}</span><span class="lv">Lv${data.author_id?.level||1}</span><span style="margin-left:auto">${fmtTime(data.created_at)}</span></div><div class="detail-body">${esc(data.content)}</div>${img}${acts}`;
  $('cmBar').style.display='flex';replyingTo=null;loadComments(id);goPage('detailPage');
}
function isLiked(id){return(JSON.parse(localStorage.getItem('liked')||'[]')).includes(id);}
async function likePost(){const l=JSON.parse(localStorage.getItem('liked')||'[]');if(l.includes(currentPost.id))return;l.push(currentPost.id);localStorage.setItem('liked',JSON.stringify(l));try{await dbUpdate('posts','id=eq.'+currentPost.id,{like_count:currentPost.like_count+1});currentPost.like_count++;if(myProfile&&currentPost.author_id&&currentPost.author_id.id!==myProfile.id)dbRpc('notify_user',{p_user_id:currentPost.author_id.id,p_type:'like',p_content:myProfile.nickname+'赞了你的帖子'}).catch(()=>{});document.querySelectorAll('.action-btn')[0].classList.add('on');}catch(e){toast('点赞失败');}}
async function toggleFeatured(){if(!myProfile||myProfile.role!=='admin')return;try{await dbUpdate('posts','id=eq.'+currentPost.id,{is_featured:!currentPost.is_featured});currentPost.is_featured=!currentPost.is_featured;toast(currentPost.is_featured?'已加入精华🏆':'已移出精华');openPost(currentPost.id);}catch(e){toast('操作失败');}}
async function deletePost(pid){if(!confirm('确定删除此帖？'))return;try{if(myProfile.role==='admin'){await dbRpc('admin_delete_post',{pid});}else{await dbDelete('posts','id=eq.'+pid);}toast('已删除');goPage('mainPage');}catch(e){toast('删除失败');}}

// ============ 评论（含回复/删除/点赞/收藏/举报/图片取消） ============
function pickCmImg(){const f=$('cmImg').files&&$('cmImg').files[0];if(!f)return;cmImageData=f;$('cmDel').style.display='inline';toast('📷已选图片');}
function cancelCmImg(){cmImageData=null;$('cmImg').value='';$('cmDel').style.display='none';toast('已取消图片');}
function pickImg(inp,prevId,delId){const f=inp.files&&inp.files[0];if(!f)return;const prev=$(prevId);const img=URL.createObjectURL(f);prev.innerHTML=`<div class="img-preview-wrap"><img src="${img}"><span class="cancel-img" onclick="cancelPickImg('${prevId}','${inp.id}')">✕</span></div>`;inp._selected=f;}
function cancelPickImg(prevId,inpId){$(prevId).innerHTML='';document.getElementById(inpId).value='';document.getElementById(inpId)._selected=null;}
async function loadComments(pid){const box=$('commentList');try{const data=await api('/rest/v1/comments?select=*,author_id(nickname,level,id)&post_id=eq.'+pid+'&status=eq.published&order=created_at.asc');if(!data||!data.length){box.innerHTML='<div class="empty" style="padding:14px 0">还没有评论</div>';return;}
box.innerHTML=data.map(c=>{
  let r='';const replies=(c.replies||[]);if(replies&&replies.length)r=replies.map(rp=>`<div class="cb-reply"><b>${esc(rp.author_nick||'')}</b>: ${esc(rp.content||'')}</div>`).join('');
  return `<div class="comment-box"><div class="cb-name" onclick="openUserPage('${c.author_id?.id||''}')">👤${esc(c.author_id?.nickname||'花友')}<span class="lv">Lv${c.author_id?.level||1}</span></div><div class="cb-text">${esc(c.content)}</div>${c.image?`<img class="cb-img" src="${esc(c.image)}" onerror="this.style.display='none'">`:''}<div class="cb-time">${fmtTime(c.created_at)}</div><div class="cb-acts"><span onclick="likeComment(${c.id})">👍点赞</span><span onclick="favComment(${c.id})">⭐收藏</span><span onclick="openReport('comment',${c.id})">🚩举报</span><span onclick="replyTo(${c.id},'${esc(c.author_id?.nickname||'')}')">💬回复</span>${(myProfile&&(myProfile.id===c.author_id?.id||myProfile.role==='admin'))?`<span onclick="delComment(${c.id})">🗑删除</span>`:''}</div>${r}</div>`;
}).join('');}catch(e){box.innerHTML='<div class="empty">评论加载失败</div>';}}
async function likeComment(cid){try{await dbUpdate('comments','id=eq.'+cid,{like_count:(await api('/rest/v1/comments?select=like_count&id=eq.'+cid))[0].like_count+1});toast('👍已点赞');loadComments(currentPost.id);}catch(e){toast('点赞失败');}}
function replyTo(cid,name){replyingTo=cid;replyToName=name;$('cmInput').placeholder='回复 @'+name+'…';$('cmInput').focus();$('cmBar').style.display='flex';}
async function submitComment(){
  const content=$('cmInput').value.trim();if(!content&&!cmImageData)return;if(!myProfile)return;
  try{let image='';if(cmImageData){try{image=await uploadImage(cmImageData);}catch(e){toast('图片上传失败');return;}}
  const r=await dbInsert('comments',{post_id:currentPost.id,author_id:myProfile.id,content,image,reply_to:replyingTo});
  if(r&&r[0]&&r[0].status==='rejected')toast('🚫'+r[0].reject_reason);
  else{$('cmInput').value='';$('cmInput').placeholder='友善评论…';cmImageData=null;$('cmImg').value='';$('cmDel').style.display='none';replyingTo=null;
    if(currentPost.author_id&&currentPost.author_id.id!==myProfile.id)dbRpc('notify_user',{p_user_id:currentPost.author_id.id,p_type:'comment',p_content:myProfile.nickname+'评论了你的帖子'}).catch(()=>{});
    loadComments(currentPost.id);}
  }catch(e){toast('发布失败：'+e.message);}
}
async function delComment(cid){if(!confirm('确定删除该评论？奖励将被扣回+50%罚金'))return;try{const r=await dbRpc('delete_comment',{cid});if(r==='OK'){toast('已删除，奖励扣回');loadComments(currentPost.id);}else toast(r);}catch(e){toast('删除失败');}}
async function favComment(cid){if(!myProfile)return;try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.comment&target_id=eq.'+cid+'&limit=1');if(r&&r.length){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.comment&target_id=eq.'+cid);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:'comment',target_id:cid});toast('⭐已收藏评论');}}catch(e){toast('操作失败');}}

// ============ 收藏 ============
async function isFaved(type,tid){if(!myProfile)return false;try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+tid+'&limit=1');return r&&r.length>0;}catch(e){return false;}}
async function toggleFav(){if(!myProfile){toast('请先登录');return;}const type='post',tid=currentPost.id;const fav=await isFaved(type,tid);try{if(fav){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+tid);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:type,target_id:tid});toast('⭐已收藏');}openPost(tid);}catch(e){toast('操作失败');}}
async function loadFavs(type){curFavType=type;['app','course','post','comment'].forEach((t,i)=>{const el=$('favTab'+(i+1));if(el)el.classList.toggle('on',t===type);});const box=$('favList');box.innerHTML='<div class="empty">加载中...</div>';if(!myProfile){box.innerHTML='<div class="empty">请先登录</div>';return;}const kw=$('favSearch').value.trim();
try{const favs=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&order=created_at.desc&limit=100');if(!favs||!favs.length){box.innerHTML='<div class="empty">还没有收藏</div>';return;}
if(type==='post'){const ids=favs.map(f=>f.target_id);const posts=await api('/rest/v1/posts?select=*,author_id(nickname,level)&id=in.('+ids.join(',')+')&status=eq.published');let items=posts||[];if(kw)items=items.filter(p=>p.title.includes(kw)||p.content.includes(kw));box.innerHTML=items.length?items.map(p=>`<div class="his-card" onclick="openPost(${p.id})"><span class="ht" style="flex:1;font-size:13px">${esc(p.title)}</span><span class="hd" style="font-size:10px;color:#bbb">›</span></div>`).join(''):'<div class="empty">没搜到收藏</div>';}
else if(type==='comment'){const ids=favs.map(f=>f.target_id);const cmts=await api('/rest/v1/comments?select=*,author_id(nickname)&id=in.('+ids.join(',')+')&status=eq.published');let items=cmts||[];if(kw)items=items.filter(c=>c.content.includes(kw));box.innerHTML=items.length?items.map(c=>`<div class="comment-box"><div class="cb-text">${esc(c.content)}</div><div class="cb-time">👤${esc(c.author_id?.nickname||'')}·${fmtTime(c.created_at)}</div></div>`).join(''):'<div class="empty">没搜到收藏</div>';}
else if(type==='app'){const ids=favs.map(f=>f.target_id);const res=await api('/rest/v1/resources?type=eq.app&id=in.('+ids.join(',')+')');let items=res||[];if(kw)items=items.filter(r=>r.title.includes(kw)||(r.description||'').includes(kw));box.innerHTML=items.length?items.map(r=>`<div class="app-card" onclick="openAppDetail(${r.id})"><div class="ac-top"><div class="ac-icon" style="background:#eee;text-align:center;line-height:48px;font-size:22px">${r.icon?`<img src="${esc(r.icon)}" class="ac-icon">`:'📱'}</div><div><div class="ac-title">${esc(r.title)}</div><div class="ac-sub">${esc(r.description||'')}</div></div></div></div>`).join(''):'<div class="empty">没搜到收藏</div>';}
else{const items=COURSES.filter((c,i)=>favs.some(f=>f.target_id===i));const list=kw?items.filter(c=>c.t.includes(kw)):items;box.innerHTML=list.length?list.map(c=>`<div class="his-card" onclick="location.href='${c.u}'"><span class="ht" style="flex:1;font-size:13px">${esc(c.t)}</span><span style="font-size:10px;color:#bbb">${c.s}</span></div>`).join(''):'<div class="empty">没搜到收藏</div>';}
}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}

// ============ 图片上传 / 发帖 ============
async function uploadImage(file){const name=Date.now()+'-'+Math.random().toString(36).slice(2,6)+'.jpg';const res=await fetch(SUPABASE_URL_CONFIG+'/storage/v1/object/images/'+name,{method:'POST',headers:{...authHeaders(),'Content-Type':file.type||'image/jpeg'},body:file});if(!res.ok)throw new Error('上传失败');return SUPABASE_URL_CONFIG+'/storage/v1/object/public/images/'+name;}
function initPostForm(){const c=$('boardChips');c.innerHTML=POST_BOARDS.map(b=>`<div class="chip ${b.key===currentBoard?'on':''}" data-k="${b.key}">${b.name}</div>`).join('');c.querySelectorAll('.chip').forEach(x=>x.onclick=()=>{c.querySelectorAll('.chip').forEach(y=>y.classList.remove('on'));x.classList.add('on');currentBoard=x.dataset.k;});$('postErr').textContent='';$('imgPreview').innerHTML='';}
async function submitPost(){
  if(myProfile&&myProfile.banned_until&&new Date(myProfile.banned_until)>new Date()){toast('⛔你正被禁言中');return;}
  if(myProfile&&myProfile.is_banned){toast('⛔账号已封禁');return;}
  if(myProfile&&myProfile.level<2){const created=new Date(myProfile.created_at);if((new Date()-created)<86400000){toast('Lv.1新用户24h内仅可浏览');return;}}
  const title=$('pTitle').value.trim(),content=$('pContent').value.trim();if(!title||!content){$('postErr').textContent='请填写标题和内容';return;}
  if(title.replace(/[a-zA-Z0-9\s]/g,'').length<2){$('postErr').textContent='标题至少2个汉字';return;}
  let images=[];const f=$('pImg')._selected;
  try{if(f)images.push(await uploadImage(f));const r=await dbInsert('posts',{author_id:myProfile.id,board:currentBoard,title,content,images});
    if(r&&r[0]&&r[0].status==='rejected'){$('postErr').textContent='🚫'+r[0].reject_reason;return;}
    $('postErr').textContent='✅发布成功';$('pTitle').value='';$('pContent').value='';$('pImg').value='';$('pImg')._selected=null;$('imgPreview').innerHTML='';setTimeout(()=>goPage('mainPage'),700);
  }catch(e){$('postErr').textContent='发布失败：'+e.message;}
}

// ============ 打赏 & 勾选举报 ============
function openTip(){if(!myProfile){toast('请先登录');return;}if(currentPost.author_id&&currentPost.author_id.id===myProfile.id){toast('不能打赏自己');return;}$('tipCoins').innerHTML=[1,2,5,10].map(n=>`<div class="chip ${n===currentTipAmount?'on':''}" data-n="${n}" onclick="pickTip(${n})">🪙${n}</div>`).join('');$('tipModal').classList.add('show');}
function pickTip(n){currentTipAmount=n;document.querySelectorAll('#tipCoins .chip').forEach(c=>c.classList.toggle('on',+c.dataset.n===n));}
function hideTip(){$('tipModal').classList.remove('show');}
async function doTip(kind,amount){try{const r=await dbRpc('tip_post',{p_post_id:currentPost.id,p_kind:kind,p_amount:amount||currentTipAmount});toast(r||'操作失败');hideTip();setTimeout(()=>openPost(currentPost.id),700);}catch(e){toast('失败：'+e.message);}}
function openReport(type,tid){$('reportReasons').innerHTML=REPORT_REASONS.map((r,i)=>`<label style="display:block;padding:8px 0;border-bottom:1px solid #f4f4f4;cursor:pointer;font-size:13px"><input type="checkbox" class="rr" data-r="${i}" style="margin-right:8px">${r}</label>`).join('')+`<button class="btn" style="margin-top:10px" onclick="submitReport('${type}',${tid})">提交举报</button>`;$('reportModal').classList.add('show');}
function hideReport(){$('reportModal').classList.remove('show');}
async function submitReport(type,tid){const sel=[];document.querySelectorAll('.rr:checked').forEach(x=>sel.push(REPORT_REASONS[+x.dataset.r]));if(!sel.length){toast('请至少勾选一个原因');return;}try{await dbInsert('reports',{target_type:type,target_id:tid,reason:sel.join('、'),reporter_id:myProfile.id});toast('🚩举报成功，成立有奖');hideReport();}catch(e){toast('举报失败');}}

// ============ 用户主页 + 关注/粉丝 ============
async function openUserPage(uid){if(!uid)return;currentUserPage=uid;const box=$('userBox');try{const r=await api('/rest/v1/profiles?select=*&id=eq.'+uid);const u=r&&r[0];if(!u){toast('用户不存在');return;}const isMe=myProfile&&myProfile.id===uid;const fol=myProfile?await api('/rest/v1/followers?follower_id=eq.'+myProfile.id+'&following_id=eq.'+uid+'&limit=1'):null;const folN=await api('/rest/v1/followers?following_id=eq.'+uid+'&select=id');const fanN=await api('/rest/v1/followers?follower_id=eq.'+uid+'&select=id');const pct=Math.min(100,Math.round((u.exp-expNeedLv(u.level))/(expNeedLv(u.level+1)-expNeedLv(u.level))*100));
box.innerHTML=`<div class="profile-top"><div class="pt-avatar">${u.avatar_url?`<img src="${esc(u.avatar_url)}">`:esc((u.nickname||'友')[0])}</div><div class="pt-name">${esc(u.nickname)}${u.role==='admin'?'<span class="pt-tag">管理员</span>':''}</div><div class="pt-exp"><i style="width:'+Math.max(4,pct)+'%"></i></div><div class="pt-exp-t">Lv${u.level}·经验${u.exp}/${expNeedLv(u.level+1)}</div><div class="profile-bio">${esc(u.bio||'这个人很懒，什么都没写')}</div><div class="stat-card" style="margin-top:8px"><div><div class="stat-num" style="color:#ff9500">🪙${u.coins}</div><div class="stat-label">硬币</div></div><div><div class="stat-num" style="color:#2D7FF9">${folN?folN.length:0}</div><div class="stat-label">关注</div></div><div><div class="stat-num" style="color:#7C6FF0">${fanN?fanN.length:0}</div><div class="stat-label">粉丝</div></div></div>${isMe?'':`<span class="follow-btn ${fol&&fol.length?'':'on'}" style="background:${fol&&fol.length?'#eee':'linear-gradient(135deg,#2D7FF9,#7C6FF0)'};color:${fol&&fol.length?'#555':'#fff'}" onclick="${fol&&fol.length?'unfollowUser(\''+uid+'\')':'followUser(\''+uid+'\')'}">${fol&&fol.length?'已关注':'＋关注'}</span>`}</div>`;currentUserPage=uid;loadUserPosts('posts');goPage('userPage');}catch(e){toast('加载失败');}}
function expNeedLv(lv){const t={1:0,2:30,3:80,4:160,5:300,6:500,7:800,8:1200,9:1800,10:2500};return t[lv]||2500;}
async function loadUserPosts(tab){$('ut1').classList.toggle('on',tab==='posts');$('ut2').classList.toggle('on',tab==='comments');const box=$('userList');try{if(tab==='posts'){const data=await api('/rest/v1/posts?select=*,author_id(nickname,level)&author_id=eq.'+currentUserPage+'&status=eq.published&order=created_at.desc&limit=50');renderPostCards(data,box,'TA还没有发过帖子');}else{const data=await api('/rest/v1/comments?select=*,author_id(nickname,level)&author_id=eq.'+currentUserPage+'&status=eq.published&order=created_at.desc&limit=50');box.innerHTML=(!data||!data.length)?'<div class="empty">TA还没有评论</div>':data.map(c=>`<div class="comment-box"><div class="cb-text">${esc(c.content)}</div><div class="cb-time">${fmtTime(c.created_at)}</div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
async function followUser(uid){try{const r=await dbRpc('follow_user',{p_following_id:uid});toast(r==='OK'?'✅已关注':r);openUserPage(uid);}catch(e){toast('操作失败');}}
async function unfollowUser(uid){try{await dbRpc('unfollow_user',{p_following_id:uid});toast('已取消关注');openUserPage(uid);}catch(e){toast('操作失败');}}

// ============ 个人中心 ============
const GRID=[['📅','每日签到','signPage'],['⭐','我的收藏','favPage'],['🏆','排行榜','rankPage'],['🎟️','邀请好友','invitePage'],['🛡️','管理员后台','adminPage'],['🍅','番茄时钟','pomoPage'],['🎨','背景美化','editPage'],['🚪','退出登录','logout']];
async function loadMe(){if(!myProfile)return;const u=myProfile;const folN=await api('/rest/v1/followers?following_id=eq.'+u.id+'&select=id').catch(()=>[]);const fanN=await api('/rest/v1/followers?follower_id=eq.'+u.id+'&select=id').catch(()=>[]);const pct=Math.min(100,Math.round((u.exp-expNeedLv(u.level))/(expNeedLv(u.level+1)-expNeedLv(u.level))*100));
$('meProfile').innerHTML=`<div class="profile-top"><div class="pt-avatar" onclick="goPage('editPage')">${u.avatar_url?`<img src="${esc(u.avatar_url)}">`:esc((u.nickname||'友')[0])}</div><div class="pt-name">${esc(u.nickname)}${u.role==='admin'?'<span class="pt-tag">管理员</span>':''}<span class="pt-tag" style="background:#7C6FF0;margin-left:4px">💯${u.credit}分</span></div><div class="pt-exp"><i style="width:'+Math.max(4,pct)+'%"></i></div><div class="pt-exp-t">Lv${u.level}·经验${u.exp}/${expNeedLv(u.level+1)}·${checkinLevelTxt(u)}</div><div class="profile-bio">${esc(u.bio||'点击头像编辑资料')}</div><div class="stat-card" style="margin-top:8px"><div><div class="stat-num" style="color:#ff9500">🪙${u.coins}</div><div class="stat-label">硬币</div></div><div><div class="stat-num" style="color:#2D7FF9">${folN.length}</div><div class="stat-label">关注</div></div><div><div class="stat-num" style="color:#7C6FF0">${fanN.length}</div><div class="stat-label">粉丝</div></div></div></div>`;
$('meGrid').innerHTML=GRID.filter(g=>!g[2].startsWith('admin')||(myProfile&&myProfile.role==='admin')).map(g=>g[2]==='logout'?`<div class="grid-item" onclick="logout()"><div class="gi">${g[0]}</div><div class="gt">${g[1]}</div></div>`:`<div class="grid-item" onclick="goPage('${g[2]}')"><div class="gi">${g[0]}</div><div class="gt">${g[1]}</div></div>`).join('');
$('topAvatar').textContent=u.nickname?u.nickname[0]:'友';}
function checkinLevelTxt(u){try{const d=u.created_at?Math.floor((new Date()-new Date(u.created_at))/86400000):0;if(d>=730)return'🏆传说';if(d>=365)return'👑大师';if(d>=100)return'⭐达人';if(d>=30)return'🔹常客';return'🌱初来乍到';}catch(e){return'🌱初来乍到';}}
async function loadHistory(){const box=$('historyList');try{const h=await api('/rest/v1/history?select=post_id&user_id=eq.'+myProfile.id+'&order=viewed_at.desc&limit=20');if(!h||!h.length){box.innerHTML='<div class="empty" style="padding:6px 0">暂无记录</div>';return;}const ids=h.map(x=>x.post_id);const posts=await api('/rest/v1/posts?select=id,title&id=in.('+ids.join(',')+')&status=eq.published');box.innerHTML=posts&&posts.length?posts.map(p=>`<div class="his-card" onclick="openPost(${p.id})"><span class="ht" style="flex:1;font-size:13px">${esc(p.title)}</span><span style="font-size:10px;color:#bbb">›</span></div>`).join(''):'<div class="empty" style="padding:6px 0">暂无记录</div>';}catch(e){box.innerHTML='<div class="empty" style="padding:6px 0">暂无记录</div>';}}

// ============ 编辑资料 ============
function initEdit(){const chips=$('bgChips');const bgs=[['默认',''],['浅蓝','linear-gradient(180deg,#e8f1ff,#f4f6fa)'],['浅绿','linear-gradient(180deg,#e6f7ec,#f4f6fa)'],['浅紫','linear-gradient(180deg,#efe9ff,#f4f6fa)'],['暖黄','linear-gradient(180deg,#fff7e0,#f4f6fa)']];const cur=localStorage.getItem('hxs_bg')||'';chips.innerHTML=bgs.map((b,i)=>`<div class="chip ${cur===b[1]?'on':''}" data-v="${i}" onclick="pickBg(this,${i})">${b[0]}</div>`).join('');$('eBio').value=myProfile.bio||'';$('editErr').textContent='';$('avPreview').innerHTML='';}
function pickBg(el,i){const bgs=[[''],['linear-gradient(180deg,#e8f1ff,#f4f6fa)'],['linear-gradient(180deg,#e6f7ec,#f4f6fa)'],['linear-gradient(180deg,#efe9ff,#f4f6fa)'],['linear-gradient(180deg,#fff7e0,#f4f6fa)']];localStorage.setItem('hxs_bg',bgs[i]);document.querySelectorAll('#bgChips .chip').forEach(x=>x.classList.remove('on'));el.classList.add('on');applyBg();toast('🎨已应用（仅自己可见）');}
async function saveProfile(){const bio=$('eBio').value.trim();try{let avatar_url=myProfile.avatar_url||'';const f=$('eAvatar')._selected;if(f){avatar_url=await uploadImage(f);}await dbUpdate('profiles','id=eq.'+myProfile.id,{bio,avatar_url});myProfile.bio=bio;myProfile.avatar_url=avatar_url;toast('✅已保存');loadMe();goPage('mePage');}catch(e){$('editErr').textContent='保存失败：'+e.message;}}

// ============ 邀请 / 信息 / 签到 ============
async function loadInvite(){if(!myProfile)return;$('inviteBox').innerHTML=`<div class="profile-top"><div style="font-size:14px;color:#999">我的邀请码</div><div style="font-size:30px;font-weight:800;color:#2D7FF9;margin:6px 0;letter-spacing:3px">${esc(myProfile.invite_code||'---')}</div><button class="btn" style="max-width:200px" onclick="copyInvite()">📋复制邀请码</button><div class="tip" style="text-align:center">好友注册时填写你的邀请码<br>每成功邀请1人+25硬币（月限5次）</div></div>`;}
function copyInvite(){if(navigator.clipboard)navigator.clipboard.writeText(myProfile.invite_code||'').then(()=>toast('✅已复制')).catch(()=>toast('复制失败'));else toast('邀请码：'+(myProfile.invite_code||''));}
async function loadInfoCount(){if(!myProfile)return;try{const r=await api('/rest/v1/notifications?user_id=eq.'+myProfile.id+'&is_read=eq.false&select=id');if(r&&r.length){$('topBadge').textContent(r.length);$('topBadge').style.display='inline';}else{$('topBadge').style.display='none';}}catch(e){}}
async function loadInfo(){const box=$('infoList');box.innerHTML='<div class="empty">加载中...</div>';if(!myProfile){box.innerHTML='<div class="empty">请先登录</div>';return;}try{const data=await api('/rest/v1/notifications?user_id=eq.'+myProfile.id+'&order=created_at.desc&limit=50');box.innerHTML=(!data||!data.length)?'<div class="empty">还没有消息</div>':data.map(n=>`<div class="notif-item ${n.is_read?'':'unread'}"><span class="notif-ico">${n.type==='like'?'👍':n.type==='comment'?'💬':n.type==='coin'?'🪙':n.type==='follow'?'👥':'⚠️'}</span><div style="flex:1"><div class="notif-text">${esc(n.content)}</div><div class="notif-time">${fmtTime(n.created_at)}</div></div></div>`).join('');await dbUpdate('notifications','user_id=eq.'+myProfile.id,{is_read:true});loadInfoCount();}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
async function loadSignPage(){try{const data=await api('/rest/v1/checkins?user_id=eq.'+myProfile.id+'&order=checkin_date.desc&limit=7');const today=new Date().toISOString().slice(0,10);const todayDone=data&&data[0]&&data[0].checkin_date===today;const streak=data&&data[0]?data[0].streak:0;let hist='';if(data)hist=data.map(c=>`<span style="margin:0 3px;font-size:18px">${c.checkin_date===today?'✅':'📅'}</span>`).join('');$('signBox').innerHTML=`<div style="font-size:18px;font-weight:700;margin-bottom:4px">连续签到：<span style="color:#ff9500">${streak}天</span>·${streak>=730?'🏆传说':streak>=365?'👑大师':streak>=100?'⭐达人':streak>=30?'🔹常客':'🌱初来乍到'}</div><div style="margin-bottom:8px">${hist}</div><div class="tip" style="margin-bottom:14px">连续7天额外+1经验+2硬币，30天+3经验+5硬币</div>`;if(todayDone)$('signBox').innerHTML+='<div style="color:#999;padding:14px 0">今天已经签过啦，明天再来～</div>';else $('signBox').innerHTML+='<button class="btn" style="max-width:220px" onclick="doCheckin()">📅立即签到</button>';}catch(e){$('signBox').innerHTML='<div class="empty">加载失败</div>';}}
async function doCheckin(){try{const r=await dbInsert('checkins',{user_id:myProfile.id});const c=r[0];toast(`✅签到成功！连续${c.streak}天，+${c.reward}硬币`);myProfile=await fetchProfile();loadSignPage();}catch(e){toast(e.message&&(e.message.includes('23505')||e.message.includes('duplicate'))?'今天已经签过啦':'签到失败');}}

// ============ 排行榜 ============
async function loadRank(type){currentRank=type;$('tabGood').classList.toggle('on',type==='good');if($('tabLike'))$('tabLike').classList.toggle('on',type==='like');$('tabLevel').classList.toggle('on',type==='level');const box=$('rankList');box.innerHTML='<div class="empty">加载中...</div>';try{if(type==='good'){const data=await api('/rest/v1/posts?select=*,author_id(nickname,level)&status=eq.published&order=good_count.desc&limit=20');box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((p,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:6px"><div style="font-size:13px">${esc(p.title)}</div><div style="font-size:11px;color:#999">👤${esc(p.author_id?.nickname||'')}·${fmtTime(p.created_at)}</div></div><div class="rank-val">❤️${p.good_count}</div></div>`).join('');}else if(type==='like'){const data=await api('/rest/v1/profiles?select=*&order=level.desc&limit=20');box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((u,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:6px;font-size:13px">${esc(u.nickname)}${u.role==='admin'?'<span class="lv" style="background:#e5484d">管理</span>':''}</div><div class="rank-val">👍Lv${u.level}</div></div>`).join('');}else{const data=await api('/rest/v1/profiles?select=*&order=exp.desc&limit=20');box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((u,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:6px;font-size:13px">${esc(u.nickname)}${u.role==='admin'?'<span class="lv" style="background:#e5484d">管理</span>':''}</div><div class="rank-val"><span class="lv" style="background:#2D7FF9">Lv${u.level}</span>⚡${u.exp}</div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}

// ============ 番茄钟 / 课程 / 引流 ============
let pomoTimer=null,pomoLeft=1500;
function pomoStart(){const b=$('pomoBtn');if(pomoTimer){clearInterval(pomoTimer);pomoTimer=null;b.textContent='继续';$('pomoState').textContent='已暂停';return;}b.textContent='暂停';$('pomoState').textContent='专注中…';pomoTimer=setInterval(()=>{pomoLeft--;if(pomoLeft<=0){clearInterval(pomoTimer);pomoTimer=null;b.textContent='开始';$('pomoState').textContent='🍅专注完成！';pomoLeft=1500;pomoRender();toast('🍅番茄完成！');return;}pomoRender();},1000);}
function pomoReset(){if(pomoTimer){clearInterval(pomoTimer);pomoTimer=null;}$('pomoBtn').textContent='开始';$('pomoState').textContent='专注25分钟';pomoLeft=1500;pomoRender();}
function pomoRender(){const m=String(Math.floor(pomoLeft/60)).padStart(2,'0'),s=String(pomoLeft%60).padStart(2,'0');$('pomoTime').textContent=m+':'+s;}
function renderCourses(){$('courseList').innerHTML=COURSES.map((c,i)=>`<div class="his-card" onclick="location.href='${c.u'"><div class="ht" style="flex:1;font-size:13px">${c.p==='bili'?'🔵':'🔴'}${c.t}</div><span style="font-size:11px;color:${c.p==='bili'?'#fb7299':'#161823'}">${c.p==='bili'?'B站':'抖音'}</span><span style="color:#7C6FF0;font-size:12px;cursor:pointer;margin-left:6px" onclick="event.stopPropagation();favCourse(${i})">⭐</span></div>`).join('');}
async function favCourse(idx){if(!myProfile){toast('请先登录');return;}try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.course&target_id=eq.'+idx+'&limit=1');if(r&&r.length){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.course&target_id=eq.'+idx);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:'course',target_id:idx});toast('⭐已收藏');}}catch(e){toast('操作失败');}}
function joinQQ(){if(typeof QQ_GROUP!=='undefined'){if(navigator.clipboard)navigator.clipboard.writeText(QQ_GROUP).then(()=>toast('QQ群号已复制：'+QQ_GROUP));location.href='mqqapi://card/show_pslcard?src_type=internal&version=1&uin='+QQ_GROUP+'&card_type=group&source=qrcode';}}
function joinChannel(){if(typeof QQ_CHANNEL!=='undefined'&&QQ_CHANNEL&&QQ_CHANNEL.startsWith('http'))location.href=QQ_CHANNEL;}

// ============ @功能 ============
async function showAt(target){const sel=$('atSel');if(!myProfile){sel.style.display='none';return;}try{const admins=await api('/rest/v1/profiles?select=nickname,id&role=eq.admin&limit=50');const follows=await api('/rest/v1/followers?select=following_id&follower_id=eq.'+myProfile.id+'&limit=200');let list=[];if(admins)list.push(...admins.filter(a=>a.id!==myProfile.id));if(follows&&follows.length){const ids=follows.map(f=>f.following_id);const fs=await api('/rest/v1/profiles?select=nickname,id&id=in.('+ids.join(',')+')');if(fs)list.push(...fs.filter(f=>f.id!==myProfile.id));}list=list.filter((v,i,a)=>a.findIndex(x=>x.id===v.id)===i);sel.innerHTML=list.length?list.map(u=>`<div class="at-i" onclick="insertAt('${esc(u.nickname)}')">@${esc(u.nickname)}</div>`).join(''):'<div class="at-i">可@管理员及关注的人</div>';sel.style.display='block';}catch(e){sel.style.display='none';}}
function insertAt(name){const inp=$('pContent')||$('cmInput');if(inp)inp.value+='@'+name+' ';$('atSel').style.display='none';if(inp.id==='cmInput')inp.focus();}

// ============ 资源 ============
async function loadResources(type){currentResType=type;$('resTab1').classList.toggle('on',type==='video');$('resTab2').classList.toggle('on',type==='app');const box=$('resList');box.innerHTML='<div class="empty">加载中...</div>';try{const data=await api('/rest/v1/resources?select=*&type=eq.'+type+'&order=created_at.desc');if(!data||!data.length){box.innerHTML='<div class="empty">暂无内容</div>';return;}if(type==='video'){box.innerHTML=data.map(r=>`<div class="video-card"><div class="video-cover" onclick="location.href='${esc(r.link)}'">▶️</div><div class="video-info"><div class="vt">${esc(r.title)}<span class="lv" style="margin-left:4px;background:#2D7FF9">${r.pan_type||'外站'}</span></div><div class="vs">${esc(r.description||'')}·点击观看</div></div></div>`).join('');}else{box.innerHTML=data.map(r=>`<div class="app-card" onclick="openAppDetail(${r.id})"><div class="ac-top"><div class="ac-icon" style="background:#eee;text-align:center;line-height:48px;font-size:22px">${r.icon?`<img src="${esc(r.icon)}" class="ac-icon">`:'📱'}</div><div><div class="ac-title">${esc(r.title)}<span class="lv" style="margin-left:4px;background:#ff9500">${r.size_mb||''}</span></div><div class="ac-sub">${esc(r.description||'')}·📥${r.downloads||0}次下载</div></div></div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
function initResPost(){if(!myProfile||myProfile.role!=='admin'){toast('仅管理员可上传');goPage('resourcePage');return;}$('resTypeChips').innerHTML=[['video','🎬教程视频'],['app','📱应用']].map(x=>`<div class="chip ${x[0]===currentResType?'on':''}" data-k="${x[0]}" onclick="pickResType(this,'${x[0]}')">${x[1]}</div>`).join('');$('resErr').textContent='';}
function pickResType(el,k){currentResType=k;document.querySelectorAll('#resTypeChips .chip').forEach(x=>x.classList.remove('on'));el.classList.add('on');}
async function submitResource(){if(!myProfile||myProfile.role!=='admin'){toast('仅管理员可上传');return;}const title=$('resTitle').value.trim(),desc=$('resDesc').value.trim(),link=$('resLink').value.trim(),size=$('resSize').value.trim();if(!title||!link){$('resErr').textContent='请填标题和链接';return;}let icon='';const f=$('resImg')._selected;try{if(f)icon=await uploadImage(f);await dbInsert('resources',{title,description:desc,type:currentResType,link,icon,size_mb:size||null,created_by:myProfile.id});toast('✅资源已发布');$('resTitle').value='';$('resDesc').value='';$('resLink').value='';$('resSize').value='';$('resImg').value='';$('resImg')._selected=null;$('resImgPreview').innerHTML='';goPage('resourcePage');}catch(e){$('resErr').textContent='发布失败：'+e.message;}}
async function openAppDetail(id){try{const r=await api('/rest/v1/resources?id=eq.'+id);const d=r&&r[0];if(!d)return;const fav=await isFaved('app',d.id);$('appDetailBox').innerHTML=`<div style="background:#fff;border-radius:12px;padding:16px;text-align:center;margin-bottom:10px">${d.icon?`<img src="${esc(d.icon)}" style="width:72px;height:72px;border-radius:14px;object-fit:cover;margin-bottom:8px">`:`<div style="width:72px;height:72px;border-radius:14px;background:#eee;line-height:72px;margin:0 auto 8px;font-size:28px">📱</div>`}<div style="font-size:17px;font-weight:700">${esc(d.title)}</div><div class="pt-tag" style="margin-top:4px">📱应用</div></div><div style="background:#fff;border-radius:12px;padding:14px;font-size:13px;line-height:1.7;color:#444;margin-bottom:10px">${esc(d.description||'暂无介绍')}</div><div class="stat-card"><div><div class="stat-num">${d.downloads||0}</div><div class="stat-label">下载次数</div></div><div><div class="stat-num">${d.size_mb||'--'}</div><div class="stat-label">大小</div></div></div><div class="detail-actions"><button class="action-btn fav ${fav?'on':''}" onclick="favResource('app',${d.id})">⭐${fav?'已收藏':'收藏'}</button><button class="action-btn warn" onclick="location.href='${esc(d.link)}'">🔗 前往下载</button></div>`;goPage('appDetailPage');}catch(e){toast('加载失败');}}
async function favResource(type,rid){if(!myProfile)return;try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+rid+'&limit=1');if(r&&r.length){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+rid);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:type,target_id:rid});toast('⭐已收藏');}loadResources(currentResType);}catch(e){toast('操作失败');}}

// ============ 管理员后台 ============
async function loadAdmin(tab){$('aTab1').classList.toggle('on',tab==='reports');$('aTab2').classList.toggle('on',tab==='punish');const box=$('adminBox');if(tab==='reports'){try{const data=await api('/rest/v1/reports?status=eq.pending&order=created_at.desc');if(!data||!data.length){box.innerHTML='<div class="empty">没有待处理的举报🎉</div>';return;}let html='<div class="tip" style="margin-bottom:8px">共'+data.length+'条待处理举报</div>';for(const r of data){let target='',content='',reporter=r.reporter_id;try{if(r.target_type==='post'){const p=await api('/rest/v1/posts?id=eq.'+r.target_id);if(p&&p[0]){target='帖子：'+p[0].title;content=p[0].content;}}else{const c=await api('/rest/v1/comments?id=eq.'+r.target_id);if(c&&c[0]){target='评论#'+r.target_id;content=c[0].content;}}}catch(e){}html+=`<div class="report-card" style="background:#fff;border-radius:10px;padding:10px;margin-bottom:8px"><div style="font-size:13px;font-weight:600">🚩举报（${esc(r.reason)}）</div><div style="font-size:11px;color:#999;margin:4px 0">${esc(target)}</div><div class="rc-body">${esc(content)}</div><div class="rc-btns"><button class="btn" style="background:#999" onclick="handleReport(${r.id},'ignore')">忽略</button><button class="btn" onclick="handleReport(${r.id},'delete')">删内容</button><button class="btn" style="background:#e5484d" onclick="handleReport(${r.id},'punish')">删+扣分</button></div></div>`;}box.innerHTML=html;}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}else{box.innerHTML=`<div class="tip" style="margin-bottom:8px">按QQ号查找用户，然后选择处罚</div><input id="punishQQ" class="inp" placeholder="输入用户QQ号"><button class="btn" onclick="findUser()">查找用户</button><div id="userInfo" style="margin-top:10px"></div>`;}}
async function findUser(){const kw=$('punishQQ').value.trim();const box=$('userInfo');try{let data=null;if(/^\d{5,12}$/.test(kw)){data=await api('/rest/v1/profiles?select=*&qq=eq.'+kw+'&limit=1');}else{data=await api('/rest/v1/profiles?select=*&email=eq.'+kw+'&limit=1');}if(!data||!data.length){box.innerHTML='<div class="empty">没找到该用户</div>';return;}const u=data[0];box.innerHTML=`<div class="report-card" style="background:#fff;border-radius:10px;padding:10px"><div style="font-weight:600">👤${esc(u.nickname)}(QQ:${esc(u.qq||'-')})</div><div class="rc-body" style="margin:6px 0">Lv${u.level}·🪙${u.coins}·💯${u.credit}${u.is_banned?'·⛔已封号':''}${u.banned_until?'·⏳禁言至'+String(u.banned_until).slice(0,16).replace('T',' '):''}</div><div class="rc-btns"><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','credit',10,'扣分')">扣10分</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','credit',50,'扣分')">扣50分</button><button class="btn" onclick="punish('${u.id}','mute',1,'禁言')">禁1天</button><button class="btn" onclick="punish('${u.id}','mute',3,'禁言')">禁3天</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','ban',0,'封号')">封号</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','device_ban',0,'封设备')">封设备</button><button class="btn" style="background:#999" onclick="punish('${u.id}','unban',0,'解封')">解封</button><button class="btn" style="background:#999" onclick="punish('${u.id}','unmute',0,'解禁')">解禁</button></div></div>`;}catch(e){box.innerHTML='<div class="empty">查询失败</div>';}}
async function punish(uid,action,amount,detail){const d=action==='mute'?prompt('禁言几天？','1'):detail;const amt=action==='mute'?(parseInt(d)||1):amount;try{const r=await dbRpc('admin_punish',{p_user_id:uid,p_action:action,p_amount:amt,p_detail:detail});toast(r==='OK'?'✅已执行':('⚠️'+r));setTimeout(()=>findUser(),600);}catch(e){toast('操作失败');}}
async function handleReport(rid,act){try{if(act==='ignore'){await dbUpdate('reports','id=eq.'+rid,{status:'ignored'});toast('已忽略');}else{const r=await api('/rest/v1/reports?id=eq.'+rid);const rep=r&&r[0];if(rep){if(rep.target_type==='post'){const p=await api('/rest/v1/posts?id=eq.'+rep.target_id);if(p&&p[0]){if(act==='punish')await dbRpc('admin_punish',{p_user_id:p[0].author_id,p_action:'credit',p_amount:10,p_detail:'举报成立：'+rep.reason});await dbDelete('posts','id=eq.'+rep.target_id);}}else{await dbDelete('comments','id=eq.'+rep.target_id);}await dbUpdate('reports','id=eq.'+rid,{status:'handled'});if(rep.reporter_id)dbRpc('reward_report',{p_reporter_id:rep.reporter_id}).catch(()=>{});toast('✅已处理，举报人+3分+10硬币');}}loadAdmin('reports');}catch(e){toast('处理失败');}}

// ============ 启动 ============
(function init(){if(currentUser())showMain();else goPage('loginPage');})();