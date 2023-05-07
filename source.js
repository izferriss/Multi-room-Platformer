const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const BLOCK_SIZE = 64;

canvas.width = BLOCK_SIZE * 16; // 1024
canvas.height = BLOCK_SIZE * 9; // 576

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player(
{
    src: './img/king/idle.png',
    frameRate: 11,
    animations:
    {
        idleRight:
        {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            src: './img/king/idle.png',
        },
        idleLeft:
        {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            src: './img/king/idleLeft.png',
        },
        runRight:
        {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            src: './img/king/runRight.png',
        },
        runLeft:
        {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            src: './img/king/runLeft.png',
        },
        enterDoor:
        {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            src: './img/king/enterDoor.png',
            onAnimationComplete: () =>
            {
                level++;
                if (level === 4)
                {
                    level = 1;
                }
                levels[level].init();
                player.switchSprite('idleRight');
                player.preventInput = false;
            }
        }
    }
});

let level = 1;
let levels =
{
    1:
    {
        init: () =>
        {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if(player.currentAnimation)
            {
                player.currentAnimation.isActive = false;
            }

            background = new Sprite(
            {
                pos:
                {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel1.png',
            });

            doors =
            [
                new Sprite(
                {
                    pos:
                    {
                        x: 767,
                        y: 270,
                    },
                    src: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ];
        }
    },
    2:
    {
        init: () =>
        {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.pos.x = 96;
            player.pos.y = 140;

            if(player.currentAnimation)
            {
                player.currentAnimation.isActive = false
            };

            background = new Sprite(
            {
                pos:
                {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel2.png',
            });

            doors =
            [
                new Sprite(
                {
                    pos:
                    {
                        x: 772.0,
                        y: 336,
                    },
                    src: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ];
        }
    },
    3:
    {
        init: () =>
        {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.pos.x = 750;
            player.pos.y = 230;
            if(player.currentAnimation)
            {
                player.currentAnimation.isActive = false;
            }

            background = new Sprite(
            {
                pos:
                {
                    x: 0,
                    y: 0
                },
                src: './img/backgroundLevel3.png'
            });

            doors =
            [
                new Sprite(
                {
                    pos:
                    {
                        x: 176.0,
                        y: 335
                    },
                    src: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false
                })
            ];
        }
    }
}

const keys =
{
    w:
    {
        pressed: false
    },
    a:
    {
        pressed: false
    },
    d:
    {
        pressed: false
    }
}

function animate()
{
    window.requestAnimationFrame(animate);

    background.draw();

    doors.forEach((door) =>
    {
        door.draw();
    });

    player.handleInput(keys);
    player.draw();
    player.update();
}

levels[level].init();
animate();