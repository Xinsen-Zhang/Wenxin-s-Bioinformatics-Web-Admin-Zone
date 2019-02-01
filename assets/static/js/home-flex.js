$(function () {
    NProgress.inc();
    var $main = $(".main");
    var $mainLeft = $main.find(".main-left");
    var $mainMiddle = $(".main-middle");
    var $imgageSlide = $(".image-slide");
    var $prev = $(".prev");
    var $next = $(".next");
    var $docker = $(".docker");
    var $mainRight = $(".main-right");

    var autoplay =  function() {
        $next.trigger("click");
    }

    NProgress.inc();
    var width = $imgageSlide[0].offsetWidth;
//    监控收缩的时候的宽度。等比例改变高度，同时监控图片滑窗的宽高
    var monitorHeight = function (){
        var scale = $mainRight.width() / 400;
        // $main.css("transform","scale(" + scale + ")");
        var width = $imgageSlide[0].offsetWidth;
        height = $imgageSlide[0].offsetHeight;
        $imgageSlide.each(function(index,element){
            var $img = $(element).find("img");
            // console.log($img);
            $img.width(width);
            $img.height(height);
        });
    };
    setInterval(monitorHeight,100);

    //注册图片切换的点击事件
    var imageHash = {
        first:{
            prev:"second",
            next:"fifth"
        },
        second:{
            prev:"third",
            next:"first"
        },
        third:{
            prev:"fourth",
            next:"second"
        },
        fourth:{
            prev:"fifth",
            next:"third"
        },
        fifth:{
            prev:"first",
            next:"fourth"
        }
    }

    var imageIndexHash = {
        first: 0,
        second: 1,
        third: 2,
        fourth: 3,
        fifth: 4
    }

    $prev.on("click",function(){
        var current = $mainMiddle[0].dataset.current;
        current = parseInt(current);
        current = current - 1;
        if((current) < 1){
            $mainMiddle[0].dataset.current = 5;
            $docker.eq(0)[0].classList.remove("current");
            $docker.eq(4)[0].classList.add("current");
        }
        else{
            $mainMiddle[0].dataset.current = current;
            $docker.eq(current)[0].classList.remove("current");
            $docker.eq(current - 1)[0].classList.add("current");
        }
        //图片滑动效果
        $imgageSlide.each(function(index,element){
            var current = element.dataset.current;
            var new_ = imageHash[current].prev;
            element.dataset.current = new_;
            element.classList.replace(current,new_);
        })
    });

    $next.on("click",function(){
        var current = $mainMiddle[0].dataset.current;
        current = parseInt(current);
        current = current + 1;
        if((current) > 5){
            $mainMiddle[0].dataset.current = 1;
            $docker.eq(4)[0].classList.remove("current");
            $docker.eq(0)[0].classList.add("current");
        }
        else{
            $mainMiddle[0].dataset.current = current;
            $docker.eq(current - 2)[0].classList.remove("current");
            $docker.eq(current - 1)[0].classList.add("current");
        }

        $imgageSlide.each(function(index,element){
            var current = element.dataset.current;
            var new_ = imageHash[current].next;
            element.dataset.current = new_;
            element.classList.replace(current,new_);
        })
    });

    NProgress.inc();

    $mainMiddle.on("mouseover",function(){
        if(window.timer){
            clearInterval(window.timer);
        }
    }).on("mouseleave",function () {
        window.timer = setInterval(autoplay,3000);
    })

    $mainMiddle.trigger("mouseleave");

    //docker 点击事件

    $docker.on("click",function(){
        var $this = $(this);
        var index = $this.index();
        var current = $mainMiddle[0].dataset.current - 1;
        var offset = index - current;
        while(offset > 0){
            offset --;
            $next.trigger("click");
        }
        while(offset < 0){
            offset ++;
            $prev.trigger("click");
        }
    })
    NProgress.inc();
});