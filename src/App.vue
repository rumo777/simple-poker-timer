<template>
    <div :class="['App', { 'is-edit-mode': isEditMode }]">
        <div class="header columns is-mobile">
            <div :class="['column']">
                <button class="button is-danger is-pulled-left" @click="resetAll" v-show="isEditMode">
                    RESET TO DEFAULTS
                </button>
            </div>
            <div :class="['column logo has-text-centered', {'is-hidden-mobile': isEditMode }]">
               <!--<span class="logo">-->
                   <!--<span class="simple">simple</span>-->
                   <!--<b>P<img src="dist/images/chip.png" width="24" height="auto">KER</b>Timer-->
               <!--</span>-->
                <img src="dist/images/logo.png" height="auto">
            </div>
            <div class="column has-text-right">
                <button class="button is-info" @click="toggleEditMode">
                    {{ isEditMode ? 'Save' : 'Edit' }}
                </button>
            </div>
        </div>

        <div class="content columns">
            <div class="column is-3">
                <div class="section">
                    <blinds-list></blinds-list>
                </div>
            </div>

            <div class="column main-column">
                <div class="dash section box">
                    <div class="field">
                        <div class="control">
                        <div class="b-checkbox is-info">
                            <input id="checkbox" class="styled" type="checkbox" v-model="isSound">
                            <label for="checkbox">
                                Sound
                            </label>
                        </div>
                        </div>
                    </div>

                    <div class="has-text-centered">
                        <div class="title is-4">Level {{ currentLevel + 1 }}</div>
                        <div class="title is-2">{{ blinds.small }} / {{ blinds.big }}</div>
                        <div class="title is-6">Average stack: {{ averageStack }}</div>
                    </div>

                    <timer></timer>
                </div>

                <div class="columns">
                    <div class="column is-6">
                        <div class="section box">
                            <player-list></player-list>
                        </div>
                    </div>
                    <div class="column is-6">
                        <div class="section box">
                            <prize-list></prize-list>
                        </div>
                    </div>
                </div>
            </div><!-- .main-column -->

            <div class="column is-3">
                <div class="section">
                    <chip-list></chip-list>
                </div>
            </div>
        </div><!-- .content -->

        <!-- Sounds -->
        <audio ref="beepSound" src="dist/sounds/beep.ogg"></audio>
        <audio ref="longBeepSound" src="dist/sounds/long-beep.ogg"></audio>
        <audio ref="dingSound" src="dist/sounds/ding.ogg"></audio>
        <!-- END Sounds -->

        <modal></modal>
    </div><!-- .App -->
</template>

<script>
    import Utils from './Utils';
    import BlindsList from './components/BlindsList.vue';
    import ChipList from './components/ChipList.vue';
    import PlayerList from './components/PlayerList.vue';
    import PrizeList from './components/PrizeList.vue';
    import Timer from './components/Timer.vue';
    import Modal from './components/Modal.vue';

    export default {
        mixins: [Utils],
        components: {Timer, BlindsList, ChipList, PlayerList, PrizeList, Modal},
        created() {
            this.$store.$on('timer-tick', (duration) => {
                if (duration < 3 && duration > 0)
                    this.playSound('beepSound');
            });

            this.$store.$on('timer-finished', () => this.playSound('longBeepSound'));
        },
        computed: {
            currentLevel() {
                return this.$store.state.currentBlindsLevel;
            },
            blinds() {
                return this.$store.state.blinds[this.currentLevel];
            },
            averageStack() {
                return this.$store.averageStackValue;
            },
            isSound: {
                get() {
                    return this.$store.state.isSound;
                },
                set(value) {
                    this.$store.state.isSound = value;
                }
            }
        },
        methods: {
            toggleEditMode() {
                this.isEditMode
                    ? this.$store.disableEditMode()
                    : this.$store.enableEditMode();
            },
            resetAll() {
                this.$store.resetAll();
            },
            playSound(ref) {
                if (this.isSound)
                    this.$refs[ref].play();
            }
        }
    }
</script>