const PromptsCollector = {
    namespace: true,
    state: {
        selectTags: []
    },
    mutations: {
        // @params: { label: string, value: string, weight: int }
        collectorAddTag(state, payload) {
            state.selectTags.push(payload);
        },
        // @params: value: string
        collectorDeleteTag(state, index) {
            state.selectTags.splice(index, 1);
        },
        collectorClearTags(state) {
            state.selectTags = [];
        },
        collectorIncreseTagWeight(state, index) {
            var num = state.selectTags[index].weight + 0.1;
            num = parseFloat(num.toFixed(1));
            state.selectTags[index].weight = num;
        },
        collectorDecreaseTagWeight(state, index) {
            var num = state.selectTags[index].weight - 0.1;
            num = parseFloat(num.toFixed(1));
            state.selectTags[index].weight = num;
        },
    },
    actions: {},
    getters: {
        getCollector(state) {
            return state.selectTags;
        },
    },
}

export default PromptsCollector