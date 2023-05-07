class Player
{
    constructor({collisionBlocks = []})
    {
        this.pos = 
        {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        this.size =
        {
            w: BLOCK_SIZE,
            h: BLOCK_SIZE
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

        this.collisionBlocks = collisionBlocks;
    }

    draw()
    {
        ctx.fillStyle = "red";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }

    update()
    {
        this.pos.x += this.velocity.x;
        
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions();
    }

    checkForHorizontalCollisions()
    {
        for(let i = 0; i < this.collisionBlocks.length; i++)
        {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if(this.pos.x <= collisionBlock.pos.x + collisionBlock.size.w &&
                this.pos.x + this.size.w >= collisionBlock.pos.x &&
                this.pos.y + this.size.h >= collisionBlock.pos.y &&
                this.pos.y <= collisionBlock.pos.y + collisionBlock.size.h)
            {
                // collision on x-axis moving to the left
                if(this.velocity.x < 0)
                {
                    this.pos.x = collisionBlock.pos.x + collisionBlock.size.w + 0.001;
                    break;
                }
                // collision on x-axis moving to the right
                if(this.velocity.x > 0)
                {
                    this.pos.x = collisionBlock.pos.x - this.size.w - 0.001;
                    break;
                }
            }
        }
    }

    applyGravity()
    {
        this.velocity.y += this.gravity;
        this.pos.y += this.velocity.y;
        this.sides.bottom = this.pos.y + this.size.h;
    }

    checkForVerticalCollisions()
    {
        for(let i = 0; i < this.collisionBlocks.length; i++)
        {
            const collisionBlock = this.collisionBlocks[i];

            // if a collision exists
            if(this.pos.x <= collisionBlock.pos.x + collisionBlock.size.w &&
                this.pos.x + this.size.w >= collisionBlock.pos.x &&
                this.pos.y + this.size.h >= collisionBlock.pos.y &&
                this.pos.y <= collisionBlock.pos.y + collisionBlock.size.h)
            {
                // collision on y-axis moving up
                if(this.velocity.y < 0)
                {
                    this.velocity.y = 0;
                    this.pos.y = collisionBlock.pos.y + collisionBlock.size.h + 0.001;
                    break;
                }
                // collision on y-axis moving down
                if(this.velocity.y > 0)
                {
                    this.velocity.y = 0;
                    this.pos.y = collisionBlock.pos.y - this.size.h - 0.001;
                    break;
                }
            }
        }
    }
}