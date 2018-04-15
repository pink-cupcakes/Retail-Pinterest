const express = require('express');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//initialize express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`${__dirname}./../dist`));

//saving dummy data on server
let dummyData;
fs.readFile(path.join(__dirname, '..', 'items.json'), 'utf8', (err, data) => {
  if (err) throw err;
  dummyData = JSON.parse(data);
})
//This dummy data would ideally be parsed and initialized into a database
/*
  Given the potential future relational queries, I would recommend
  a relational database such as Postgres or mySQL so we can query for all comments
  from a given user or all items from a given owner.
*/

//ROUTES
app.get('/', (req, res) => res.send('Server Message!'));

app.get('/items', (req, res) => res.send(dummyData));

app.post('/comment', (req, res) => {
  let index = req.body.index - 1;
  let comment = {
    user: req.body.user,
    text: req.body.text
  };
  if (!dummyData[index].comments) {
    dummyData[index].comments = [comment];
  } else {
    dummyData[index].comments.push(comment);
  };
  /*
    This ideally would be pushed into say, a comments database that - if using a SQL
    database, would include a foreign key to an item unique id and user unique id.
    i.e. `INSERT INTO comments (itemid, userid, content) VALUES ('${req.body.item}', '${req.body.user}', '${req.body.text}')`
  */
  res.send(dummyData[index]);
})

//Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports.app = app;