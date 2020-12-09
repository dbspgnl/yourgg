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

const replySchema = new mongoose.Schema(
  {
    seq: Number,
    list_num: {
      type: Number,
      ref: 'posts',
      required: true,
    },
    group_num: Number,
    group_order: Number,
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    content: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

replySchema.plugin(autoIncrement.plugin, {
  model: 'reply',
  field: 'seq',
  startAt: 1,
  increment: 1,
});

replySchema.index({ seq: 1 }, { unique: true });
const ReplyModel = mongoose.model('Reply', replySchema);

export default ReplyModel;
