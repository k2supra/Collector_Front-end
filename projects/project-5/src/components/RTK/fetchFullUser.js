import { createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

export const fetchFullUser = createAsyncThunk(
    'user/fetchFullUser',
    async (userId, {rejectWithValue})=>
    {
        console.log(API_URL);
        
        try {
            const res = await fetch(`${API_URL}:${PORT}/artist-page/${userId}`)
            const data = await res.json()
            if(!res.ok) return rejectWithValue(data);
            return data;
        } catch (err) {
            return rejectWithValue({error: err.message})
        }
    }
)