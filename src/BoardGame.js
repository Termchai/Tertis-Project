var BoardGame = cc.Node.extend
({
	ctor: function() 
	{
		this._super();
		this.wh = 30;
	    this.WIDTH = 10;
	    this.HEIGHT = 17;
	    this.setAnchorPoint( cc.p( 0, 0 ) );
	    this.smallBlocks = [];
	    this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks);
	    this.addChild(this.bigBlock);

	    this.schedule(function()
        {
        	if (this.bigBlock.deadBlock)
        	{
        		for (var i=0; i<4; i++)
        		{
        			this.smallBlocks.push(this.bigBlock.childs[i]);
        		}
        		this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks);
        		this.addChild(this.bigBlock);
        	}

        	console.log(this.smallBlocks.toString())
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