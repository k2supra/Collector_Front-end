import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import multer from 'multer'

// const cloudinary = require('./cloudinary.js')
// const upload = multer({dest: 'uploads/'})

const app = express()
app.use(cors())
app.use(express.json())

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password: String,
        bio: String,
        followers: Number,
        stats:
        {
            volume: Number,
            sold: Number,
        },
        nfts:
        {
            type:[
                {
                    title: String,
                    price: String,
                    highestBid: String,
                    imageUrl: String,
                }
            ],
            default: []
        }
    }
)

const User = mongoose.model('User', userSchema)

async function fixUsers() {
    try {
        const result = await User.updateMany(
            { $or: [{ nfts: { $exists: false } }, { nfts: null }, { nfts: { $not: { $type: "array" } } }] },
            { $set: { nfts: [] } }
        );
        console.log("Updated users:", result.modifiedCount);
    } catch (err) {
      console.error(err);
    }
  }

mongoose.connect('mongodb+srv://andrijkorolevic:jnYZ86UggByb0cDC@testcluster.8jrno.mongodb.net/NFTApp?retryWrites=true&w=majority&appName=TestCluster')
.then(() => {console.log("MongoDB connected"); fixUsers()})
.catch(err => console.error(err))

app.post('/register', async (req, res) =>
{
    try
    {
        const {username, email, password} = req.body;
        const existing = await User.findOne({email})
        if (existing) {
            return res.status(400).json({error: 'User already exists'})
        }

        const user = new User({username, email, password})
        await user.save()
        res.json(user)
    }
    catch(err)
    {
        res.status(500).json({error: err.message})
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })
    res.json(user)
})

app.get('/artist-page/:id', async (req, res)=>
{
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

app.post('/artist-page/:id/nfts', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).json({ error: 'User not found' })
  
      const { title, price, highestBid, imageUrl } = req.body
      const newNFT = { title, price, highestBid, imageUrl }
  
      user.nfts.push(newNFT)
      await user.save()
  
      res.json(newNFT)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

// app.post('/nft/add', upload.single('image'), async (req, res)=>
// {
//     try {
//         const {userId, title, price} = req.body;

//         const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'nft_images'
//         })
        
//         const user = await User.findById(userId);
//         if(!user) return res.status(404).json({error: 'User not found'});
        
//         user.nfts.push(
//             {
//                 title,
//                 price,
//                 imageUrl: result.secure_url
//             }
//         );

//         await user.save()

//         res.json({message: 'NFT added', nfts: user.nfts})
//     } catch (err) {
//         res.status(500).json({error: err.message})
//     }
// })

app.listen(5000, '0.0.0.0', () => console.log("Server running on http://192.168.1.16:5000"))