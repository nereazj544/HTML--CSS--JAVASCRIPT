import { createAnimations } from "./animaciones.js"

/*Globar Phaser*/
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload, //funcion que se ejecuta para precargar recuros
        create, //funcion que se ejecuta cuando el juego comienza
        update //funcion que se ejecuta en cada frame

    }
}

new Phaser.Game(config)
// this --> game --> el juego que se esta construyendo

function preload() {
    //Se ejecuta 1

    //Se carga la imagen
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

    this.load.audio('gameover', 'assets/sound/music/gameover.mp3')

}

function create() {
    //** se ejecuta 2 

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
        .create(190, config.height - 16, 'floorbricks')
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

    // !PISICAS
    this.physics.world.setBounds(0, 0, 2000, config.height) //limites del munco
    this.physics.add.collider(this.mario, this.floor)

    //! Camara
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    //! Las animaciones van en el create
    createAnimations(this)
    this.keys = this.input.keyboard.createCursorKeys()

}
function update() {
    //se ejecuta 3 (bucle infinito)
    // console.log('update')

    if (this.mario.isDeath) {
        return
    }

    if (this.keys.left.isDown) {
        this.mario.x -= 2
        this.mario.anims.play('mario-walk', true)
        this.mario.flipX = true //!Giro del personje
    } else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
        this.mario.flipX = false
    } else {
        this.mario.anims.play('mario-parado', true)
    }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.y -= 5
        this.mario.anims.play('mario-salto', true)
    }

    if (this.mario.y >= config.height) {
        this.mario.isDeath = true
        this.mario.anims.play('mario-muerto')
        this.mario.setCollideWorldBounds(false)
        this.sound.add('gameover', {volumen: 0.4}).play()
        setTimeout(() =>{
            this.mario.setVelocityY(-350)
        }, 100)
        setTimeout(() =>{
            this.scene.restart()
        }, 8000)
    }
}