$(document).ready(() => {
    function Game() {
        this.humanOne = $('.human.one');
        this.humanTwo = $('.human.two');
        this.levelDom = $('#level');
        this.level = 1;
        this.movePosition = 10;
        this.moveTime = 1000;
        this.humnaOneName = 'Boy';
        this.humnaTwoName = 'Girl';
        this.pause = true;
        this.time;

        this.init = function() {
            this.resetPosition();
            this.getPlayerDetail();
            this.setLevel();
            this.addPushEvent();
            this.addHeartEvent();
            this.setMovePosition();
            this.setTimer();
        };

        this.setNames = function(player1 = 'Boy', player2 = 'Girl' ) {
            $('#player1').text(player1);
            $('#player2').text(player2);
        };

        this.setLevel = function(level = 1) {
            this.levelDom.text(level);
        };

        this.updateMoveTime = function() {
            this.moveTime = 1000 - (this.level * 50);
        };

        this.setMovePosition = function() {
            this.movePosition = 100 * (3 / this.level);
        };

        this.setTimer = function() {
            if (this.time) { clearInterval(this.time); }
            this.time = setInterval(() => {
                if(!this.pause) {
                    let left = parseInt(this.humanOne.css('left'));
                    let right = parseInt(this.humanTwo.css('right'));
                    if (left > 789 && right > 789) {
                        this.pause = true;
                        this.humanOne.css('left', 789 + 'px');
                        this.humanTwo.css('right', 789 + 'px');
                        Swal.fire({
                          title: `Your singleness level is ${this.level}`,
                          type: 'success',
                          html: `<p>You broke <strong>${this.humnaOneName}</strong> and <strong>${this.humnaTwoName}</strong>
                                 for ${this.level - 1} time !<br /> <b>With great effort</b></p>`
                        });
                        // After swal ok button press init again
                        // this.init();
                    } else {
                        this.humanOne.css('left', (left + 20) + 'px');
                        this.humanTwo.css('right', (right + 20) + 'px');
                    }
                }
            }, this.moveTime);
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
                this.setNames(result.value[0] || 'Boy', result.value[1] || 'Girl');
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
                if (left < 0 && right < 0) {
                    this.humanOne.css('left', 0);
                    this.humanTwo.css('right', 0);
                    $('.heart').addClass('show');
                    this.pause = true;
                } else {
                    this.humanOne.css('left', (left - this.movePosition / 5) + 'px');
                    this.humanTwo.css('right', (right - this.movePosition / 5) + 'px');
                }
            });
        };

        this.addHeartEvent = function() {
            $('.heart').click((e) => {
                e.stopPropagation();
                this.pause = false;
                $('.heart').removeClass('show');
                this.level++;
                this.updateMoveTime();
                this.setMovePosition();
                this.setTimer();
                this.setLevel(this.level);
                this.resetPosition();
            });
        }

        this.resetPosition = function() {
            this.humanOne.css('left', '50%');
            this.humanTwo.css('right', '50%');
        }

        this.gameOver = function() {
            this.setLevel();
        };
    };
    let game = new Game();
    game.init();
});
