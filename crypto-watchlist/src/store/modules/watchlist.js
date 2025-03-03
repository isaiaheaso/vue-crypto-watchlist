import api from '../../api/axios';

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
            api
              .get("/watchlist")
              .then((res) => {
                console.log(res);
                context.commit('setWatchlist', res.data);
              })
              .catch(console.error);
        },
        setCoinToWatchlist(context, data) {
            api
              .post("/watchlist", data)
              .then((res) => {
                console.log(res);
                if (res.status === 200)
                    context.commit('setWatchlist', res.data);
              })
              .catch(console.error);
        },
        removeFromWatchlist(context, id) {
            api
              .delete(`/watchlist/${id}`)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  // Refresh the watchlist after successful deletion
                  context.dispatch('getWatchlist');
                }
              })
              .catch(console.error);
        }
    }
};