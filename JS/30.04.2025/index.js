const toggler = document.querySelector(".toggler input");
function getLang() {
    toggler.checked = localStorage.getItem("lang") == "en" ? true : false;
}
getLang()
function setLang() {
    const lang = event.target.checked ? "en" : "ua";
    localStorage.setItem("lang", lang)
}

const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", ()=>
{
    event.preventDefault()
    document.cookie = `${form.querySelector("input").value}:${form.querySelectorAll("input")[1].value}`;
    form.reset();
})

const reset = document.getElementById("reset");
reset.addEventListener("click", ()=>
{
    localStorage.clear();
    document.cookie = null;
})

const cameraTask = document.querySelector(".task");
const btn = cameraTask.querySelector("button");
const canvas = cameraTask.querySelector("canvas");
const video = cameraTask.querySelector("video");
const videoRecorded = cameraTask.querySelector("#recorded");
const img = cameraTask.querySelector("img");
const ctx = canvas.getContext("2d");
const record = cameraTask.querySelector("#record");

btn.addEventListener("click", ()=>
{
    navigator.mediaDevices.getUserMedia(
        {
            video: true
        }
    ).then(stream => 
    {
        video.srcObject = stream;
        setTimeout(() => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }, 3000);
    }
    )
    .catch(er => alert("Error", er));
})

record.addEventListener("click", ()=>
{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();

            const chunks = [];
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                const videoURL = URL.createObjectURL(blob);
                videoRecorded.src = videoURL;
                videoRecorded.controls = true;
            };

            recorder.start();

            setTimeout(() => {
                recorder.stop();
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }, 5000);
        })
        .catch(er => alert("Error: " + er));
})
