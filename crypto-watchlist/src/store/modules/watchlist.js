import axios from "axios";

export default {    
    state: {
        watchlist: []
    },

    mutations: {
        /**
         * Set the watchlist to coins from server
         * @param {Object} state The state.
         * @param {Array} watchlist The array of coins.
         */  
        setWatchlist(state, watchlist) {
            state.watchlist = watchlist;
        }
    },

    getters: {
        hasWatchlist: state => {
            return state.watchlist.length > 0
        },
        watchlist: state => {
            return state.watchlist
        }
    },

    actions: {
        getWatchlist(context) {
            axios
              .get("http://localhost:8000/watchlist")
              .then((res) => {
                console.log(res);
                context.commit('setWatchlist', res.data);
              })
              .catch(console.error);
        },
        setCoinToWatchlist(context, data) {
            axios
              .post("http://localhost:8000/watchlist", data)
              .then((res) => {
                console.log(res);
                if (res.status === 200)
                    context.commit('setWatchlist', res.data);
              })
              .catch(console.error);
        },
        removeFromWatchlist(context, name) {
            axios.delete("http://localhost:8000/watchlist", {params: {name: name}})
              .then((res) => {
                console.log(res);
                if (res.status === 200)
                  context.commit('setWatchlist', res.data);
              })
              .catch(console.error);
        }
    }
};