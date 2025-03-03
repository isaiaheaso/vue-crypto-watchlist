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
    state: {
        apiBaseUrl: process.env.NODE_ENV === 'production' 
            ? 'https://crypto-watchlist-api.onrender.com/api'
            : 'http://localhost:3000/api'
    },
});

export default store;