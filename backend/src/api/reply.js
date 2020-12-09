import { Router } from 'express';
import ReplyModel from '../models/ReplyModel';

const router = Router();

router.get('/api', async (req, res) => {
  console.log('Reply-api진입');
  res.send('Reply-api응답!');
});

router.get('/:id', async (req, res) => {
  console.log('댓글 모두 호출');
  try {
    const docs = await ReplyModel.find({
      list_num: req.params.id,
    })
      .lean() //json 객체
      .exec(); //실행
    res.status(200).json({
      result: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

router.post('/write', async (req, res) => {
  console.log('댓글 쓰기');
  try {
    const doc = await ReplyModel.create({
      ...req.body,
      group_num: 0,
      group_order: 1,
    });
    const find = await ReplyModel.find({
      list_num: req.body.list_num,
    });
    const updatedDoc = await ReplyModel.findOneAndUpdate(
      {
        seq: doc.seq,
      },
      { group_num: find.length },
      { new: true },
    )
      .lean()
      .exec();

    res.status(201).json({ data: updatedDoc });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: '오류가 발생했습니다.', error });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('댓글 삭제 번호:' + req.params.id);
  try {
    const removed = await ReplyModel.findOneAndRemove({
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
  console.log('댓글 수정 번호:' + req.params.id);
  try {
    const updatedDoc = await ReplyModel.findOneAndUpdate(
      {
        seq: req.params.id,
      },
      req.body.data,
      { new: true },
    )
      .lean()
      .exec();
    console.log(req.body.data);
    //console.log(req);
    console.log(updatedDoc);
    if (!updatedDoc) {
      return res.status(400).json({ message: '수정할 데이터가 없습니다.' });
    }
    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: '오류가 발생했습니다.', error });
  }
});

export default router;
