var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.setKeyboardEnabled( true );

        cc.AudioEngine.getInstance().playMusic( 'src/sound/Original Tetris Theme - Extended 10min (Nintendo) - YouTube.mp3', true );
        var coop = confirm("Co-op?" );
        if(coop)
            this.initCoop();
        else
            this.initSingle();

        return true;
    },
    onKeyDown: function(e)
    {
        switch( e ) {
        case cc.KEY.left:
            this.board.moveSide(-1,2);
            break;
        case cc.KEY.right:
            this.board.moveSide(1,2);
            break;
        case cc.KEY.up:
            this.board.rotation(2);
            break;
        case cc.KEY.down:
            this.board.moveDown(2);
            break;
        case cc.KEY.shift:
            this.board.fall(2);
            break;

        case cc.KEY.a:
            this.board.moveSide(-1,1);
            break;
        case cc.KEY.d:
            this.board.moveSide(1,1);
            break;
        case cc.KEY.w:
            this.board.rotation(1);
            break;
        case cc.KEY.s:
            this.board.moveDown(1);
            break;
        case cc.KEY.space:
            this.board.fall(1);
            break;
        }
    },

    initSingle: function()
    {
        var bg = cc.Sprite.create( 'src/Images/BG2.png' );
        bg.setAnchorPoint( cc.p( 0, 0 ) );
        bg.setPosition(0,0);
        this.addChild( bg );

        this.board = new BoardGame();
        this.board.setPosition(220,45);
        this.addChild(this.board); 
    },

    initCoop: function()
    {
        var bg = cc.Sprite.create( 'src/Images/BGCoop.png' );
        bg.setAnchorPoint( cc.p( 0, 0 ) );
        bg.setPosition(0,0);
        this.addChild( bg );

        this.board = new BoardGameCoop();
        this.board.setPosition(160,45);
        this.addChild(this.board);
    }
});



var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

