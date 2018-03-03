// test jquery
// $('.page p img').css('border', '5px solid #000');

// first wrap
// $('.page p img').wrap('<a data-fancybox="gallery" href="' + $(this).attr('src') + '")></a>')
$('.page p img').each(function() {
  var src = $(this).attr('src');
  var content = '<a data-fancybox="image" href="' + src + '")></a>';
  $(this).wrap('' + content + ')></a>')
})
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
      location.href=`/response/?redirect=${location.pathname}`
    });
  }else if(obj.method === "GET"){
    $.get(obj.url,obj.data, function (response) {
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
  var url =  "http://39.108.194.159:8080/comment/comment/new"
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
  var post_id = document.getElementById('info-meta').innerText;
  var url =  `http://39.108.194.159:8080/comment/comment/post`
  
  var data = {post_id}
  var obj = {data,url,method:'GET'};
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