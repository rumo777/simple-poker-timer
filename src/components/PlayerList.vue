<template>
    <div class="PlayerList">
        <h2 class="has-text-centered title is-2">Players</h2>

        <div class="table">
            <div class="columns is-mobile is-bold">
                <div class="column">Name</div>
                <div class="column">Top-ups</div>
                <div class="column">Spent</div>
            </div>

            <player v-for="(player, i) in players" :player="player" :index="i" :key="i"></player>
        </div>

        <list-buttons @add="add" @reset="reset"></list-buttons>
    </div>
</template>

<script>
    import Utils from '../Utils';
    import Player from '../components/Player.vue';
    import ListButtons from './buttons/ListButtons.vue';

    export default {
        mixins: [Utils],
        components: { Player, ListButtons },
        computed:  {
            players() {
                return this.$store.state.players;
            }
        },
        methods: {
            add() {
                this.$store.addPlayer();
            },
            reset() {
                this.$store.resetPlayers();
            },

        }
    }
</script>
