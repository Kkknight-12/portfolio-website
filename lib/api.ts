import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from '@/hooks/use-toast';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your_secure_api_key';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important for cookies
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});
