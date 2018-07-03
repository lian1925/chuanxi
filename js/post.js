// test jquery
// $('.page p img').css('border', '5px solid #000');

// first wrap
// $('.page p img').wrap('<a data-fancybox="gallery" href="' + $(this).attr('src') + '")></a>')
$('.page p img').each(function() {
  var src = $(this).attr('src');
  var content = '<a data-fancybox="image" href="' + src + '")></a>';
  $(this).wrap('' + content + ')></a>')
})
var hostUrl = ["http://138.128.204.8:8080","http://39.108.194.159:8080"]
// alert(JSON.stringify(location))
var doButton = function(type){
  if(type == "addComment"){
    addComment();
  }else if(type == "backToPage"){
    backToPage();
  }

}
var getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var backToPage = function(){
  var path = getParameterByName("redirect");
  if(path == null){
    location.href = "/home/"
    return ;
  }
  location.href=path;
}

// backToPage();

var request = function(obj){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": obj.url,
    "type": obj.method,
    "headers": {
      "content-type": "application/json"
    },
    "data": JSON.stringify(obj.data)
  };
  if(obj.method === "POST"){
    $.ajax(settings).done(function (response) {
      if(obj.type == "addVisitCount"){
        // console.log(response);
        return;
      }
      location.href=`/response/?redirect=${location.pathname}`
    });
  }else if(obj.method === "GET"){
    $.get(obj.url,obj.data, function (response) {
      if(obj.type === "getVisitCount"){
        // console.log(response);
        $("div.post-foot h3").append(`<span style="font-size:1.4rem;font-family:Arial;color:grey;"> ( ${response.length+1} visitors )</span>`);
        return;
      }
      var dataList = response.dataList;
      for(var i = 0;i<dataList.length;i++){
        getOneComment(dataList[i]);
      }
      // location.href=`/response/?redirect=${location.pathname}`
    });
  }
}
function addComment() {
  var content = document.getElementById('comment-content').value.trim();
  var author = document.getElementById('comment-author').value.trim();
  var wechat = document.getElementById('comment-wechat').value;
  var email = document.getElementById('comment-email').value;
  var post_id = document.getElementById('info-meta').innerText.trim();
  if(content.length<3){
    alert("评论不少于2字");
    return false;
  }
  var data = {content,author,wechat,email,post_id};
  var url =  `${hostUrl[1]}/comment/comment/new`
  var obj = {url,data,method:'POST'}
  
  request(obj)
  }  

var getOneComment = function(obj){
  var item_comment = `
  <div id="comment-${obj.id}" class="item-comment">
  <p class="author">
    
    ${obj.author} <span>说：</span>
  </p>

  <div class="content">
      ${obj.content}
  </div>

  <p class="date">
      ${formatDate(obj.time)}
  </p>
    
</div>
  `
  $(".content-comment").append(item_comment);
}
var getAllComment = function() {
  var flag = document.getElementById('info-meta');
  if(flag == undefined){
    return;
  }
  var post_id = flag.innerText.trim();
  var url =  `${hostUrl[1]}/comment/comment/post`
  
  var data = {post_id}
  var obj = {data,url,method:'GET'};
  // alert('comment')
  request(obj)
}
var addVisitCount = function() {
  var flag = document.getElementById('info-meta');
  if(flag == undefined){
    return;
  }
  var post_id = flag.innerText.trim();
  var url =  `${hostUrl[1]}/comment/visit/add`
  
  var data = {post_id}
  var obj = {data,url,method:'POST',type:'addVisitCount'};
  // alert('comment')
  request(obj)
}
var getVisitCount = function() {
  var flag = document.getElementById('info-meta');
  if(flag == undefined){
    return;
  }
  var post_id = flag.innerText.trim();
  var url =  `${hostUrl[1]}/comment/visit/count`
  
  var data = {post_id}
  var obj = {data,url,method:'GET',type:'getVisitCount'};
  // alert('comment')
  request(obj)
}
var formatDate = function(date){
  var date = new Date(date)
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  return `${year}年${month}月${day}日 ${hour}:${minute}`
}
getAllComment();
addVisitCount();
getVisitCount();
var elementPlayer = document.getElementById('aplayer1');
if(elementPlayer !== null){

  var ap = new APlayer({
    element: document.getElementById('aplayer1'),
    music: {
        title: document.querySelector("div.post h1").innerHTML,
        author: 'by ShenZhen Lian',
        url: document.getElementById('info-url').innerText.trim()
    }
  });
}
var elementVideo = document.getElementById('video');
function updateVideo( ) {
  var canvas = document.getElementById( 'canvas' );
  var ctx = canvas.getContext( '2d' );
  // var myVideo = document.getElementById( 'video' );
  ctx.drawImage( elementVideo, 0, 0, 640, 480 );
}
if(elementVideo !== null){


  var min_w = 300; // minimum video width allowed
  var vid_w_orig;  // original video dimensions
  var vid_h_orig;

  jQuery(function() { // runs after DOM has loaded

      vid_w_orig = parseInt(jQuery('video').attr('width'));
      vid_h_orig = parseInt(jQuery('video').attr('height'));
      $('#debug').append("<p>DOM loaded</p>");

      jQuery(window).resize(function () { resizeToCover(); });
      jQuery(window).trigger('resize');
  });

  function resizeToCover() {

      // set the video viewport to the window size
      jQuery('#video').width(jQuery('.post').width());
      jQuery('#video').height(jQuery('.post').width()*0.625);

      // use largest scale factor of horizontal/vertical
      var scale_h = jQuery(window).width() / vid_w_orig;
      var scale_v = jQuery(window).height() / vid_h_orig;
      var scale = scale_h > scale_v ? scale_h : scale_v;

      // don't allow scaled width < minimum video width
      if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

      // now scale the video
      jQuery('video').width(scale * vid_w_orig);
      jQuery('video').height(scale * vid_h_orig);
      // and center it by scrolling the video viewport
      jQuery('#video').scrollLeft((jQuery('video').width() - jQuery(window).width()) / 2);
      jQuery('#video').scrollTop((jQuery('video').height() - jQuery(window).height()) / 2);
  };


}
try{

  　　top.location.hostname;
  
  　　if (top.location.hostname != window.location.hostname) {
  
  　　　　top.location.href =window.location.href;
  
  　　}
  
  }
  
  catch(e){
  
  　　top.location.href = window.location.href;
  
  }