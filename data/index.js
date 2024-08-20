const jsonServer = require('json-server');

const vehicles = require('./vehicles');
const vehiclesHistory = require('./vehicles/history');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const accessToken =
  '1ydNt7Ygy5/iXFJug5K2LVWLQ3cwT319mU49AAyEBmVZ6v/rbuWwM6BAZgopOuosvjyrxKxL2zuwT9MF6f/sBQ==';

server.use(jsonServer.bodyParser);
server.use(middlewares);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function validateAuth(request, response) {
  const isValid = request.headers.authorization === `Bearer ${accessToken}`;
  if (!isValid) response.status(401).json({message: 'Acesso não autorizado'});
  return isValid;
}

server.get('/vehicles', (request, response) => {
  if (!validateAuth(request, response)) return;

  response.status(200).json(vehicles);
});

server.get('/vehicles/history', (request, response) => {
  if (!validateAuth(request, response)) return;

  response.status(200).json(vehiclesHistory);
});

server.get('/profile', (request, response) => {
  if (!validateAuth(request, response)) return;

  return response
    .status(200)
    .json({name: 'USER TESTE', email: 'TEST@TEST.COM.BR'});
});

server.post('/login', (request, response) => {
  if (
    request.body.email === 'test@test.com.br' &&
    request.body.password === '123456'
  ) {
    response.status(200).json({
      id_token: accessToken,
    });
  }
  const caseId = getRandomInt(3);

  switch (caseId) {
    case 1:
      response.status(500).json({message: 'Internal server error'});
      break;
    case 2:
      setTimeout(() => response.status(504).json(), 20_000);
      break;
    case 3:
      if (
        request.body.email === 'test@test.com.br' &&
        request.body.password === '12345'
      ) {
        response.status(200).json({
          id_token: accessToken,
        });
      } else {
        response.status(401).json({message: 'Usuário ou senha inválidos'});
      }
      break;
    default:
      response.status(500);
  }
});

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
