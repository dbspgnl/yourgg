import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

mongoose.connect(
  'mongodb+srv://test:1234@cluster0-ypgh5.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
);
const connection = mongoose.connection;

autoIncrement.initialize(connection);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const postSchema = new mongoose.Schema(
  {
    seq: Number,
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    content: {
      type: String,
      maxlength: 500,
    },
    date: String,
    name: {
      type: String,
      maxlength: 20,
    },
    replyCtn: Number,
    rcmCtn: Number,
    viewsCtn: Number,
  },
  { timestamps: true },
);

postSchema.plugin(autoIncrement.plugin, {
  model: 'posts',
  field: 'seq',
  startAt: 1,
  increment: 1,
});

postSchema.index({ seq: 1 }, { unique: true });
const PostModel = mongoose.model('Posts', postSchema);

export default PostModel;
