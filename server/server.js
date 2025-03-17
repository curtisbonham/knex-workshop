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
  .join('contact_info', 'employees.id', '=', 'contact_info.id')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
    message: 'The data you are looking for could not be found. Please try again '
  }))
})


app.get('/employees', (req, res) => {
  knex('employees')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
    message: 'The data you are looking for could not be found. Please try again '
    }))
})


app.get('/employees/:id', (req, res) => {
  knex('employees')
  .where({ id: req.params.id })
  .then(data => res.json(data))
  .catch(err =>
    res.status(404).json({
    message: 'The data you are looking for could not be found. Please try again '
    }))
})

app.get('/contact', (req, res) => {
  knex('contact_info')
  .select('*')
  .then(data => res.json(data))
  .catch(err =>
    res.status(404).json({
    message: 'The data you are looking for could not be found. Please try again '
    }))
})


app.get('/contact/:id', (req, res) => {
  knex('contact_info')
  .where({ employee_id: req.params.id })
  .then(data => res.json(data))
  .catch(err =>
    res.status(404).json({
    message: 'The data you are looking for could not be found. Please try again '
    }))
})

app.post('/employees', (req, res) => {
  knex('employees')
    .insert(req.body)
    .then(data => res.status(201).json('Employee added'))
    .catch(err =>
      res.status(400).json({
        message: 'The employee data could not be added. Please try again',
        error: err.message
      })
    );
});

app.post('/contact', async (req, res) => {
  const {last_name, phone_number, email, address} = req.body;
  try {
    const employee = await knex('employees')
    .where({last_name: last_name})
    .select('id');
    if (!employee){
      return res.status(404).json({message: 'Employee not found. Please provide a valid employee name'
      });
  }
   await knex('contact_info').insert({
      email,
      address,
      phone_number,
      employee_id: employee.id
    });
    res.status(201).json('Contact Information added');
    } catch(err) {
        res.status(400).json({
        message: 'The contact data could not be added. Please try again',
        error: err.message
      });
    }
    });

    app.put('/employee/:id', (req, res) => {
      knex('employees')
      .update(req.body)
      .where({id: req.params.id})
      .then(data => res.status(201).send('Employee updated'))
      .catch(err =>
        res.status(404).json({
        message: 'The employee data could not be updated. Please try again'
        }))
    });

    app.put('/contacts/:id', (req, res) => {
      knex('contact_info')
      .update(req.body)
      .where({id: req.params.id})
      .then(data => res.status(201).send('Contact information updated'))
      .catch(err =>
        res.status(404).json({
        message: 'The contact data could not be updated. Please try again'
        }))
    });

app.delete('/employees/:id', (req, res) => {
  knex('employees')
  .where({ id: req.params.id })
  .delete('*')
  .then(() => res.status(200).send('Employee deleted'))
  .catch(err => res.status(404).json({
    message: 'The data could not be deleted. Please try again'
    }))
});

app.delete('/contact/:id', (req, res) => {
  knex('contact_info')
  .where({ id: req.params.id })
  .delete('*')
  .then(() => res.status(200).send('Contact Information deleted'))
  .catch(err => res.status(404).json({
    message: 'The data could not be deleted. Please try again'
    }))
});