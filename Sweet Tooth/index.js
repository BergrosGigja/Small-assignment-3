const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = 3000;
const candyService = require('./services/candyService');
const offerService = require('./services/offerService');
const pinataService = require('./services/pinataService');

// Get all candies
// http://localhost:3000/api/candies
router.get('/candies', (req, res) => {
    return res.json(candyService.getAllCandies());
});

// Create new candy
// http://localhost:3000/api/candies
// add json object in body
router.post('/candies', (req, res) => {
    const {body} = req;
    candy = candyService.createCandy(body);
    return res.json(candy).status(201).send();
});

// Get candy by id
// http://localhost:3000/api/candies/{id}
router.get('/candies/:id', (req, res) => {
    const {id} = req.params;
    const candy = candyService.getCandyById(id);
    if(candy === -1) {return res.status(404).send();}
    return res.json(candy);
});

// Get all offers
// http://localhost:3000/api/offers
router.get('/offers', (req, res) => {
    return res.json(offerService.getAllOffers());
});

// Get all pinatas
// http://localhost:3000/api/pinatas
router.get('/pinatas', (req, res) => {
    return res.json(pinataService.getAllPinatas());
});

// Create new pinata
// http://localhost:3000/api/pinatas
// add json object in body
router.post('/pinatas', (req, res) => {
    const {body} = req;
    pinata = pinataService.createPinata(body);
    return res.json(pinata).status(201).send();
});

// Get pinata by id
// http://localhost:3000/api/pinatas/{id}
router.get('/pinatas/:id', (req, res) => {
    const {id} = req.params;
    const pinata = pinataService.getPinataById(id);
    if(pinata === -1) {return res.status(404).send();}
    const outPinata = pinataService.changePinata(pinata.id, pinata.name, pinata.maximumHits, pinata.currentHits);
    return res.json(outPinata);
});

// Hit the pinata
// http://localhost:3000/api/pinatas/{id}/hit
router.patch('/pinatas/:id/hit', (req, res) => {
    const {id} = req.params;
    const pinata = pinataService.getPinataById(id);
    if(pinata === -1) {return res.status(404).send();}
    const currHits = pinata.currentHits;

    // If the pinata has already been hit maximum times
    if(pinata.currentHits == pinata.maximumHits){
        return res.status(423).send();
    }

    pinataService.hitPinata(id, pinata);
    if(pinata.currentHits == pinata.maximumHits){
        return res.json(pinata.surprise).status(200).send();
    } else if(pinata.currentHits > currHits) {
        return res.status(204).send();
    }
});

app.use(bodyParser.json());
app.use('/api', router);

app.listen(port || process.env.PORT, () => {
    console.log("Listening on port ", port);
});
