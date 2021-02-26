var canvas, context;
var star_img = new Image();
var isDraggable = false;

var currentX = 0;
var currentY = 0;
var currentMouseX = 0;
var currentMouseY = 0;
var radius = 140;

let savedFlag = false;

const saveBtn = document.getElementById("save");

if(saveBtn){
    saveBtn.addEventListener('click', () => {
        if(context) {
            console.log('click');
            var dataURL = canvas.toDataURL();
            downloadImage(dataURL, 'my-canvas.jpeg');
            savedFlag = true;
        }
    });
}

// Save | Download image
function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
     
    currentX = canvas.width/2;
    currentY = canvas.height/2;  
    
    context.beginPath();
    context.arc(currentX, currentY, radius, 0, 2 * Math.PI, false);
    context.closePath();
    context.clip();

    canvas.addEventListener("touchstart", handleStart)
    canvas.addEventListener("touchmove", handleMove)
    canvas.addEventListener("touchend", handleEnd)

    if(savedFlag) {
        star_img.src = "C:\\Users\\geran\\Downloads.my-canvas.jpeg"
    } else {
        star_img.src = "GirlDrawing.jpg";
    }
    star_img.onload = function() {
        _Go();
    };
  };
  
function _Go() {
_MouseEvents();

setInterval(function() {
    _ResetCanvas();
    _DrawImage();
}, 1000/30);
}
function _ResetCanvas() {
context.fillStyle = '#fff';
context.fillRect(0,0, canvas.width, canvas.height);
}
function _MouseEvents() {
canvas.onmousedown = function(e) {

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;


    if (mouseX >= (currentX - star_img.width/2) &&
        mouseX <= (currentX + star_img.width/2) &&
        mouseY >= (currentY - star_img.height/2) &&
        mouseY <= (currentY + star_img.height/2)) {
        isDraggable = true;
    //currentX = mouseX;
    //currentY = mouseY;
    }
};
canvas.onmousemove = function(e) {

    if (isDraggable) {
        currentMouseX = e.pageX - this.offsetLeft;
        currentMouseY = e.pageY - this.offsetLeft;
    }
};
canvas.onmouseup = function(e) {
    isDraggable = false;

};
canvas.onmouseout = function(e) {
    isDraggable = false;

};
}

//Mobile touch handlers
function handleStart(e) {

    var mouseX = e.touches[0].pageX - this.offsetLeft;
    var mouseY = e.touches[0].pageY - this.offsetTop;


    if (mouseX >= (currentX - star_img.width/2) &&
        mouseX <= (currentX + star_img.width/2) &&
        mouseY >= (currentY - star_img.height/2) &&
        mouseY <= (currentY + star_img.height/2)) {
        isDraggable = true;
    //currentX = mouseX;
    //currentY = mouseY;
    }
};
function handleMove(e) {

    if (isDraggable) {
        currentMouseX = e.touches[0].pageX - this.offsetLeft;
        currentMouseY = e.touches[0].pageY - this.offsetLeft;
    }
};
 function handleEnd(e) {
    isDraggable = false;

};

function _DrawImage() {

context.drawImage(star_img, currentMouseX-(star_img.width/2), currentMouseY-(star_img.height/2));

}