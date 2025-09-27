import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFullUser = createAsyncThunk(
    'user/fetchFullUser',
    async (userId, {rejectWithValue})=>
    {
        try {
            const res = await fetch(`http://192.168.1.16:5000/artist-page/${userId}`)
            const data = await res.json()
            if(!res.ok) return rejectWithValue(data);
            return data;
        } catch (err) {
            return rejectWithValue({error: err.message})
        }
    }
)