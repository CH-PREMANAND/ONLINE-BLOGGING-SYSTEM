import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  ThumbUpOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
  MoreVertOutlined,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NavBar from './navbar';

const BlogFeed = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchBlogFeed = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:8081/api/feed';
      const params = {};
      if (sortBy) {
        params.sortBy = sortBy;
      }
      if (searchQuery) {
        params.search = searchQuery;
      }
      const response = await axios.get(url, { params });
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog feed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogFeed();
  }, [sortBy, searchQuery]);

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:8081/api/blog/${postId}/like`);
      const updatedPosts = blogPosts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      setBlogPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking blog post:', error);
    }
  };

  const handleComment = async (postId) => {
    // Handle comment logic
  };

  const handleShare = async (postId) => {
    // Handle share logic
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleMenuClick = ({ key }) => {
    setSortBy(key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <MenuItem key="date">Sort by Date</MenuItem>
      <MenuItem key="likes">Sort by Likes</MenuItem>
    </Menu>
  );

  const handleBlogClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <>
      <NavBar />
      <Container>
        <Container style={{ padding: '24px' }}>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={8}>
              <Paper component="form">
                <InputBase
                  placeholder="Search posts"
                  onChange={(e) => handleSearch(e.target.value)}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                onClick={(e) => setSortBy(e.currentTarget)}
                endIcon={<MoreVertOutlined />}
              >
                Sort By
              </Button>
              <Menu
                anchorEl={sortBy}
                open={Boolean(sortBy)}
                onClose={() => setSortBy(null)}
              >
                <MenuItem onClick={() => handleMenuClick({ key: 'date' })}>
                  Sort by Date
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick({ key: 'likes' })}>
                  Sort by Likes
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <List>
            {blogPosts.map((post) => (
              <ListItem key={post._id}>
                <Card>
                  <ListItemAvatar>
                    <Avatar src={post.author.avatarUrl} alt={post.author.username} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        <RouterLink to={`/blog/${post._id}`}>{post.title}</RouterLink>
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="subtitle2" color="textSecondary">
                          By: {post.author.username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {post.content}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton onClick={() => handleLike(post._id)}>
                    <ThumbUpOutlined />
                    <Typography variant="caption">{post.likes}</Typography>
                  </IconButton>
                  <IconButton onClick={() => handleComment(post._id)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleShare(post._id)}>
                    <ShareOutlined />
                  </IconButton>
                </Card>
              </ListItem>
            ))}
          </List>
          {loading && <CircularProgress />}
        </Container>
      </Container>
    </>
  );
};

export default BlogFeed;
