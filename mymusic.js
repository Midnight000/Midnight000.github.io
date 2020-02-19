var songName = document.getElementById("songname");
var singerName = document.getElementById("singername");
var musicImage = document.getElementsByClassName("song_img")[0];
var musicList = document.getElementsByTagName("li");
var musicNode = document.getElementsByTagName("audio")[0];
var musicSrcList = ["http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_1022443&response=res&type=convert_url&",
"http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_156521&response=res&type=convert_url&",
"http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_116017&response=res&type=convert_url&"];
var musicImageList = ["http://img3.kuwo.cn/star/albumcover/300/33/62/1408218390.jpg",
  "http://img4.kuwo.cn/star/albumcover/300/14/76/860786194.jpg",
"http://img3.kuwo.cn/star/albumcover/300/77/69/2370217441.jpg"];
var singerNameList = ["Jay Chou","Jay Chou","Jay Chou"];
var songNameList = ["天地一斗","Ninja","最后的战役"];
var len = musicSrcList.length;
var playing;
var outFrame=document.getElementsByClassName("outframe")[0];
var lockIcon=document.getElementsByClassName("lock_img")[0];
var locking=false;
var locker;
var currentTime=document.getElementsByClassName("song_now_time")[0];
var fullTime=document.getElementsByClassName("song_complete_time")[0];
var musicTimer;
var barFollow=true;
var timeFollow=true;
var controlIcon=document.getElementsByClassName("con_c_img");
var processScroll = document.getElementsByClassName("process_scroll")[0];
var processBar = processScroll.children[0];
var processMask = processScroll.children[1];
var volumeScroll = document.getElementsByClassName("volume_scroll")[0];
var volumeBar = volumeScroll.children[0];
var volumeMask = volumeScroll.children[1];
//初始化
volumeMask.style.width=100+"px";
volumeBar.style.left=100+"px";
update(0);
changeIcon(1);
//初始化
function changeIcon(x){
  if(x===0)controlIcon[1].src="./img/pause.png";
  else controlIcon[1].src="./img/play.png";
}
//更新当前播放歌曲信息
lockIcon.onclick=function (event) {
  if(locking===false)
  {
    lockIcon.src="./img/padlock.png";
    locking=true;
    outFrame.style.bottom="-20px";
  }
  else
  {
    lockIcon.src="./img/open-padlock.png";
    locking=false;
    outFrame.style.bottom="-90px";
  }
}
function update(index){
  songName.innerHTML = songNameList[index];
  singerName.innerHTML = singerNameList[index];
  musicNode.src = musicSrcList[index];
  musicImage.src = musicImageList[index];
  musicNode.load();
  musicNode.play();
  changeIcon(0);
  playing=index;
  clearInterval(musicTimer);
  musicTimer=setInterval(function(){
      changeIcon(0);
      setTimeAndProcess();
    },10)
}
//定义设定当前歌曲时间
function setTimeAndProcess(){
  var tmp=musicNode.duration;
  var sec=Math.floor(tmp%60),fen=Math.floor(tmp/60);
  fullTime.innerHTML=(fen>9?fen:("0"+fen))+":"+(sec>9?sec:("0"+sec));
  tmp=musicNode.currentTime;
  if(timeFollow){
    sec=Math.floor(tmp%60),fen=Math.floor(tmp/60);
    currentTime.innerHTML=(fen>9?fen:("0"+fen))+":"+(sec>9?sec:("0"+sec));
  }
  if(barFollow) {
    var proportion = tmp / musicNode.duration;
    processBar.style.left = proportion * processScroll.offsetWidth + "px";
    processMask.style.width = processBar.style.left;
  }
}

