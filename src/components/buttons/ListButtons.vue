<template>
    <div class="ListButtons" v-show="isEditMode">
        <button class="button is-danger is-outlined is-small" @click="$emit('reset')">Reset</button>
        <button class="button is-primary is-outlined is-small" @click="$emit('add')">Add</button>
    </div>
</template>

<script>
    import Utils from '../../Utils';

    export default {
        mixins: [Utils]
    }
</script>