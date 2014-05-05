var SmallBlock = cc.Sprite.extend
({
	ctor: function(x, y, wh, w, h, color) 
	{
        this._super();
        this.initWithFile(color);
        this.setAnchorPoint( cc.p( 0, 0 ) );
        this.wh = wh;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));
    },

    setPos: function (x,y)
    {
        this.x = x;
        this.y = y;
        this.setPosition(cc.p(x*this.wh, y*this.wh));
    },

    dropDown: function()
    {
        this.y--;;
        this.realY--;
        this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));
    },

    // checkMoveDown: function ()
    // {
    //     if (this.getPositionY() >= 0)
    //         return true;
    //     return false;
    // },


    moveSide: function(direction)
    {
        if(this.x>=0 && this.x<=12)
        this.x+=direction;
        this.updatePos();
    },

    // updatePos: function()
    // {
    //     this.setPosition( cc.p( this.x*this.wh, this.y*this.wh ) );
    // }

})