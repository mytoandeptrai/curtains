/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/utils/const'
import { type Socket, io } from 'socket.io-client'

const log = (message: string, level: 'success' | 'info' | 'error' | 'warn' = 'info') => {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`

  switch (level) {
    case 'success':
      console.log(`\x1b[32m${formattedMessage}\x1b[0m`)
      break
    case 'info':
      console.log(`\x1b[36m${formattedMessage}\x1b[0m`)
      break
    case 'error':
      console.error(`\x1b[31m${formattedMessage}\x1b[0m`)
      break
    case 'warn':
      console.warn(`\x1b[33m${formattedMessage}\x1b[0m`)
      break
    default:
      console.log(formattedMessage)
  }
}

class SocketService {
  private socket: Socket | null = null

  connect() {
    if (!this.socket) {
      this.socket = io(env.SOCKET_URL)
      log(`Socket connected to ${env.SOCKET_URL}`, 'success')
      this.socket.on('connect', () => {
        log(`Socket connection established, ID: ${this.socket?.id}`, 'success')
      })
      this.socket.on('connect_error', (error) => {
        log(`Socket connection error: ${error.message}`, 'error')
      })

      this.registerEventListeners()
    } else {
      log(`Socket is already connected`, 'warn')
    }
  }

  private registerEventListeners() {
    if (!this.socket) return

    this.socket.on('bet-placed', (data) => {
      log(`BET PLACED: ${JSON.stringify(data, null, 2)}`, 'success')
    })

    this.socket.on('stats', (data) => {
      log(`Stats: ${JSON.stringify(data, null, 2)}`, 'info')
    })

    this.socket.on('pong', (data) => {
      log(`Pong: ${JSON.stringify(data, null, 2)}`, 'info')
    })
  }

  disconnect() {
    if (this.socket) {
      log(`Disconnecting socket, ID: ${this.socket.id}`, 'info')
      this.socket.removeAllListeners()
      this.socket.disconnect()
      this.socket = null
      log(`Socket disconnected`, 'success')
    } else {
      log(`Cannot disconnect: Socket is not connected`, 'warn')
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      log(`Subscribing to event: ${event}`, 'info')
      this.socket.on(event, (data) => {
        log(`Received event: ${event}, Data: ${JSON.stringify(data, null, 2)}`, 'info')
        callback(data)
      })
      log(`ra ra - Successfully subscribed to event: ${event}`, 'success')
    } else {
      log(`Cannot subscribe to event "${event}": Socket is not connected`, 'warn')
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      log(`Emitting event: ${event}, Data: ${JSON.stringify(data, null, 2)}`, 'info')
      this.socket.emit(event, data)
    } else {
      log(`Cannot emit event "${event}": Socket is not connected`, 'warn')
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      log(`Unsubscribing from event: ${event}`, 'info')
      if (callback) {
        this.socket.off(event, callback)
      } else {
        this.socket.off(event)
      }
      log(`Successfully unsubscribed from event: ${event}`, 'success')
    } else {
      log(`Cannot unsubscribe from event "${event}": Socket is not connected`, 'warn')
    }
  }
}

const socketService = new SocketService()
export default socketService
