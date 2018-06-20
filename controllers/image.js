const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cc43b38b55224d98a4d5d17164fe4940'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			console.log(data);
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImagePut: handleImagePut,
	handleApiCall
};