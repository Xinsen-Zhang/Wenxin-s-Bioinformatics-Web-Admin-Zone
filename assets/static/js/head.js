$(function () {
    //可以剥离的
    var $weatherInfo = $(".weather-info");
    var $date = $(".date");
    var $play = $(".play");
    var $player = $(".player");
    var $submenu = $(".submenu");
    var $container = $(".container");
    var $ajax = $(".ajax");
    var $topContainer = $(".top-container");

    // 自动播放事件的注册



    //天气业务
    $.getJSON("http://39.107.99.64:1221/weather?callback=?",(data) => {
        $date.text(data.date);
        $weatherInfo.text(data.city + ":" + data.now);
    })
    // 音频播放业务

    var checkAudioStatus = function(){
        if($play[0].paused){
            $player[0].classList.add("icon-jingyin");
            $player[0].classList.remove("icon-yinpinaudio47");
        }
        else{
            $player[0].classList.remove("icon-jingyin");
            $player[0].classList.add("icon-yinpinaudio47");
        }
    };

    setInterval(checkAudioStatus,1000);

    var changeAudioStatus = function(){
        if($play[0].paused){
            $play[0].play();
        }
        else{
            $play[0].pause();
        }
        checkAudioStatus();
    };
    $player.on("click",changeAudioStatus);

    // 展开图标的状态监控
    // 需要监控.container 和 .submenu
    // var color = ["#FFE800","#00ff3d"];
    $submenu.on("mouseover",function () {
        var index = $(this).attr("index");
        index = parseInt(index);
        $container.find(".menu-index").eq(index)[0].classList.add("show");
        index = index - 1;
        $container.find(".expansion").eq(index)[0].classList.add("rotate");
    }).on("mouseleave",function(){
        var index = $(this).attr("index");
        index = parseInt(index);
        $container.find(".menu-index").eq(index)[0].classList.remove("show");
        index = index - 1;
        $container.find(".expansion").eq(index)[0].classList.remove("rotate");
    })

//    通过Ajax获取子菜单
//    <li class="submenu-item">
//                             <a href="/lecture?id=1">Web-design</a>
//                         </li>

//    Lecture 业务的修改
    var $lecture = $submenu.eq(0);
    var url = "http://39.107.99.64:1221/api/lectures/?&callback=?";
    $.getJSON(url,(data) => {
        var html = "";
        data.forEach((element,index) =>{
            html += '<li class="submenu-item"><a href="/lecture?' + element.query + '">' + element.name + '</a></li>';
        })
    //    submenu-list
        $lecture.find(".submenu-list").html(html);
    });


    // Ajax 还原的函数
    function resetAjax(){
        $ajax.css({
            display: "none",
            opacity: "1",
            transition: "none"
        })
    }


    var $analysis = $submenu.eq(1);
    var url = "http://39.107.99.64:1221/api/analysis/?&callback=?";
    $.getJSON(url,(data) => {
        var html = "";
        data.forEach((element,index) =>{
            html += '<li class="submenu-item"><a href="/analysis?' + element.query + '">' + element.name + '</a></li>';
        })
    //    submenu-list
        $analysis.find(".submenu-list").html(html);
    });


    // 增加 Ajax 请求的时候的加载动画页面
    $(document).ajaxStart(function() {
        /* Stuff to do when an AJAX call is started and no other AJAX calls are in progress */
        NProgress.start();
        $topContainer.css({
            opacity: "0",
            transition: "none"
        });
        $ajax.css({
            display: "flex"
        });
    });

    $(document).ajaxStop(function() {
        /* stuff to do when all AJAX calls have completed */;
        NProgress.done();
        $topContainer.css({
            opacity: "1",
            transition: "opacity 0.8s linear 0s"
        });
        $ajax.css({
            opacity: "0",
            transition: "opacity 0.8s linear 0s"
        });
        setTimeout(resetAjax,800);
    });
    
    NProgress.inc();
    //  Ajax 宽高的设置
    $ajax.width($(window).width());
    $ajax.height($(window).height());


    // back-to-top显示隐藏和减速业务的实现

    var backToTop = document.getElementById("back-to-top");
    // const pageHeight = document.documentElement.clientHeight;
    // console.log(pageHeight);


    // 将 back-to-top 的显示隐藏进行封装
    function showBackToTop(){
        backToTop.style.visibility= "visible";
    }

    function hideBackToTop(){
        backToTop.style.visibility= "hidden";
    }

    window.onscroll = function(){
        var backHeight = document.documentElement.scrollTop;
        if(backHeight > 0){
            showBackToTop();
            $(backToTop).css({
                opacity: "1",
            });      
        }else{
            $(backToTop).css({
                opacity: "0",
            });
            setTimeout(hideBackToTop, 1000);
        }
    }

    // 鼠标点击业务
    const $search = $("#search");
    const placeholder = $search.prop("placeholder");

    $search.on("focus",function(){
        $(this).prop("placeholder","");
    }).on("blur",function(){
        $(this).prop("placeholder", placeholder);
    })

    function backTop(){
        let backHeight = document.documentElement.scrollTop;
        console.log(backHeight); 
        let speed = backHeight / 5;
        if(speed < 10){
            clearInterval(window.timer);
        }
        document.documentElement.scrollTop = backHeight - speed;
    }

    backToTop.onclick = function(){
        window.timer = setInterval(backTop,80);
    }
    // $(backToTop).find("span").on("click",function(){
    //     window.timer = setInterval(backTop,50);
    // });
});
