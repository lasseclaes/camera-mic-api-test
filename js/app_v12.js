//fra https://blog.prototypr.io/make-a-camera-web-app-tutorial-part-1-ec284af8dddf

// Set constraints for the video stream
alert ("v12");
var userConstraints = { video: { facingMode: "user" }, audio: false };
var rearConstraints = { audio: false, video: { facingMode: { exact: "environment" } } };

var constraints;

var selfie = true;
//var constraints = { audio: false, facingMode: { exact: "environment" } };

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    alert ("camera started");
    if(selfie === true){
      constraints = rearConstraints;
      selfie = false;
    }
    else{
      constraints = userConstraints;
      selfie = true;
    }

    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
    //console.log(navigator.mediaDevices.getUserMedia(constraints));
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    alert ("camera triggered");
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
//window.addEventListener("load", cameraStart, false);
//document.addEventListener()
window.addEventListener("load", init, false);

function init(){
  document.getElementById('toggle-camera').addEventListener("click", function(){cameraStart()});
}
