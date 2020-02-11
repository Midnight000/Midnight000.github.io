var musicList=document.getElementsByTagName("li");
var musicNode=document.getElementsByTagName("audio")[0];
var musicSrclist=['http://m10.music.126.net/20200211233202/ec6c664449dc5b7b1734586353355d1c/ymusic/e8c3/b990/01fc/19b373e3bfa86a6d0be3808ad706e244.mp3'];
var len=musicList.length;
musicNode.src=musicSrclist[0];

for(var i=0;i<len;i++){
  musicList[i].onclick=function () {
    musicNode.src="http://m10.music.126.net/20200211233202/ec6c664449dc5b7b1734586353355d1c/ymusic/e8c3/b990/01fc/19b373e3bfa86a6d0be3808ad706e244.mp3";
    musicNode.load();
    musicNode.play();
  }
}
//需实现点相同歌无反应
