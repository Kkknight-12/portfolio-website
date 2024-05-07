'use client'

import animate from '@/components/canvas/index'
import React, { useEffect, useRef } from 'react'

interface CanvasComponentProps {
  children?: React.ReactNode
}

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Your canvas code goes here
    canvas.width = window.innerWidth
    canvas.height = document.body.scrollHeight

    console.log(ctx)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, 'white')
    gradient.addColorStop(0.5, 'gold')
    gradient.addColorStop(1, 'orangered')
    ctx.fillStyle = gradient
    ctx.strokeStyle = 'white'

    //
    console.log('animate before')
    animate(canvas, ctx)
    console.log('animate after')
  }, [])

  console.log('canvas')
  return (
    <canvas
      style={{
        position: 'absolute', // 'absolute' will take the canvas out of the document flow
        zIndex: -1, // behind all elements with z-index: 0 or greater
        pointerEvents: 'none', // ensures the canvas doesn't block interactions
        top: 0, // these four lines ensure the canvas covers the entire parent
        left: 0,
        // width: '100% !important',
      }}
      ref={canvasRef}
    />
  )
}

export default CanvasComponent
