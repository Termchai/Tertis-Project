var BigBlock = cc.Sprite.extend
({
	ctor: function(x, y, wh, w, h, pattern) 
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

        pattern.initBlock(this);
	  	this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));

        this.schedule(function()
        {
        // if(this.y != 1)
        //     this.y -= 1;s
        // this.setPosition( cc.p( this.x*this.wh, this.y*this.wh ) );
            if (this.deadBlock)
                return;
            var check = true;

            for (var i = 0; i < 4; i++)
            {
                check = check && (this.y*this.wh+this.childs[i].getPositionY() > 30);
                console.log( this.y*this.wh+this.childs[i].getPositionY())

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
            }

        },1);
    }
})