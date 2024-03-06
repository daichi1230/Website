// グローバルに展開
phina.globalize();
// アセット
var ASSETS = {
  // 画像
  image: {
    'tomapiko': 'https://cdn.jsdelivr.net/gh/phinajs/phina.js@v0.2.3/assets/images/tomapiko.png',
  },
};
/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    // 親クラス初期化
    this.superInit();
    // 背景
    this.backgroundColor = 'skyblue';
    var self = this;
    var point = 0;
    var my_position = 0;
    var item_ram_x = Math.floor(Math.random() * (1 + 1 - 0)) + 0;

    var item_ram_x_go;
    if(item_ram_x == 1){
      item_ram_x_go = 500;
    }else{
      item_ram_x_go = 120;
    }

        this.left_button = RectangleShape({
      width: 320,
      height: 960,
      fill: "red",
      strokeWidth: 0,
    }).addChildTo(this).setPosition(-7,0);
    this.left_button.setOrigin(0,0);
    this.left_button.setInteractive(true);
    this.left_button.alpha = 0.4;

    this.right_button = RectangleShape({
      width: 320,
      height: 960,
      fill: "blue",
      strokeWidth: 0,
    }).addChildTo(this).setPosition(314,0);
    this.right_button.setOrigin(0,0);
    this.right_button.setInteractive(true);
    this.right_button.alpha = 0.4;

    // 判定対象
    var item = Shape({
      backgroundColor: 'blue',
      x: item_ram_x_go,
      y: 0,
      width: 100,
      height: 100,
    }).addChildTo(this);

    // スプライト画像作成
    var sprite = Sprite('tomapiko').addChildTo(this);
    // 初期位置
    sprite.x = this.gridX.span(1);
    sprite.y = this.gridY.span(13);
    // タッチイベント
    this.onpointmove = function(e) {
      // スプライトをタッチ位置に
      sprite.x = e.pointer.x;
      sprite.y = e.pointer.y;
    };


        //ラベルを生成
    this.label_point = Label(point).addChildTo(this);
    this.label_point.x = this.gridX.center(); // x座標
    this.label_point.y = this.gridY.span(1); // y座標
    this.label_point.fill = 'white'; // 塗りつぶし色
    

    //右側タップしている間
    this.right_button.on('pointstay', function() {
      console.log("触ったみぎ"+my_position);
      if(my_position==0){
        my_position=1;
      }else if(my_position == -1){
        my_position = 1;
      }
      if(my_position == 1){
        self.sprite.x= 500;
      }
    });
    //左側タップしている間  
    this.left_button.on('pointstay', function() {
      console.log("触ったひだり"+my_position);
      if(my_position==0){
        my_position=-1;
      }else if(my_position == 1){
        my_position = 0;
      }
      if(my_position == -1){
        self.sprite.x= 80;
      }else if (my_position == 0){
        self.gridX.center();
      }
    });


    // 更新処理
    this.update = function() {
    item.y = item.y +1;
    this.label_point.text = score;
      // 矩形判定
      if (sprite.hitTestElement(item)) {
        item.y = -50;
        point =+ 1;
        //点数書き換え
        this.label_point.text = point;

          var item_ram_x = Math.floor(Math.random() * (1 + 1 - 0)) + 0;

    var item_ram_x_go;
    if(item_ram_x == 1){
      item_ram_x_go = 500;
    }else{
      item_ram_x_go = 120;
    }

    item.x = item_ram_x_go;
    
      }
      else {
        item.backgroundColor = 'blue';
      }
    };
    if(my_position === 0){
      sprite.x = this.gridX.center();
    }
  } 
    });
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    title: '当り判定(矩形)',
    // MainScene から開始
    startLabel: 'main',
    // アセット読み込み
    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});