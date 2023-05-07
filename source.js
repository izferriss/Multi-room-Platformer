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
    frameRate: 11,
    animations:
    {
        idleRight:
        {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            src: "./img/king/idle.png"
        },
        idleLeft:
        {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            src: "./img/king/idleLeft.png"
        },
        runRight:
        {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            src: "./img/king/runRight.png"
        },
        runLeft:
        {
            frameRate: 8,
            frameBuffer: 2,
            loop: true,
            src: "./img/king/runLeft.png"
        }
    }
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

    if(keys.d.pressed)
    {
        player.switchSprite("runRight");
        player.velocity.x = 5;
        player.lastDirection = "right";
    }
    else if(keys.a.pressed)
    {
        player.switchSprite("runLeft");
        player.velocity.x = -5;
        player.lastDirection = "left";
    }
    else
    {
        if(player.lastDirection == "left")
        {
            player.switchSprite("idleLeft");
        }
        else
        {
            player.switchSprite("idleRight");
        }
        
    }

    
    player.draw();
    player.update();
}

animate();