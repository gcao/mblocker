chrome.extension.sendRequest({method: "getLocalStorage", key: "users"}, function(response) {
  var users = response.data;

  if (!users) return;

  users = users.split("\n");

  // remove multiple, leading or trailing spaces
  function trim(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    return s;
  }

  var updatedUsers = [];
  for (var i=0; i<users.length; i++) {
    var u = trim(users[i]);
    if (u.length > 0) updatedUsers.push(u);
  }
  users = updatedUsers;

  console.log(users);

  function block(user) {
    user = trim(user);
    for (var i = 0; i < users.length; i ++) {
      if (users[i] == user) return true;
    }
    return false;
  }

  if (location.pathname == '/') {
    var threads = document.querySelectorAll('.hkindex td > a.a2');

    for (var i = 0; i < threads.length; i++) {
      if (i % 2 == 1) continue; // Skip check last reply author

      var e = threads[i];
      var author = e.innerHTML;
      if (block(author)){
        console.log('Blocked post by ' + author);
        var attr = document.createAttribute('style');
        attr.value = 'display:none';
        e.parentNode.parentNode.setAttributeNode(attr);
      }
    }
  } else if (location.pathname.match(/article_t/)) {
    var posts = document.querySelectorAll('tr:first-child > td.wenzhang a.news');

    for (var i = 0; i < posts.length; i++) {
      var e = posts[i];
      var author = e.innerHTML;
      if (block(author)){
        console.log('Blocked post by ' + author);
        var attr = document.createAttribute('style');
        attr.value = 'display:none';
        e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttributeNode(attr);
      }
    }
  } else if (location.pathname.match(/bbsdoc/)) {
    var threads = document.querySelectorAll('.taolun_leftright tr > td:nth-child(5) a');

    for (var i = 0; i < threads.length; i++) {
      var e = threads[i];
      var author = e.innerHTML;
      if (block(author)){
        console.log('Blocked post by ' + author);
        var attr = document.createAttribute('style');
        attr.value = 'display:none';
        e.parentNode.parentNode.setAttributeNode(attr);
      }
    }

    var replies = document.querySelectorAll('.taolun_leftright tr > td:nth-child(6) a');

    for (var i = 0; i < replies.length; i++) {
      var e = replies[i];
      var author = e.innerHTML;
      if (block(author)){
        console.log('Blocked post by ' + author);
        var attr = document.createAttribute('style');
        attr.value = 'display:none';
        e.parentNode.setAttributeNode(attr);
      }
    }
  }
});
