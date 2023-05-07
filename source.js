const BLOCK_SIZE = 64;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = BLOCK_SIZE * 16;
canvas.height = BLOCK_SIZE * 9;

const backgroundLevel1 = new Sprite(
    {
        pos:
        {
            x: 0,
            y: 0
        },
        src: "./img/backgroundLevel1.png"
    });
const player = new Player();

const keys = 
{
    w:{pressed: false},
    a:{pressed: false},
    d:{pressed: false}
};

function animate()
{
    window.requestAnimationFrame(animate);
    
    player.velocity.x = 0;

    if(keys.d.pressed){player.velocity.x = 5;}
    else if(keys.a.pressed){player.velocity.x = -5;}

    backgroundLevel1.draw();
    player.draw();
    player.update();
}

animate();