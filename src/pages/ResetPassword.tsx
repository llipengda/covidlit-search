import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Box, Button, Container, TextField } from '@mui/material'

import CodeApi from '@/api/Code'
import UserApi from '@/api/User'
import logo from '@/assets/logo.svg'
import Message from '@/utils/message'

const ResetPassword = () => {
  const from = useSearchParams()[0].get('from')

  const navigate = useNavigate()

  const [emailHasError, setEmailHasError] = useState(false)
  const [codeHasError, setCodeHasError] = useState(false)
  const [codeHelperText, setCodeHelperText] = useState('')
  const [code, setCode] = useState('')
  const [emailHelperText, setEmailHelperText] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState(false)
  const [retypePasswordHasError, setRetypePasswordHasError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const [retypePasswordHelperText, setRetypePasswordHelperText] = useState('')
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [sendCodeDisabled, setSendCodeDisabled] = useState(false)
  const [sendCodeText, setSendCodeText] = useState('Send')

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmail(e.target.value)
    if (!regex.test(e.target.value)) {
      setEmailHasError(true)
      setEmailHelperText('Invalid email address')
      return
    }
    setEmailHasError(false)
    setEmailHelperText('')
  }

  const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
    if (e.target.value.length !== 6) {
      setCodeHasError(true)
      setCodeHelperText('Invalid verification code')
      return
    }
    setCodeHasError(false)
    setCodeHelperText('')
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordHasError(true)
      setPasswordHelperText('Password must be at least 8 characters long')
      return
    }
    if (retypePassword && e.target.value !== retypePassword) {
      setRetypePasswordHasError(true)
      setRetypePasswordHelperText('Passwords do not match')
      return
    }
    setRetypePasswordHasError(false)
    setRetypePasswordHelperText('')
    setPasswordHasError(false)
    setPasswordHelperText('')
  }

  const onRetypePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetypePassword(e.target.value)
    if (e.target.value !== password) {
      setRetypePasswordHasError(true)
      setRetypePasswordHelperText('Passwords do not match')
      return
    }
    setRetypePasswordHasError(false)
    setRetypePasswordHelperText('')
  }

  const reset = async () => {
    const data = await UserApi.updatePasswordByCode(email, code, password)
    if (data.status === 401) {
      setCodeHasError(true)
      setCodeHelperText('Invalid verification code')
      Message.error('Invalid verification code', 5000)
      return
    }
    Message.success('Reset password successfully', 5000)
    navigate(from ?? '/home')
  }

  const sendCode = async () => {
    const data = await CodeApi.sendCode(email)
    if (data.status === 400) {
      Message.error(
        'Code has been already sent, please retry in 5 minutes',
        5000
      )
      return
    }
    Message.success('Verification code sent', 5000)
    setSendCodeDisabled(true)
    setSendCodeText('300s')
    if (intervalId) {
      clearInterval(intervalId)
    }
    setIntervalId(
      setInterval(() => {
        setSendCodeText(prev => {
          if (prev === '0s' || prev === 'Send') {
            clearInterval(intervalId as NodeJS.Timeout)
            setSendCodeDisabled(false)
            return 'Send'
          }
          return `${parseInt(prev.substring(0)) - 1}s`
        })
      }, 1000)
    )
  }

  return (
    <Container maxWidth='xl'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        mt='40px'
        flexDirection='column'
      >
        <Box component='img' src={logo} width='10%' />
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          gap='20px'
          width='30%'
          mt='20px'
        >
          <TextField
            label='Email address'
            variant='outlined'
            type='email'
            error={emailHasError}
            helperText={emailHelperText}
            value={email}
            onChange={onEmailChange}
            fullWidth
          />
          <Box width='100%' position='relative'>
            <TextField
              label='Verification Code'
              variant='outlined'
              type='text'
              autoComplete='off'
              error={codeHasError}
              helperText={codeHelperText}
              value={code}
              onChange={onCodeChange}
              fullWidth
            />
            <Button
              variant='contained'
              sx={{
                position: 'absolute',
                right: '10px',
                top: codeHasError ? 'calc(50% - 10px)' : '50%',
                transform: 'translateY(-50%)'
              }}
              disabled={sendCodeDisabled || !email}
              onClick={sendCode}
            >
              {sendCodeText}
            </Button>
          </Box>
          <TextField
            label='New Password'
            variant='outlined'
            type='password'
            autoComplete='new-password'
            value={password}
            onChange={onPasswordChange}
            fullWidth
            helperText={passwordHelperText}
            error={passwordHasError}
          />
          <TextField
            label='Confirm New Password'
            variant='outlined'
            type='password'
            autoComplete='new-password'
            fullWidth
            value={retypePassword}
            onChange={onRetypePasswordChange}
            helperText={retypePasswordHelperText}
            error={retypePasswordHasError}
          />
          <Button
            variant='contained'
            fullWidth
            disabled={
              emailHasError ||
              codeHasError ||
              passwordHasError ||
              retypePasswordHasError ||
              !code ||
              !email ||
              !password ||
              !retypePassword
            }
            onClick={reset}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default React.memo(ResetPassword)
