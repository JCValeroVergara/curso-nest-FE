import { connetToServer } from './socket-client'
import './style.css'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
        <h2> Websocket - Client </h2>
        <br/>
        <input id="jwt-token" placeholder="Json Web Token" />
        <button id="btn-connect">Connect</button>

        <br/>
        <span id="server-status">offLine</span>

        <ul id="clients-ul"></ul>

        <br/>
        <form id="message-form">
            <input type="text" id="message-input" />
        </form>

        <h3>Messages</h3>
        <ul id="messages-ul"></ul>

    </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// connetToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

    if (jwtToken.value.trim().length <= 0) return alert('Token is required');
    connetToServer(jwtToken.value);
});