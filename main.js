model_status="";
input_value="";
canvas="";
objects=[];
percent="";
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

function modelLoaded()
{
    console.log("model loaded");
    model_status="true";
}

function draw()
{
    image(video, 0,0,300, 300);

    if(model_status!="")
    {
        object_detector.detect(video, gotResult);
        for(i=0;i<objects.length;i++)
        {
            percent=floor(objects[i].confidence*100);
      fill("purple");
      text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y );
      noFill();
      stroke("purple");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label==input_value)
        {
            video.stop(); 
            object_detector.detect(gotResult);
            document.getElementById("status").innerHTML="status =" +input_value+" found!";
            synth=window.speechSynthesis;
            utterThis=new SpeechSynthesisUtterance( input_value +" found !!");
            synth.speak(utterThis);

        }
        else
        {
         document.getElementById("status").innerHTML="status = "+ input_value+" not found";
        }
        }
    }
}

function gotResult(error, results)
{
 if(error)
 {
    console.error();
 }
 else
 {
    console.log(results);
    objects=results;

 }
}

   