// ===== 花学社 v5 完整版 =====
const BOARDS=[
 {key:'youxiu',name:'🏆 好评'},{key:'note',name:'📒 笔记'},{key:'jiqiao',name:'💡 技巧'},
 {key:'tiwen',name:'🙋 提问'},{key:'suibi',name:'✍️ 随笔'},{key:'feihualing',name:'🌸 飞花令'},
 {key:'ruozhiba',name:'🤪 弱智吧'},{key:'chigua',name:'🍉 吃瓜灌水'}];
const POST_BOARDS=BOARDS.filter(b=>b.key!=='youxiu');
const RULES=`《花学社社区总版规》v1.0
一、总则：花学社是面向大众学习者的学习交流社区，提倡真诚分享、友善互助、专注学习。注册即视为同意本版规。
二、账号：一人一号，严禁小号规避处罚；妥善保管账号。
三、发帖：内容与板块相符；标题简明；禁止水帖刷屏灌水。好评板块仅展示管理员精选好帖。
四、红线（从严处理）：1.禁止任何形式的链接与二维码（含变体写法），帖子与评论均经审核，检测到一律拦截打回；2.禁止黄赌毒；3.禁止辱骂、人身攻击、引战；4.禁止造谣、传谣、诽谤；5.禁止政治敏感/时政议题；6.禁止广告推广引流；7.禁止泄露他人隐私；8.禁止脚本刷硬币/等级/信誉分。
五、奖励：签到领硬币（连续递增）；发帖+2硬币日限10；评论+1硬币日限10；解题被认可+5信誉分；收到打赏得好评或硬币；邀请好友+25硬币。
六、信誉分（满分100）与处罚：骂人/造谣扣10分+禁言1天循环累加；议政扣50分；黄赌毒扣完分+永久封号；恶意发链接/二维码视情节扣10~50分+禁言/封号。扣分即处罚不额外禁言。严重违规封号+封设备。举报成立举报人+5分+10硬币。
七、举报与审核：内容经审核拦截链接/二维码/违禁词；人人可举报；管理员处理举报。
八、附则：最终解释权归管理员。`;
const WELCOME=`🪙 硬币规则
· 签到得硬币，连续签到奖励递增（每7天+2、每30天+5）
· 发帖 +2 硬币（每天最多10次）
· 评论 +1 硬币（每天最多10次）
· 帮人解题 +5 信誉分（满分则 +10 硬币）
· 打赏：1 好评 或 1~10 硬币
· 邀请好友 +25 硬币
· 举报成立 +5 信誉分 +10 硬币`;
const COURSES=[
 {t:'高中数学 · 基础精讲',s:'B站 免费系统课',p:'bili',u:'https://space.bilibili.com'},
 {t:'英语语法 · 从零到通',s:'B站 免费系统课',p:'bili',u:'https://www.bilibili.com'},
 {t:'物理思维 · 解题技巧',s:'抖音 短视频课',p:'douyin',u:'https://www.douyin.com'},
 {t:'学习方法 · 高效记忆',s:'抖音 短视频课',p:'douyin',u:'https://www.douyin.com'}];
