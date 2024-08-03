const INIT_Spritesheet=[
   
    {
        key: 'goomba',
        path: 'assets/entities/overworld/goomba.png',
        frameHeight: 16,
        frameWidth: 16
    },
    {
        key: 'coin',
        path: 'assets/collectibles/coin.png',
        frameHeight: 16,
        frameWidth: 16
    },
    {
        key: 'mario-grande',
        path: 'assets/entities/mario-grown.png',
        frameHeight: 32,
        frameWidth: 18
    },
]

export const initSpritesheet = ({load}) => {
    INIT_Spritesheet.forEach(({key, path, frameWidth, frameHeight})=>{
        load.spritesheet(key, path, {frameHeight, frameWidth})
    })
}

