$(function(){
	/**
	*	SNS - Facebook
	*	HTML code
	*	<div class="text-right mlr10">
	*		<div class="fb-like" data-href="" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>
	*	</div>
	**/
	/*
	$("body").append('<div id="fb-root"></div>');
	$(".fb-like").each(function(){
		if ($(this).attr("data-href")==""){
			$(this).attr({ "data-href": location.href })
		}
	});
	
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&appId=&version=v2.3&appId=";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	*/
	
	
	/**
	*	SNS - Twitter
	*	HTML code
	*	<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://example.com">Tweet</a>
	**/
	/*
	$(".twitter-share-button").each(function(){
		if ($(this).attr("data-url")==""){
			$(this).attr({ "data-url": location.href })
		}
	});
	
	!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
	*/
	
	
	// share link - twitter
	$("a.twitter-share-link").each(function(){
		$(this).attr({
			href: "https://twitter.com/share?url="+encodeURIComponent(location.href.replace(/#.+$/, ""))+"&text="+encodeURIComponent($("title").text()),
			target: "_blank"
		});
	});
	
	// share link - facebook
	$("a.facebook-share-link").each(function(){
		$(this).attr({
			href: "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href.replace(/#.+$/, "")),
			target: "_blank"
		});
	});
	
});




