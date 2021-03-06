var BlockLF = cc.Sprite.extend
({
	initBlock: function (bigBlock)
	{
		bigBlock.pat = 0;

		bigBlock.b1 = new SmallBlock(0,0,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);
        bigBlock.b2 = new SmallBlock(1, 0,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);
        bigBlock.b3 = new SmallBlock(-1,0,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);
        bigBlock.b4 = new SmallBlock(-1,1,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);

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
	      	if (bigBlock.pat%4 == 0 && bigBlock.checkSmallBlock(0,-1) && bigBlock.checkSmallBlock(0,1) && bigBlock.checkSmallBlock(1, 1))
	      	{
	      		bigBlock.b2.setPos(0,-1);
	      		bigBlock.b3.setPos(0,1);
	      		bigBlock.b4.setPos(1,1);
	      	}
	      	else if (bigBlock.pat%4 == 1 && bigBlock.checkSmallBlock(-1,-0) && bigBlock.checkSmallBlock(1,0) && bigBlock.checkSmallBlock(1,-1))
	      	{
	      		bigBlock.b2.setPos(-1,0);
	      		bigBlock.b3.setPos(1,0);
	      		bigBlock.b4.setPos(1,-1);
	      	}
	      	else if (bigBlock.pat%4 == 2 && bigBlock.checkSmallBlock(0,1) && bigBlock.checkSmallBlock(0,-1) && bigBlock.checkSmallBlock(-1,-1))
	      	{
	      		bigBlock.b2.setPos(0,1);
	      		bigBlock.b3.setPos(0,-1);
	      		bigBlock.b4.setPos(-1,-1);
	      	}
	      	else if (bigBlock.pat%4 == 3 && bigBlock.checkSmallBlock(0,0) && bigBlock.checkSmallBlock(1,0) && bigBlock.checkSmallBlock(-1,0) && 
	      		bigBlock.checkSmallBlock(-1,1))
	      	{
	      		bigBlock.b1.setPos(0, 0);
	      		bigBlock.b2.setPos(1, 0);
	      		bigBlock.b3.setPos(-1, 0);
	      		bigBlock.b4.setPos(-1, 1);
	      	}
	      	else
	      		return;
	      	bigBlock.pat++;
	  	}
	}
})