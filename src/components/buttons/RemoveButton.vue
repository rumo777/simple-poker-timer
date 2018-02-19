<template>
    <i class="fa fa-times-circle-o" v-show="isEditMode"></i>
</template>

<script>
    import Utils from '../../Utils';

    export default {
        mixins: [Utils]
    }
</script>