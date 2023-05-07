class Player
{
    constructor()
    {
        this.pos = 
        {
            x: 100,
            y: 100
        };
        this.size =
        {
            w: 100,
            h: 100
        };
        this.sides =
        {
            bottom: this.pos.y + this.size.h
        };

        this.velocity =
        {
            x: 0,
            y: 0
        };

        this.gravity = 1;
    }

    draw()
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }

    update()
    {
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.sides.bottom = this.pos.y + this.size.h;

        // above bottom of canvas
        if(this.sides.bottom + this.velocity.y < canvas.height)
        {
            this.velocity.y += this.gravity;
        }
        else
        {
            this.velocity.y = 0;
        }
    }
}