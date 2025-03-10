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
            return Array.isArray(state.watchlist) && state.watchlist.length > 0
        },
        watchlist: state => {
            return state.watchlist || []
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
                if (res.status === 201) {
                    context.dispatch('getWatchlist');
                }
              })
              .catch(console.error);
        },
        removeFromWatchlist(context, id) {
            console.log('Attempting to delete coin with ID:', id);
            api
              .delete(`/watchlist/${id}`)
              .then((res) => {
                console.log('Delete response:', res);
                if (res.status === 200) {
                  context.dispatch('getWatchlist');
                }
              })
              .catch((error) => {
                console.error('Delete failed:', error);
              });
        }
    }
};