class CollisionBlock
{
    constructor({pos})
    {
        this.pos = pos;
        this.w = 64;
        this.h = 64;
    }

    draw()
    {
        ctx.fillStyle = "rgba(255, 0 , 0, .5)";
        ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    }
}