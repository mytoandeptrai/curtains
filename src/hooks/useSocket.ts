'use client'

import { env } from '@/utils/const'
import { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CONNECTION_ESTABLISHED = 'connection-established',
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
  STATS = 'stats',
  PONG = 'pong',
  ERROR = 'error',
}

export type SocketEventParams = `${SocketEvent}`

const socket = env.SOCKET_URL
  ? io(env.SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })
  : null

export const useSocket = () => {
  const [connected, setConnected] = useState(false)

  const connect = useCallback(() => {
    if (!socket) return
    socket.connect()
  }, [])

  useEffect(() => {
    if (!socket) {
      console.warn('Socket not initialized - WS_URL is missing')
      return
    }

    const handleDisconnect = () => {
      console.log('socket disconnected')
      setConnected(false)
    }
    const handleConnect = () => {
      console.log('socket connected')
      setConnected(true)
    }

    socket.on('disconnect', handleDisconnect)
    socket.on('connect', handleConnect)

    // Set initial state if already connected
    if (socket.connected) {
      setConnected(true)
    }

    return () => {
      socket.off('disconnect', handleDisconnect)
      socket.off('connect', handleConnect)
    }
  }, [])

  const disconnect = useCallback(() => {
    if (!socket) return
    socket.disconnect()
  }, [])

  const on = useCallback(<T>(event: SocketEventParams, callback: (data: T) => void) => {
    if (!socket) return
    socket.on(event, (data: T) => {
      callback(data)
    })
  }, [])

  const off = useCallback(<T>(event: SocketEventParams, callback: (data: T) => void) => {
    if (!socket) return
    socket.off(event, callback)
  }, [])

  const subscribe = useCallback((event: SocketEventParams) => {
    if (!socket) return
    switch (event) {
      default:
        break
    }
  }, [])

  return {
    connect,
    subscribe,
    disconnect,
    on,
    off,
    connected,
  }
}
