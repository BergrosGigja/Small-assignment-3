const pinatas = require('../data/data').pinatas;

const pinataService = () => {

    // Change the output for pinatas, to hide the surprise
    const changePinata = (id, name, max, curr) => {
        var pina = {
            "id" : id,
            "name" : name,
            "maximumHits" : max,
            "currenthits" : curr
        }
        return pina;
    }

    // Get all pinatas
    const getAllPinatas = () => {
        var outPinatas = []
        pinatas.forEach(function(u, i) {
            if(pinatas[i].currentHits === undefined) {
                pinatas[i].currentHits = 0;
            }
            const pina = changePinata(pinatas[i].id, pinatas[i].name, pinatas[i].maximumHits, pinatas[i].currentHits);
            outPinatas.push(pina)
        });
        return outPinatas
    }

    // Get pinata by Id
    const getPinataById = (id) => {
        const pinata = pinatas.filter(u => u.id == id);
        if (pinata.length === 0) {return -1};
        if(pinata[0].currentHits === undefined) {
            pinata[0].currentHits = 0;
        }
        return pinata[0]
    };

    // Create a new pinata
    const createPinata = (pinata) => {
        let lastId = 0;
        pinatas.forEach(u => { if(u.id > lastId) {lastId = u.id;}});
        pinata.id = lastId + 1; 
        pinata.currentHits = 0;
        pinatas.push(pinata);
        return pinata;
    };

    // Hit the pinata
    const hitPinata = (id, pinata) => {
        pinatas.forEach((pinata, i, pinataArr) => {
            if(pinata.id == id) {
                const curr = pinataArr[i];
                if(curr.currentHits < curr.maximumHits) {
                    curr.currentHits += 1;
                }
            }
        });
    }

    return {
        getAllPinatas,
        getPinataById,
        changePinata,
        createPinata,
        hitPinata
    };
};

module.exports = pinataService();