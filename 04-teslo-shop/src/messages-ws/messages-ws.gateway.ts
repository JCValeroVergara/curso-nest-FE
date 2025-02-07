import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;

    constructor(
        private readonly messagesWsService: MessagesWsService,
        private jwtService: JwtService
    ) { }
    
    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authentication as string;
        let payload: JwtPayload;

        try {
            payload = this.jwtService.verify(token);
            await this.messagesWsService.registerClient(client, payload.id);
        } catch (error) {
            client.disconnect();
            return;
        }

        // console.log({ payload });
        // console.log('Client connected', client.id);
        
        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    async handleDisconnect(client: Socket) {
        // console.log('Client disconnected', client.id);
        this.messagesWsService.removeClient(client.id);

        this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
    }

    @SubscribeMessage('message-from-client')
    async handleMessageFromClient(client: Socket, payload: NewMessageDto) { 
        //* Emite únicamente al cliente que envió el mensaje
        // client.emit( 'message-from-server', { fullName: 'Soy Yo', message: payload.message || 'no message' });

        //* Emite a todos los clientes conectados, menos al que envió el mensaje
        // client.broadcast.emit('message-from-server', { fullName: 'Soy Yo', message: payload.message || 'no message' });

        //* Emite a todos los clientes conectados
        this.wss.emit('message-from-server', {
            fullName: this.messagesWsService.getUserFullName(client.id),
            message: payload.message || 'no message'
        });

    }
}
