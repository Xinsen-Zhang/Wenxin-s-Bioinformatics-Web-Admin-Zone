$(function(){

	$(".left").height($(window).height());
	const $form = $(".image-form");
	const $listContainer = $(".title-list-container");
	$(".menu").on("click",function(){
		const $this = $(this);
		if($this.text()!= "Home"){
			$form.css("visibility","hidden");
			$listContainer.css("visibility","visible");
		}
		else{
			$form.css("visibility","visible");
			$listContainer.css("visibility","hidden");
		}
		const field = this.dataset.field;
		// console.log(`39.107.99.64:1221/admin/api/title?field=${field}&callback=?`);
		var html = '';
		$.getJSON(`http://39.107.99.64:1221/admin/api/title?field=${field}&callback=?`,function(json){
			json.data.forEach(function(element,index){
				var name = element.name;
				if(element.time){
					element.name = element.time + " " + element.name;
				}
				var query = element.query;
				html += `<li class="item">
								<div class="title">${name}</div>
								<div class="operation">
									<button class="primary">
										<a href="/admin/edit?field=${field}&${query}">Edit</a>
									</button>
									<button class="danger">Delete</button>
								</div>
							</li>`;

			})
			$(".tabel-content").html(html);
			$(".danger").on("click",function(){
				alert("Oppps, an error has occoured. Please contact the author");
			})
		})
	})
	$(".button").on("click",function(){
		$(".logout").trigger("click");
	});

	// 文件上传事件的触发
	const $choose = $(".mask-choose");
	const $text = $(".mask-text");
	const $file = $("#image");
	$choose.on("click",function(){
		$file.trigger("click");
	});
	$text.on("click",function(){
		$file.trigger("click");
	});
	$file.on("change",function(){
		const text = this.files[0].name;
		$text.text(text);
	});
	// 图片显示的操作;
	$imageItem = $(".image-item");
	$imageShow = $(".image-show");
	$imageItem.on("click",function(){
		const $a = $(this).find("a");
		$a.trigger("click");
	});
	$imageItem.find("a").on("click",function(event){
		const href = $(this).prop("href");
		$imageShow.find("img").prop("src",href);
		$imageShow.css("display","block");
		event.stopPropagation();
		event.preventDefault();
		// setTimeout(alert("The url is " + href),3000);
	});
	$imageShow.on("click",function(){
		alert($(this).find("img").prop("src"));
	})
});