var container = null;
$(function(){
    var $audio = $(".audio audio");
    var $control = $("#control");
    var $info = $(".info");
    var $search = $(".search input");
    var $menu = $('.menu');
    var $topMenu = $(".top-menu");
    var $menu_index = $('.menu-index');
    var $expansion = $(".expansion");
    var $subitem = $(".sub-item");
    var $container = $(".container");
    var $button = $(".button");

    var color_hash = {
        index_1:"#f00",
        index_2:"#FFE800",
        index_3: "#00ff3d",
        index_4: "#a5d9ee",
        index_5: "#ff8600"
    };
    // // 格式化
    $topMenu.css("marginLeft",document.body.offsetWidth - $topMenu[0].offsetWidth + "px");
    // $homeSlide.css("left",(document.body.offsetWidth - $homeSlide[0].offsetWidth)/2 + "px");
    // //处理音乐播放的业务逻辑
    function checkAudioStatus() {
        $audio[0].paused ? $control[0].classList.add("icon-jingyin") : $control[0].classList.add("icon-yinpinaudio47");
    }
    setInterval(checkAudioStatus,1000);
    $control.on("click",()=>{
        switch_control();
        $audio[0].paused?$audio[0].play():$audio[0].pause();
    })

    function switch_control(){
        $control[0].classList.toggle("icon-jingyin");
        $control[0].classList.toggle("icon-yinpinaudio47");
    }

    //使用 jsonp 进行跨域的数据传输.处理天气等业务逻辑
    function weather_jsonp(){
        $.getJSON("http://39.107.99.64:1221/weather?callback=?",function(data){
            $info.find(".date").text(data.date);
            $info.find(".weather").text(data.weather);
        });
    }
    weather_jsonp();
    // 搜索栏的业务逻辑
    $search.on("focus",()=>{
        $search.prop("placeholder","");
    }).on("blur",()=> {
        $search.prop("placeholder","请输入搜索内容");
    });

    // 主菜单栏业务
    $menu.each(function(index, item){
        var color = color_hash["index_" + (index + 1)];
        var $item = $(item);
        $item.on("mouseleave",function(){
            $menu_index.eq(index).css({color:"#fff"});
            $menu_index.eq(index).css({
                opacity:0,
                transition:"opacity 0.8s linear"
            });
            var element = $expansion.eq(index)[0];
            element.classList.add("icon-zhankai");
            element.classList.remove("icon-zhankai2");
            $item.find(".submenu").hide(600);
        });
        $container.eq(index).on("mouseover",function(){
            $menu_index.eq(index).css({color});
            $menu_index.eq(index).css({
                opacity:1,
                transition:"opacity 0.8s linear"
            });
            var element = $expansion.eq(index)[0];
            element.classList.add("icon-zhankai2");
            element.classList.remove("icon-zhankai1");
            $item.find(".submenu").show(600);
            var $this = $(this);
            $this.css({boxShadow:"rgba(0,0,0,0.3) 1px 1px 1px 1px"});
            $this.css({textShadow:"rgba(0,0,0,0.3) 3px 1px 1px"});
        }).on("mouseleave",function(){
            var $this = $(this);
            $this.css({boxShadow:"none"});
            $this.css({textShadow:"none"});
        })
    });
    // 子菜单栏业务逻辑
    $subitem.each((index, item) =>{
        var $item = $(item);
        $item.on("mouseover",function(){
            var $this = $(this);
            $this.css({boxShadow:"rgba(0,0,0,0.3) 1px 1px 1px 1px"});
            $this.css({textShadow:"rgba(0,0,0,0.3) 3px 1px 1px"});
            $this.parent().parent().find(".container").css(
                {textShadow:"rgba(0,0,0,0.3) 3px 1px 1px"}
            );
        }).on("mouseleave",function(){
            var $this = $(this);
            $this.css({boxShadow:"none"});
            $this.css({textShadow:"none"});
            $this.parent().parent().find(".container").css(
                {textShadow:"none"}
            );
        })
    });
    $button.on("click", function(){
        alert("Oppps,some problem has occoured, please ignore the login and register module");
        return false;
    })
});