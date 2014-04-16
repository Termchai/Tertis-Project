var BlockT = cc.Sprite.extend
({
	initBlock: function (bigBlock)
	{
		bigBlock.pat = 0;

		bigBlock.b1 = new SmallBlock(0,0,bigBlock.wh,bigBlock.w,bigBlock.h);
        bigBlock.b2 = new SmallBlock(1,0,bigBlock.wh,bigBlock.w,bigBlock.h);
        bigBlock.b3 = new SmallBlock(-1,0,bigBlock.wh,bigBlock.w,bigBlock.h);
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
	      	if (bigBlock.pat%4 == 0)
	      	{
	      		bigBlock.b3.setPos(0,-1);
	      	}
	      	if (bigBlock.pat%4 == 1)
	      	{
	      		bigBlock.b4.setPos(-1,0);
	      	}
	      	if (bigBlock.pat%4 == 2)
	      	{
	      		bigBlock.b2.setPos(0,1);
	      	}
	      	if (bigBlock.pat%4 == 3)
	      	{
	      		bigBlock.b1.setPos(0, 0);
	      		bigBlock.b2.setPos(1, 0);
	      		bigBlock.b3.setPos(-1, 0);
	      		bigBlock.b4.setPos(0, 1);
	      	}
	      	bigBlock.pat++;
	  	}
	}
})