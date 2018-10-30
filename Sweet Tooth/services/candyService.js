const candies = require('../data/data').candies;

const candyService = () => {

    // Get all the candy
    const getAllCandies = () => candies;

    // Get candy by id
    const getCandyById = (id) => {
        const candy = candies.filter(u => u.id == id);
        if (candy.length === 0) {return -1};
        return candy[0];
    };

    // Create new candy
    const createCandy = (candy) => {
        let lastId = 0;
        candies.forEach(u => { if(u.id > lastId) {lastId = u.id;}});
        candy.id = lastId + 1;
        candies.push(candy);
        return candy;
    };

    return {
        getAllCandies,
        getCandyById,
        createCandy
    };
};

module.exports = candyService();