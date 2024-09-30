const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

const availableRoutes = ['/categories', '/adverts', '/registration'];

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);
server.use(cors({ origin: '*' }));

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {

  try {
    const { phone, password } = req.body;
    const jsonDB = fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8');

    if (!jsonDB) {
      return res.status(500).json({ message: 'Database file is empty' });
    }

    const db = JSON.parse(jsonDB);
    const { users = [] } = db;

    const userFromBd = users.find(
      (user) => user.phone === phone && user.password === password,
    );


    if (userFromBd) {
      return res.json(userFromBd);
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

server.post('/registration', (req, res) => {
  try {
    const { phone, name, password } = req.body;
    const jsonDB = fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8');

    if (!jsonDB) {
      return res.status(500).json({ message: 'Database file is empty' });
    }

    const db = JSON.parse(jsonDB);
    const { users = [] } = db;

    const userFromBd = users.find((user) => user.phone === phone);

    if (userFromBd) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
      id: uuidv4(),
      name: name || '',
      phone: phone || '',
      address: '',
      password: password || ''
    };

    users.push(newUser);

    fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify({ ...db, users }, null, 2));

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
  const isRouteAvailable = availableRoutes.some(routePath => req.path.includes(routePath));

  if (!req.headers.authorization && !isRouteAvailable) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
