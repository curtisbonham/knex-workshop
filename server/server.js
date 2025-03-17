const express = require('express');
const app = express();
const port = 8081;
const cors = require('cors');

const knex = require('knex')(require('../knexfile')['development']);

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, the application is up and running!');
});

app.get('/all', (req, res) => {
  knex('employees')
  .join('contact_info', 'employees.id', '=', 'contact_info.employee_id')
  .select('*')
  .then(data => res.status(200).json(data));
});

app.get('/employees', (req, res) => {
  knex('employees')
  .select('*')
  .then(data => res.status(200).json(data));
});

app.get('/employees/:id', (req, res) => {
  knex('employees')
  .where({ id: req.params.id })
  .then(data => {
    res.json(data);
  });
});

app.get('/contact', (req, res) => {
  knex('contact_info')
  .select('*')
  .then(data => res.json(data));
});

app.get('/contact/:id', (req, res) => {
  knex('contact_info')
  .where({ employee_id: req.params.id })
  .then(data => res.json(data));
});