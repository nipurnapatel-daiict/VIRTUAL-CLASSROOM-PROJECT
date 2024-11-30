import React from 'react';
import '../styles/Chat.css';

const ChatInput = () => {
    return (
        <div className="main_message_container">
            <input id="chat_message" type="text" placeholder="Type message here..." />
        </div>
    );
};

export default ChatInput;
