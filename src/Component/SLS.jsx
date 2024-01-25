import React from "react";

const SLS = () => {
 
    const recordCode = () => {
  var video = document.querySelector(".recording");
  // var output = document.querySelector(".output"); // Commented out as it is not being used
  // var anc = document.querySelector(".download-anc"); // Commented out as it is not being used
  var start = document.querySelector(".start-btn");
  var stop = document.querySelector(".stop-btn");

  var data = [];

  var recording = navigator.mediaDevices
    .getDisplayMedia({
      video: {
        mediaSource: "screen",
      },
      audio: true,
    })
    .then(async (e) => {
      // For recording the mic audio
      let audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      // Assign the recorded mediastream to the src object
      video.srcObject = e;

      // Combine both video/audio stream with MediaStream object
      let combine = new MediaStream([...e.getTracks(), ...audio.getTracks()]);

      /* Record the captured mediastream 
        with MediaRecorder constructor */
      let recorder = new MediaRecorder(combine);

      start.addEventListener("click", (e) => {
        // Starts the recording when clicked
        recorder.start();
        alert("recording started");

        // For a fresh start
        data = [];
      });

      stop.addEventListener("click", (e) => {
        // Stops the recording
        recorder.stop();
        alert("recording stopped");
      });

      /* Push the recorded data to data array 
        when data available */
      recorder.ondataavailable = (e) => {
        data.push(e.data);
      };

    });

    return data
};

return (
  <>
    <div style={{ float: "left" }}>
      <video className="recording" autoPlay muted width="500px" height="500px"></video>
    </div>
    <button type="button" onClick={recordCode}>Stop Recording</button>
  </>
);
//   );
};

export default SLS;
