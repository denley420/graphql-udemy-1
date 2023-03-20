const express = require('express');
const cors = require('cors');
const models = require('./models');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb+srv://nastasija_admin:m90fl52Telsbjl1E@cluster0.phzwf.mongodb.net/udemy?retryWrites=true&w=majority';
if (!MONGO_URI) {
	throw new Error('You must provide a MongoLab URI');
}
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('Connected to DB'))
	.catch(error => console.error('Mongo Connection Error', error));

app.use(cors());

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config.js');
// app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
