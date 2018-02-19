<template>
    <div class="BlindsList">
        <h2 class="has-text-centered title is-2">Blinds</h2>

        <div class="table">
            <div class="columns is-mobile is-bold">
                <div class="column">Level</div>
                <div class="column">Small / Big</div>
                <div class="column">Duration</div>
            </div>

            <blinds v-for="(blinds, i) in blindsList" :blinds="blinds" :level="i" :key="i"></blinds>
        </div>

        <list-buttons @add="add" @reset="reset"></list-buttons>
    </div>
</template>

<script>
    import Utils from '../Utils';
    import Blinds from '../components/Blinds.vue';
    import ListButtons from './buttons/ListButtons.vue';

    export default {
        mixins: [Utils],
        components: {Blinds, ListButtons},
        computed: {
            blindsList() {
                return this.$store.state.blinds;
            }
        },
        methods: {
            add() {
                this.$store.addBlinds();
            },
            reset() {
                this.$store.resetBlinds();
            }
        }
    }
</script>