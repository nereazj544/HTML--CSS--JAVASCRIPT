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
        key: 'mario-walk-grande',
        frames: game.anims.generateFrameNumbers(
            'mario-grande',
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
        key: 'mario-parado-grande',
        frames: game.anims.generateFrameNumbers(
            'mario-grande',
            { start: 0, end: 0 }
        )
    })
    game.anims.create({
        key: 'mario-salto',
        frames: [{ key: 'mario', frame: 5 }]

    })
    game.anims.create({
        key: 'mario-salto-grande',
        frames: [{ key: 'mario-grande', frame: 5 }]

    })
    game.anims.create({
        key: 'mario-muerto',
        frames: [{ key: 'mario', frame: 4 }]

    })
    game.anims.create({
        key: 'goomba-walk',
        frames: game.anims.generateFrameNumbers(
            'goomba',
            { start: 0, end: 1 }
        ),
        repeat: -1,
        frameRate: 12 //duracion de cada frame

    })
    game.anims.create({
        key: 'goomba-aplastado',
        frames: [{ key: 'goomba', frame: 2 }]

    })

    game.anims.create({
        key: 'coin-idle',
        frames: game.anims.generateFrameNumbers(
            'coin',
            { start: 0, end: 3 }
        ),
        frameRate: 12, //duracion de cada frame
        repeat: -1
    })
}