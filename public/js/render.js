var $ = require('jquery');
var moment = require('moment');

var feed = $('#feed');

var sortItems = function (a, b) {
  return ($(b).data('created')) > ($(a).data('created')) ? 1 : -1;
};

exports.render = function (data) {
  if (feed.find('li[data-created="' + data.created + '"]').length === 0) {
    var isPublic = data.public ? 'public' : 'private';
    var li = $('<li data-created="' + data.created + '" class="' + isPublic + '"><div class="avatars"></div></li>');
    var senderAvatar = $('<div><img src="' + data.senderAvatar + '"></img></div>');
    var senderLabel = $('<span class="label">' + data.sender + '</span>');
    var div = $('<div class="para"></div>');

    if (!data.public && data.text.indexOf('-----BEGIN PGP MESSAGE-----') > -1) {
      var pre = $('<pre></pre>');
      pre.text(data.text);
      div.append(pre);

      var small = $('<small>P</small>');
      senderAvatar.append(small);
    } else {
      div.html(data.html);
    }

    li.find('.avatars').append(senderAvatar.append(senderLabel));

    var timeEl = $('<time></time>');
    timeEl.text(moment.unix(data.created).fromNow());
    li.append(timeEl);

    li.append(div);
    feed.prepend(li);
    feed.find('li').sort(sortItems).appendTo(feed);
  }
};