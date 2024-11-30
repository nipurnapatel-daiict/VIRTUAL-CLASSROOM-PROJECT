import React from 'react';
import '../styles/controllss.css';

const Controls = () => {
    const muteUnmute = () => console.log("Mute/Unmute clicked");
    const playStop = () => console.log("Play/Stop clicked");

    return (
        <div className="main_controllers">
            {/* Leftmost block: Mute and Stop Video */}
            <div className="main_controls_block">
                <div onClick={muteUnmute} className="main_controls_button main_mute_button">
                    <i className="fas fa-microphone"></i>
                    <span>Mute</span>
                </div>
                <div onClick={playStop} className="main_controls_button main_video_button">
                    <i className="fas fa-video"></i>
                    <span>Stop Video</span>
                </div>
            </div>

            {/* Middle block: Security, Participants, Chat */}
            <div className="main_controls_block middle">
                <div className="main_controls_button">
                    <i className="fas fa-shield-alt"></i>
                    <span>Security</span>
                </div>
                <div className="main_controls_button">
                    <i className="fas fa-user-friends"></i>
                    <span>Participants</span>
                </div>
                <div className="main_controls_button">
                    <i className="fas fa-comment-alt"></i>
                    <span>Chat</span>
                </div>
            </div>

            {/* Rightmost block: Leave Meeting */}
            <div className="main_controls_block">
                <div className="main_controls_button">
                    <span className="leave_meeting">Leave Meeting</span>
                </div>
            </div>
        </div>
    );
};

export default Controls;
