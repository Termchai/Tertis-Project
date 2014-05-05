var BoardGameCoop = cc.Node.extend
({
	ctor: function() 
	{
		this._super();
		this.wh = 30;
	    this.WIDTH = 14;
	    this.HEIGHT = 17;
	    this.setAnchorPoint( cc.p( 0, 0 ) );
	    this.smallBlocks = [];
        this.nextH = 380;
        this.nextW1 = -75;
        this.nextW2 = 525;
        this.test;

        this.color1 = 'src/Images/BlockOrange.png';
        this.color2 = 'src/Images/BlockPurple.png';
	    // this.bigBlock = new BigBlock(5,12,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks);

	    this.randomNumberNextBlock = Math.floor(Math.random()*7);
	    this.randomPattern(this.randomNumberNextBlock);
	    this.nextBlock = this.bigBlock;
	    this.nextBlock.isMoving = false;
	    this.nextBlock.setPosition(cc.p(this.nextW1, this.nextH));
	    this.randomPattern(Math.floor(Math.random()*7));

        this.randomNumberNextBlock2 = Math.floor(Math.random()*7);
        this.randomPattern2(this.randomNumberNextBlock2);
        this.nextBlock2 = this.bigBlock2;
        this.nextBlock2.isMoving = false;
        this.nextBlock2.setPosition(cc.p(this.nextW2, this.nextH));
        this.randomPattern2(Math.floor(Math.random()*7));

        this.score = 0; 
	    this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 25 );
        this.scoreLabel.setPosition( new cc.Point( 300, 512 ) );
        this.scoreLabel.setColor( new cc.Color3B( 50, 205, 50) );
        this.addChild( this.scoreLabel , 4);
        this.scoreLabel.setString(this.score);

	    this.addChild(this.bigBlock);
	    this.addChild(this.nextBlock);

        this.addChild(this.bigBlock2);
        this.addChild(this.nextBlock2);

        this.updateAnotherBlock();

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
        		this.nextBlock.setPosition(cc.p(this.nextW1 , this.nextH));
        		this.nextBlock.isMoving = false;
        		this.randomPattern(temp);

        		this.addChild(this.nextBlock);
        		this.addChild(this.bigBlock);

                this.updateAnotherBlock();

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


        this.schedule(function()
        {
            if (this.bigBlock2.deadBlock)
            {
                cc.AudioEngine.getInstance().playEffect( 'src/Sound/Laser.wav' );
                for (var i=0; i<4; i++)
                {
                    this.smallBlocks.push(this.bigBlock2.childs[i]);
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
                this.removeChild(this.nextBlock2);
                var temp2 = this.randomNumberNextBlock2;
                this.randomNumberNextBlock2 = Math.floor(Math.random()*7);
                this.randomPattern2(this.randomNumberNextBlock2);
                this.nextBlock2 = this.bigBlock2;
                this.nextBlock2.setPosition(cc.p(this.nextW2, this.nextH));
                this.nextBlock2.isMoving = false;
                this.randomPattern2(temp2);

                this.addChild(this.nextBlock2);
                this.addChild(this.bigBlock2);

                this.updateAnotherBlock();

                if (this.bigBlock2.checkEndGame())
                {
                    this.bigBlock2.isMoving = false;
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

	rotation: function(player)
	{
        if (player == 1)
            var temp = this.bigBlock;
        else
            var temp = this.bigBlock2;

		if (!temp.deadBlock)
			temp.rotation();
	},

	moveSide: function( direction, player)
	{
        if (player == 1)
            var temp = this.bigBlock;
        else
            var temp = this.bigBlock2;

		if (!temp.deadBlock)
			temp.moveSide(direction);
	},

	moveDown: function(player)
	{
        if (player == 1)
            var temp = this.bigBlock;
        else
            var temp = this.bigBlock2;

		if (!temp.deadBlock)
			temp.moveDown();
	},

    fall: function(player)
    {
        if (player == 1)
            var temp = this.bigBlock;
        else
            var temp = this.bigBlock2;

        var count = 0;
        while(!temp.deadBlock)
        {
            if (count == 20)
                return;
            temp.moveDown();
            count++;
        }
    },

	randomPattern: function(randomNumber)
	{
		// var randomNumber = Math.floor(Math.random()*7);
		// var randomNumber = 6;
		switch(randomNumber)
		{
			case 0:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks,this.color1);
			break;

			case 1:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks,this.color1);
			break;

			case 2:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockL(),this.smallBlocks,this.color1);
			break;

			case 3:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockLF(),this.smallBlocks,this.color1);
			break;

			case 4:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZ(),this.smallBlocks,this.color1);
			break;

			case 5:
			this.bigBlock = new BigBlock(5,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZF(),this.smallBlocks,this.color1);
			break;

			case 6:
			this.bigBlock = new BigBlock(5,13,this.wh,this.WIDTH,this.HEIGHT,new BlockI(),this.smallBlocks,this.color1);
			break;
		}
	},

    randomPattern2: function(randomNumber)
    {
        // var randomNumber = Math.floor(Math.random()*7);
        // var randomNumber = 6;
        switch(randomNumber)
        {
            case 0:
            this.bigBlock2 = new BigBlock(10,14,this.wh,this.WIDTH,this.HEIGHT,new BlockSquare(),this.smallBlocks,this.color2);
            break;

            case 1:
            this.bigBlock2 = new BigBlock(10,14,this.wh,this.WIDTH,this.HEIGHT,new BlockT(),this.smallBlocks,this.color2);
            break;

            case 2:
            this.bigBlock2 = new BigBlock(10,14,this.wh,this.WIDTH,this.HEIGHT,new BlockL(),this.smallBlocks,this.color2);
            break;

            case 3:
            this.bigBlock2 = new BigBlock(10,14,this.wh,this.WIDTH,this.HEIGHT,new BlockLF(),this.smallBlocks,this.color2);
            break;

            case 4:
            this.bigBlock2 = new BigBlock(10,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZ(),this.smallBlocks,this.color2);
            break;

            case 5:
            this.bigBlock2 = new BigBlock(10,14,this.wh,this.WIDTH,this.HEIGHT,new BlockZF(),this.smallBlocks,this.color2);
            break;

            case 6:
            this.bigBlock2 = new BigBlock(10,13,this.wh,this.WIDTH,this.HEIGHT,new BlockI(),this.smallBlocks,this.color2);
            break;
        }
    },

    updateAnotherBlock: function()
    {
        this.bigBlock.anotherBlock = this.bigBlock2;
        this.bigBlock2.anotherBlock = this.bigBlock;
    }

})