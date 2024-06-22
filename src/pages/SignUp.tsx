import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Link,
  Slide,
  TextField
} from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'

import CodeApi from '@/api/Code'
import UserApi from '@/api/User'
import logo from '@/assets/logo.svg'
import Message from '@/utils/message'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const SignUp = () => {
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
  const [checked, setChecked] = useState(false)
  const [open, setOpen] = useState(false)
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

  const signup = async () => {
    const data = await UserApi.signup(email, password, code)
    if (data.status === 409) {
      setEmailHasError(true)
      setEmailHelperText('Email already exists')
      Message.error({ content: 'Email already exists', duration: 2000 })
      return
    }
    if (data.status === 400) {
      setCodeHasError(true)
      setCodeHelperText('Invalid verification code')
      Message.error({ content: 'Invalid verification code', duration: 2000 })
      return
    }
    Message.success({ content: 'Sign up successfully', duration: 2000 })
    navigate(from ?? '/home')
  }

  const sendCode = async () => {
    const data = await CodeApi.sendCode(email)
    if (data.status === 400) {
      Message.error({
        content: 'Code has been already sent, please retry in 5 minutes',
        duration: 2000
      })
    }
    Message.success({ content: 'Verification code sent', duration: 2000 })
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
              disabled={sendCodeDisabled}
              onClick={sendCode}
            >
              {sendCodeText}
            </Button>
          </Box>
          <TextField
            label='Password'
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
            label='Confirm Password'
            variant='outlined'
            type='password'
            autoComplete='new-password'
            fullWidth
            value={retypePassword}
            onChange={onRetypePasswordChange}
            helperText={retypePasswordHelperText}
            error={retypePasswordHasError}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={checked}
            onChange={() => setChecked(checked => !checked)}
            label={
              <span onClick={e => e.preventDefault()}>
                I accept the{' '}
                <Link>
                  <i onClick={() => setOpen(true)}>Terms and Conditions</i>
                </Link>
              </span>
            }
            sx={{ alignSelf: 'flex-start' }}
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
              !checked ||
              !email ||
              !password ||
              !retypePassword
            }
            onClick={signup}
          >
            Sign up
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false)
              setChecked(false)
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              setChecked(true)
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default React.memo(SignUp)
