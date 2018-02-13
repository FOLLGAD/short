require('dotenv').config()

let app = require('express')()
let utils = require('./utils')

let Datastore = require('nedb'),
	db = new Datastore({ filename: './short.db', autoload: true });

let log = console.log
let port = process.env.PORT
let linkLength = 8

let jsonParser = require('body-parser').json()

let requireAuth = (req, res, next) => (req.headers.password == process.env.PASSWORD ? next() : res.status(401).send());

app.get('/', (req, res) => {
	db.find({}, (err, links) => {
		res.json(links)
	})
})

app.post('/', requireAuth, jsonParser, (req, res) => {
	let url = req.body.url

	if (url) {
		url = /^https?:\/\//.test(url) ? url : `http://${url}`
		let id = utils.randomString(linkLength)
		db.insert({ url, createdAt: new Date(), visits: 0, _id: utils.randomString(linkLength) }, (err, link) => {
			res.status(201).json(link)
		})
	} else {
		res.status(400).send()
	}
})

app.get('/:id', (req, res) => {
	db.findOne({ _id: req.params.id }, (err, link) => {
		if (link && !err) {
			res.redirect(link.url)
			db.update({ _id: req.params.id }, { $inc: { visits: 1 } })
		} else {
			res.status(404).send()
		}
	})
})

app.delete('/:id', requireAuth, (req, res) => {
	db.remove({ _id: req.params.id }, (err, n) => {
		n > 0 ? res.status(204).send() : res.status(404).send()
	})
})

app.listen(port, () => log(`Short is up on port: ${port}`))