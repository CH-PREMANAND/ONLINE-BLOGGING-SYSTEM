import React from 'react';
import { styled } from '@mui/system';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  CssBaseline,
  Container,
} from '@mui/material';
import { Lock } from '@mui/icons-material';
import backgroundImage from './login.jpg'; // Replace with your actual background image
import axios from 'axios';
import { useNavigate } from 'react-router';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const StyledForm = styled('form')({
  width: '300px',
  padding: '20px',
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
    transform: 'scale(1.02)',
  },
});

const StyledCheckbox = styled(Checkbox)({
  marginLeft: 8,
  color: '#8B4513',
});

const LoginButton = styled(Button)({
  position: 'relative',
  backgroundColor: '#8B4513',
  borderColor: '#8B4513',
  color: '#fff',
  fontWeight: 'bold',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#A0522D',
    borderColor: '#A0522D',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    border: '2px solid #00ff00',
    borderRadius: 16,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover::before': {
    opacity: 1,
  },
});

const SignUpLink = styled(Link)({
  color: '#3498db',
  '&:hover': {
    color: '#2980b9',
  },
});

const WebText = styled(Typography)({
  textAlign: 'center',
  color: '#8B4513',
  marginBottom: 16,
  fontSize: 36,
  fontFamily: 'Arial, sans-serif',
  letterSpacing: 1,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
});

const StyledInput = styled(TextField)({
  height: 48,
  background: '#f5f5f5',
});

const StyledPasswordInput = styled(TextField)({
  height: 48,
  background: '#f5f5f5',
});

const Login = () => {
  const navigate = useNavigate();

  const openNotification = (type, message) => {
    // Your notification logic here
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8081/login', values, { withCredentials: true });
      console.log(response);
      navigate('/h');
      openNotification('success', 'You have successfully logged in!');
    } catch (error) {
      console.error('Login failed:', error.message);
      if (error.response) {
        console.log(error.response.data);
        openNotification('error', 'Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <StyledContainer>
      <CssBaseline />
      <StyledForm
        name="login-form"
        initialValues={{ remember: true }}
        onSubmit={onFinish}
      >
        <WebText variant="h2">Login to BlogPedia</WebText>
        <StyledInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <StyledPasswordInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<StyledCheckbox value="remember" color="primary" />}
          label="Remember me"
        />
        <LoginButton
          href="/h"
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<Lock />}
        >
          Log In
        </LoginButton>
        <Typography>
          Don't have an account? <SignUpLink href="/signup">Click here to sign up</SignUpLink>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
};

export default Login;
