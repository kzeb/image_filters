function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image')
                .attr('src', e.target.result)
                .width(0)
                .height(0);
        };
        reader.readAsDataURL(input.files[0]);
    }
    colorFilter(0, 0, 0);
}

function download(){
    var download = document.getElementById("download");
    var image = document.getElementById("canvas2").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

function colorFilter(a, b, c){
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("canvas2");
    var ctx = canvas.getContext('2d');
    var ctx2 = canvas2.getContext('2d');
    var image = new MarvinImage();
    image.load(document.getElementById("image").src, imageLoaded);
        function imageLoaded() {
        var imageOut = new MarvinImage(image.getWidth(), image.getHeight());
        Marvin.colorChannel(image, imageOut, a, b, c);
        ctx2.canvas.width = image.getWidth();
        ctx2.canvas.height = image.getHeight();
        imageOut.draw(canvas2);
        if(image.getWidth()>1000 || image.getHeight()>1000) {
            ctx.canvas.width = image.getWidth()/4;
            ctx.canvas.height = image.getHeight()/4;
            Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        }else if(image.getWidth()>600 || image.getHeight()>600){
            ctx.canvas.width = image.getWidth()/2;
            ctx.canvas.height = image.getHeight()/2;
            Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        }else{
            ctx.canvas.width = image.getWidth();
            ctx.canvas.height = image.getHeight();
            Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        }
        // Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        imageOut.draw(canvas);
    }
}

function gray(){
    var canvas = document.getElementById("canvas");
    var image = new MarvinImage();
    image.load(document.getElementById("image").src, imageLoaded);
    function imageLoaded() {
        var imageOut = new MarvinImage(image.getWidth(), image.getHeight());
        Marvin.grayScale(image, imageOut);
        Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        imageOut.draw(canvas);
    }
}

function invert(){
    var canvas = document.getElementById("canvas");
    var image = new MarvinImage();
    image.load(document.getElementById("image").src, imageLoaded);
    function imageLoaded() {
        var imageOut = new MarvinImage(image.getWidth(), image.getHeight());
        Marvin.invertColors(image, imageOut);
        Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        imageOut.draw(canvas);
    }
}

function brightness(){
    var canvas = document.getElementById("canvas");
    var image = new MarvinImage();
    image.load(document.getElementById("image").src, imageLoaded);
    function imageLoaded() {
        var value = prompt("Please enter how much you want to brighten the image: ", 100);
        var imageOut = new MarvinImage(image.getWidth(), image.getHeight());
        Marvin.colorChannel(image, imageOut, value, value, value);
        Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        imageOut.draw(canvas);
    }
}

function contrast(){
    var canvas = document.getElementById("canvas");
    var image = new MarvinImage();
    image.load(document.getElementById("image").src, imageLoaded);
    function imageLoaded() {
        var value = parseInt(prompt("Please enter contrast of the image: ", 100));
        var imageOut = new MarvinImage(image.getWidth(), image.getHeight());
        Marvin.brightnessAndContrast(image, imageOut, 0, value);
        Marvin.scale(imageOut.clone(), imageOut, canvas.width, canvas.height);
        imageOut.draw(canvas);
    }
}

function wycz() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}