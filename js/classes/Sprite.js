class Sprite
{
    constructor({pos, src, frameRate = 1, animations})
    {
        this.pos = pos;
        this.image = new Image();
        this.image.onload = () =>
        {
            this.loaded = true;
            this.w = this.image.width / this.frameRate,
            this.h = this.image.height
        };
        this.image.src = src;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = 2;
        this.animations = animations;
        if(this.animations)
        {
            for(let key in this.animations)
            {
                const image = new Image();
                image.src = this.animations[key].src;
                this.animations[key].image = image;
            }
        }
    }

    draw()
    {
        if(!this.loaded){return false;}
        const cropbox = 
        {
            pos:
            {
                x: this.w * this.currentFrame,
                y: 0
            },
            w: this.w,
            h: this.h
        };
        ctx.drawImage
        (
            this.image,
            cropbox.pos.x,
            cropbox.pos.y,
            cropbox.w,
            cropbox.h,
            this.pos.x,
            this.pos.y,
            this.w,
            this.h
        );

        this.updateFrames();
    }

    updateFrames()
    {
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer == 0)
        {
            if(this.currentFrame < this.frameRate - 1)
            {
                this.currentFrame++;
            }
            else
            {
                this.currentFrame = 0;
            }
        }
    }
}