import NewsModel from '../models/News.js'

export const getAll = async (req, res) => {
  try{
    const news = await NewsModel.find().populate('user').exec()

    res.json(news)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
}

export const getOne = async (req, res) => {
  try{
    const NewsId = req.params.id;

    NewsModel.findOneAndUpdate({
      _id: NewsId,
    },
    {
      $inc: {viewsCount: 1},
    },
    {
      returnDocument: 'after',
    },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
        message: 'Не удалось вернуть статью',
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: 'Статья не найдена',
        })
      }
      res.json(doc)
    }
    )
   
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
}

export const remove = async (req, res) => {
  try {
    const newsId = req.params.id;

   NewsModel.findOneAndDelete({
    _id: newsId,
   },
   (err, doc) => {
    if (err) {
      console.log(err);
        return res.status(500).json({
        message: 'Не удалось удалить статью',
        });
    };
    if (!doc) {
      return res.status(404).json({
        message: 'статья не найдена',
      });
    }
    res.json({
      success: true,
    });
   },
   );
   
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const create = async (req, res) => {
  try{
     const doc = new NewsModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
     });
     const news = await doc.save();
     
     res.json(news);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const update = async (req, res) => {
  try {
    const newsId = req.params.id;
    await NewsModel.updateOne({
      _id: newsId,
    },{
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,       
    }
    );
    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
}