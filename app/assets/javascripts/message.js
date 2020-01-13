$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class = "message_talker">
                    ${message.user_name}
                    <div class = "message_date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "message_text">
                    ${message.content}
                    <image src=${message.image}>
                  </div>`
                  return html;
    } else {
      var html = `<div class = "message_talker">
                    ${message.user_name}
                    <div class = "message_date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class = "message_text">
                    ${message.content}
                  </div>`
                  return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    $('.submit_btn').removeAttr('data-disable-with');
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type:"POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__message-list').append(html);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight})
      $('form')[0].reset();
    })
    .fail(function() {
      alert('メッセージを送信できません');
    });
  });
});