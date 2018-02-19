<template>
    <div :class="['Modal modal', {'is-active': isModal}]">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box has-text-centered">
                <div class="title">Next</div>
                <div class="blinds-level">Level {{ currentLevel + 1 }}</div>
                <div class="blinds">
                    {{ blinds.small }} / {{ blinds.big }}
                </div>
                <div class="duration">{{ blinds.duration }} minutes</div>
                <div>
                    <button class="button is-danger" ref="modal_start_button" @click="start">START</button>
                </div>
            </div>
        </div>
        <button class="modal-close" @click="close"></button>
    </div>
</template>

<script>
    export default {
        computed: {
            currentLevel() {
                return this.$store.state.currentBlindsLevel;
            },
            blinds() {
                return this.$store.state.blinds[this.currentLevel];
            },
            isModal() {
                return this.$store.state.isModal;
            }
        },
        methods: {
            start() {
                this.$store.startTimer();
                this.close();
            },
            close() {
                this.$store.closeModal();
            }
        }
    }
</script>