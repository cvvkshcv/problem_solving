$(document).ready(() => {
    function Game() {
        this.humanOne = $('.human.one');
        this.humanTwo = $('.human.two');
        this.levelDom = $('#level');
        this.level = 1;
        this.movePosition = 0;
        this.humnaOneName = 'Boy';
        this.humnaTwoName = 'Girl';
        this.pause = true;

        this.init = function() {
            this.getPlayerDetail();
            this.setLevel();
            this.addPushEvent();
            this.addHeartEvent();
            this.timer();
            this.setMovePosition();
        };

        this.setNames = function(player1 = 'Boy', player2 = 'Girl' ) {
            $('#player1').text(player1);
            $('#player2').text(player2);
        };

        this.setLevel = function(level = 1) {
            this.levelDom.text(level);
        }

        this.setMovePosition = function() {
            this.movePosition = 100 * (3 / this.level);
        }
        this.timer = function() {
            return setInterval(() => {
                if(!this.pause) {
                    let left = parseInt(this.humanOne.css('left'));
                    let right = parseInt(this.humanTwo.css('right'));
                    let moveBack = 5 * this.level;
                    if (left > 0 && right > 0) {
                        this.humanOne.css('left', (left- moveBack) + 'px');
                        this.humanTwo.css('right', (right- moveBack) + 'px');
                    } else {
                        this.humanOne.css('left', 0);
                        this.humanTwo.css('right', 0);
                    }
                }
            }, 1000)
        };

        this.getPlayerDetail = function() {
            Swal.mixin({
              input: 'text',
              confirmButtonText: 'Next &rarr;',
              showCancelButton: true,
              progressSteps: ['1', '2']
            }).queue([
              {
                title: "Guy's name",
                text: 'Default name is "Boy"'
              },
              {
                title: "Girl's name",
                text: 'Default name is "Girl"'
              },
            ]).then((result) => {
              if (result.value) {
                this.setNames(result.value[0], result.value[1]);
              } else {
                this.setNames();
              }
              this.pause = false;
            });
        }

        this.addPushEvent = function() {
            $('#trigger').click(() => {
                $('#trigger').toggleClass("icon-heart--clicked"); 
                let left = parseInt(this.humanOne.css('left'));
                let right = parseInt(this.humanTwo.css('right'));
                if ((left + this.movePosition) < 789 && (right + this.movePosition) < 789) {
                    this.humanOne.css('left', (left + this.movePosition) + 'px');
                    this.humanTwo.css('right', (right + this.movePosition) + 'px');
                } else {
                    this.humanOne.css('left', '789px');
                    this.humanTwo.css('right', '789px');
                    $('.heart').addClass('show');
                    this.pause = true;
                }
            });
        };

        this.addHeartEvent = function() {
            $('.heart').click((e) => {
                e.stopPropagation();
                this.pause = false;
                $('.heart').removeClass('show');
                this.level++;
                this.setMovePosition();
                this.setLevel(this.level);
                this.resetPosition();
            });
        }

        this.resetPosition = function() {
            this.humanOne.css('left', 0);
            this.humanTwo.css('right', 0);            
        }

        this.gameOver = function() {
            this.setLevel();
        };
    };
    let game = new Game();
    game.init();
});
