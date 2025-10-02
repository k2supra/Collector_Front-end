import { createSlice } from '@reduxjs/toolkit'
import { fetchFullUser } from './fetchFullUser';
import { fetchBalance } from './fetchBalance'
import { fetchMarketplaceForSale } from './fetchMarketplaceForSale';

export const userSlice = createSlice(
    {
        name: 'user',
        initialState: 
        {
            currentUser: JSON.parse(localStorage.getItem('NFTuser')) || null,
            fullUser: null,
            balance: 0,
            marketplace: null,
            loading: false,
            error: null,
        },
        reducers:
        {
            setUser: (state, action)=>
            {
                const {username, _id} = action.payload
                state.currentUser = {username, _id};
                localStorage.setItem('NFTuser', JSON.stringify(state.currentUser))
            },
            logout: (state)=>
            {
                state.currentUser = null;
                localStorage.removeItem('NFTuser')
            },
            updateNFTS: (state, action)=>
            {
                state.fullUser.nfts.created.push(action.payload)
            },
            updateUser:(state, action)=>
            {
                state.fullUser.username = action.payload.username
                state.fullUser.bio = action.payload.bio
                state.fullUser.avatarUrl = action.payload.avatarUrl
            },
            setBalance:(state, action)=>
            {
                state.balance = action.payload.balance
            },
        },
        extraReducers:(builder)=>
        {
            builder
            .addCase(fetchFullUser.pending, (state)=>
            {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchFullUser.rejected, (state, action)=>
            {
                state.error = action.payload?.error || action.error.message;
                state.loading = false;
            })
            .addCase(fetchFullUser.fulfilled, (state, action)=>
            {
                state.fullUser = action.payload;
                state.loading = false;
            })
            .addCase(fetchBalance.pending, (state)=>
            {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchBalance.rejected, (state, action)=>
            {
                state.error = action.payload?.error || action.error.message;
                state.loading = false;
            })
            .addCase(fetchBalance.fulfilled, (state, action)=>
            {
                state.balance = action.payload;
            })
            .addCase(fetchMarketplaceForSale.pending, (state)=>
            {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchMarketplaceForSale.rejected, (state, action)=>
            {
                state.error = action.payload?.error || action.error.message;
                state.loading = false;
            })
            .addCase(fetchMarketplaceForSale.fulfilled, (state, action)=>
            {
                state.marketplace = action.payload;
            })
        }
    }
)

export const {setUser, logout, updateNFTS, updateUser, setBalance} = userSlice.actions;
export default userSlice.reducer