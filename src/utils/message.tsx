import React from 'react'
import ReactDOM from 'react-dom/client'

import { Alert, Snackbar } from '@mui/material'

function CMessage({
  content,
  duration,
  type
}: {
  content: React.ReactNode
  duration: number
  type: 'success' | 'error' | 'warning'
}) {
  const [open, setOpen] = React.useState(true)
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setOpen(false)}
    >
      <Alert severity={type}>{content}</Alert>
    </Snackbar>
  )
}

const Message = {
  success(content: React.ReactNode, duration: number) {
    const dom = document.createElement('div')
    const JSXdom = (
      <CMessage content={content} duration={duration} type='success'></CMessage>
    )
    ReactDOM.createRoot(dom).render(JSXdom)
    document.body.appendChild(dom)
  },

  error(content: React.ReactNode, duration: number) {
    const dom = document.createElement('div')
    const JSXdom = (
      <CMessage content={content} duration={duration} type='error'></CMessage>
    )
    ReactDOM.createRoot(dom).render(JSXdom)
    document.body.appendChild(dom)
  },

  warning(content: React.ReactNode, duration: number) {
    const dom = document.createElement('div')
    const JSXdom = (
      <CMessage content={content} duration={duration} type='warning'></CMessage>
    )
    ReactDOM.createRoot(dom).render(JSXdom)
    document.body.appendChild(dom)
  },

  info(content: React.ReactNode, duration: number) {
    const dom = document.createElement('div')
    const JSXdom = (
      <CMessage content={content} duration={duration} type='warning'></CMessage>
    )
    ReactDOM.createRoot(dom).render(JSXdom)
    document.body.appendChild(dom)
  }
}

export default Message
