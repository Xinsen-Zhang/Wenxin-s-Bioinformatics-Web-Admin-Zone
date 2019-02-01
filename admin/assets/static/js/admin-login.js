$(function(){

	const $loginBox = $(".login-box");
	adjustTop();
	function adjustTop(){
		let height = $(window).height();
		let boxHeight = $loginBox.height();
		let marginTop = (height - boxHeight) / 2;
		$loginBox.css("margin-top",marginTop + "px");
	}

	// 登录业务
	const $login = $("#login");
	const $button = $(".login");
	$button.on("click",function(){
		$login.trigger("click");
	})


	function clearShake(){
		$loginBox[0].classList.remove("shake");
	}


	setTimeout(clearShake,800);


	// 用户名输入与头像的修改
	const $username = $("#username");
	// 用户头像的获取与修改
	const $avatar = $(".avatar img");
	// 消息的提醒
	const $message = $(".message");

	// 设置 post 值
	const $postAvatar = $("#post-avatar");

	$username.on("focus",function(){
		$(this).prop("placeholder","");
	}).on("blur",function(){
		$(this).prop("placeholder","Username here");
		let username = $username.val();
		if(username){
			$.getJSON(`http://39.107.99.64:1221/admin/api/user?username=${username}&callback=?`, function(json) {
					if(json.success){
						console.log(json.avatar.split("/")[1]);
						{if( $avatar.prop("src").split("/")[$avatar.prop("src").split("/").length - 1]  !== json.avatar.split("/")[1])
							{
								$avatar.css({
									opacity: "0",
									transition: "opacity 0.8s linear 0s"
								});
								setTimeout(function(){
									$avatar.prop("src","assets/static/" + json.avatar);
									$avatar.css({
									opacity: "1",
								});
								},800);
								$message.text("Hi, cat~");
								$loginBox[0].classList.remove("shake");
							}
						}
					}else{
						if(json.message){
							$avatar.prop("src","assets/static/avatar/default.jpeg");
							$message.text(json.message);
							$loginBox[0].classList.add("shake");
							setTimeout(clearShake,800);
						}
					}
			});
		}
		$postAvatar.val($avatar.prop("src"));
	});
})