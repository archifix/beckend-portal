import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {registerValidation, loginValidation, newsCreateValidation} from './validations.js'
import {checkAuth, handleValidationErrors} from './utils/index.js';
import {UserController, NewsController} from './controllers/index.js'


mongoose.connect(
  'mongodb://root:GBY4th@127.0.0.1:27017/portal?authSource=admin&w=majority',
).then(() => {
  console.log('DB OK')
})
.catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) =>{
    cb(null, 'uploads');
  },
  filename: (_, file, cb) =>{
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.get('/news', NewsController.getAll);
app.get('/news/:id', NewsController.getOne);
app.post('/news', checkAuth, newsCreateValidation, handleValidationErrors, NewsController.create);
app.delete('/news/:id', checkAuth, NewsController.remove);
app.patch('/news/:id', checkAuth, newsCreateValidation, handleValidationErrors, NewsController.update);



app.listen(3030, (err) =>{
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});