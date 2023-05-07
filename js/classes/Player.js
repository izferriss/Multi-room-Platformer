class Player extends Sprite
{
    constructor({collisionBlocks = [], src, frameRate, animations})
    {
        super({src, frameRate, animations});

        this.pos = 
        {
            x: 256,
            y: 256
        };

        this.sides =
        {
            bottom: this.pos.y + this.h
        };

        this.velocity =
        {
            x: 0,
            y: 0
        };

        this.gravity = 1;

        this.collisionBlocks = collisionBlocks;
    }

    update()
    {
        this.pos.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollisions();
    }

    switchSprite(name)
    {
        if(this.image == this.animations[name].image){return;}
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;

    }

    updateHitbox()
    {
        this.hitbox =
        {
            pos:
            {
                x: this.pos.x + 58,
                y: this.pos.y + 34
            },
            w: 50,
            h: 54
        };
    }

    checkForHorizontalCollisions()
    {
        for(let i = 0; i < this.collisionBlocks.length; i++)
        {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if(this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.size.w &&
                this.hitbox.pos.x + this.hitbox.w >= collisionBlock.pos.x &&
                this.hitbox.pos.y + this.hitbox.h >= collisionBlock.pos.y &&
                this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.size.h)
            {
                // collision on x-axis moving to the left
                if(this.velocity.x < 0)
                {
                    const offset = this.hitbox.pos.x - this.pos.x;
                    this.pos.x = collisionBlock.pos.x + collisionBlock.size.w - offset + 0.001;
                    break;
                }
                // collision on x-axis moving to the right
                if(this.velocity.x > 0)
                {
                    const offset = this.hitbox.pos.x - this.pos.x + this.hitbox.w;
                    this.pos.x = collisionBlock.pos.x - offset - 0.001;
                    break;
                }
            }
        }
    }

    applyGravity()
    {
        this.velocity.y += this.gravity;
        this.pos.y += this.velocity.y;
        this.sides.bottom = this.pos.y + this.h;
    }

    checkForVerticalCollisions()
    {
        for(let i = 0; i < this.collisionBlocks.length; i++)
        {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if(this.hitbox.pos.x <= collisionBlock.pos.x + collisionBlock.size.w &&
                this.hitbox.pos.x + this.hitbox.w >= collisionBlock.pos.x &&
                this.hitbox.pos.y + this.hitbox.h >= collisionBlock.pos.y &&
                this.hitbox.pos.y <= collisionBlock.pos.y + collisionBlock.size.h)
            {
                // collision on y-axis moving up
                if(this.velocity.y < 0)
                {
                    this.velocity.y = 0;
                    const offset = this.hitbox.pos.y - this.pos.y;
                    this.pos.y = collisionBlock.pos.y + collisionBlock.size.h - offset + 0.001;
                    break;
                }
                // collision on y-axis moving down
                if(this.velocity.y > 0)
                {
                    this.velocity.y = 0;
                    const offset = this.hitbox.pos.y - this.pos.y + this.hitbox.h;
                    this.pos.y = collisionBlock.pos.y - offset - 0.001;
                    break;
                }
            }
        }
    }
}