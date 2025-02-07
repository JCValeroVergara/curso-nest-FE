import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities';
import { Repository } from 'typeorm';


interface ConnectedClient {
    
    [id: string]: {
        socket: Socket,
        user: User
    };
}

@Injectable()
export class MessagesWsService {

    private connectedClients: ConnectedClient = {};

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async registerClient(client: Socket, userId: string) {

        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) throw new Error('User not found');
        if (!user.isActive) throw new Error('User is not active');

        this.checkUsetConnection(user);

        this.connectedClients[client.id] = { socket: client, user };
    }


    removeClient(clienId: string) {
        delete this.connectedClients[clienId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients)
    }

    getUserFullName(socketId: string) {
        return this.connectedClients[socketId].user.fullName;
    }

    private checkUsetConnection(user: User) {
        
        for( const clientId of Object.keys(this.connectedClients)) {
            
            const connetedClient = this.connectedClients[clientId];
            if (connetedClient.user.id === user.id) {
                connetedClient.socket.disconnect();
                break;
            }
        }
    }
}
