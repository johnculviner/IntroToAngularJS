var express = require('express');
var http = require('http');
var path = require('path');
var moment = require('moment');
var _ = require('lodash');
var uuid = require('uuid');

var app = express();
app.use(express.bodyParser());
app.use(express.logger('dev'));
app.use(express.errorHandler());
app.use(express.static(path.join(__dirname, 'public'))); //serve static files from "public"


var people = [
    {
        id: 1,
        firstName: "John",
        lastName: "Culviner"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Doe"
    },
    {
        id: 3,
        firstName: "John",
        lastName: "Doe"
    }
];

var statuses = [
    {
        id: uuid.v4(),
        personId: 1,
        date: moment().subtract('minutes', 65).toDate(),
        text: "Putting the final touches on the Angular.js presentation."
    },
    {
        id: uuid.v4(),
        personId: 1,
        date: moment().subtract('minutes', 150).toDate(),
        text: "Eating a snack."
    },
    {
        id: uuid.v4(),
        personId: 1,
        date: moment().subtract('hours', 18).toDate(),
        text: "Taking a nap."
    },
    {
        id: uuid.v4(),
        personId: 2,
        date: moment().subtract('years', 40).toDate(),
        text: "Born."
    },
    {
        id: uuid.v4(),
        personId: 3,
        date: moment().subtract('years', 40).toDate(),
        text: "Born."
    }
]

app.get('/people', function(req, res) {
    res.send(people)
});

app.post('/people', function(req, res) {
    people.push(_.extend(req.body, { id : _.max(people, 'id').id + 1 }));
    res.send();
});

app.post('/people/:id', function(req, res) {
    var index = people.indexOf(_.findWhere(people, {id : parseInt(req.params.id)}));
    people[index] = req.body;
    res.send();
})

app.get('/people/:id', function(req, res) {
    res.send(_.filter(people, {id: parseInt(req.params.id)})[0]);
})

app.get('/statuses', function(req, res) {
    res.send(_.map(statuses, function(status) {

        var poster = _.find(people, {id: status.personId});

        return _.extend(status, { personName: poster.firstName + " " + poster.lastName})
    }));
})

app.get('/people/:id/statuses', function(req, res) {
    res.send(_.filter(statuses, {personId: parseInt(req.params.id)}))
})

app.post('/people/:id/statuses', function(req, res) {
    statuses.push(_.extend(req.body, { personId : parseInt(req.params.id), id: uuid.v4() }));
    res.send();
});

app.delete('/people/:id/statuses/:statusId', function(req, res) {
    statuses.splice(statuses.indexOf(_.findWhere(statuses, {id: req.params.statusId})), 1);
    res.send();
})

http.createServer(app).listen(1337, function(){
  console.log('Express server listening on port 1337');
});
