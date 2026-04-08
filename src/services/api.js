import axios from "axios";

const api = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api", 
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("USER_LOGIN") 
    ? JSON.parse(localStorage.getItem("USER_LOGIN")) 
    : null;

  config.headers = {
    ...config.headers,
    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM", 
  };

  if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
  }

  return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MiIsIkhldEhhblN0cmluZyI6IjE4LzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4OTY4OTYwMDAwMCIsIm5iZiI6MTc2MTMyNTIwMCwiZXhwIjoxNzg5ODM3MjAwfQ.wzN71RMWnzxytkHIOECJCmKqVyDD-AylZWuEairOdiM"