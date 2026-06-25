// src/services/api.js
import axios from 'axios';

// Aquí pones la URL pública de tu Load Balancer de AWS
// Si mañana cambias de servidor, solo cambias esta línea.
const API_URL = "http://a16880a62dc0b4df6839bc9d52bcefa2-1297125742.us-east-1.elb.amazonaws.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
