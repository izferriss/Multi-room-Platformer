window.addEventListener("keydown", (event) =>
{
    if(player.preventInput)
    {
        return;
    }
    switch(event.key)
    {
        case 'w':
            for(let i = 0; i < doors.length; i++)
            {
                const door = doors[i];
                if(player.hitbox.pos.x + player.hitbox.w <= door.pos.x + door.w &&
                    player.hitbox.pos.x >= door.pos.x &&
                    player.hitbox.pos.y + player.hitbox.h >= door.pos.y &&
                    player.hitbox.pos.y <= door.pos.y + door.h)
                    {
                        player.velocity.x = 0;
                        player.velocity.y = 0;
                        player.preventInput = true;
                        player.switchSprite("enterDoor");
                        door.play();
                        return;
                    }
            }
            if(player.velocity.y == 0)
            {
                player.velocity.y = -25;
            }
            break;
        case 'a':
            // move player to left
            keys.a.pressed = true;
            break;
        case 'd':
            // move player to right
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener("keyup", (event) =>
{
    switch(event.key)
    {
        case 'a':
            // move player to left
            keys.a.pressed = false;
            break;
        case 'd':
            // move player to right
            keys.d.pressed = false;
            break;
    }
});