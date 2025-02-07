import { Manager, Socket } from 'socket.io-client';


let socket: Socket;

export const connetToServer = ( token: string) => {

    const manager = new Manager('http://localhost:4000/socket.io/socket.io.js', {
        extraHeaders: {
            Authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');
    
    addListeners();
};


const addListeners = () => {
    
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerText = 'Online';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerText = 'Offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        clientsUl.innerHTML = '';
        clients.forEach(client => {
            const li = document.createElement('li');
            li.innerText = client;
            clientsUl.appendChild(li);
        });
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client',{ id: 'Yo!!', message: messageInput.value });
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string}) => {
        const li = document.createElement('li');
        li.innerText = `${payload.fullName}: ${payload.message}`;
        messagesUl.appendChild(li);
    });
};