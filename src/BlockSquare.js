var BlockSquare = cc.Sprite.extend
({
	initBlock: function (bigBlock)
	{
		bigBlock.pat = 0;

		bigBlock.b1 = new SmallBlock(0,0,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);
        bigBlock.b2 = new SmallBlock(1, 0,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);
        bigBlock.b3 = new SmallBlock(1,1,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);
        bigBlock.b4 = new SmallBlock(0,1,bigBlock.wh,bigBlock.w,bigBlock.h,bigBlock.color);

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
	      	// not need to rotate
	  	}
	}
})