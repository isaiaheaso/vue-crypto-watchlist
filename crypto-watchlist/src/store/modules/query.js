import axios from 'axios';

export default {
    state: {
        coin: {
            _id: "",
            name: "",
            symbol: "",
            image: "",
        },
        searchResultName: "Result",
        searchResultPrice: "Price",
        searchResultPercentChange: "Change",
        searchResultPercentChangeClass: "",
        searchQuery: "",
        searchQueryStatus: 0,
    },

    mutations: {  
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        //convert query to lowercase for API compatibility
        setLowerCaseQuery(state) {
            state.searchQuery = state.searchQuery.toLowerCase();
        },
        setSearchResults(state, resp) {
            // Update Coin Data Object
            state.coin._id = resp.data.id;
            state.coin.name = resp.data.name.toLowerCase();
            state.coin.symbol = resp.data.symbol.toUpperCase();
            state.coin.image = resp.data.image.small;
            // Update Card Data
            state.searchResultName = "Result: " + state.coin.name;
            state.searchResultPrice =
                "Price: $" + resp.data.market_data.current_price.usd.toFixed(2);
            state.searchResultPercentChange =
                "Change: " +
                resp.data.market_data.price_change_percentage_24h.toFixed(2) +
                "%";
            if (resp.data.market_data.price_change_percentage_24h >= 0) {
                state.searchResultPercentChangeClass = "pos";
            } else {
                state.searchResultPercentChangeClass = "neg";
            }  
            state.searchQueryStatus = 0;
        },
        setStatusToLoading(state) {
            state.searchQueryStatus = 1;
            state.coin.image = "";
            state.searchResultPercentChangeClass = "";
        },
        setStatusToError(state) {
            state.searchQueryStatus = -1;
            state.searchResultName = "Result";
            state.searchResultPrice = "Price";
            state.searchResultPercentChange = "Change";
            state.searchResultPercentChangeClass = ""
        }
    },

    getters: {
        hasLoadingStatus: state => {
            return (state.searchQueryStatus = true)
        },
        hasErrorStatus: state => {
            return (state.searchQueryStatus = true)
        },
        getCoin: state => {
            return state.coin
        }
    },

    actions: {
        searchForCoin(context) {
            context.commit('setStatusToLoading');
            axios({
              method: "GET",
              url: `https://api.coingecko.com/api/v3/coins/${context.state.searchQuery}`,
            })
              .then((resp) => {
                context.commit('setSearchResults', resp);
              })
              .catch(() => {
                console.error();
                context.commit('setStatusToError');
              });
        },
        lowerCaseQuery(context) {
            context.commit('setLowerCaseQuery')
        }
    }
}