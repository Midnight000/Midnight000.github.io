var musicList=document.getElementsByTagName("li");
var musicNode=document.getElementsByTagName("audio")[0];
var musicSrclist=['打上花火.flac'];
var len=musicList.length;
musicNode.src=musicSrclist[0];

for(var i=0;i<len;i++){
  musicList[i].onclick=function () {
    musicNode.src="http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_55923158&response=res&type=convert_url&";
    musicNode.load();
    musicNode.play();
  }
}
//需实现点相同歌无反应
