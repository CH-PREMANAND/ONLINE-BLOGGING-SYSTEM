import React, { useState } from 'react';
import {
  Input,
  Button,
  Typography,
  Select,
  MenuItem,
  CssBaseline,
  Container,
  styled,
} from '@mui/material';
import { Inbox } from '@mui/icons-material';
import axios from 'axios';
import NavBar from './navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Dragger = styled('div')(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:hover': {
    border: `2px dashed ${theme.palette.primary.dark}`,
  },
}));

const BlogPage = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    tags: '',
    privacy: 'public',
    media: null,
  });

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, media: file });
    alert(`${file.name} uploaded successfully.`);
  };

  const handleBlogSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', blogData.title);

      // Convert HTML content to plain text
      const plainTextContent = new DOMParser().parseFromString(
        blogData.content,
        'text/html'
      ).documentElement.textContent;
      formData.append('content', plainTextContent);

      formData.append('tags', blogData.tags);
      formData.append('privacy', blogData.privacy);
      formData.append('author', 'Replace with actual author');

      if (blogData.media) {
        formData.append('media', blogData.media);
      }

      await axios.post('http://localhost:8081/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Blog post submitted successfully');
    } catch (error) {
      console.error('Error submitting blog post:', error);
      alert('Failed to submit blog post. Please try again.');
    }
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="md" style={{ margin: 'auto', padding: '20px' }}>
        <Typography variant="h4" align="center" style={{ marginBottom: '20px', color: '#333' }}>
          Create a New Blog
        </Typography>

        <Input
          placeholder="Enter blog title"
          style={{ marginBottom: '10px' }}
          value={blogData.title}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
        />

        <ReactQuill
          value={blogData.content}
          onChange={(content) => setBlogData({ ...blogData, content })}
          style={{ marginBottom: '10px' }}
        />

        <Input
          placeholder="Enter tags (comma-separated)"
          style={{ marginBottom: '10px' }}
          value={blogData.tags}
          onChange={(e) => setBlogData({ ...blogData, tags: e.target.value })}
        />

        <Select
          value={blogData.privacy}
          onChange={(e) => setBlogData({ ...blogData, privacy: e.target.value })}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>

        <Dragger>
          <label htmlFor="media-upload" style={{ cursor: 'pointer' }}>
            <Inbox style={{ fontSize: '36px', color: '#1890ff' }} />
            <Typography variant="subtitle1" style={{ color: '#1890ff' }}>
              Click or drag media file to this area to upload
            </Typography>
          </label>
          <Input
            id="media-upload"
            type="file"
            accept="image/*,video/*,audio/*"
            style={{ display: 'none' }}
            onChange={handleMediaUpload}
          />
        </Dragger>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBlogSubmit}
          style={{ width: '100%', maxWidth: '200px' }}
        >
          Submit Blog
        </Button>
      </Container>
    </>
  );
};

export default BlogPage;
