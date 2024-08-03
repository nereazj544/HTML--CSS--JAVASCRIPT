const MARIO_ANIMACIONES = {
    grown: {
        parado: 'mario-parado-grande',
        walk: 'mario-caminado-grande',
        salto: 'mario-salto-grande'
    },
    normal: {
        parado: 'mario-parado',
        andar: 'mario-walk',
        salto: 'mario-salto',
    }
}
export function Controls({ mario, keys }) {

    //** VARIABLES CONTROLES
    const isMarioTouchingFloor = mario.body.touching.down
    const isLeftKeyDowm = keys.left.isDown
    const isRightKeyDowm = keys.right.isDown
    const isUpKeyDowm = keys.up.isDown

    if (mario.isDeath) return
    if (mario.isBlocked) return
    const marioAnimaciones = mario.isGrande
        ? MARIO_ANIMACIONES.grown
        : MARIO_ANIMACIONES.normal

    if (isLeftKeyDowm) {
        mario.x -= 2
        isMarioTouchingFloor && mario.anims.play('mario-walk', true)
        mario.flipX = true //!Giro del personje
    } else if (isRightKeyDowm) {
        isMarioTouchingFloor && mario.anims.play('mario-walk', true)
        mario.x += 2
        mario.flipX = false
    } else if (isMarioTouchingFloor) {
        mario.anims.play(marioAnimaciones.parado, true)
    }

    if (isUpKeyDowm && isMarioTouchingFloor) {
        mario.setVelocityY(-300)

        mario.anims.play('mario-salto', true)
    }
}