var musicList = document.getElementsByTagName("li");
var musicNode = document.getElementsByTagName("audio")[0];
var musicSrcList = ["http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_55923158&response=res&type=convert_url&",
"http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_28510075&response=res&type=convert_url&",
"http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_40602735&response=res&type=convert_url&"];
var len = musicList.length;
musicNode.src = musicSrcList[0];
musicList[0].className="playing";
for (var i = 0; i < len; i++) {
  (function (i) {
    musicList[i].onclick = function () {
      if(musicList[i].className==="playing")return;
      musicNode.src = musicSrcList[i];
      musicNode.load();
      musicNode.play();
      for(var j=0;j<len;j++)musicList[j].className="";
      this.className="playing";
    }
  })(i);
}

musicNode.onended=function () {
  var index=getPlaying()+1;
  if(index===len)index=0;
  musicNode.src = musicSrcList[index];
  musicNode.load();
  musicNode.play();
  for(var j=0;j<len;j++)musicList[j].className="";
  musicList[index].className="playing";
}
//需实现点相同歌无反应
function getPlaying(){
  for(var i=0;i<len;i++){
    if(musicList[i].className==="playing")return i;
  }
}
