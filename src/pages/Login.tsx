import React, { useState } from 'react'
import { Link as RLink, useNavigate, useSearchParams } from 'react-router-dom'

import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@mui/material'

import UserApi from '@/api/User'
import logo from '@/assets/logo.svg'
import Message from '@/utils/message'

const Login = () => {
  const from = useSearchParams()[0].get('from')

  const navigate = useNavigate()

  const [hasError, setHasError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')

  const [emailHasValue, setEmailHasValue] = useState(false)
  const [passwordHasValue, setPasswordHasValue] = useState(false)
  const makeAnimationStartHandler =
    (stateSetter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.AnimationEvent<HTMLInputElement>) => {
      const autoFilled = !!(e.target as any)?.matches('*:-webkit-autofill')
      if (e.animationName === 'mui-auto-fill') {
        stateSetter(autoFilled)
      }

      if (e.animationName === 'mui-auto-fill-cancel') {
        stateSetter(autoFilled)
      }
    }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmail(e.target.value)
    if (!regex.test(e.target.value)) {
      setHasError(true)
      setHelperText('Invalid email address')
      return
    }
    setHasError(false)
    setHelperText('')
  }

  const login = async () => {
    const data = await UserApi.login(email, password)
    if (data.status === 401) {
      setHasError(true)
      setPasswordHasError(true)
      setHelperText('Invalid email or password')
      setPasswordHelperText('Invalid email or password')
      Message.error({ content: 'Invalid email or password', duration: 2000 })
      return
    }
    navigate(from ?? '/home')
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 8) {
      setPasswordHasError(true)
      setPasswordHelperText('Password must be at least 8 characters long')
      return
    }
    if (helperText === 'Invalid email or password') {
      setHasError(false)
      setHelperText('')
    }
    setPasswordHasError(false)
    setPasswordHelperText('')
  }

  return (
    <Container maxWidth='xl'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        mt='100px'
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
            autoComplete='off'
            error={hasError}
            helperText={helperText}
            value={email}
            onChange={onEmailChange}
            inputProps={{
              onAnimationStart: makeAnimationStartHandler(setEmailHasValue)
            }}
            InputLabelProps={{
              shrink: emailHasValue || !!email
            }}
            fullWidth
          />
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            autoComplete='off'
            value={password}
            onChange={onPasswordChange}
            fullWidth
            error={hasError}
            helperText={passwordHelperText}
            inputProps={{
              onAnimationStart: makeAnimationStartHandler(setPasswordHasValue)
            }}
            InputLabelProps={{
              shrink: passwordHasValue || !!password
            }}
          />
          <Button
            variant='contained'
            fullWidth
            disabled={hasError || passwordHasError || !email || !password}
            onClick={login}
          >
            Log in
          </Button>
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Typography variant='body2'>
              <Link>Forgot password?</Link>
            </Typography>
            <Typography variant='body2'>
              <RLink
                to={`/signup?from=${window.location.pathname}`}
                title='Sign up'
              >
                <Link>Sign up</Link>
              </RLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default React.memo(Login)
