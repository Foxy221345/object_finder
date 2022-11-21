model_status="";
input_value="";
canvas="";
function setup()
{
    canvas=createCanvas(300,300)
    canvas.center();

    video=createCapture(VIDEO);
    video.size(300,300);
    video.hide();
}

function start()
{
    object_detector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="status = detecting objects";

    input_value=document.getElementById("object_input").value;
}

function modeLoaded()
{
    console.log("model loaded");
    model_status="true";
}

function draw()
{
    image(video, 0,0,300, 300);
}