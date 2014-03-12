var BoardGame = cc.Node.extend
({
	ctor: function() 
	{
		this._super();
		this.wh = 30;
	    this.WIDTH = 12;
	    this.HEIGHT = 17;
	    this.setAnchorPoint( cc.p( 0, 0 ) );
	    // this.MAP = [
	    //         'XXXXXXXXXXXX',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'X----------X',
	    //         'XXXXXXXXXXXX'
	    //     ];
	    // for ( var r = 0; r < this.HEIGHT; r++ ) {
	    //     for ( var c = 0; c < this.WIDTH; c++ ) {
	    //     if ( this.MAP[ r ][ c ] == '#' ) {
	    //         var s = cc.Sprite.create( 'src/Images/Tetris_Block_Ex.png' );
	    //         s.setAnchorPoint( cc.p( 0, 0 ) );
	    //         s.setPosition( cc.p( c * 30, (this.HEIGHT - r - 1) * 30 ) );
	    //         this.addChild( s );
	        
	    //     	}
	    //     }
	    // }

	    this.bigBlock = new BlockL(5,12,this.wh,this.WIDTH,this.HEIGHT);
	    this.addChild(this.bigBlock);



	},

	rotation: function()
	{
		this.bigBlock.rotation();
	}

	// update: function(dt)
	// {
	// 	for (var i = this.HEIGHT-1; i >= 0; i--)
	// 	{
	// 		for (var j = 0; j < this.WIDTH; j++)
	// 		{
	// 			if (this.MAP[i][j] == '#')
	// 			{
	// 				this.MAP[i][j] = '-';
	// 				this.MAP[i+1][j] = '#';
	// 			}
	// 		}
	// 	}
	// 	console.log(this.MAP);
	// }

})