import React from 'react';
import { styled } from '@mui/system';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  CssBaseline,
} from '@mui/material';
import { AccountCircle, Lock, Email } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './signup.jpg';

// Styled components for better readability
const SignupContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: `url(${backgroundImage}) center/cover no-repeat`,
});

const SignupForm = styled('form')({
  maxWidth: '400px',
  width: '100%',
  padding: '30px',
  background: '#f5e2ca',
  borderRadius: '16px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',

  '&:hover': {
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
    transform: 'scale(1.02)',
  },
});

const CustomInput = styled(TextField)({
  height: '48px',
});

const CustomPasswordInput = styled(TextField)({
  height: '48px',
});

const SignupButton = styled(Button)({
  backgroundColor: '#8B4513',
  borderColor: '#8B4513',
  color: '#fff',
  fontWeight: 'bold',

  '&:hover': {
    backgroundColor: '#A0522D',
    borderColor: '#A0522D',
  },
});

const StyledLink = styled(Link)({
  color: '#3498db',
  '&:hover': {
    color: '#2980b9',
  },
});

const BlockbusterText = styled(Typography)({
  textAlign: 'center',
  color: '#8B4513',
  marginBottom: '16px',
  fontSize: '36px',
  fontFamily: 'Georgia, serif',
  letterSpacing: '1px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      // Log the signup request data for debugging
      console.log('Sending signup request with data:', formData);

      // Send the signup request to the server
      await axios.post('http://localhost:8081/signup', formData, { withCredentials: true });

      // Log success and navigate to login page
      console.log('Signup successful');
      navigate('/login');
    } catch (error) {
      // Log and handle signup failure
      console.error('Signup failed:', error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve form data from the event target
    const formData = new FormData(event.target);

    // Create an object from the FormData for easier manipulation
    const dataObject = {};
    formData.forEach((value, key) => {
      dataObject[key] = value;
    });

    // Call the handleSignup function with the data object
    handleSignup(dataObject);
  };

  return (
    <SignupContainer>
      <CssBaseline />
      <SignupForm name="signup-form" onSubmit={handleSubmit}>
        <BlockbusterText>Sign Up for BlogPedia</BlockbusterText>
        <CustomInput
          variant="outlined"
          fullWidth
          required
          margin="normal"
          id="username"
          label="Username"
          name="username"
          InputProps={{
            startAdornment: <AccountCircle style={{ color: '#8B4513' }} />,
          }}
        />
        <CustomInput
          variant="outlined"
          fullWidth
          required
          margin="normal"
          id="email"
          label="Email"
          name="email"
          InputProps={{
            startAdornment: <Email style={{ color: '#8B4513' }} />,
          }}
        />
        <CustomPasswordInput
          variant="outlined"
          fullWidth
          required
          margin="normal"
          id="password"
          label="Password"
          name="password"
          type="password"
          InputProps={{
            startAdornment: <Lock style={{ color: '#8B4513' }} />,
          }}
        />
        <SignupButton type="submit" fullWidth variant="contained">
          Sign Up
        </SignupButton>
        <Typography>
          Already have an account? <StyledLink href="/login">Sign in</StyledLink>
        </Typography>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;
