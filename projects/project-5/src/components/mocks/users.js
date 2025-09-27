import nft1 from '../../assets/images/nft1.png'

export const usersMock = 
[
    {
        _id: '0xc0E384Be7B79C',
        username: 'Animakid',
        bio: 'The internet`s friendliest designer kid.',
        followers: 750,
        stats:
        {
            volume: 250,
            sold: 17
        },
        nfts:
        [
            {
                title: 'Distant Galaxy',
                price: '1.63 ETH',
                highestBid: '0.33 wETH',
                imageUrl: nft1,
            }
        ]
    }
]