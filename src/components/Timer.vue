<template>
    <div class="Timer has-text-centered">
        <div class="time">
            <div v-if="isEditMode" style="white-space: unset">
                <input ref="minutes" :value="minutes" @keyup="setDuration" type="number" class="input">:<input
                       ref="seconds" :value="seconds" @keyup="setDuration" type="number" class="input">
            </div>
            <div v-else>{{ time }}</div>
        </div>

        <div>
            <button :class="['button', timer.isRunning ? 'is-primary' : 'is-danger' ]"
                    @click="toggleTimer"
                    :disabled="isEditMode">
                {{ timer.isRunning ? 'PAUSE' : 'START' }}
            </button>
        </div>
    </div>
</template>


<script>
    import Utils from '../Utils.js';

    export default {
        mixins: [Utils],
        computed: {
            timer() {
                return this.$store.state.timer;
            },
            time() {
                return `${this.minutes}:${this.seconds}`;
            },
            minutes() {
                let minutes = Math.floor(Number(this.timer.duration) / 60);
                if (minutes < 10)
                    minutes = '0'+minutes;

                return minutes;
            },
            seconds() {
                let seconds = Number(this.timer.duration) % 60;
                if (seconds < 10)
                    seconds = '0'+seconds;

                return seconds;
            }
        },
        methods: {
            toggleTimer() {
                this.$store.state.timer.isRunning
                   ? this.$store.stopTimer()
                   : this.$store.startTimer();
            },
            setDuration() {
                let duration = Number(this.$refs.minutes.value) * 60 + Number(this.$refs.seconds.value);
                this.$store.setTimerDuration(duration)
            },
        },
    }
</script>