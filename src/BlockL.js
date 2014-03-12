var BlockL = cc.Sprite.extend
({
	ctor: function(x, y, wh, w, h) 
	{
        this._super();
        this.setAnchorPoint( cc.p( 0, 0 ) );
        this.wh = wh;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle=0;

        this.schedule(function(){
		if(this.y != 1)
    		this.y -= 1;
    	this.setPosition( cc.p( this.x*this.wh, this.y*this.wh ) );

        },1);


        this.b1 = new BlockMove(0,0,this.wh,this.w,this.h);
        this.b2 = new BlockMove(1,0,this.wh,this.w,this.h);
        this.b3 = new BlockMove(2,0,this.wh,this.w,this.h);
        this.b4 = new BlockMove(0,1,this.wh,this.w,this.h);

	    this.addChild(this.b1);
	  	this.addChild(this.b2);
	  	this.addChild(this.b3);
	  	this.addChild(this.b4);

	  	this.setPosition(cc.p(this.x*this.wh, this.y*this.wh));

    },
    rotation: function()
    {
    	this.angle+=90;
    	this.setRotation(this.angle);
    }
})