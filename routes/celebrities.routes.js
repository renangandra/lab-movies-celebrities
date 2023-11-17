const router = require("express").Router();
module.exports = router;  // Fix the export statement

const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model');

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities });
        })
        .catch(err => console.log(err));
});

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities`))
        .catch(err => console.log(err));
});

router.get('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params;
    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', { celebrity }))  // Fix variable name and pass the whole object
        .catch(err => console.log(err));
});

router.post('/:celebrity_id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    const { celebrity_id } = req.params;
    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase }, { new: true })  // Use { new: true } to return the updated document
        .then(celebrity => {
            if (celebrity) {
                res.redirect(`/celebrities`);
            } else {
                res.status(404).send('Celebrity not found');
            }
        })
        .catch(err => console.log(err));
});

router.post('/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params;

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(celebrity => {
            if (celebrity) {
                res.redirect('/celebrities');
            } else {
                res.status(404).send('Celebrity not found');
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;
