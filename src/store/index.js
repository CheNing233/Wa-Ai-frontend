import Vue from 'vue'
import Vuex from 'vuex'

import Workbench from './modules/Workbench.js'
import FlexSize from './modules/FlexSize.js'
import PromptsCollector from './modules/PromptsCollector.js'
import ImageDialog from './modules/ImageDialog.js'

import User from './modules/User.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Workbench,
    FlexSize,
    PromptsCollector,
    ImageDialog,

    User
  }
})

export default store