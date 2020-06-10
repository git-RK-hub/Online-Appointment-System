const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

console.log(`---${app.get('env')}---`); // environment variable = development

// console.log(process.env); All environment variable

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Reload the server');
  console.log(err.name, err.message);
  process.exit(1);
});

// Change database variables in config.env file -- 

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    //console.log(con.connections);
    console.log('---Database Connected---');
  });
const port = process.env.PORT || 80;

app.listen(port, '127.0.0.1', (err) => {
  console.log(`---Listening to port ${port}---`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDELED REJECTION! Try to reload the server');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
