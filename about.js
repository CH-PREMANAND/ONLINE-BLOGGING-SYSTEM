import React from 'react';
import {
  Container,
  Typography,
  CssBaseline,
} from '@mui/material';
import NavBar from './navbar'; // Import the NavBar component

const About = () => {
  return (
    <Container>
      <CssBaseline />
      {/* NavBar */}
      <NavBar />

      <Container style={{ padding: '0 10px' }}>
        <div style={{ background: '#fff', padding: 24 }}>
          <Typography variant="h2" align="center" gutterBottom>About Us</Typography>
          <Typography paragraph>
            Welcome to BlogBuster! We are a platform dedicated to providing an exceptional blogging experience.
            Our mission is to empower individuals and businesses to share their stories, ideas, and expertise with the world.
            Whether you're a seasoned blogger or just starting out, BlogBuster offers a user-friendly interface and powerful tools to help you create, manage, and promote your content.
          </Typography>
          <Typography paragraph>
            Our team is passionate about fostering a vibrant community of writers, readers, and enthusiasts.
            We believe in the power of storytelling to inspire, educate, and entertain, and we're committed to supporting and amplifying diverse voices from around the globe.
          </Typography>
          <Typography paragraph>
            Thank you for joining us on this journey. Together, let's make the world a more connected and informed place, one blog post at a time.
          </Typography>
          <Typography paragraph>
            At BlogBuster, we strive to continuously improve our platform to better serve our users.
            We value feedback and suggestions from our community, so don't hesitate to reach out to us with any ideas or concerns.
            Your input helps shape the future of BlogBuster, and we're grateful for your support.
          </Typography>
          <Typography paragraph>
            Join us in our mission to elevate blogging to new heights and create meaningful connections through the power of words.
            Whether you're a blogger, reader, or enthusiast, there's a place for you in the BlogBuster community.
            Let's inspire, engage, and empower each other to share our stories and make a positive impact on the world.
          </Typography>
          <Typography paragraph>
            BlogBuster is more than just a platform; it's a community of passionate individuals who share a love for writing and storytelling.
            We're here to provide you with the tools and resources you need to succeed in your blogging journey.
            From tips and tutorials to networking opportunities and support, we've got you covered every step of the way.
          </Typography>
          <Typography paragraph>
            With BlogBuster, the possibilities are endless. Whether you're blogging for fun, profit, or personal growth, we're here to help you reach your goals and unleash your creativity.
            Join us today and become part of a thriving community of bloggers who are making a difference in the world, one post at a time.
          </Typography>
        </div>
      </Container>
    </Container>
  );
};

export default About;
