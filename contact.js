import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import NavBar from './navbar';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic here
  };

  return (
    <Container>
      <NavBar />
      <Container style={{ padding: '50px 0px 0px' }}>
        <Container maxWidth="md" style={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Contact Us</Typography>
          <Typography>
            If you have any questions or inquiries, feel free to contact us using the form below.
          </Typography>
        </Container>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                required
                placeholder="Enter your name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                required
                type="email"
                placeholder="Enter your email"
              />
            </Grid>
          </Grid>
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            placeholder="Enter your message"
            style={{ marginTop: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Submit
          </Button>
        </form>
      </Container>
    </Container>
  );
};

export default Contact;
