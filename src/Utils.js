// Global mixin
export default {
    computed: {
        isEditMode() {
            return this.$store.state.isEditMode;
        },
        isSound() {
            return this.$store.state.isEditMode;
        },
        // for debugging
        _state() {
            return this.$store.state;
        },
    }
}