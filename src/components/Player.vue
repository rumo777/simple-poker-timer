<template>
    <div :class="['Player columns is-mobile', { 'is-terminated': !player.inGame }]">
        <div class="column">
            <input v-if="isEditMode" v-model="player.name" class="input is-small is-fullwidth">
            <div v-else class="field">
                <div class="control">
                    <div class="b-checkbox is-info">
                        <input :id="`player-${index}`" class="styled" type="checkbox" v-model="player.inGame">
                        <label :for="`player-${index}`">
                            {{ player.name }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="column top-ups">
            <i class="fa fa-minus-circle action" @click="removeTopUp" v-show="!isEditMode"></i>
            {{ player.topUps }}
            <i class="fa fa-plus-circle action" @click="addTopUp" v-show="!isEditMode"></i>
        </div>

        <div class="column">
            {{ spent }} <remove-button @click.native="remove"></remove-button>
        </div>
    </div>
</template>

<script>
    import Utils from '../Utils';
    import RemoveButton from './buttons/RemoveButton.vue';

    export default {
        mixins: [Utils],
        components: {RemoveButton},
        props: ['player', 'index'],
        computed: {
            spent() {
                return ( Number(this.player.topUps) + 1 ) * Number(this.$store.state.buyIn);
            }
        },
        methods: {
            addTopUp() {
                this.player.topUps++;
            },
            removeTopUp() {
                if (this.player.topUps)
                this.player.topUps--;
            },
            remove() {
                this.$store.removePlayer(this.index);
            }
        }
    }

</script>