import { createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_PORT;

export const fetchMarketplaceForSale = createAsyncThunk(
    'user/fetchMarketplaceForSale',
    async (_, {rejectWithValue})=>
    {
        try {
            const res = await fetch(`${API_URL}:${PORT}/fetch-marketplace-for-sale`)
            const data = await res.json()
            if(!res.ok) return rejectWithValue(data?.error || 'Server error');
            return data;
        } catch (err) {
            return rejectWithValue({error: err.message})
        }
    }
)