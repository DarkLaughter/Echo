import React, {useState, useEffect} from 'react'
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
// import TextContainer from '../TextContainer/TextContainer' 

import queryString from 'query-string'
import io from 'socket.io-client';
import './chat.css'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')  
    const [messages, setMessages] = useState([])    
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const  { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT);
        setName(name)
        setRoom(room)

        socket.emit('join',  {name, room }, () => {

        });

    return () => {
        socket.emit('disconnect')
        socket.off();
    }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }

    }
    console.log(message, messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} />
                <Messages className="scroll" messages={messages} name={name}/>
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage} />
            </div>
            {/* <TextContainer users={users} /> */}
        </div>
    )
}

export default Chat
