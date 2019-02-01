$(function () {
    NProgress.inc();
    var $mainTitle = $(".main-title");
    var $mainContent = $(".main-content");
    var url = null;
    if(location.search){
        url = "http://39.107.99.64:1221/api/analysis/content/" + location.search + "&callback=?";
    }
    else{
        url = "http://39.107.99.64:1221/api/analysis/content/?&callback=?";
    }
    function refreshLecture (url) {
        $.getJSON(url, (data) => {
            if (data[0]) {
                $mainTitle.text(data[0].name);
                let html= converter.makeHtml(data[0].content);
                $mainContent.html(html);
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
    url = "http://39.107.99.64:1221/api/analysis/?&callback=?";
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
            url = "http://39.107.99.64:1221/api/analysis/content/?" + query + "&callback=?";
            refreshLecture(url);
        })
    });
    const $main = $(".main-container");
    const $img = $main.find("img");
    const length = $img.length;
    for(let i = 0; i++; i< length){
        try{
            const element = $img[i];
            const $this = $(element);
            const left = ($main.width() - $this.width())/2;
            $this.css({
                position: "relative",
                left: left + "px"
            });
        }
        catch(e){
            console.log(e);
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