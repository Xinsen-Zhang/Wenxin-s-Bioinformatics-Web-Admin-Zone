$(function () {
    NProgress.inc();
    var $mainTitle = $(".main-title");
    var $mainContent = $(".main-content");
    var converter = new showdown.Converter();
    var url = null;
    if(location.search){
        url = "http://39.107.99.64:1221/api/lectures/content/" + location.search + "&callback=?";
    }
    else{
        url = "http://39.107.99.64:1221/api/lectures/content/?&callback=?";
    }
    function refreshLecture (url) {
        $.getJSON(url, (data) => {
            if (data[0]) {
                $mainTitle.text(data[0].name);
                let html= converter.makeHtml(data[0].content);
                html.replace(/"/g,"'");
                $mainContent.html(html);
                // setTimeout(centeredImage(),800);
            }
            else {
                $mainTitle.text("query params are invalid");
                $mainContent.text("");
            }
            NProgress.inc();
        });
    }
    refreshLecture(url);
//    使用ajax更新左侧目录
    $ulContent = $("ul.content");
    var html = "<li>Content</li>";
//    <li><a href="?<%= element.query%>"> <%= element.time + " " + element.name%> </a></li>
    url = "http://39.107.99.64:1221/api/lectures/?&callback=?";
    $.getJSON(url,function(data){
        data.forEach((element,index) => {
            html += '<li><a href="/lecture?' + element.query + '"> '  + element.name  +' </a></li>';
        });
        $ulContent.html(html);
        //    使用Ajax更新正文内容
        var $a = $ulContent.find("a");
        $a.on("click",function(event){
            event.preventDefault();
            var href = $(this).prop("href");
            var query = href.split("?")[1];
            $("#back-to-top").trigger("click");
            url = "http://39.107.99.64:1221/api/lectures/content/?" + query + "&callback=?";
            refreshLecture(url);
        });
    });
    function centeredImage(){
        var $main = $(".main-container");
        console.log($main[0]);
        var $img = $main.find("img");
        console.log($img[0]);
        var len = $img.length;
        console.log(len);
        for(var i = 0; i< len; i++){
            console.log(i);
            var element = $img[i];
            var $this = $(element);
            $this.css("position","relative");
            var left = ($main.width() - $this.width())/2;
            $this.css("left",left + "px");
        }
    }

    $(document).on("scroll",function(){
        let supHeight = $(".main-container").height() -  $(".main-left").height();
        let topPx1 = $(window).scrollTop();
        if(topPx1 < supHeight){
        $(".main-left").css("margin-top",topPx1 + "px");
        }
    });

    NProgress.inc();

});