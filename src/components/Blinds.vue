<template>
    <div :class="['Blinds columns is-mobile', {'is-bold': isCurrentLevel}]">
        <div class="column">
            {{ level + 1 }}
        </div>

        <template v-if="isEditMode">

                <div class="column">
                    <input v-model="blinds.small" class="input is-small" type="number">
                    / <input v-model="blinds.big" class="input is-small" type="number">
                </div>
                <div class="column">
                    <input v-model="blinds.duration" class="input is-small" type="number">
                    <remove-button @click.native="remove"></remove-button>
                </div>

        </template>
        <template v-else>

                <div class="column" @click="setLevel">
                    {{ blinds.small }} / {{ blinds.big }}
                </div>
                <div class="column">
                    {{ blinds.duration }}
                </div>

        </template>
    </div>
</template>


<script>
    import Utils from '../Utils';
    import RemoveButton from './buttons/RemoveButton.vue';

    export default {
        mixins: [Utils],
        components: {RemoveButton},
        props: ['blinds', 'level'],
        computed: {
            isCurrentLevel() {
                return !this.isEditMode && this.$store.state.currentBlindsLevel === this.level;
            }
        },
        methods: {
            remove() {
                this.$store.removeBlinds(this.level);
            },
            setLevel() {
                this.$store.setBlindsLevel(this.level);
            }
        }
    }
</script>