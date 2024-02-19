<template>
    <div>
        <componentHeader></componentHeader>
        <router-view :class="displayMobile ? null : 'container'" />
        <componentFooter></componentFooter>

        <router-view name="componentWorkbench" />
       
        <router-view name="componentImageDialog" />

        <t-back-top 
            style="position: sticky; left: calc(100% - 56px); bottom: 8px;" 
            :visible-height="0" 
            size="small" 
            :offset="[0, 0]"
        >
        
        </t-back-top>
    </div>
</template>

<script>
import componentHeader from './components/header.vue';
import componentFooter from './components/footer.vue';

export default {
    name: 'layout-index',
    computed: {
        displayMobile: function () {return this.$store.getters.getDisplayMobile},
    },
    components: {
        componentHeader,
        componentFooter,
    },
    methods: {
        handleMenu(value) {
            this.$router.push(value);
        },
    },
}
</script>

<style scoped>
.container {
  padding-left: 48px;
  padding-right: 48px;
}
</style>