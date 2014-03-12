var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.setKeyboardEnabled( true );

        var bg = cc.Sprite.create( 'src/Images/BG.png' );
        bg.setAnchorPoint( cc.p( 0, 0 ) );
        bg.setPosition(0,0);
        this.addChild( bg );

        this.board = new BoardGame();
        this.board.setPosition(220,45);
        this.addChild(this.board);

        return true;
    },
    onKeyDown: function(e)
    {
        switch( e ) {
        case cc.KEY.left:
            break;
        case cc.KEY.right:
            break;
        case cc.KEY.up:
            this.board.rotation();
            break;
        case cc.KEY.down:
            break;
        }
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

