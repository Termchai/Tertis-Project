var BlockZ = cc.Sprite.extend
({
	initBlock: function (bigBlock)
	{
		bigBlock.pat = 12;

		bigBlock.b1 = new SmallBlock(0,0,bigBlock.wh,bigBlock.w,bigBlock.h);
        bigBlock.b2 = new SmallBlock(1,0,bigBlock.wh,bigBlock.w,bigBlock.h);
        bigBlock.b3 = new SmallBlock(-1,1,bigBlock.wh,bigBlock.w,bigBlock.h);
        bigBlock.b4 = new SmallBlock(0,1,bigBlock.wh,bigBlock.w,bigBlock.h);

	    bigBlock.addChild(bigBlock.b1);
	  	bigBlock.addChild(bigBlock.b2);
	  	bigBlock.addChild(bigBlock.b3);
	  	bigBlock.addChild(bigBlock.b4);

	  	bigBlock.childs[0] = bigBlock.b1;
	  	bigBlock.childs[1] = bigBlock.b2;
	  	bigBlock.childs[2] = bigBlock.b3;
	  	bigBlock.childs[3] = bigBlock.b4;

	  	bigBlock.rotation = function()
	  	{
	      	if (bigBlock.pat%2 == 0 && bigBlock.y != 1 && bigBlock.checkSmallBlock(-1,0) && bigBlock.checkSmallBlock(-1,-1) && bigBlock.checkSmallBlock(0,1))
	      	{
	      		bigBlock.b2.setPos(-1,0);
	      		bigBlock.b3.setPos(-1,-1);
	      		bigBlock.b4.setPos(0,1);
	      	}
	      	else if (bigBlock.pat%2 == 1 && bigBlock.x != 10 && bigBlock.checkSmallBlock(1,0) && bigBlock.checkSmallBlock(-1,-1) && bigBlock.checkSmallBlock(0,1))
	      	{
	      		bigBlock.b2.setPos(1,0);
	      		bigBlock.b3.setPos(-1,1);
	      		bigBlock.b4.setPos(0,1);
	      	}
	      	else
	      		return;
	      	bigBlock.pat++;
	  	}
	}
})