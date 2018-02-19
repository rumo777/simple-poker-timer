<template>
    <div class="PrizeList">
        <h2 class="has-text-centered title is-2">Prize pool</h2>

        <div class="has-text-centered">
            Buy-in ($)
            <input v-if="isEditMode" v-model="buyIn" class="input is-small" type="number">
            <span v-else>{{ buyIn }}</span>
        </div>

        <div class="table">
            <div class="columns is-mobile is-bold">
                <div class="column">Place</div>
                <div class="column">%</div>
                <div class="column">Payout ($)</div>
            </div>

            <prize v-for="(prize, index) in prizes" :index="index" :prize="prize" :key="index"></prize>

            <div class="columns is-mobile is-bold">
                <div class="column"></div>
                <div class="column">Total</div>
                <div class="column">{{ totalMoney }}</div>
            </div>
        </div>

        <div class="notification is-danger has-text-centered" v-if="warningMessage">
            {{ warningMessage }}
        </div>

        <list-buttons @add="add" @reset="reset"></list-buttons>
    </div>
</template>

<script>
    import Utils from '../Utils';
    import Prize from '../components/Prize.vue';
    import ListButtons from './buttons/ListButtons.vue';

    export default {
        mixins: [Utils],
        components: { Prize, ListButtons },
        computed: {
            warningMessage() {
                let message = '';

                if (this.notEnoughPlayers) {
                    message = 'Not enough players for prize pool';
                } else if (this.totalPercentage < 100) {
                    message = `Your prize pool is too low (${this.totalPercentage}%)`;
                } else if (this.totalPercentage > 100) {
                    message = `Your prize pool is too high (${this.totalPercentage}%)`;
                }

                return message;
            },
            prizes() {
                return this.$store.state.prizes;
            },
            totalMoney() {
                return this.$store.totalMoney;
            },
            totalPercentage() {
                return this.prizes.reduce( (total, prize) => total + Number(prize.part), 0);
            },
            notEnoughPlayers() {
                return this.$store.state.players.length < this.prizes.length;
            },
            buyIn: {
                get() {
                    return this.$store.state.buyIn;
                },
                set(value) {
                    this.$store.state.buyIn = value;
                }
            },
        },
        methods: {
            add() {
                this.$store.addPrize();
            },
            reset() {
                this.$store.resetPrizes()
            }
        }
    }
</script>