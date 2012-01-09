chrome.extension.sendRequest({method: "getLocalStorage", key: "users"}, function(response) {
  var users = response.data;

  if (users) {
  	users = users.split(" \n");
  }

  console.log(users);
  
  function block(user) {
    for (var u in users) {
      if (u == user) return true;
    }
    return false;
  }
  
  if (location.pathname.match(/article_t/)) {
  	var threads = document.querySelectorAll('.taolun_leftright a.news')

  	for (var i in threads) { 
  		var e = threads[i];
      var author = e.innerHTML;
  		if (block(author)){
  			console.log('Blocked post by ' + author);
  			var attr = document.createAttribute('style');
  			attr.value = 'display:none';
  			e.parentNode.parentNode.setAttributeNode(attr);
  		}
  	}
  } else if (location.pathname.match(/bbsdoc/)) {
  	var threads = document.querySelectorAll('.taolun_leftright a.news')

  	for (var i in threads) { 
  		var e = threads[i];
      var author = e.innerHTML;
  		if (block(author)){
  			console.log('Blocked post by ' + author);
  			var attr = document.createAttribute('style');
  			attr.value = 'display:none';
  			e.parentNode.parentNode.setAttributeNode(attr);
  		}
  	}
  }
});