const ADS=[
 {t:'📶 广电正规卡',s:'39元/月 · 60G流量 · 发全国',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12539&agent_id=2783784'},
 {t:'📶 联通碧海卡',s:'29元/月 · 110G+100分钟 · 仅发海南',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12543&agent_id=2783784'},
 {t:'📶 联通大禹卡',s:'39元/月 · 60G+200分钟 · 只发重庆',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12542&agent_id=2783784'},
 {t:'📶 广电奔马卡',s:'39元/月 · 60G · 只发陕西',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12540&agent_id=2783784'},
 {t:'📶 联通川速卡',s:'39元/月 · 60G+50分钟 · 只发四川',u:'https://m20260808.yapingkeji.com/pages/detail/index?goods_id=12541&agent_id=2783784'}];

let currentBoard='note',currentPost=null,myProfile=null,currentTipAmount=1,currentRank='good',currentResType='video',currentFavType='app',searchMode=false,isReg=false,captchaCode='',currentSearchTab='post',adIdx=0,adTimer=null,atTarget='post',cmImageData=null,currentUserPage=null;
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fmtTime(t){if(!t)return'';const d=new Date(t),n=new Date(),p=x=>String(x).padStart(2,'0');return d.toDateString()===n.toDateString()?p(d.getHours())+':'+p(d.getMinutes()):(d.getMonth()+1)+'月'+d.getDate()+'日';}
function toast(m){const t=$('toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2200);}
function getDeviceId(){let d=localStorage.getItem('did');if(!d){d='dev-'+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem('did',d);}return d;}
function applyBg(){const b=localStorage.getItem('hxs_bg')||'';document.body.style.background=b?b:'#f4f6fa';}
function goPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');
  document.querySelectorAll('#bottomNav .nav-item').forEach(n=>n.classList.toggle('on',n.dataset.p===id));
  if(id==='mainPage')loadPosts();
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
  if(id==='favPage')loadFavs(currentFavType);
}
document.querySelectorAll('#bottomNav .nav-item').forEach(n=>n.onclick=()=>goPage(n.dataset.p));
applyBg();

// ============ 请求封装 ============
function authHeaders(){const h={'apikey':SUPABASE_ANON_KEY,'Content-Type':'application/json'};const t=localStorage.getItem('sb_token');if(t)h['Authorization']='Bearer '+t;return h;}
async function api(path,options={}){const res=await fetch(SUPABASE_URL+path,{...options,headers:{...authHeaders(),...(options.headers||{})}});if(!res.ok){let msg='HTTP '+res.status;try{const j=await res.json();msg=j.msg||j.error_description||j.message||j.hint||msg;}catch(e){}throw new Error(msg);}const txt=await res.text();if(!txt)return null;try{return JSON.parse(txt);}catch(e){return txt;}}
const enc=encodeURIComponent;
function qs(obj){return Object.entries(obj).map(([k,v])=>k+'='+enc(v)).join('&');}
function dbInsert(table,body){return api('/rest/v1/'+table,{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});}
function dbUpdate(table,filter,body){return api('/rest/v1/'+table+'?'+filter,{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});}
function dbDelete(table,filter){return api('/rest/v1/'+table+'?'+filter,{method:'DELETE'});}
function dbRpc(fn,args){return api('/rest/v1/rpc/'+fn,{method:'POST',body:JSON.stringify(args||{})});}

// ============ 登录 ============
function randCode(){const s='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let r='';for(let i=0;i<4;i++)r+=s[Math.floor(Math.random()*s.length)];return r;}
function drawCaptcha(){captchaCode=randCode();const c=$('captcha'),ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle='#eef2f7';ctx.fillRect(0,0,c.width,c.height);for(let i=0;i<3;i++){ctx.strokeStyle='#c9d4e0';ctx.beginPath();ctx.moveTo(Math.random()*c.width,Math.random()*c.height);ctx.lineTo(Math.random()*c.width,Math.random()*c.height);ctx.stroke();}ctx.font='bold 24px Arial';for(let i=0;i<captchaCode.length;i++){ctx.fillStyle=['#2D7FF9','#e5484d','#ff9500','#7C6FF0'][i%4];ctx.save();ctx.translate(20+i*22,28);ctx.rotate((Math.random()-0.5)*0.4);ctx.fillText(captchaCode[i],0,0);ctx.restore();}}
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
      if(!captchaCode||$('loginCaptcha').value.trim().toUpperCase()!==captchaCode){err.textContent='验证码错误，点图片刷新';drawCaptcha();return;}
      const r=await api('/auth/v1/signup',{method:'POST',body:JSON.stringify({email,password:pass,data:{nickname:name,qq}})});
      if(r&&r.access_token){localStorage.setItem('sb_token',r.access_token);localStorage.setItem('sb_user',JSON.stringify(r.user));await afterLogin(r.user);if(invite)dbRpc('apply_invite',{p_invite_code:invite.toUpperCase()}).then(x=>toast(x==='OK'?'🎉 邀请成功！对方+25硬币':x)).catch(()=>{});}
      else{err.textContent='注册失败：该QQ号可能已注册';}
    }else{
      const r=await api('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password:pass})});
      if(r&&r.access_token){localStorage.setItem('sb_token',r.access_token);localStorage.setItem('sb_user',JSON.stringify(r.user));afterLogin(r.user);}
      else{err.textContent='登录失败：QQ号或密码错误';}
    }
  }catch(e){err.textContent='操作失败：'+e.message;}
}
async function afterLogin(user){try{const banned=await dbRpc('is_device_banned',{dev:getDeviceId()});if(banned){await logout();toast('🚫 该设备已被封禁');return;}await dbUpdate('profiles','id=eq.'+user.id,{device_id:getDeviceId()});}catch(e){}showMain();}
async function logout(){localStorage.removeItem('sb_token');localStorage.removeItem('sb_user');location.reload();}
function currentUser(){try{return JSON.parse(localStorage.getItem('sb_user'));}catch(e){return null;}}
async function fetchProfile(){const u=currentUser();if(!u)return null;try{const r=await api('/rest/v1/profiles?select=*&id=eq.'+u.id);return r&&r[0]||null;}catch(e){return null;}}
async function showMain(){
  myProfile=await fetchProfile();
  if(!myProfile){myProfile={nickname:'花友',level:1,exp:0,coins:0,credit:100,role:'user'};}
  $('topAvatar').textContent=myProfile.nickname?myProfile.nickname[0]:'友';
  loadInfoCount();loadInfo();
  goPage('mainPage');
  if(!localStorage.getItem('hxs_welcomed')){$('welcomeBody').innerHTML=WELCOME.replace(/\n/g,'<br>');$('welcomeModal').classList.add('show');localStorage.setItem('hxs_welcomed','1');}
}
function closeWelcome(){$('welcomeModal').classList.remove('show');}

// ============ 广告轮播 ============
function initAds(){
  $('adTrack').innerHTML=ADS.map(a=>`<div class="ad-item" onclick="location.href='${a.u}'"><div class="at">${a.t}</div><div class="as">${a.s}</div></div>`).join('');
  $('adDots').innerHTML=ADS.map((_,i)=>`<span class="${i===0?'on':''}" data-i="${i}"></span>`).join('');
  adIdx=0;
  if(adTimer)clearInterval(adTimer);
  adTimer=setInterval(()=>{adIdx=(adIdx+1)%ADS.length;$('adTrack').style.transform='translateX(-'+(adIdx*100)+'%)';document.querySelectorAll('#adDots span').forEach((s,i)=>s.classList.toggle('on',i===adIdx));},4000);
}

// ============ 板块 & 帖子 & 搜索 ============
function renderBoards(){const box=$('boards');box.innerHTML=BOARDS.map(b=>`<div class="board-tab ${b.key===currentBoard&&!searchMode?'on':''}" data-k="${b.key}">${b.name}</div>`).join('');box.querySelectorAll('.board-tab').forEach(t=>t.onclick=()=>{searchMode=false;$('searchInput').value='';$('searchTabs').style.display='none';currentBoard=t.dataset.k;renderBoards();loadPosts();});}
function doSearch(){searchMode=true;$('searchTabs').style.display='flex';currentSearchTab='post';setSearchTab('post');}
function setSearchTab(t){currentSearchTab=t;$('st1').classList.toggle('on',t==='post');$('st2').classList.toggle('on',t==='app');$('st3').classList.toggle('on',t==='video');$('st4').classList.toggle('on',t==='user');loadSearch(t);}
async function loadSearch(t){
  const kw=$('searchInput').value.trim(),box=$('postList');box.innerHTML='<div class="empty">搜索中...</div>';
  try{
    if(t==='post'){
      if(!kw){box.innerHTML='<div class="empty">输入关键词搜索帖子</div>';return;}
      const data=await api('/rest/v1/posts?select=*,author_id(nickname,level)&status=eq.published&or=(title.ilike.*'+enc(kw)+'*,content.ilike.*'+enc(kw)+'*)&order=created_at.desc&limit=50');
      renderPostCards(data,box);
    }else if(t==='app'){
      if(!kw){box.innerHTML='<div class="empty">输入关键词搜索应用</div>';return;}
      const data=await api('/rest/v1/resources?select=*&type=eq.app&or=(title.ilike.*'+enc(kw)+'*,description.ilike.*'+enc(kw)+'*)&order=created_at.desc&limit=50');
      if(!data||!data.length){box.innerHTML='<div class="empty">没搜到应用</div>';return;}
      box.innerHTML=data.map(r=>`<div class="res-card" onclick="openAppDetail(${r.id})"><div class="rc-title">${r.icon?`<img src="${esc(r.icon)}" style="width:34px;height:34px;border-radius:8px;object-fit:cover">`:''}${esc(r.title)}<span class="res-tag" style="margin-left:auto">📱应用</span></div><div class="rc-desc">${esc(r.description||'')}</div></div>`).join('');
    }else if(t==='video'){
      if(!kw){box.innerHTML='<div class="empty">输入关键词搜索教程</div>';return;}
      const data=await api('/rest/v1/resources?select=*&type=eq.video&or=(title.ilike.*'+enc(kw)+'*,description.ilike.*'+enc(kw)+'*)&order=created_at.desc&limit=50');
      if(!data||!data.length){box.innerHTML='<div class="empty">没搜到教程</div>';return;}
      box.innerHTML=data.map(r=>`<div class="video-card"><div class="video-cover" onclick="location.href='${esc(r.link)}'">▶️</div><div class="video-info"><div class="vt">${esc(r.title)}</div><div class="vs">${esc(r.description||'')}</div></div></div>`).join('');
    }else{
      if(!kw){box.innerHTML='<div class="empty">输入关键词搜索用户</div>';return;}
      const data=await api('/rest/v1/profiles?select=*&or=(nickname.ilike.*'+enc(kw)+'*,qq.ilike.*'+enc(kw)+'*)&limit=50');
      if(!data||!data.length){box.innerHTML='<div class="empty">没搜到用户</div>';return;}
      box.innerHTML=data.map(u=>`<div class="fav-card" onclick="openUserPage('${u.id}')"><div class="fc-title">${esc(u.nickname)}${u.role==='admin'?' <span class="lv" style="background:#e5484d">管理</span>':''}</div><div class="fc-sub">Lv${u.level} · 🪙${u.coins} · 💯${u.credit}</div></div>`).join('');
    }
  }catch(e){box.innerHTML='<div class="empty">搜索失败</div>';}
}
async function loadPosts(){
  renderBoards();initAds();
  if(searchMode){setSearchTab(currentSearchTab);return;}
  const list=$('postList');list.innerHTML='<div class="empty">加载中...</div>';
  try{
    let cond;
    if(currentBoard==='youxiu')cond=qs({status:'eq.published',is_featured:'eq.true',select:'*,author_id(nickname,level,qq)',order:'created_at.desc',limit:'50'});
    else cond=qs({status:'eq.published',board:'eq.'+currentBoard,select:'*,author_id(nickname,level,qq)',order:'created_at.desc',limit:'50'});
    const data=await api('/rest/v1/posts?'+cond);
    renderPostCards(data,list,'这个板块还没有帖子，来发第一帖吧 ✨');
  }catch(e){list.innerHTML='<div class="empty">加载失败</div>';}
}
function renderPostCards(data,box,emptyTxt){
  if(!data||!data.length){box.innerHTML='<div class="empty">'+(emptyTxt||'暂无帖子')+'</div>';return;}
  box.innerHTML=data.map(p=>{
    const img=p.images&&p.images[0]?`<div class="wm"><img class="pc-img" src="${esc(p.images[0])}" onerror="this.parentNode.style.display='none'"><div class="watermark">🌸花学社 · ${esc(p.author_id?.nickname||'')} · ${esc(p.author_id?.qq||'')}</div></div>`:'';
    return `<div class="post-card" onclick="openPost(${p.id})"><div class="pc-title">${esc(p.title)}${p.is_featured?' 🏆':''}</div><div class="pc-body">${esc(p.content)}</div>${img}<div class="pc-meta"><span style="cursor:pointer" onclick="event.stopPropagation();openUserPage('${p.author_id?.id||''}')">👤 ${esc(p.author_id?.nickname||'花友')} <span class="lv">Lv${p.author_id?.level||1}</span></span><span>👍${p.like_count}</span><span>❤️${p.good_count}</span><span>🪙${p.coin_count}</span><span style="margin-left:auto">${fmtTime(p.created_at)}</span></div></div>`;
  }).join('');
}
async function openPost(id){
  try{const r=await api('/rest/v1/posts?select=*,author_id(nickname,level,qq,id)&id=eq.'+id);if(!r||!r[0])return;currentPost=r[0];}catch(e){return;}
  if(myProfile)dbInsert('history',{user_id:myProfile.id,post_id:id}).catch(()=>{});
  const data=currentPost,fav=await isFaved('post',data.id);
  const isAuthor=myProfile&&data.author_id&&data.author_id.id===myProfile.id;
  const img=(data.images&&data.images[0])?`<div class="wm" style="margin-top:10px"><img src="${esc(data.images[0])}" style="width:100%;border-radius:10px" onerror="this.parentNode.style.display='none'">${isAuthor?'':`<div class="watermark">🌸花学社 · ${esc(data.author_id?.nickname||'')} · ${esc(data.author_id?.qq||'')}</div>`}</div>`:'';
  $('detailBox').innerHTML=`<div class="detail-title">${esc(data.title)}${data.is_featured?' 🏆':''}</div><div class="detail-meta"><span style="cursor:pointer" onclick="openUserPage('${data.author_id?.id||''}')">👤 ${esc(data.author_id?.nickname||'花友')}</span><span class="lv">Lv${data.author_id?.level||1}</span><span style="margin-left:auto">${fmtTime(data.created_at)}</span></div><div class="detail-body">${esc(data.content)}</div>${img}<div class="detail-actions"><button class="action-btn ${isLiked(data.id)?'on':''}" onclick="likePost()">👍 ${data.like_count}</button><button class="action-btn warn" onclick="openTip()">🎁 打赏</button><button class="action-btn" onclick="openReport()">🚩 举报</button><button class="action-btn fav ${fav?'on':''}" onclick="toggleFav()">⭐ ${fav?'已收藏':'收藏'}</button></div>`;
  if(myProfile&&myProfile.role==='admin')$('detailBox').insertAdjacentHTML('beforeend',`<div class="detail-actions"><button class="action-btn" onclick="toggleFeatured()">${data.is_featured?'移出':'加入'}好评专区</button></div>`);
  $('cmBar').style.display='flex';loadComments(id);goPage('detailPage');
}
function isLiked(id){return(JSON.parse(localStorage.getItem('liked')||'[]')).includes(id);}
async function likePost(){const l=JSON.parse(localStorage.getItem('liked')||'[]');if(l.includes(currentPost.id))return;l.push(currentPost.id);localStorage.setItem('liked',JSON.stringify(l));try{await dbUpdate('posts','id=eq.'+currentPost.id,{like_count:currentPost.like_count+1});currentPost.like_count++;if(myProfile&&currentPost.author_id&&currentPost.author_id.id!==myProfile.id)dbRpc('notify_user',{p_user_id:currentPost.author_id.id,p_type:'like',p_content:myProfile.nickname+' 赞了你的帖子「'+currentPost.title.slice(0,15)+'」'}).catch(()=>{});document.querySelectorAll('.action-btn')[0].classList.add('on');document.querySelectorAll('.action-btn')[0].textContent='👍 '+currentPost.like_count;}catch(e){toast('点赞失败');}}
async function toggleFeatured(){if(!myProfile||myProfile.role!=='admin')return;try{await dbUpdate('posts','id=eq.'+currentPost.id,{is_featured:!currentPost.is_featured});currentPost.is_featured=!currentPost.is_featured;toast(currentPost.is_featured?'已加入好评专区 🏆':'已移出好评专区');openPost(currentPost.id);}catch(e){toast('操作失败');}}

// ============ 发帖 ============
function initPostForm(){const c=$('boardChips');c.innerHTML=POST_BOARDS.map(b=>`<div class="chip ${b.key===currentBoard?'on':''}" data-k="${b.key}">${b.name}</div>`).join('');c.querySelectorAll('.chip').forEach(x=>x.onclick=()=>{c.querySelectorAll('.chip').forEach(y=>y.classList.remove('on'));x.classList.add('on');currentBoard=x.dataset.k;});$('postErr').textContent='';}
function pickImg(inp){const f=inp.files&&inp.files[0];if(!f)return;$('imgPreview').innerHTML=`<img src="${URL.createObjectURL(f)}" style="width:72px;height:72px;border-radius:10px;object-fit:cover;margin-top:6px">`;}
async function uploadImage(file){const ext=(file.name.split('.').pop()||'jpg').toLowerCase();const name=Date.now()+'-'+Math.random().toString(36).slice(2,8)+'.'+ext;const res=await fetch(SUPABASE_URL+'/storage/v1/object/images/'+name,{method:'POST',headers:{...authHeaders(),'Content-Type':file.type||'application/octet-stream'},body:file});if(!res.ok)throw new Error('图片上传失败');return SUPABASE_URL+'/storage/v1/object/public/images/'+name;}
async function submitPost(){
  if(myProfile&&myProfile.banned_until&&new Date(myProfile.banned_until)>new Date()){toast('⛔ 你正被禁言中');return;}
  if(myProfile&&myProfile.is_banned){toast('⛔ 账号已封禁');return;}
  const title=$('pTitle').value.trim(),content=$('pContent').value.trim();
  if(!title){$('postErr').textContent='请填写标题';return;}if(!content){$('postErr').textContent='请填写内容';return;}
  let images=[];const file=$('pImg').files&&$('pImg').files[0];
  try{
    if(file)images.push(await uploadImage(file));
    const r=await dbInsert('posts',{author_id:myProfile.id,board:currentBoard,title,content,images});
    if(r&&r[0]&&r[0].status==='rejected'){$('postErr').textContent='🚫 '+r[0].reject_reason;return;}
    $('postErr').textContent='✅ 发布成功 +2硬币';$('pTitle').value='';$('pContent').value='';$('pImg').value='';$('imgPreview').innerHTML='';setTimeout(()=>goPage('mainPage'),800);
  }catch(e){$('postErr').textContent='发布失败：'+e.message;}
}

// ============ 收藏 / 关注 ============
async function isFaved(type,tid){if(!myProfile)return false;try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+tid+'&limit=1');return r&&r.length>0;}catch(e){return false;}}
async function toggleFav(){if(!myProfile){toast('请先登录');return;}const type='post',tid=currentPost.id;const fav=await isFaved(type,tid);try{if(fav){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+tid);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:type,target_id:tid});toast('⭐ 已收藏');}openPost(tid);}catch(e){toast('操作失败');}}
async function favResource(type,rid,title){if(!myProfile){toast('请先登录');return;}try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+rid+'&limit=1');if(r&&r.length){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&target_id=eq.'+rid);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:type,target_id:rid});toast('⭐ 已收藏');}loadResources(currentResType);}catch(e){toast('操作失败');}}
async function loadFavs(type){
  currentFavType=type;
  $('favTab1').classList.toggle('on',type==='app');$('favTab2').classList.toggle('on',type==='course');$('favTab3').classList.toggle('on',type==='post');
  const box=$('favList');box.innerHTML='<div class="empty">加载中...</div>';
  if(!myProfile){box.innerHTML='<div class="empty">请先登录</div>';return;}
  const kw=$('favSearch').value.trim();
  try{
    const favs=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.'+type+'&order=created_at.desc&limit=100');
    if(!favs||!favs.length){box.innerHTML='<div class="empty">还没有收藏</div>';return;}
    if(type==='post'){
      const ids=favs.map(f=>f.target_id);
      const posts=await api('/rest/v1/posts?select=*,author_id(nickname,level)&id=in.('+ids.join(',')+')&status=eq.published');
      let items=posts||[];if(kw)items=items.filter(p=>p.title.includes(kw)||p.content.includes(kw));
      box.innerHTML=items.length?items.map(p=>`<div class="fav-card" onclick="openPost(${p.id})"><div class="fc-title">${esc(p.title)}</div><div class="fc-sub">👤 ${esc(p.author_id?.nickname||'')} · ${fmtTime(p.created_at)}</div></div>`).join(''):'<div class="empty">没搜到收藏</div>';
    }else if(type==='app'){
      const ids=favs.map(f=>f.target_id);
      const res=await api('/rest/v1/resources?type=eq.app&id=in.('+ids.join(',')+')');
      let items=res||[];if(kw)items=items.filter(r=>r.title.includes(kw)||(r.description||'').includes(kw));
      box.innerHTML=items.length?items.map(r=>`<div class="res-card" onclick="openAppDetail(${r.id})"><div class="rc-title">${r.icon?`<img src="${esc(r.icon)}" style="width:32px;height:32px;border-radius:8px;object-fit:cover">`:''}${esc(r.title)}</div><div class="rc-desc">${esc(r.description||'')}</div></div>`).join(''):'<div class="empty">没搜到收藏</div>';
    }else{
      const items=COURSES.filter((c,i)=>favs.some(f=>f.target_id===i));
      const list=kw?items.filter(c=>c.t.includes(kw)):items;
      box.innerHTML=list.length?list.map(c=>`<div class="fav-card" onclick="location.href='${c.u}'"><div class="fc-title">${esc(c.t)}</div><div class="fc-sub">${c.s}</div></div>`).join(''):'<div class="empty">没搜到收藏</div>';
    }
  }catch(e){box.innerHTML='<div class="empty">加载失败</div>';}
}
async function favCourse(idx,title){if(!myProfile){toast('请先登录');return;}try{const r=await api('/rest/v1/favorites?user_id=eq.'+myProfile.id+'&target_type=eq.course&target_id=eq.'+idx+'&limit=1');if(r&&r.length){await dbDelete('favorites','user_id=eq.'+myProfile.id+'&target_type=eq.course&target_id=eq.'+idx);toast('已取消收藏');}else{await dbInsert('favorites',{user_id:myProfile.id,target_type:'course',target_id:idx});toast('⭐ 已收藏');}}catch(e){toast('操作失败');}}

// ============ 评论（可图/@） ============
function pickCmImg(inp){const f=inp.files&&inp.files[0];if(!f)return;cmImageData=f;toast('📷 已选图片，发送时上传');}
async function loadComments(pid){const box=$('commentList');try{const data=await api('/rest/v1/comments?select=*,author_id(nickname,level,id)&post_id=eq.'+pid+'&status=eq.published&order=created_at.asc');box.innerHTML=(!data||!data.length)?'<div class="empty" style="padding:18px 0">还没有评论，抢沙发～</div>':data.map(c=>`<div class="comment-box"><div class="cb-name" onclick="openUserPage('${c.author_id?.id||''}')">👤 ${esc(c.author_id?.nickname||'花友')} <span class="lv">Lv${c.author_id?.level||1}</span></div><div class="cb-text">${esc(c.content)}</div>${(c.image)?`<img class="cb-img" src="${esc(c.image)}" onerror="this.style.display='none'">`:''}<div class="cb-time">${fmtTime(c.created_at)}</div></div>`).join('');}catch(e){box.innerHTML='<div class="empty">评论加载失败</div>';}}
async function submitComment(){const content=$('cmInput').value.trim();if(!content&&!cmImageData){return;}if(!myProfile)return;try{let image='';if(cmImageData){try{image=await uploadImage(cmImageData);}catch(e){toast('图片上传失败');return;}}const r=await dbInsert('comments',{post_id:currentPost.id,author_id:myProfile.id,content,image});if(r&&r[0]&&r[0].status==='rejected')toast('🚫 '+r[0].reject_reason);else{$('cmInput').value='';cmImageData=null;if(currentPost.author_id&&currentPost.author_id.id!==myProfile.id)dbRpc('notify_user',{p_user_id:currentPost.author_id.id,p_type:'comment',p_content:myProfile.nickname+' 评论了你的帖子「'+currentPost.title.slice(0,15)+'」'}).catch(()=>{});loadComments(currentPost.id);}}catch(e){toast('发布失败：'+e.message);}}
async function showAt(target){atTarget=target;const sel=$('atSel');if(!myProfile){sel.style.display='none';return;}try{const admins=await api('/rest/v1/profiles?select=nickname,id&role=eq.admin&limit=50');const follows=await api('/rest/v1/followers?select=following_id&follower_id=eq.'+myProfile.id+'&limit=200');let list=[];if(admins)list.push(...admins.filter(a=>a.id!==myProfile.id));if(follows&&follows.length){const ids=follows.map(f=>f.following_id);const fs=await api('/rest/v1/profiles?select=nickname,id&id=in.('+ids.join(',')+')');if(fs)list.push(...fs.filter(f=>f.id!==myProfile.id));}list=list.filter((v,i,a)=>a.findIndex(x=>x.id===v.id)===i);sel.innerHTML=list.length?list.map(u=>`<div class="at-i" onclick="insertAt('${esc(u.nickname)}')">@ ${esc(u.nickname)}</div>`).join(''):'<div class="at-i">无可@的人（仅管理员和关注的人）</div>';sel.style.display='block';}catch(e){sel.style.display='none';}}
function insertAt(name){const inp=atTarget==='post'?$('pContent'):$('cmInput');inp.value+='@'+name+' ';$('atSel').style.display='none';if(atTarget==='comment')inp.focus();}

// ============ 打赏 & 举报 ============
function openTip(){if(!myProfile){toast('请先登录');return;}if(currentPost.author_id&&currentPost.author_id.id===myProfile.id){toast('不能打赏自己');return;}$('tipCoins').innerHTML=[1,2,5,10].map(n=>`<div class="chip ${n===currentTipAmount?'on':''}" data-n="${n}" onclick="pickTip(${n})">🪙${n}</div>`).join('');$('tipModal').classList.add('show');}
function pickTip(n){currentTipAmount=n;document.querySelectorAll('#tipCoins .chip').forEach(c=>c.classList.toggle('on',+c.dataset.n===n));}
function hideTip(){$('tipModal').classList.remove('show');}
async function doTip(kind,amount){try{const r=await dbRpc('tip_post',{p_post_id:currentPost.id,p_kind:kind,p_amount:amount||currentTipAmount});toast(r||'操作失败');hideTip();setTimeout(()=>openPost(currentPost.id),800);}catch(e){toast('失败：'+e.message);}}
async function openReport(){if(!myProfile){toast('请先登录');return;}const reasons=['辱骂/人身攻击','造谣/诽谤','链接/二维码广告','黄赌毒','政治敏感','其他'];const r=prompt('请选择举报原因（输入序号）：\n'+reasons.map((x,i)=>`${i+1}.${x}`).join('\n'));if(!r)return;const i=parseInt(r)-1;if(i<0||i>=reasons.length){toast('序号无效');return;}try{await dbInsert('reports',{target_type:'post',target_id:currentPost.id,reason:reasons[i],reporter_id:myProfile.id});toast('🚩 举报成功，成立有奖（+5分+10硬币）');}catch(e){toast('举报失败');}}

// ============ 用户主页 ============
async function openUserPage(uid){if(!uid)return;currentUserPage=uid;const box=$('userBox');try{const r=await api('/rest/v1/profiles?select=*&id=eq.'+uid);const u=r&&r[0];if(!u){toast('用户不存在');return;}const isMe=myProfile&&myProfile.id===uid;const fol=myProfile?await api('/rest/v1/followers?follower_id=eq.'+myProfile.id+'&following_id=eq.'+uid+'&limit=1'):null;const folN=await api('/rest/v1/followers?following_id=eq.'+uid+'&select=id');const fanN=await api('/rest/v1/followers?follower_id=eq.'+uid+'&select=id');const expNeed=await expNeedFor(u.level+1);const pct=Math.min(100,Math.round((u.exp-(expNeedLv(u.level)))/(expNeedLv(u.level+1)-expNeedLv(u.level))*100));
box.innerHTML=`<div class="profile-top"><div class="pt-avatar">${u.avatar_url?`<img src="${esc(u.avatar_url)}" style="width:70px;height:70px;border-radius:50%;object-fit:cover">`:esc((u.nickname||'友')[0])}</div><div class="pt-name">${esc(u.nickname)}${u.role==='admin'?'<span class="pt-tag">管理员</span>':''}</div><div class="pt-exp"><i style="width:'+Math.max(4,pct)+'%"></i></div><div class="pt-exp-t">Lv${u.level} · 经验 ${u.exp}/${expNeedLv(u.level+1)}</div><div class="profile-bio">${esc(u.bio||'这个人很懒，什么都没写')}</div><div class="stat-card" style="margin-top:12px"><div><div class="stat-num" style="color:#ff9500">🪙${u.coins}</div><div class="stat-label">硬币</div></div><div><div class="stat-num" style="color:#2D7FF9">${folN?folN.length:0}</div><div class="stat-label">关注</div></div><div><div class="stat-num" style="color:#7C6FF0">${fanN?fanN.length:0}</div><div class="stat-label">粉丝</div></div></div>${isMe?'':`<span class="follow-btn ${fol&&fol.length?'':'on'}" style="background:${fol&&fol.length?'#eee':'linear-gradient(135deg,#2D7FF9,#7C6FF0)'};color:${fol&&fol.length?'#555':'#fff'}" onclick="${fol&&fol.length?'unfollowUser(\''+uid+'\')':'followUser(\''+uid+'\')'}">${fol&&fol.length?'已关注':'＋ 关注'}</span>`}${(myProfile&&myProfile.role==='admin')?`<div style="font-size:12px;color:#999;margin-top:8px">QQ：${esc(u.qq||'-')}</div>`:''}</div>`;loadUserPosts('posts');goPage('userPage');}catch(e){toast('加载失败');}}
function expNeedLv(lv){const t={1:0,2:30,3:80,4:160,5:300,6:500,7:800,8:1200,9:1800,10:2500};return t[lv]||2500;}
async function loadUserPosts(tab){$('ut1').classList.toggle('on',tab==='posts');$('ut2').classList.toggle('on',tab==='comments');const box=$('userList');try{if(tab==='posts'){const data=await api('/rest/v1/posts?select=*,author_id(nickname,level)&author_id=eq.'+currentUserPage+'&status=eq.published&order=created_at.desc&limit=50');renderPostCards(data,box,'TA还没有发过帖子');}else{const data=await api('/rest/v1/comments?select=*,author_id(nickname,level)&author_id=eq.'+currentUserPage+'&status=eq.published&order=created_at.desc&limit=50');box.innerHTML=(!data||!data.length)?'<div class="empty">TA还没有评论</div>':data.map(c=>`<div class="comment-box"><div class="cb-text">${esc(c.content)}</div><div class="cb-time">${fmtTime(c.created_at)}</div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
async function followUser(uid){try{const r=await dbRpc('follow_user',{p_following_id:uid});toast(r==='OK'?'✅ 已关注':r);openUserPage(uid);}catch(e){toast('操作失败');}}
async function unfollowUser(uid){try{await dbRpc('unfollow_user',{p_following_id:uid});toast('已取消关注');openUserPage(uid);}catch(e){toast('操作失败');}}

// ============ 个人中心 ============
const GRID=[['📅','每日签到','signPage'],['⭐','我的收藏','favPage'],['🏆','排行榜','rankPage'],['🎟️','邀请好友','invitePage'],['✏️','发帖','postPage'],['🕘','浏览历史','mePage#hist'],['📝','编辑资料','editPage'],['🎨','背景美化','editPage#bg']];
async function loadMe(){if(!myProfile)return;const u=myProfile;const folN=await api('/rest/v1/followers?following_id=eq.'+u.id+'&select=id').catch(()=>[]);const fanN=await api('/rest/v1/followers?follower_id=eq.'+u.id+'&select=id').catch(()=>[]);const pct=Math.min(100,Math.round((u.exp-expNeedLv(u.level))/(expNeedLv(u.level+1)-expNeedLv(u.level))*100));
$('meProfile').innerHTML=`<div class="profile-top"><div class="pt-avatar" onclick="goPage('editPage')">${u.avatar_url?`<img src="${esc(u.avatar_url)}" style="width:70px;height:70px;border-radius:50%;object-fit:cover">`:esc((u.nickname||'友')[0])}</div><div class="pt-name">${esc(u.nickname)}${u.role==='admin'?'<span class="pt-tag">管理员</span>':''}</div><div class="pt-exp"><i style="width:'+Math.max(4,pct)+'%"></i></div><div class="pt-exp-t">Lv${u.level} · 经验 ${u.exp}/${expNeedLv(u.level+1)}</div><div class="profile-bio">${esc(u.bio||'点击头像编辑资料')}</div><div class="stat-card" style="margin-top:12px"><div><div class="stat-num" style="color:#ff9500">🪙${u.coins}</div><div class="stat-label">硬币</div></div><div><div class="stat-num" style="color:#2D7FF9">${folN.length}</div><div class="stat-label">关注</div></div><div><div class="stat-num" style="color:#7C6FF0">${fanN.length}</div><div class="stat-label">粉丝</div></div></div></div>`;
$('meGrid').innerHTML=GRID.map(g=>`<div class="grid-item" onclick="goPage('${g[2]}')"><div class="gi">${g[0]}</div><div class="gt">${g[1]}</div></div>`).join('');
$('topAvatar').textContent=u.nickname?u.nickname[0]:'友';
$('adminEntry').style.display=u.role==='admin'?'block':'none';}
async function loadHistory(){const box=$('historyList');try{const h=await api('/rest/v1/history?select=post_id&user_id=eq.'+myProfile.id+'&order=viewed_at.desc&limit=20');if(!h||!h.length){box.innerHTML='<div class="empty" style="padding:10px 0">暂无记录</div>';return;}const ids=h.map(x=>x.post_id);const posts=await api('/rest/v1/posts?select=id,title&id=in.('+ids.join(',')+')&status=eq.published');box.innerHTML=posts&&posts.length?posts.map(p=>`<div class="his-card" onclick="openPost(${p.id})"><span class="ht">${esc(p.title)}</span><span class="hd">›</span></div>`).join(''):'<div class="empty" style="padding:10px 0">暂无记录</div>';}catch(e){box.innerHTML='<div class="empty" style="padding:10px 0">暂无记录</div>';}}

// ============ 编辑资料 ============
function initEdit(){const chips=$('bgChips');const bgs=[['默认',''],['浅蓝','linear-gradient(180deg,#e8f1ff,#f4f6fa)'],['浅绿','linear-gradient(180deg,#e6f7ec,#f4f6fa)'],['浅紫','linear-gradient(180deg,#efe9ff,#f4f6fa)'],['暖黄','linear-gradient(180deg,#fff7e0,#f4f6fa)']];const cur=localStorage.getItem('hxs_bg')||'';chips.innerHTML=bgs.map((b,i)=>`<div class="chip ${cur===b[1]?'on':''}" data-v="${i}" onclick="pickBg(this,${i})">${b[0]}</div>`).join('');$('eBio').value=myProfile.bio||'';$('editErr').textContent='';}
function pickBg(el,i){const bgs=[['',0],['linear-gradient(180deg,#e8f1ff,#f4f6fa)',1],['linear-gradient(180deg,#e6f7ec,#f4f6fa)',2],['linear-gradient(180deg,#efe9ff,#f4f6fa)',3],['linear-gradient(180deg,#fff7e0,#f4f6fa)',4]];localStorage.setItem('hxs_bg',bgs[i][0]);document.querySelectorAll('#bgChips .chip').forEach(x=>x.classList.remove('on'));el.classList.add('on');applyBg();toast('🎨 背景已应用（仅自己可见）');}
function pickAvatar(inp){const f=inp.files&&inp.files[0];if(!f)return;myProfile._avatar=URL.createObjectURL(f);toast('已选头像，保存后生效');}
async function saveProfile(){const bio=$('eBio').value.trim();try{let avatar_url=myProfile.avatar_url||'';const f=document.getElementById('eAvatar').files&&document.getElementById('eAvatar').files[0];if(f){avatar_url=await uploadImage(f);}await dbUpdate('profiles','id=eq.'+myProfile.id,{bio,avatar_url});myProfile.bio=bio;myProfile.avatar_url=avatar_url;toast('✅ 资料已保存');loadMe();goPage('mePage');}catch(e){$('editErr').textContent='保存失败：'+e.message;}}

// ============ 邀请 ============
async function loadInvite(){if(!myProfile)return;$('inviteBox').innerHTML=`<div class="profile-top"><div style="font-size:15px;color:#999">我的邀请码</div><div style="font-size:34px;font-weight:800;color:#2D7FF9;margin:8px 0;letter-spacing:3px">${esc(myProfile.invite_code||'---')}</div><button class="btn" style="max-width:220px" onclick="copyInvite()">📋 复制邀请码</button><div class="tip" style="text-align:center">好友注册时填写你的邀请码<br>每成功邀请 1 人，你 +25 硬币 🎉</div></div><div class="rules" style="font-size:13px">邀请规则：<br>· 每个用户只有一个专属邀请码，永久有效<br>· 好友注册时填入你的邀请码，双方都能正常使用花学社，你获得 +25 硬币<br>· 邀请码不要发到社区帖子里（会被拦截）</div>`;}
function copyInvite(){if(navigator.clipboard)navigator.clipboard.writeText(myProfile.invite_code||'').then(()=>toast('✅ 邀请码已复制')).catch(()=>toast('复制失败'));else toast('邀请码：'+(myProfile.invite_code||''));}

// ============ 信息 ============
async function loadInfoCount(){if(!myProfile)return;try{const r=await api('/rest/v1/notifications?user_id=eq.'+myProfile.id+'&is_read=eq.false&select=id');if(r&&r.length){$('topBadge').textContent=r.length;$('topBadge').style.display='inline';}else{$('topBadge').style.display='none';}}catch(e){}}
async function loadInfo(){const box=$('infoList');box.innerHTML='<div class="empty">加载中...</div>';if(!myProfile){box.innerHTML='<div class="empty">请先登录</div>';return;}try{const data=await api('/rest/v1/notifications?user_id=eq.'+myProfile.id+'&order=created_at.desc&limit=50');box.innerHTML=(!data||!data.length)?'<div class="empty">还没有消息</div>':data.map(n=>`<div class="notif-item ${n.is_read?'':'unread'}"><span class="notif-ico">${n.type==='like'?'👍':n.type==='comment'?'💬':n.type==='coin'?'🪙':n.type==='follow'?'👥':'⚠️'}</span><div><div class="notif-text">${esc(n.content)}</div><div class="notif-time">${fmtTime(n.created_at)}</div></div></div>`).join('');await dbUpdate('notifications','user_id=eq.'+myProfile.id,{is_read:true});loadInfoCount();}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}

// ============ 签到 ============
async function loadSignPage(){try{const data=await api('/rest/v1/checkins?user_id=eq.'+myProfile.id+'&order=checkin_date.desc&limit=7');const today=new Date().toISOString().slice(0,10);const todayDone=data&&data[0]&&data[0].checkin_date===today;const streak=data&&data[0]?data[0].streak:0;let hist='';if(data)hist=data.map(c=>`<span style="margin:0 4px;font-size:19px">${c.checkin_date===today?'✅':'📅'}</span>`).join('');$('signBox').innerHTML=`<div style="font-size:20px;font-weight:700;margin-bottom:6px">当前连续签到：<span style="color:#ff9500">${streak} 天</span></div><div style="margin-bottom:10px">${hist}</div><div class="tip" style="margin-bottom:18px">连签越久奖励越多：基础1枚，每连续7天+2，每连续30天+5</div>`;if(todayDone)$('signBox').innerHTML+='<div style="color:#999;padding:18px 0">今天已经签过啦，明天再来～</div>';else $('signBox').innerHTML+='<button class="btn" style="max-width:240px" onclick="doCheckin()">📅 立即签到</button>';}catch(e){$('signBox').innerHTML='<div class="empty">加载失败</div>';}}
async function doCheckin(){try{const r=await dbInsert('checkins',{user_id:myProfile.id});const c=r[0];toast(`✅ 签到成功！连续 ${c.streak} 天，+${c.reward} 硬币 🪙`);myProfile=await fetchProfile();loadSignPage();}catch(e){toast(e.message&&(e.message.includes('23505')||e.message.includes('duplicate'))?'今天已经签过啦':'签到失败');}}

// ============ 排行榜 / 版规 / 课程 / 引流 ============
async function loadRank(type){currentRank=type;$('tabGood').classList.toggle('on',type==='good');$('tabLevel').classList.toggle('on',type==='level');const box=$('rankList');box.innerHTML='<div class="empty">加载中...</div>';try{if(type==='good'){const data=await api('/rest/v1/posts?select=*,author_id(nickname,level)&status=eq.published&order=good_count.desc&limit=20');box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((p,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:8px"><div style="font-size:14px">${esc(p.title)}</div><div style="font-size:12px;color:#999">👤 ${esc(p.author_id?.nickname||'')} · ${fmtTime(p.created_at)}</div></div><div class="rank-val">❤️ ${p.good_count}</div></div>`).join('');}else{const data=await api('/rest/v1/profiles?select=*&order=exp.desc&limit=20');box.innerHTML=(!data||!data.length)?'<div class="empty">暂无数据</div>':data.map((u,i)=>`<div class="rank-item"><div class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</div><div style="flex:1;margin-left:8px;font-size:14px">${esc(u.nickname)}${u.role==='admin'?' <span class="lv" style="background:#e5484d">管理</span>':''}</div><div class="rank-val"><span class="lv" style="background:#2D7FF9">Lv${u.level}</span> ⚡${u.exp}</div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
function renderCourses(){const box=$('courseList');box.innerHTML=COURSES.map((c,i)=>`<div class="course-card" style="display:flex;align-items:center;background:#fff;border-radius:14px;padding:12px;margin-bottom:11px;cursor:pointer" onclick="location.href='${c.u}'"><div class="cc-ico" style="width:40px;height:40px;border-radius:10px;line-height:40px;text-align:center;color:#fff;background:${c.p==='bili'?'#fb7299':'#161823'};margin-right:10px;flex-shrink:0">${c.p==='bili'?'B':'抖'}</div><div style="flex:1"><div class="cc-title" style="font-size:14px;font-weight:600">${c.t}</div><div class="cc-sub" style="font-size:12px;color:#999;margin-top:2px">${c.s}</div></div><span style="color:#7C6FF0;font-size:13px;cursor:pointer" onclick="event.stopPropagation();favCourse(${i},'${esc(c.t).replace(/'/g,'')}')">⭐</span></div>`).join('');}
function joinQQ(){if(navigator.clipboard)navigator.clipboard.writeText(QQ_GROUP).then(()=>toast('QQ群号已复制：'+QQ_GROUP));else toast('QQ群号：'+QQ_GROUP);location.href='mqqapi://card/show_pslcard?src_type=internal&version=1&uin='+QQ_GROUP+'&card_type=group&source=qrcode';}
function joinChannel(){if(QQ_CHANNEL&&QQ_CHANNEL.startsWith('http'))location.href=QQ_CHANNEL;else toast('频道链接待管理员配置');}

// ============ 资源 ============
async function loadResources(type){currentResType=type;$('resTab1').classList.toggle('on',type==='video');$('resTab2').classList.toggle('on',type==='app');const box=$('resList');box.innerHTML='<div class="empty">加载中...</div>';try{const data=await api('/rest/v1/resources?select=*&type=eq.'+type+'&order=created_at.desc');if(!data||!data.length){box.innerHTML='<div class="empty">'+(type==='video'?'还没有教程视频':'还没有应用')+'，管理员发布后可见</div>';return;}if(type==='video'){box.innerHTML=data.map(r=>`<div class="video-card"><div class="video-cover" onclick="location.href='${esc(r.link)}'">▶️</div><div class="video-info"><div class="vt">${esc(r.title)}</div><div class="vs">${esc(r.description||'')} · 点击观看</div><div style="margin-top:5px;display:flex;justify-content:space-between;align-items:center"><span class="res-tag">🎬 教程视频</span><span style="color:#7C6FF0;font-size:13px;cursor:pointer" onclick="favResource('app',${r.id},'${esc(r.title).replace(/'/g,'')}')">⭐收藏</span></div></div></div>`).join('');}else{box.innerHTML=data.map(r=>`<div class="res-card" onclick="openAppDetail(${r.id})"><div class="rc-title">${r.icon?`<img src="${esc(r.icon)}" style="width:34px;height:34px;border-radius:8px;object-fit:cover">`:''}${esc(r.title)}<span class="res-tag" style="margin-left:auto">📱 应用</span></div><div class="rc-desc">${esc(r.description||'')}</div></div>`).join('');}}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}
function initResPost(){if(!myProfile||myProfile.role!=='admin'){toast('仅管理员可上传');goPage('resourcePage');return;}$('resTypeChips').innerHTML=[['video','🎬 教程视频'],['app','📱 应用']].map(x=>`<div class="chip ${x[0]===currentResType?'on':''}" data-k="${x[0]}" onclick="pickResType(this,'${x[0]}')">${x[1]}</div>`).join('');$('resErr').textContent='';}
function pickResType(el,k){currentResType=k;document.querySelectorAll('#resTypeChips .chip').forEach(x=>x.classList.remove('on'));el.classList.add('on');}
function pickResImg(inp){const f=inp.files&&inp.files[0];if(!f)return;$('resImgPreview').innerHTML=`<img src="${URL.createObjectURL(f)}" style="width:68px;height:68px;border-radius:10px;object-fit:cover;margin-top:6px">`;}
async function submitResource(){if(!myProfile||myProfile.role!=='admin'){toast('仅管理员可上传');return;}const title=$('resTitle').value.trim(),desc=$('resDesc').value.trim(),link=$('resLink').value.trim();if(!title||!link){$('resErr').textContent='请填标题和链接';return;}let icon='';const file=$('resImg').files&&$('resImg').files[0];try{if(file)icon=await uploadImage(file);await dbInsert('resources',{title,description:desc,type:currentResType,link,icon,created_by:myProfile.id});toast('✅ 资源已发布');$('resTitle').value='';$('resDesc').value='';$('resLink').value='';$('resImg').value='';$('resImgPreview').innerHTML='';goPage('resourcePage');}catch(e){$('resErr').textContent='发布失败：'+e.message;}}
async function openAppDetail(id){try{const r=await api('/rest/v1/resources?id=eq.'+id);const d=r&&r[0];if(!d)return;const fav=await isFaved('app',d.id);$('appDetailBox').innerHTML=`<div style="background:#fff;border-radius:14px;padding:18px;text-align:center;margin-bottom:12px">${d.icon?`<img src="${esc(d.icon)}" style="width:80px;height:80px;border-radius:16px;object-fit:cover;margin-bottom:10px">`:`<div style="width:80px;height:80px;border-radius:16px;background:#eee;line-height:80px;font-size:32px;margin:0 auto 10px">📱</div>`}<div style="font-size:18px;font-weight:700">${esc(d.title)}</div><div class="res-tag" style="margin-top:6px">📱 应用</div></div><div style="background:#fff;border-radius:14px;padding:15px;font-size:14px;line-height:1.8;color:#444;margin-bottom:12px">${esc(d.description||'暂无介绍')}</div><div class="detail-actions"><button class="action-btn fav ${fav?'on':''}" onclick="favResource('app',${d.id},'${esc(d.title).replace(/'/g,'')}')">⭐ ${fav?'已收藏':'收藏'}</button><button class="action-btn warn" onclick="location.href='${esc(d.link)}'">🔗 打开链接</button></div>`;goPage('appDetailPage');}catch(e){toast('加载失败');}}

// ============ 管理员后台 ============
async function loadAdmin(tab){$('aTab1').classList.toggle('on',tab==='reports');$('aTab2').classList.toggle('on',tab==='punish');const box=$('adminBox');if(tab==='reports'){try{const data=await api('/rest/v1/reports?status=eq.pending&order=created_at.desc');if(!data||!data.length){box.innerHTML='<div class="empty">没有待处理的举报 🎉</div>';return;}let html='<div class="tip" style="margin-bottom:10px">共 '+data.length+' 条待处理举报</div>';for(const r of data){let target='',content='',authorId=null,reporter=r.reporter_id;try{if(r.target_type==='post'){const p=await api('/rest/v1/posts?id=eq.'+r.target_id);if(p&&p[0]){target='帖子：'+p[0].title;content=p[0].content;authorId=p[0].author_id;}}else{const c=await api('/rest/v1/comments?id=eq.'+r.target_id);if(c&&c[0]){target='评论#'+r.target_id;content=c[0].content;authorId=c[0].author_id;}}}catch(e){}html+=`<div class="report-card"><div class="rc-title" style="font-size:14px;font-weight:600">🚩 举报（${esc(r.reason)}）</div><div style="font-size:12px;color:#999;margin-bottom:6px">${esc(target)}</div><div class="rc-body">${esc(content)}</div><div class="rc-btns"><button class="btn" style="background:#999" onclick="handleReport(${r.id},'ignore','${reporter}')">忽略</button><button class="btn" onclick="handleReport(${r.id},'delete','${reporter}')">删内容</button><button class="btn" style="background:#e5484d" onclick="handleReport(${r.id},'punish','${reporter}')">删+扣分</button></div></div>`;}box.innerHTML=html;}catch(e){box.innerHTML='<div class="empty">加载失败</div>';}}else{box.innerHTML=`<div class="tip" style="margin-bottom:10px">按QQ号/邮箱查找用户，然后选择处罚</div><input id="punishQQ" class="inp" placeholder="输入用户 QQ 号或邮箱"><button class="btn" onclick="findUser()">查找用户</button><div id="userInfo" style="margin-top:12px"></div>`;}}
async function findUser(){const kw=$('punishQQ').value.trim();const box=$('userInfo');try{let data=null;if(/^\d{5,12}$/.test(kw)){data=await api('/rest/v1/profiles?select=*&qq=eq.'+kw+'&limit=1');}else{data=await api('/rest/v1/profiles?select=*&email=eq.'+kw+'&limit=1');}if(!data||!data.length){box.innerHTML='<div class="empty">没找到该用户</div>';return;}const u=data[0];box.innerHTML=`<div class="report-card"><div class="rc-title" style="font-weight:600">👤 ${esc(u.nickname)} (QQ:${esc(u.qq||'-')})</div><div class="rc-body" style="margin-bottom:10px">等级Lv${u.level} · 硬币${u.coins} · 信誉分${u.credit}${u.is_banned?' · ⛔已封号':''}${u.banned_until?' · ⏳禁言至'+String(u.banned_until).slice(0,16).replace('T',' '):''}</div><div class="rc-btns"><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','credit',10,'管理员扣分')">扣10分</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','credit',50,'议政扣分')">扣50分</button><button class="btn" onclick="punish('${u.id}','mute',1,'禁言')">禁言1天</button><button class="btn" onclick="punish('${u.id}','mute',2,'禁言')">禁言2天</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','ban',0,'封号')">永久封号</button><button class="btn" style="background:#e5484d" onclick="punish('${u.id}','device_ban',0,'封设备')">封设备</button><button class="btn" style="background:#999" onclick="punish('${u.id}','unban',0,'解封')">解封</button><button class="btn" style="background:#999" onclick="punish('${u.id}','unmute',0,'解禁')">解禁</button></div></div>`;}catch(e){box.innerHTML='<div class="empty">查询失败</div>';}}
async function punish(uid,action,amount,detail){const d=action==='mute'?prompt('禁言几天？','1'):detail;const amt=action==='mute'?(parseInt(d)||1):amount;try{const r=await dbRpc('admin_punish',{p_user_id:uid,p_action:action,p_amount:amt,p_detail:detail});toast(r==='OK'?'✅ 处罚已执行':('⚠️ '+r));setTimeout(()=>findUser(),600);}catch(e){toast('操作失败');}}
async function handleReport(rid,act,reporter){try{if(act==='ignore'){await dbUpdate('reports','id=eq.'+rid,{status:'ignored'});toast('已忽略');}else{const r=await api('/rest/v1/reports?id=eq.'+rid);const rep=r&&r[0];if(rep){if(rep.target_type==='post'){const p=await api('/rest/v1/posts?id=eq.'+rep.target_id);if(p&&p[0]){if(act==='punish')await dbRpc('admin_punish',{p_user_id:p[0].author_id,p_action:'credit',p_amount:10,p_detail:'举报成立：'+rep.reason});await dbDelete('posts','id=eq.'+rep.target_id);}}else{await dbDelete('comments','id=eq.'+rep.target_id);}await dbUpdate('reports','id=eq.'+rid,{status:'handled'});if(reporter)dbRpc('reward_report',{p_reporter_id:reporter}).catch(()=>{});toast('✅ 已处理，举报人已+5分+10硬币');}}loadAdmin('reports');}catch(e){toast('处理失败');}}

// ============ 启动 ============
(function init(){if(currentUser())showMain();else goPage('loginPage');})();