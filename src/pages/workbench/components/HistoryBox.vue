<template>
    <t-card style="position: absolute; left: 8px; right: 0; top: 8px; bottom: 8px;">
        <t-row :gutter="[16, 16]" style="position: absolute; left: 8px; right: 8px; top: 8px; bottom: 8px; overflow-y: scroll;">
            <!-- <t-col v-for="index in 20" :key="index" :span="4">
                <componentImageCard />
            </t-col> -->

            <!-- <componentModelsManager :props="{ name: '我的图片' }" /> -->
        </t-row>
    </t-card>
</template>

<script>
// import componentImageCard from './components/ImageCard.vue'

// import componentModelsManager from '@/components/filter/ModelsManager.vue'

export default {
    name: 'componentHistoryBox',
    components: {
        // componentImageCard
        // componentModelsManager
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        displayWorkbenchSmall: function () {
            return this.$store.getters.getDisplayWorkbenchSmall
        },
    },
    props: {
    },
    
}
</script>

<style scoped>
.card_container {
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
</style>