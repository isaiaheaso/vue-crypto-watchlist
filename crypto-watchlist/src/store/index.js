import Vue from 'vue';
import Vuex from 'vuex';
import watchlist from "./modules/watchlist.js"
import query from "./modules/query.js"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        query,
        watchlist  
    },
});

export default store;