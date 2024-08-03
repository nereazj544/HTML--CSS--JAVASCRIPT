export const createAnimations = (game) => {

    
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 3, end: 2 }
        ),
        repeat: -1,
        frameRate: 12 //duracion de cada frame
    })
    
    game.anims.create({
        key: 'mario-parado',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 0, end: 0 }
        )
    })
    game.anims.create({
        key: 'mario-salto',
        frames: [{ key: 'mario', frame: 5 }]
        
    })
    game.anims.create({
        key: 'mario-muerto',
        frames: [{ key: 'mario', frame: 4 }]
        
    })
}