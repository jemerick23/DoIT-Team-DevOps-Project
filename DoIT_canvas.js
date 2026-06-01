const canvas = document.getElementById("myCanvas"); //Initializes canvas
const ctx = canvas.getContext("2d");

function draw() { //Draws rounded rectangle
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Background
    ctx.fillStyle = "#6F95BD";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Rounded Rectangle dimensions
    const rectWidth = 1180;
    const rectHeight = 820;

    //This helps to center the rounded rectangle
    const rectX = (canvas.width - rectWidth) / 2;
    const rectY = (canvas.height - rectHeight) / 2;

    //This is the color of the rounded rectangle
    ctx.fillStyle = "white";

    //This begins the path to draw the rounded rectangle
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 80);
    ctx.fill();
}

//This calls the draw() function
window.addEventListener("resize", draw);
draw();