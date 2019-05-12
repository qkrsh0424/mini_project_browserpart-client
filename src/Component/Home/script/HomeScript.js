var i = 0;
function change() {
    var doc = document.getElementById("background");
    var numR = 72;
    var numG = 225;
    var boolR = true;
    var boolG = true;
    var color = [];

    for(var m = 0;m<152;m++){
        var str = 'rgb('+numR+','+numG+',245)';
        color[m] = str;
        numR=numR+1;
    }
    for(var m = 152;m<225;m++){
        var str = 'rgb('+numR+','+numG+',245)';
        color[m] = str;
        numG=numG-1;
    }
    for(var m = 225;m<328;m++){
        var str = 'rgb('+numR+','+numG+',245)';
        color[m] = str;
        numG=numG+1;
    }
    for(var m = 328;m<480;m++){
        var str = 'rgb('+numR+','+numG+',245)';
        color[m] = str;
        numR=numR-1;
    }

    // for(var m = 0 ;m<480;m++){
    //     var str = 'rgb('+numR+','+numG+',245)';
    //     color[m] = str;
    //     if(boolR==true&&boolG==true){
    //         numR++;
    //         if(numR==224){
    //
    //         }
    //     }else if(){
    //
    //     }
    // }
    doc.style.backgroundColor = color[i];
    i = (i + 1) % color.length;
}
setInterval(change, 15);