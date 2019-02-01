var container = null;
$(function(){
    var $container = $(".container");
    var $homeSlide = $(".home-slide");
    var $imageList = $(".docker li");
    var $button = $(".button");
    var $contentTitle = $(".content-title");

    var height = 82;

    // Lecture 内容的展示
    //创建对象来利用对象保存哈希表中的内容

    //relative-position：相对于起点的位置
    //target: 目标位置
    //offset: 需要移动的高度
    //direction: 方向，up,down and null

    var LectureHash = function(relative_position,target){
        this.relative_position = relative_position;
        this.target = target;
        this.update_data = function(target,flag){
            // flag = true 表示需要更新relative-position
            if(flag === true){
                this.relative_position = this.target;
            }
            this.target = target;
            step = this.target - this.relative_position;
            this.offset = Math.abs(step * height);
            this.direction = null;
            if(step > 0){
                this.direction = "down";
            }
            if(step < 0){
                this.direction = "up";
            }
        };
        this.update_data(this.target,false);
    }


    var lecture_hash = {
        week_1: new LectureHash(0,0),
        week_2: new LectureHash(0,0),
        week_3: new LectureHash(0,0),
        week_4: new LectureHash(0,0),
        week_5: new LectureHash(0,0),
        week_6: new LectureHash(0,0),
        week_7: new LectureHash(0,0),
        week_8: new LectureHash(0,0)
    };

    $contentTitle.on("click",function(){
        var $this = $(this);
        var index = $this.index();
        var upOffset = index * height;
        var downOffset = (7 - index) * height;
        var $detailContent = $this.find(".detail-content");
        $detailContent[0].classList.remove("hidden");
        $detailContent.css({
            opacity:1.0,
            transition:"all 2s linear 0s"
        });
        $this.css({
            transform: "translateY(-" + upOffset + "px)",
            transition: "transform 2s linear 0s"
        });
        for(var i = index - 1; i >= 0; i--){
            $contentTitle.eq(i).css({
                transform: "translateY(-" + upOffset + "px) scale(0.0)",
                opacity: 0,
                transition: "transform 2s linear 0s,opacity 2s linear 0s"
            })
        }
        for(var i = index + 1; i <= 7; i++){
            $contentTitle.eq(i).css({
                transform: "translateY(" + downOffset + "px) scale(0.0)",
                opacity: 0,
                transition: "transform 2s linear 0s,opacity 2s linear 0s"
            })
        }
    })
});