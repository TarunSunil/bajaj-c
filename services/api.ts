import axios from 'axios';
import { Doctor } from '../types/doctor';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('API_URL environment variable is not defined');
}

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await axios.get(API_URL);
    if (!response.data) {
      throw new Error('No data received from API');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
}; 