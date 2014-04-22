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
	    // this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks);
	    this.randomPattern();
	    this.addChild(this.bigBlock);

	    this.schedule(function()
        {
        	if (this.bigBlock.deadBlock)
        	{

        		for (var i=0; i<4; i++)
        		{
        			this.smallBlocks.push(this.bigBlock.childs[i]);
        		}

        		var checkArray = [];
        		for (var i =0; i<this.HEIGHT; i++)
        		{
        			checkArray[i] = 0;
        		}

        		for (var i=0; i<this.smallBlocks.length; i++)
        		{
        			checkArray[this.smallBlocks[i].realY]++;
        		}

        		for (var i=0; i<this.HEIGHT; i++)
        		{
        			if (i<5)
        				console.log("i : " + i + "  " + "checkArray[i] : " + checkArray[i])
        			if (checkArray[i] == this.WIDTH)
        			{
        				console.log("Fuckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        				for (var j = 0; j<this.smallBlocks.length; j++)
        				{
        					if(this.smallBlocks[j].realY == i)
        					{
        						this.smallBlocks[j].getParent().removeChild(this.smallBlocks[j]);
        						this.smallBlocks.splice(j,1);
        						j--;
        					}
        				}

        				for (var j=0; j<this.smallBlocks.length; j++)
        				{
        					if (this.smallBlocks[j].realY > i)
        					{
        						this.smallBlocks[j].dropDown();
        					}
        				}
        			}
        		}


        		// this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks);
        		this.randomPattern();
        		this.addChild(this.bigBlock);
        	}

        	// console.log(this.smallBlocks.toString())
        },0.5);

	},

	rotation: function()
	{
		if (!this.bigBlock.deadBlock)
			this.bigBlock.rotation();
	},

	moveSide: function( direction )
	{
		if (!this.bigBlock.deadBlock)
			this.bigBlock.moveSide(direction);
	},

	moveDown: function()
	{
		if (!this.bigBlock.deadBlock)
			this.bigBlock.moveDown();
	},

	randomPattern: function()
	{
		var randomNumber = Math.floor(Math.random()*3);
		switch(randomNumber)
		{
			case 0:
			this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks);
			break;
			case 1:
			this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks);
			break;
			case 2:
			this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockL(),this.smallBlocks);
			break;
		}
	}

})