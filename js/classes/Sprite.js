class Sprite
{
    constructor({pos, src})
    {
        this.pos = pos;
        this.image = new Image();
        this.image.onload = () =>
        {
            this.loaded = true;
        }
        this.image.src = src;
        this.loaded = false;
    }

    draw()
    {
        if(!this.loaded){return false;}
        ctx.drawImage(this.image, this.pos.x, this.pos.y);
    }
}