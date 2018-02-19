<template>
    <div class="Prize columns is-mobile">
        <div class="column">{{ index + 1  }}</div>

        <div class="column">
            <input v-if="isEditMode"
                   v-model="prize.part"
                   class="input is-small"
                   type="number">
            <span v-else>{{ prize.part }}</span>
        </div>

        <div class="column">
            {{ payout }} <remove-button @click.native="remove"></remove-button>
        </div>
    </div>
</template>

<script>
    import Utils from '../Utils';
    import RemoveButton from './buttons/RemoveButton.vue';

    export default {
        mixins: [Utils],
        components: {RemoveButton},
        props: ['prize', 'index'],
        computed: {
            payout() {
                return this.prize.part * this.$store.totalMoney / 100;
            },
        },
        methods: {
            remove() {
                this.$store.removePrize(this.index);
            }
        }
    }
</script>