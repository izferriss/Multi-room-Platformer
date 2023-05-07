class CollisionBlock
{
    constructor({pos})
    {
        this.pos = pos;
        this.size = 
        {
            w: 64,
            h: 64
        };
    }

    draw()
    {
        ctx.fillStyle = "rgba(255, 0 , 0, .5)";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
}