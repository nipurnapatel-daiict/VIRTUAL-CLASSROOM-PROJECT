const chatInputBox = document.getElementById("chat_message");
const all_messages = document.getElementById("all_messages");
const main__chat__window = document.getElementById("main__chat__window");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");

myVideo.muted = true;

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream, "me");

}).catch((err) => {
    console.error("Error accessing media devices.", err);
});

const addVideoStream = (videoE1, stream, uId = "") => {
    videoE1.srcObject = stream;
    videoE1.id = uId;

    videoE1.addEventListener("loadedmetadata", () => {
        videoE1.play();
    });

    videoGrid.append(videoE1);

    let totalUsers = document.getElementsByName("video").length;
    if (totalUsers > 1) {
        for (let index = 0; index < totalUsers; index++) {
            document.getElementsByTagName("video")[index].style.width = 100 / totalUsers + "%";
        }
    }
}