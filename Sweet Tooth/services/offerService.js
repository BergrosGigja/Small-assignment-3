const offers = require('../data/data').offers;
const candyService = require('./candyService');

const offerService = () => {

    // Get all offers
    const getAllOffers = () => {
        offers.forEach(function(u, i) {
            u.candies.forEach(function (y, x) {
                offers[i].candies[x] = candyService.getCandyById(y);
            });
        });
        return offers
    }

    return {getAllOffers};
};

module.exports = offerService();