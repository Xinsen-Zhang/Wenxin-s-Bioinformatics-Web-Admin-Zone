$(function(){

    const params = location.search.split("?")[1].split("&");

    let index = 0;
    if(params[index].indexOf("field") === -1){
        index = 1 - index;
    }

    const field = params[index] + "Content";
    const query = params[1 - index];
    const url = `http://39.107.99.64:1221/admin/api/content?${field}&${query}&callback=?`;
    $.getJSON(url,function(json){
        let name = json.data[0].name;
        let content = json.data[0].content;
        content = "# " + name + "\n" + content;


        var simplemde = new SimpleMDE({
            spellChecker: false,
            autofocus: true,
            autoDownloadFontAwesome: false,
            autosave: {
                enabled: true,
                uniqueId: "demo",
                delay: 1000,
            },
            tabSize: 4,
            status: false,
            lineWrapping: false,
            renderingConfig: {
                codeSyntaxHighlighting: true
            }
        });

        simplemde.value(content);

        $(".save").on("click",function(){
            var testPlain = simplemde.value();
            // testMarkdown = simplemde.markdown(testPlain);
            var temp = testPlain.split('\n');
            var temp2 = temp.splice(0,1);
            temp2 = temp2[0].split("#")[1];
            data = {field: field,
                    query: query,
                    name: temp2,
                    content: temp.join("\n")};
            $.post("/admin/api/update",data,function(json){
                console.log(json);
		if(json.success === true){
		    alert("the content has been successfully saved");
		}
            });
        })

    });

    

    // var testPlain = simplemde.value(), 
    // testMarkdown = simplemde.markdown(testPlain);

// simplemde.toggleSideBySide()//打开实时全屏预览
});
