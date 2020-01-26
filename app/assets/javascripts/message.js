$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message_talker">` +
          message.user_name +
          `<div class="message_date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message_text">` +
          `<p>` + message.content + `</p>` +
          `<img src="` + message.image + `">` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message_talker">` +
          message.user_name +
          `<div class="message_date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message_text">` +
        `<p>` + message.content + `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="message_talker">` +
          message.user_name +
          `<div class="message_date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="message_text">` +
          `<img src="` + message.image + `">` +
        `</div>` +
      `</div>`
    };
    return html;
  };
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
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message-list').append(insertHTML);
        $('.main_chat__message-list').animate({scrollTop: $('.main_chat__message-list')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".submit_btn").prop("disabled", false);
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});