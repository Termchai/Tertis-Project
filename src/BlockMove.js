var BlockMove = cc.Sprite.extend
({
	ctor: function(x, y, wh, w, h) 
	{
        this._super();
        this.initWithFile( 'src/Images/Block.png' );
        this.setAnchorPoint( cc.p( 0, 0 ) );
        this.wh = wh;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));
    },
    update: function(dt)
    {
    	if(this.y != 1)
    		this.y -= 1;
    	this.setPosition( cc.p( this.x*this.wh, this.y*this.wh ) );
    }
})