//定义控件点击动作
controlIcon[0].onclick=function(){
  playing--;
  if(playing===-1)playing=len-1;
  update(playing);
}
controlIcon[1].onclick=function(){
  if(musicNode.paused) {
    musicNode.play();
    changeIcon(0);
    musicTimer=setInterval(function(){
      setTimeAndProcess();
    },10)
  }
  else{
    musicNode.pause();
    changeIcon(1);
    clearInterval(musicTimer);
  }
}
controlIcon[2].onclick=function(){
  playing++;
  if (playing === len) playing = 0;
  update(playing);
}
/*for (var i = 0; i < len; i++) {
  (function (i) {
    musicList[i].onclick = function () {
      if(playing===i)return;
      update(i);
    }
  })(i);
}*/
//定义播放完动作
musicNode.onended=function () {
  playing++;
  if (playing === len) playing = 0;
  update(playing);
}
// 定义拖动条组件
processScroll.onmousemove=function (event){
  timeFollow=false;
  var e=event||window.event;
  var leftLen;
  leftLen=e.clientX-2-processScroll.offsetLeft;
  if(leftLen<0)leftLen=0;
  if(leftLen>processScroll.offsetWidth)leftLen=processScroll.offsetWidth
  var tmp=musicNode.duration*(leftLen/processScroll.offsetWidth);
  var sec=Math.floor(tmp%60),fen=Math.floor(tmp/60);
  currentTime.innerHTML=(fen>9?fen:("0"+fen))+":"+(sec>9?sec:("0"+sec));

  this.onmouseleave=function () {
    timeFollow=true;
    var tmp=musicNode.currentTime;
    var sec=Math.floor(tmp%60),fen=Math.floor(tmp/60);
    currentTime.innerHTML=(fen>9?fen:("0"+fen))+":"+(sec>9?sec:("0"+sec));
  }
}
processScroll.onmousedown=function (event) {
  barFollow=false;
  timeFollow=false;
  var e=event||window.event;
  var barr=processBar;
  var leftLen;
  leftLen=e.clientX-2-processScroll.offsetLeft;
  barr.style.left=leftLen+"px";
  if(leftLen<0)barr.style.left="0";
  else if(leftLen>processScroll.offsetWidth)barr.style.left=processScroll.offsetWidth+"px";
  processMask.style.width=barr.style.left;
  document.onmousemove=function(event){
    var e=event||window.event;
    leftLen=e.clientX-2-processScroll.offsetLeft;
    barr.style.left=leftLen+"px";
    if(leftLen<0)barr.style.left="0";
    else if(leftLen>processScroll.offsetWidth)barr.style.left=processScroll.offsetWidth+"px";
    processMask.style.width=barr.style.left;
    if(leftLen<0)leftLen=0;
    else if(leftLen>processScroll.offsetWidth)leftLen=processScroll.offsetWidth;
    var tmp=leftLen/processScroll.offsetWidth*musicNode.duration;
    var sec=Math.floor(tmp%60),fen=Math.floor(tmp/60);
    currentTime.innerHTML=(fen>9?fen:("0"+fen))+":"+(sec>9?sec:("0"+sec));
    window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
  }
  var that=this;
  document.onmouseup=function () {
    timeFollow=true;
    if(musicNode.paused)controlIcon[1].onclick();
    musicNode.currentTime=Math.floor(leftLen*musicNode.duration/processScroll.offsetWidth);
    document.onmousemove=null;
    document.onmouseup=null;
    barFollow=true;
  }
}
//定义音量放送
volumeScroll.onmousedown=function (event) {
  set(event);
  function set(e){
    var leftLen=e.clientX-volumeScroll.offsetLeft;
    if(leftLen<0){
      volumeMask.style.width="0"
      volumeBar.style.left="0";
    }
    else if(leftLen>100){
      volumeMask.style.width=100+"px"
      volumeBar.style.left=100+"px";
    }
    else{
      volumeMask.style.width=leftLen+"px"
      volumeBar.style.left=leftLen+"px";
    }
    musicNode.volume=leftLen/100;
  }
  document.onmousemove=function(event){
    set(event);
    window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
  }
  document.onmouseup=function (evetn) {
    document.onmousemove=null;
  }
}
