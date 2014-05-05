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
	    this.nextBlock.setPosition(cc.p(445, 380));
	    this.randomPattern(Math.floor(Math.random()*7));
	    this.score = 0; 


	    this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 25 );
        this.scoreLabel.setPosition( new cc.Point( 250, 512 ) );
        this.scoreLabel.setColor( new cc.Color3B( 50, 205, 50) );
        this.addChild( this.scoreLabel , 4);
        this.scoreLabel.setString(this.score);

	    this.addChild(this.bigBlock);
	    this.addChild(this.nextBlock);

	    this.schedule(function()
        {
        	if (this.bigBlock.deadBlock)
        	{
                cc.AudioEngine.getInstance().playEffect( 'src/Sound/Laser.wav' );

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

        				this.score++;
        				this.scoreLabel.setString(this.score);
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
        		this.nextBlock.setPosition(cc.p(445, 380));
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

    fall: function()
    {
        while(!this.bigBlock.deadBlock)
            this.bigBlock.moveDown();
    },

	randomPattern: function(randomNumber)
	{
		// var randomNumber = Math.floor(Math.random()*7);
		// var randomNumber = 6;
		switch(randomNumber)
		{
			case 0:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks,'src/Images/BlockPink.png');
			break;

			case 1:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks,'src/Images/BlockPurple.png');
			break;

			case 2:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockL(),this.smallBlocks,'src/Images/BlockOrange.png');
			break;

			case 3:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockLF(),this.smallBlocks,'src/Images/BlockBlue.png');
			break;

			case 4:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZ(),this.smallBlocks,'src/Images/BlockRed.png');
			break;

			case 5:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZF(),this.smallBlocks,'src/Images/BlockGreen.png');
			break;

			case 6:
			this.bigBlock = new BigBlock(5,13,this.wh,this.WIDTH,this.HEIGHT,new BlockI(),this.smallBlocks,'src/Images/BlockBlueSky.png');
			break;
		}
	}

})