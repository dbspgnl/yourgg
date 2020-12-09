import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
import posts from './api/posts.js';
import reply from './api/reply.js';
import docs from './utils/api-doc.js';
//import autoIncrement from 'mongoose-auto-increment';
//DB
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// mongoose.connect(
//   'mongodb+srv://test:1234@cluster0-ypgh5.mongodb.net/test?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true, //deprecatedError 방지
//     useUnifiedTopology: true,
//   },
// );
// mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true);

// mongoose.connect(
//   'mongodb+srv://test:1234@cluster0-ypgh5.mongodb.net/test?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true },
// );
// mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);
// export const connection = mongoose.connection;
// autoIncrement.initialize(connection);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // 중첩된 객체 허용
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('...서버 가동!');
});

app.use('/posts', posts);
app.use('/reply', reply);
app.use('/api', docs);

app.listen(3000);
console.log('Server is running');
