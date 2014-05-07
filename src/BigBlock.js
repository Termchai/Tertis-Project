var BigBlock = cc.Sprite.extend
({
	ctor: function(x, y, wh, w, h, pattern, smallBlocks, color) 
	{
        this._super();
        this.setAnchorPoint( cc.p( 0, 0 ) );
        this.wh = wh;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.angle=0;
        this.childs = new Array();
        this.deadBlock = false;
        this.smallBlocks = smallBlocks;
        this.isMoving = true;

        pattern.initBlock(this);
	  	this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));

        this.schedule(this.moveDown,1);
    },

    moveDown: function()
    {   
        if (!this.isMoving)
            return ;
            if (this.deadBlock)
                return;
            var check = true;

            for (var i = 0; i < 4; i++)
            {
                check = check && (this.y*this.wh+this.childs[i].getPositionY() > 30);
                for (var j = 0; j < 4; j++)
                {
                    for (var k = 0; k < this.smallBlocks.length; k++)
                    {
                        if (this.childs[j].x + this.x == this.smallBlocks[k].realX &&
                            this.childs[j].y + this.y - 1 == this.smallBlocks[k].realY)
                            check = false;
                    }


                }
            }


            if (check)
            {

                    if (this.anotherBlock != null)
                    {
                        for (var i=0; i<4; i++)
                        for (var j=0; j<4; j++)
                        {
                            if(this.childs[i].x + this.x == this.anotherBlock.childs[j].x + this.anotherBlock.x &&
                            this.childs[i].y + this.y - 1 == this.anotherBlock.childs[j].y + this.anotherBlock.y )
                                return;
                        }
                    }

                this.y-=1;
                this.setPosition(this.x*this.wh, this.y*this.wh);
                this.getScheduler().unscheduleAllCallbacksForTarget(this);
                this.schedule(this.moveDown,1);


            }


            setTimeout (this.makeDeadBLock(this.childs,check) ,1000);


    },

    moveSide: function(direction)
    {
        var check = true;


        if (direction == 1)
        {
            for (var i = 0; i < 4; i++)
            {
                if(this.childs[i].x + this.x == this.w )
                    check = false; 
                for (var j = 0; j < this.smallBlocks.length; j++)
                {
                    if (this.childs[i].x + this.x + 1 == this.smallBlocks[j].realX &&
                        this.childs[i].y + this.y == this.smallBlocks[j].realY)
                        check = false;
                }

                if (this.anotherBlock != null)
                {
                    for (var j=0; j<4; j++)
                    {
                        if(this.childs[i].x + this.x + direction == this.anotherBlock.childs[j].x + this.anotherBlock.x &&
                        this.childs[i].y + this.y == this.anotherBlock.childs[j].y + this.anotherBlock.y )
                            check = false;
                    }
                }
            }

            if (check)
            {
                this.x++;
                this.setPosition(this.x*this.wh, this.y*this.wh);
            }
        }
        else if (direction == -1)
        {
            for (var i = 0; i < 4; i++)
            {
                if(this.childs[i].x + this.x == 1 )
                    check = false; 
                for (var j = 0; j < this.smallBlocks.length; j++)
                {
                    if (this.childs[i].x + this.x -1 == this.smallBlocks[j].realX &&
                        this.childs[i].y + this.y == this.smallBlocks[j].realY)
                        check = false;
                }

                if (this.anotherBlock != null)
                {
                    for (var j=0; j<4; j++)
                    {
                        if(this.childs[i].x + this.x + direction == this.anotherBlock.childs[j].x + this.anotherBlock.x &&
                        this.childs[i].y + this.y == this.anotherBlock.childs[j].y + this.anotherBlock.y )
                            check = false;
                    }
                }
            }

            if (check)
            {
                this.x--;
                this.setPosition(this.x*this.wh, this.y*this.wh);
            }
        }
    },

    makeDeadBLock: function(childs,check)
    {
        if (!check)
        {
            this.deadBlock = true;
            for (var i = 0; i < 4; i++)
            {
                childs[i].realX = this.x + childs[i].x;
                childs[i].realY = this.y + childs[i].y;
            }
        }
    },

    checkSmallBlock: function(x,y)
    {
        if(!this.checkFrame(x,y))
            return false; 
        if (!this.checkOtherBlock(x,y))
            return false;

        for (var i=0; i<this.smallBlocks.length; i++)
        {
            if ((this.smallBlocks[i].realY == this.y+y &&
                this.smallBlocks[i].realX == this.x+x) )
                {
                    return false;
                }
        }
        return true;
    },

    checkFrame: function(x,y)
    {
        var realX = this.x + x;
        var realY = this.y + y;

        return realX > 0 && realX <= this.w && realY > 0 && realY <= this.h;
    },

    checkEndGame: function()
    {
        if (this.anotherBlock != null)
        {
            for (var i=0; i<4; i++)
            for (var j=0; j<4; j++)
            {
                if(this.childs[i].x + this.x == this.anotherBlock.childs[j].x + this.anotherBlock.x &&
                this.childs[i].y + this.y - 1 == this.anotherBlock.childs[j].y + this.anotherBlock.y )
                {
                    this.y-=1;
                    this.setPosition(this.x*this.wh, this.y*this.wh);
                    this.getScheduler().unscheduleAllCallbacksForTarget(this);
                    this.schedule(this.moveDown,1);
                    i=0;
                    j=-1;
                    continue;

                }
            }
        }

        for(var i = 0; i < this.childs.length; i++)
        {
            var X = this.childs[i].x;
            var Y = this.childs[i].y;
            if (!this.checkSmallBlock(X,Y) && this.checkOtherBlock(X,Y) == true )
            {
                return true;
            }
        }
        return false;
    },

    checkOtherBlock: function(x,y)
    {
        if (this.anotherBlock != null)
        {
            for (var j=0; j<4; j++)
            {
                var anotherX = this.anotherBlock.childs[j].x + this.anotherBlock.x;
                var anotherY = this.anotherBlock.childs[j].y + this.anotherBlock.y;
                if( this.x + x == anotherX && this.y + y == anotherY )
                    return false;
            }
        }
        return true;
    }

})