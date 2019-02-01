// <form action="/logout" method="post" style="position: relative;">
//     <div class="button" style="position: absolute;bottom: 0">
//         <input type="submit" value="logout">
//     </div>
// </form>

$(function(){
	// 操作的是登录页面
	// 对于登录成功的表单操作
	const html = `<form action="/logout" method="post" style="position: relative;">
				    <div class="button" style="position: absolute;bottom: 0">
				        <input type="submit" value="logout">
				    </div>
				</form>`;

	// 获取登录键并且注册点击事件，取消默认行为
	const $submit = $(".submit");
	// 获取账号和密码的输入框
	// const username = document.getElementById("username");
	// const password = document.getElementById("password");
	const $username = $("#username");
	const $password = $("#password");
	// 获取表格盒子。等到登录成功的时候进行修改
	// 
	// 获取message盒子，登录之后修改文本值
	$message = $(".message");
	// 获取登录框整个盒子，在登录失败的情况下进行摇晃
	$mainRight = $('.main-right');
	const $form = $(".form");
	$submit.on("click",function(event){
		event.preventDefault();
		const username = $username.val();
		const password = $password.val();
		data = {username: username,
				password: password};
		$.post("/login", data, function(result){
			$message.text(result.message);	
			if(result.success){
				$form.html(html);
			}
			else{
				$mainRight[0].classList.remove("shake");
				$mainRight[0].classList.remove("animate");
				$mainRight[0].classList.add("shake");
				$mainRight[0].classList.add("animate");
			}
		})
		// return false;
	})
	function clearShake(){
		$mainRight[0].classList.remove("shake");
		$mainRight[0].classList.remove("animate");
	};
	setInterval(clearShake,800);


	let placeholder1 = $username.prop("placeholder")

    $username.on("focus",function(){
        $(this).prop("placeholder","");
    }).on("blur",function(){
        $(this).prop("placeholder", placeholder1);
    })


	let placeholder2 = $password.prop("placeholder")

    $password.on("focus",function(){
        $(this).prop("placeholder","");
    }).on("blur",function(){
        $(this).prop("placeholder", placeholder2);
    })
})