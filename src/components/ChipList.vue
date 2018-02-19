<template>
    <div class="ChipList">
        <h2 class="has-text-centered title is-2">Chips</h2>

        <div class="table">
            <div class="columns is-mobile is-bold">
                <div class="column">Color</div>
                <div class="column">Value</div>
                <div class="column">Amount</div>
            </div>

            <chip v-for="(chip, i) in chips" :chip="chip" :key="i" :index="i"></chip>

            <div class="columns is-mobile is-bold">
                <div class="column">Total</div>
                <div class="column">{{ stackValue }}</div>
                <div class="column">{{ amount }}</div>
            </div>
        </div>

        <list-buttons @add="add" @reset="reset"></list-buttons>
    </div>
</template>

<script>
    import Utils from '../Utils';
    import Chip from '../components/Chip.vue';
    import ListButtons from './buttons/ListButtons.vue';

    export default {
        mixins: [Utils],
        components: {Chip, ListButtons},
        computed: {
            chips() {
                return this.$store.state.chips;
            },
            stackValue() {
                return this.$store.initialStackValue;
            },
            amount() {
                return this.chips.reduce((total, chip) => total + Number(chip.amount), 0);
            }
        },
        methods: {
            add() {
                this.$store.addChip();
            },
            reset() {
                this.$store.resetChips();
            }
        }
    }
</script>