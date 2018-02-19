// Simplified Vuex version
export default {
    data() {
        return {
            state: {},
            defaults: {
                isEditMode: false,
                currentBlindsLevel: 0,
                buyIn: 10,
                isModal: false,
                isSound: true,
                timer: {
                    isRunning: false,
                    duration: 1200 // seconds
                },
                blinds: [
                    {small: 10, big: 20, duration: 20}, // minutes
                    {small: 20, big: 40, duration: 20},
                    {small: 30, big: 60, duration: 20},
                    {small: 40, big: 80, duration: 20},
                    {small: 50, big: 100, duration: 20},
                    {small: 80, big: 160, duration: 20},
                    {small: 100, big: 200, duration: 15},
                    {small: 150, big: 300, duration: 15},
                    {small: 200, big: 400, duration: 15},
                    {small: 300, big: 600, duration: 10},
                    {small: 400, big: 800, duration: 10},
                    {small: 500, big: 1000, duration: 10}
                ],
                chips: [
                    {color: '#ebebeb', value: 10, amount: 10},
                    {color: '#91271a', value: 20, amount: 5},
                    {color: 'green', value: 50, amount: 6},
                    {color: '#213385', value: 100, amount: 5},
                    {color: 'black', value: 500, amount: 1}
                ],
                players: [
                    {name: 'Player 1', topUps: 0, inGame: true},
                    {name: 'Player 2', topUps: 0, inGame: true},
                    {name: 'Player 3', topUps: 0, inGame: true},
                    {name: 'Player 4', topUps: 0, inGame: true},
                    {name: 'Player 5', topUps: 0, inGame: true},
                ],
                prizes: [
                    {part: 60},
                    {part: 30},
                    {part: 10}
                ]
            },
        }
    },
    created() {
        this.loadSession();
        this.$on('edit-mode-disabled', this.saveSession);
        this.$on('timer-tick', this.saveSession);

        this.$on('edit-mode-enabled', this.stopTimer);

        this.$on('blinds-level-set', (level) => {
            let duration = this.state.blinds[level].duration * 60;
            this.setTimerDuration(duration);
        });

        this.$on('timer-finished', () => {
            let nextLevel = this.state.currentBlindsLevel + 1;
            if (this.state.blinds[nextLevel] !== undefined) {
                this.setBlindsLevel(nextLevel);
                this.openModal();
            }
        });
    },
    computed: {
        initialStackValue() {
             return this.state.chips.reduce( (total, chip) => {
                 return total + Number(chip.value) * Number(chip.amount);
             }, 0);
        },
        averageStackValue() {
            let playersInGame = this.state.players.filter( player => player.inGame );
            let stacksInGame  = this.state.players.reduce( (total, player) => {
                return total + Number(player.topUps) + 1;
            }, 0);

            return this.initialStackValue * stacksInGame / playersInGame.length;
        },
        totalMoney() {
            return this.state.players.reduce( (total, player) => {
                return total + ( Number(player.topUps) + 1 ) * Number(this.state.buyIn);
            }, 0);
        },
    },
    methods: {
        _clone(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        loadSession() {
            let state = window.localStorage.getItem('simplePokerTimer');
            if (state) {
                state = JSON.parse(state);
                state.isEditMode      = false;
                state.timer.isRunning = false;
                this.state = state;
            }
            else {
                this.resetAll();
            }
        },
        saveSession() {
            window.localStorage.setItem('simplePokerTimer', JSON.stringify(this.state));
        },
        resetAll() {
            this.state = this._clone(this.defaults);
            this.saveSession();
        },
        enableEditMode() {
            this.state.isEditMode = true;
            this.$emit('edit-mode-enabled');
        },
        disableEditMode() {
            this.state.isEditMode = false;
            this.$emit('edit-mode-disabled');
        },


        /*
         *   Blinds
         */
        addBlinds() {
            this.state.blinds.push({small: 10, big: 20, duration: 20});
        },
        setBlindsLevel(level) {
            this.state.currentBlindsLevel = level;
            this.$emit('blinds-level-set', level);
        },
        removeBlinds(level) {
            this.setBlindsLevel(0);

            if (this.state.blinds.length > 1)
                this.state.blinds.splice(level, 1);
        },
        resetBlinds() {
            this.setBlindsLevel(0);
            this.state.blinds = this._clone(this.defaults.blinds);
        },


        /*
         *  Players
         */
        removePlayer(index) {
            if (this.state.players.length > 1)
                this.state.players.splice(index, 1);
        },
        addPlayer() {
            this.state.players.push({name: 'Player', topUps: 0, inGame: true});
        },
        resetPlayers() {
            this.state.players = this._clone(this.defaults.players);
        },


        /*
         *  Prizes
         */
        addPrize() {
            this.state.prizes.push({part: 0});
        },
        removePrize(index) {
            if (this.state.prizes.length > 1)
                this.state.prizes.splice(index, 1);
        },
        resetPrizes() {
            this.state.prizes = this._clone(this.defaults.prizes);
        },


        /*
         *  Chips
         */
        addChip() {
            this.state.chips.push({color: 'gold', value: 1000, amount: 10});
        },
        removeChip(index) {
            if (this.state.chips.length > 1)
                this.state.chips.splice(index, 1);
        },
        resetChips() {
            this.state.chips = this._clone(this.defaults.chips);
        },


        /*
         *  Timer
         */
        setTimerDuration(seconds) {
            this.stopTimer();
            this.state.timer.duration = seconds;
        },
        startTimer() {
            let timer = this.state.timer;
            if (!timer.isRunning && timer.duration > 0) {
                timer.isRunning = setInterval(this.countDown, 1000);
                this.$emit('timer-started', timer.duration);
            }
        },
        stopTimer() {
            let timer = this.state.timer;
            if (timer.isRunning) {
                clearInterval(timer.isRunning);
                timer.isRunning = false;
                this.$emit('timer-stopped', timer.duration);
            }
        },
        countDown() {
            let timer = this.state.timer;
            timer.duration--;
            this.$emit('timer-tick', timer.duration);

            if (timer.duration === 0) {
                this.stopTimer();
                this.$emit('timer-finished');
            }
        },


        /*
         *  Modal
         */
        openModal() {
            this.state.isModal = true;
        },
        closeModal() {
            this.state.isModal = false;
        }
    }
}