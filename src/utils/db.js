import mongoose from 'mongoose';
import logger from './logger'

mongoose.Promise = global.Promise;

const uri = "mongodb://localhost/contact";
//const uri = process.env.NODE_ENV == 'development' ? "mongodb://localhost/contact" : connection_url;
// const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds215910.mlab.com:15910/contact`
const env = "dev"
const connection = mongoose.connect(uri);

connection
	.then(db => {
		logger.info(
			`Successfully connected to ${uri} MongoDB cluster in ${
			env
			} mode.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			logger.info('Attempting to re-establish database connection.');
			mongoose.connect(uri);
		} else {
			logger.error('Error while attempting to connect to database:');
			logger.error(err);
		}
	});

export default connection;
