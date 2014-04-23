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
	    this.randomNumberNextBlock = Math.floor(Math.random()*7);
	    this.randomPattern(this.randomNumberNextBlock);
	    this.nextBlock = this.bigBlock;
	    this.nextBlock.isMoving = false;
	    this.nextBlock.setPosition(cc.p(400, 350));
	    this.randomPattern(Math.floor(Math.random()*7));

	    this.addChild(this.bigBlock);
	    this.addChild(this.nextBlock);

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
        			// console.log(i);
        			if (checkArray[i] == this.WIDTH)
        			{
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

        				for (var j =0; j<this.HEIGHT; j++)
        				{
        					checkArray[j] = 0;
        				}

        				for (var j=0; j<this.smallBlocks.length; j++)
        				{
        					checkArray[this.smallBlocks[j].realY]++;
        				}
        				i-=1;
        			}

        		}
        		this.removeChild(this.nextBlock);
        		var temp = this.randomNumberNextBlock;
        		this.randomNumberNextBlock = Math.floor(Math.random()*7);
        		this.randomPattern(this.randomNumberNextBlock);
        		this.nextBlock = this.bigBlock;
        		this.nextBlock.setPosition(cc.p(400, 350));
        		this.nextBlock.isMoving = false;
        		this.randomPattern(temp);

        		this.addChild(this.nextBlock);
        		this.addChild(this.bigBlock);

        		if (this.bigBlock.checkEndGame())
        		{
        			this.bigBlock.isMoving = false;
        			var cf = confirm("Game Over. Play agian?" );
        				setTimeout( function() 
        			{
            			if( cf ) location.reload();
        			} , 1500);
        		}
        	}

        	// console.log(this.smallBlocks.toString())
        },1);

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

	randomPattern: function(randomNumber)
	{
		// var randomNumber = Math.floor(Math.random()*7);
		// var randomNumber = 6;
		switch(randomNumber)
		{
			case 0:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks);
			break;

			case 1:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks);
			break;

			case 2:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockL(),this.smallBlocks);
			break;

			case 3:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockLF(),this.smallBlocks);
			break;

			case 4:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZ(),this.smallBlocks);
			break;

			case 5:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZF(),this.smallBlocks);
			break;

			case 6:
			this.bigBlock = new BigBlock(5,13,this.wh,this.WIDTH,this.HEIGHT,new BlockI(),this.smallBlocks);
			break;
		}
	}

})