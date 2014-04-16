var BoardGame = cc.Node.extend
({
	ctor: function() 
	{
		this._super();
		this.wh = 30;
	    this.WIDTH = 10;
	    this.HEIGHT = 17;
	    this.setAnchorPoint( cc.p( 0, 0 ) );
	    this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockT());
	    this.addChild(this.bigBlock);

	    this.schedule(function()
        {
        	if (this.bigBlock.deadBlock)
        	{
        		this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockT());
        		this.addChild(this.bigBlock);
        	}
        },1);

	},

	rotation: function()
	{
		this.bigBlock.rotation();
	},

	moveSide: function( direction )
	{
		this.bigBlock.moveSide(direction);
	}

})