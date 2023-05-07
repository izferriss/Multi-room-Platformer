const BLOCK_SIZE = 64;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = BLOCK_SIZE * 16;
canvas.height = BLOCK_SIZE * 9;

const parsedCollisions = collisionsLevel1.parse2D();

const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite(
    {
        pos:
        {
            x: 0,
            y: 0
        },
        src: "./img/backgroundLevel1.png"
    });

const player = new Player(
    {
        collisionBlocks,
        src: "./img/king/idle.png",
        frameRate: 11
    });

const keys = 
{
    w:{pressed: false},
    a:{pressed: false},
    d:{pressed: false}
};

function animate()
{
    window.requestAnimationFrame(animate);
    backgroundLevel1.draw();
    collisionBlocks.forEach(collisionBlock =>
    {
        collisionBlock.draw();
    });

    player.velocity.x = 0;

    if(keys.d.pressed){player.velocity.x = 5;}
    else if(keys.a.pressed){player.velocity.x = -5;}

    
    player.draw();
    player.update();
}

animate();