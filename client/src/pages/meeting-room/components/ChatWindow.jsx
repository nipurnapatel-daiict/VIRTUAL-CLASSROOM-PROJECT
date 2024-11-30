import React from 'react';
import '../styles/Chat.css';
import ChatInput from './ChatInput';

const ChatWindow = () => {
    return (
        <>
            <div className="main_header">
                <h6>Chat</h6>
            </div>
            <div className="main_chat_window">
                <ul className="messages"></ul>
            </div>
            <ChatInput />
        </>
    );
};

export default ChatWindow;
