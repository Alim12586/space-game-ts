// game.ts
// Lütfen bu dosyanın index.html ile aynı klasörde olduğundan emin olun.

import * as Phaser from 'phaser';

class UzaySahnem extends Phaser.Scene {
    private oyuncu: Phaser.Physics.Arcade.Sprite | null = null;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

    constructor() {
        super({ key: 'UzaySahnem' });
    }

    preload() {
        // Varlık yüklemeye gerek yok, bir grafik nesnesi kullanacağız
    }

    create() {
        this.cameras.main.setBackgroundColor('#000033'); 
        this.physics.world.setBoundsCollision(true, true, true, true); 
        
        // Geçici kırmızı kare (Gemi) oluşturma
        const gemiBoyutu = 32;
        const gemi = this.add.graphics();
        gemi.fillStyle(0xff0000, 1); 
        gemi.fillRect(-gemiBoyutu / 2, -gemiBoyutu / 2, gemiBoyutu, gemiBoyutu);
        gemi.generateTexture('oyuncu-gemi', gemiBoyutu, gemiBoyutu);
        gemi.destroy();

        this.oyuncu = this.physics.add.sprite(
            this.game.scale.width / 2, 
            this.game.scale.height - 50, 
            'oyuncu-gemi'
        );
        
        this.oyuncu.setCollideWorldBounds(true); 

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.oyuncu || !this.cursors) return;

        this.oyuncu.setVelocity(0);

        const hiz = 200; 

        if (this.cursors.left.isDown) {
            this.oyuncu.setVelocityX(-hiz);
        } else if (this.cursors.right.isDown) {
            this.oyuncu.setVelocityX(hiz);
        }

        if (this.cursors.up.isDown) {
            this.oyuncu.setVelocityY(-hiz);
        } else if (this.cursors.down.isDown) {
            this.oyuncu.setVelocityY(hiz);
        }
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO, 
    width: 800,
    height: 600,
    parent: 'game-container', 
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: 0 }, 
            debug: false 
        }
    },
    scene: [UzaySahnem]
};

new Phaser.Game(config);
