import React from "react";
import VideoGrid from "../components/VideoGrid";
import Controls from "../components/Controls";
import ChatWindow from "../components/ChatWindow";
// import ChatInput from "../components/ChatInput";
import '../styles/Video-room.css';

const VideoRoom = () => {
    return (
        <div className="main">
            <div className="main_left">
                <div className="main_videos">
                    <div id="video-grid">
                        <VideoGrid />
                    </div>
                </div>

                <div className="main_controls">
                    <Controls />
                </div>
            </div>

            <div className="main_right">
                <div className="main_chat_window">
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
};

export default VideoRoom;
