import { Router } from 'express';
import PostModel from '../models/PostModel';

const router = Router();

router.get('/api', async (req, res) => {
  console.log('Post-api진입');
  res.send('Post-api응답!');
});

router.get('/', async (req, res) => {
  console.log('리스트 호출');
  try {
    const docs = await PostModel.find()
      .sort({ seq: -1 })
      .lean() //json 객체
      .exec(); //실행
    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

router.post('/write', async (req, res) => {
  console.log('쓰기 실행');
  try {
    const doc = await PostModel.create({
      ...req.body,
      date: today(),
      replyCtn: 0,
      rcmCtn: 0,
      viewsCtn: 0,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: '오류가 발생했습니다.', error });
  }
});

router.get('/detail/:id', async (req, res) => {
  console.log('디테일 호출 글번호: ' + req.params.id);
  //console.log(req.user._id);
  //console.log(req);
  try {
    const docs = await PostModel.findOne({
      seq: req.params.id,
    })
      .lean() //json 객체
      .exec(); //실행
    if (!docs) {
      return res.status(400).json({ message: '해당되는 자료가 없다' });
    }
    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('글 삭제 번호:' + req.params.id);
  try {
    const removed = await PostModel.findOneAndRemove({
      seq: req.params.id,
    })
      .lean()
      .exec();
    if (!removed) {
      return res.status(400).json({ message: '지울 데이터가 없습니다' });
    }
    return res.status(200).json({ ...removed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '오류가 발생했습니다.', error });
  }
});

router.put('/:id', async (req, res) => {
  console.log('글 수정 번호:' + req.params.id);
  try {
    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        seq: req.params.id,
      },
      req.body,
      { new: true },
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).json({ message: '수정할 데이터가 없습니다.' });
    }

    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

router.put('/rcm/:id', async (req, res) => {
  console.log('추천수++');
  try {
    const find = await PostModel.findOne({
      seq: req.params.id,
    })
      .lean()
      .exec();
    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        seq: req.params.id,
      },
      { rcmCtn: find.rcmCtn + 1 },
      { new: true },
    )
      .lean()
      .exec();
    if (!updatedDoc) {
      return res.status(400).json({ message: '수정할 데이터가 없습니다.' });
    }
    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

router.put('/view/:id', async (req, res) => {
  console.log('조회수++');
  try {
    const find = await PostModel.findOne({
      seq: req.params.id,
    })
      .lean()
      .exec();
    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        seq: req.params.id,
      },
      { viewsCtn: find.viewsCtn + 1 },
      { new: true },
    )
      .lean()
      .exec();
    if (!updatedDoc) {
      return res.status(400).json({ message: '수정할 데이터가 없습니다.' });
    }
    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

router.put('/reply/:id', async (req, res) => {
  console.log('댓글수++');
  try {
    const find = await PostModel.findOne({
      seq: req.params.id,
    })
      .lean()
      .exec();
    const updatedDoc = await PostModel.findOneAndUpdate(
      {
        seq: req.params.id,
      },
      { replyCtn: find.replyCtn + 1 },
      { new: true },
    )
      .lean()
      .exec();
    if (!updatedDoc) {
      return res.status(400).json({ message: '수정할 데이터가 없습니다.' });
    }
    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

function today() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const months = month < 10 ? '0' + month : month;
  const day = new Date().getDate();
  const days = day < 10 ? '0' + day : day;
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const today = year + '-' + months + '-' + days + ' ' + hours + ':' + minutes;
  return today;
}

export default router;
