import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState([]);

    useEffect(() => {
        // Listen for responses from the server
        socket.on('response', (data) => {
            setResponse(data.data);  // Update state with the server response
        });

        return () => {
            socket.off('response');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('send_message', { message });  // Emit the message when the button is clicked
        setMessage('');  // Clear the input after sending
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Simple WebSocket Client</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <div style={{ marginTop: '20px' }}>
                <h3>Response from Server:</h3>
                <p>response.map</p>
            </div>
        </div>
    );
}

export default App;
