import { createAnimations } from "./animaciones.js"
import { initAudio, playAudio } from "./audio.js"
import { Controls } from "./controls.js"
import { initSpritesheet } from "./spritesheet.js"

/*Globar Phaser*/
const config = {
    type: Phaser.AUTO,
    autoFocus: false,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload, //funcion que se ejecuta para precargar recuros
        create: create, //funcion que se ejecuta cuando el juego comienza
        update: update //funcion que se ejecuta en cada frame

    }
}

new Phaser.Game(config)
// this --> game --> el juego que se esta construyendo

function preload() {
    //Se ejecuta 1

    //Se carga la imagen
    //! Elementos - imagenes
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.image(

        'supermushroom',
        'assets/collectibles/super-mushroom.png'
    )


    //! Spoiler: mejor no mover de aqui al mario
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

    //! Spritesheet
    initSpritesheet(this)

    //! AUDIO
    initAudio(this)

}

function create() {
    //** se ejecuta 2 
    //! Las animaciones van en el create
    createAnimations(this)

    //!se muestra la imagen
    this.add.image(100, 50, 'cloud1')
        //x = 0 y = 0
        .setOrigin(0.5, 0.5)
        .setScale(0.15)

    //! SUELOS
    this.floor = this.physics.add.staticGroup()
    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody() //para que pille bien las physics

    this.floor
        .create(160, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()



    // this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
    // .setOrigin(0, 0)

    // this.mario = this.add.sprite(50, 210, 'mario')
    //     .setOrigin(0, 1)

    this.mario = this.physics.add.sprite(50, 210, 'mario')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(500)

    //!ENEMIGOS_Goomba
    this.goomba = this.physics.add.sprite(120, config.height - 30, 'goomba')
        .setOrigin(0, 1)
        .setVelocityX(-50)
        .setGravityY(500)
    this.goomba.anims.play('goomba-walk', true)

    //! COLECIONABLES
    this.collectibes = this.physics.add.staticGroup()
    this.collectibes.create(150, 150, 'coin').anims.play('coin-idle')
    this.collectibes.create(350, 150, 'coin').anims.play('coin-idle')
    this.collectibes.create(200, config.height - 40, 'supermushroom')
    this.physics.add.overlap(this.mario, this.collectibes, collectItem, null, this)

    // !PISICAS
    this.physics.world.setBounds(0, 0, 2000, config.height) //limites del munco

    //**COLISIONES
    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.goomba, this.floor)
    this.physics.add.collider(this.mario, this.goomba, onHitEnemy, null, this)


    //! Camara
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)


    this.keys = this.input.keyboard.createCursorKeys()

}

//Colision con el enemigo
function onHitEnemy(mario, goomba) {
    console.log('enemigo pega')

    if (mario.body.touching.down && goomba.body.touching.up) {
        goomba.anims.play('goomba-aplastado', true)
        goomba.setVelocityX(0)
        mario.setVelocityY(-200)

        playAudio('goomba-stomp', this)
        addToScore(200, mario, this)

        setTimeout(() => {
            goomba.destroy()

        }, 500)
    } else {
        //muerte mario
        MuerteMario(this)
    }
}

//Funcion monedas
function collectItem(mario, item) {
    const { texture: { key } } = item
    if (key == 'coin') {
        item.destroy()
        console.log({ mario, item })
        // item.disableBody(true, true) //!Esto sirve para: Ocultar elemento

        playAudio('coin-pickup', this, { volume: 0.2 })
        // const bounds = coin.getBounds
        addToScore(100, item, this)
    } else if (key == 'supermushroom') {
        console.log('la seta')
        this.physics.world.pause()
        this.anims.pauseAll()
        item.destroy()
        // mario.isGrande = true
        playAudio('powerup', this)
        let i = 0
        const interval = setInterval(() => {
            mario.anims.play(i % 2 == 0
                ? 'mario-paradp-grande'
                : 'mario-parado'
            )
            i++
        }, 100)
        
        
        mario.isBlockes = true
        mario.isGrande = true
        
        setTimeout(() => {
            mario.setDisplaySize(18, 32)
            mario.body.setSize(18, 32)
            mario.isBlockes = false
            clearInterval(interval)
            this.physics.world.resume()
            this.anims.resumeAll()
        }, 100)
    }
}

//Contador
function addToScore(scoreToAdd, origin, game) {

    const scoreText = game.add.text(
        // coin.getBounds().x,
        // coin.getBounds().y,
        origin.x, origin.y,
        scoreToAdd,
        {
            fontFamily: 'pixel',
            fontSize: config.width / 30
        }

    )
    game.tweens.add({
        targets: scoreText,
        duration: 500,
        y: scoreText.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration: 100,
                alpha: 0,
                onComplete: () => {
                    scoreText.destroy()
                }
            })
        }
    })
}


function update() {
    const { mario } = this
    //se ejecuta 3 (bucle infinito)
    // console.log('update')
    Controls(this)


    //MUERTE DE MARIO
    if (mario.y >= config.height) {
        MuerteMario(this) 
    }
}

function MuerteMario(game) {
    const { mario, scene } = game
    
    mario.isDeath = true
    mario.anims.play('mario-muerto')
    mario.setCollideWorldBounds(false)
    playAudio('gameover', game, { volume: 0.3 })
    mario.setVelocityX(0)
    
    // playAudio('gameover', this, { volumen: 0.2 }).play()
     mario.body.checkCollision.none = true

    setTimeout(() => {
        mario.setVelocityY(-200)
    }, 100)
    setTimeout(() => {
        scene.restart()
    }, 8000)
}