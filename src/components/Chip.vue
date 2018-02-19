<template>
    <div class="Chip columns is-mobile">
        <template v-if="isEditMode">

            <div class="column">
                <input v-model="chip.color"
                       class="input is-small is-fullwidth"
                       :style="{'border-color': chip.color}">
            </div>
            <div class="column">
                <input v-model="chip.value" class="input is-small" type="number">
            </div>
            <div class="column">
                <input v-model="chip.amount" class="input is-small" type="number">
                <remove-button @click.native="remove"></remove-button>
            </div>

        </template>
        <template v-else>

            <div class="column">
                <span class="icon">
                    <i class="fa fa-stop-circle-o" :style="{'color': chip.color}"></i>
                </span>
            </div>
            <div class="column">
                {{ chip.value }}
            </div>
            <div class="column">
                {{ chip.amount }}
            </div>

        </template>
    </div>
</template>


<script>
    import Utils from '../Utils.js'
    import RemoveButton from './buttons/RemoveButton.vue';

    export default {
        mixins: [Utils],
        components: {RemoveButton},
        props: ['chip', 'index'],
        methods: {
            remove() {
                this.$store.removeChip(this.index);
            }
        }
    }
</script>