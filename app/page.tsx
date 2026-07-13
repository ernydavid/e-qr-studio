'use client'

import Chatbot from '@/components/chatbot'
import React, { MutableRefObject, useRef, useState } from 'react'
import { QRCode, IProps } from 'react-qrcode-logo'

export default function GenerateQRCode () {
  const [text, setText] = useState('')
  const qrRef = useRef<QRCode | undefined>(undefined)

  const handleDownloadQR = () => {
    qrRef.current?.download('webp', 'QR-Code.webp')
  }

  const props: IProps = {
    eyeRadius:
      // [
      //   {
      //     inner: [25, 0, 0, 0],
      //     outer: [35, 0, 0, 0]
      //   },
      //   {
      //     inner: [0, 25, 0, 0],
      //     outer: [0, 35, 0, 0]
      //   },
      //   {
      //     inner: [0, 0, 0, 25],
      //     outer: [0, 0, 0, 35]
      //   }
      // ]
      [
        {
          inner: [0, 0, 0, 0],
          outer: [0, 0, 0, 0]
        },
        {
          inner: [0, 0, 0, 0],
          outer: [0, 0, 0, 0]
        },
        {
          inner: [0, 0, 0, 0],
          outer: [0, 0, 0, 0]
        }
      ],
    eyeColor: [
      {
        inner: '#000',
        outer: '#000'
      },
      {
        inner: '#000',
        outer: '#000'
      },
      {
        inner: '#000',
        outer: '#000'
      }
    ]
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Generar Código QR</h1>
      <input
        type='text'
        placeholder='Introduce texto o URL'
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '80%',
          maxWidth: '400px'
        }}
      />
      {text && (
        <div style={{ marginTop: '20px' }}>
          <QRCode
            {...props}
            ref={qrRef as MutableRefObject<QRCode>}
            value={text}
            ecLevel='H'
            size={400} // Tamaño del QR
            qrStyle='dots'
            fgColor='#333'
            quietZone={25}
            style={{
              borderRadius: '40px'
            }}
            // logoImage='/icon.svg'
            // logoHeight={100}
            // logoWidth={100}
            // logoPaddingStyle='circle'
          />
          <button onClick={handleDownloadQR}>
            Download Qr
          </button>
        </div>
      )}
    </div>
  )
}
