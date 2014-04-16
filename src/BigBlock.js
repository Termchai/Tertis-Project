var BigBlock = cc.Sprite.extend
({
	ctor: function(x, y, wh, w, h, pattern, smallBlocks) 
	{
        this._super();
        this.setAnchorPoint( cc.p( 0, 0 ) );
        this.wh = wh;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle=0;
        this.childs = new Array();
        this.deadBlock = false;
        this.smallBlocks = smallBlocks;

        pattern.initBlock(this);
	  	this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));

        this.schedule(function()
        {
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

            console.log(check);

            if (check)
            {
                this.y-=1;
                this.setPosition(this.x*wh, this.y*wh);
            }
            else
            {
                this.deadBlock = true;
                for (var i = 0; i < 4; i++)
                {
                    this.childs[i].realX = this.x+this.childs[i].x;
                    this.childs[i].realY = this.y+this.childs[i].y;
                }
            }

        },1);
    },

    moveSide: function(direction)
    {
        var check = true;
        if (direction == 1)
        {
            for (var i = 0; i < 4; i++)
            {
                if(this.childs[i].x + this.x == 10 )
                    check = false; 
                for (var j = 0; j < this.smallBlocks.length; j++)
                {
                    if (this.childs[i].x + this.x + 1 == this.smallBlocks[j].realX &&
                        this.childs[i].y + this.y == this.smallBlocks[j].realY)
                        check = false;
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

        }
    }

})