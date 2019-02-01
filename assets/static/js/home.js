var container = null;
$(function(){
    var $rightBar = $(".right-bar");
    $rightBar.css({top:"250px"});
    var $prevImage = $(".image-prev");
    var $nextImage = $(".image-next");
    var $homeImage = $(".home-slide .image");
    var $homeSlide = $(".home-slide");
    var $imageList = $(".docker li");
    var $slideImages = $(".home-slide img");


    var width = $(window).width();
    var imageWidth = width * 3 / 7;
    var imageHeight = imageWidth * 0.618;
    $homeSlide.css({
        width: imageWidth + "px",
        height: imageHeight + "px"
    });
    //调整图片格式
    $slideImages.css({
        width: $homeImage.width() + "px",
        height: $homeImage.height() + "px"
    });

    // $(".right-bar").css("transform","scale(" + $(window).width() * 2 / 7 / $(".right-bar").width() + ")")
    $(".right-bar").css("right","0px");

    var image_hash = {
        first:{
            next: "fifth",
            prev: "second"
        },
        second:{
            next: "first",
            prev: "third"
        },
        third:{
            next: "second",
            prev: "fourth"
        },
        fourth:{
            next: "third",
            prev: "fifth"
        },
        fifth:{
            next: "fourth",
            prev: "first"
        }
    };
    var index_hash = {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5
    };
    var height = 0;

    // 格式化
    $homeSlide.css("left",(document.body.offsetWidth - $homeSlide[0].offsetWidth)/2 + "px");
    // Home的业务逻辑
    // 图片滑窗
    // 下一张图片
    $nextImage.on("click",function(){
            var now_ =  $homeSlide[0].dataset.current;
            var prev_ = image_hash[now_]["prev"];
            $homeSlide[0].dataset.current = prev_;
            $homeImage.each((index,item) =>{
                var current = item.dataset.current;
                var next = image_hash[current]["next"];
                item.classList.replace(current,next);
                item.dataset.current = next;
            });
            var current = $homeSlide[0].dataset.current;
            var prev = image_hash[current]["next"];
            var currentIndex = index_hash[current];
            var prevIndex = index_hash[prev];
            $imageList.eq(currentIndex - 1)[0].classList.add("current");
            $imageList.eq(prevIndex - 1)[0].classList.remove("current");
        }
    );
    //上一张图片
    $prevImage.on("click",function(){
            var now_ =  $homeSlide[0].dataset.current;
            var next_ = image_hash[now_]["next"];
            $homeSlide[0].dataset.current = next_;
            $homeImage.each((index,item) =>{
                var current = item.dataset.current;
                var prev = image_hash[current]["prev"];
                item.classList.replace(current,prev);
                item.dataset.current = prev;
            });
            var current = $homeSlide[0].dataset.current;
            var next = image_hash[current]["prev"];
            var currentIndex = index_hash[current];
            var nextIndex = index_hash[next];
            $imageList.eq(currentIndex - 1)[0].classList.add("current");
            $imageList.eq(nextIndex - 1)[0].classList.remove("current");
        }
    );
    $homeSlide.on("mouseleave",function(){
        window.timer = setInterval(function () {
            $nextImage.trigger("click");
        },3000);
    }).on("mouseover",function(){
        if(window.timer){
            clearInterval(window.timer);
        }
    });
    $homeSlide.trigger("mouseleave");
    $imageList.on("click",function(){
        var target =  $(this).index() + 1;
        var current = index_hash[$homeSlide[0].dataset.current];
        var step = target - current;
        console.log(step);
        while(step > 0){
            step --;
            $nextImage.trigger("click");
        }
        while(step < 0){
            step ++;
            $prevImage.trigger("click");
        }
    });
    //    监控收缩的时候的宽度。等比例改变高度，同时监控图片滑窗的宽高
    var $mainRight = $(".main-right");
    var $main = $(".main");
    var monitorHeight = function (){
        var scale = $mainRight.width() / 400;
        $main.css("transform","scale(" + scale + ")");
    };
    setInterval(monitorHeight,800);
});