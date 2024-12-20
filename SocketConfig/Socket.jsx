import io from 'socket.io-client'
import { SERVER_URL } from '../../siteConfig'
export const socket = io(SERVER_URL, {
    reconnectionAttempts: 5, // Number of reconnection attempts
    reconnectionDelay: 1000, // Delay in milliseconds between reconnection attempts
});
