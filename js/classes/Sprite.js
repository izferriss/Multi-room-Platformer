class Sprite
{
    constructor
    ({
        pos,
        src,
        frameRate = 1,
        animations,
        frameBuffer = 2,
        loop = true,
        autoplay = true
    })
    {
        this.pos = pos;
        this.image = new Image();
        this.image.onload = () =>
        {
            this.loaded = true;
            this.w = this.image.width / this.frameRate;
            this.h = this.image.height;
        };
        this.image.src = src;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        this.currentAnimation;

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

    play()
    {
        this.autoplay = true;
    }

    updateFrames()
    {
        if(!this.autoplay)
        {
            return;
        }
        this.elapsedFrames++;

        if(this.elapsedFrames % this.frameBuffer == 0)
        {
            if(this.currentFrame < this.frameRate - 1)
            {
                this.currentFrame++;
            }
            else if(this.loop)
            {
                this.currentFrame = 0;
            }
            if(this.currentAnimation?.onAnimationComplete)
            {
                if(this.currentFrame == this.frameRate - 1 && !this.currentFrame.isActive)
                {
                    this.currentAnimation.onAnimationComplete();
                    this.currentAnimation.isActive = true;
                }
            }
        }
    }
}