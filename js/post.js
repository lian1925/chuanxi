// test jquery
// $('.page p img').css('border', '5px solid #000');

// first wrap
// $('.page p img').wrap('<a data-fancybox="gallery" href="' + $(this).attr('src') + '")></a>')
$('.page p img').each(function() {
  var src = $(this).attr('src');
  var content = '<a data-fancybox="image" href="' + src + '")></a>';
  $(this).wrap('' + content + ')></a>')
})

function pleaseWait() {
  if(document.getElementById('comment-text').value.length>1200){
  alert('留言请勿超过1200字！');
  return false;
  }
  
  if(!document.forms["comments_form"].author.value){
  alert('请填写“您的大名”！');
  return false;
  }
  
  if(document.forms["comments_form"].email.value.length<7 || document.forms["comments_form"].email.value.indexOf("@")==-1){
  alert('请正确填写电子邮件地址！');
  return false;
  }
  
  if(document.getElementById('comment-text').value.length<2){
  alert('留言不得为空！');
  return false;
  }
  document.getElementById("comment-submit").style.visibility="hidden";
  document.getElementById("wait").style.display="block";
            stick_count();
  if (document.forms["comments_form"].armor)
              document.forms["comments_form"].armor.value = 'e7106287804c44890183779a662fa05532c7a6b2';
  return true;
  }  