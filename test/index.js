'use strict';

var showtimes = require('../');
var test = require('tap').test;
var s = null;

test('no movies available for a date far in the future', function (t) {
  s = showtimes(90504, {
    date: 200
  });

  s.getTheaters(function (err) {
    t.type(err, 'string');
    t.end();
  });
});

// Google Movies apprently doesn't support zip code lookups anymore? ಠ_ಠ
test('no theaters available for bay area zip code', function (t) {
  s = showtimes(94118);

  s.getTheaters(function(err) {
    t.type(err, 'string');
    t.equals(err, 'No movies matched your query.');
    t.end();
  });
});

test('get theaters from zipcode', function (t) {
  s = showtimes(90504, {
    //date: 0
  });

  s.getTheaters(function (err, theaters) {
    t.equal(err, null);
    t.ok(theaters.length > 1);
    t.end();
  });
});

test('get theaters from zipcode and get movie for first movie id', function (t) {
     s = showtimes(90504, {
                   //date: 0
                   });
     
     s.getTheaters(function (err, theaters) {
       t.equal(err, null);
       s.getMovie((theaters[0].movies[0].id), function (err, theaters) {
           t.equal(err, null);
           console.log(theaters[0].showtimes.length > 0);
           t.ok(theaters[0].showtimes);
       });
       t.end();
  });
});

test('get theaters from foreign postal code and theater with no phone number', function (t) {
  s = showtimes('752 01', {
    //date: 0
  });

  s.getTheaters(function (err, theaters) {
    t.equal(err, null);
    t.ok(theaters.length > 1);
    t.end();
  });
});

test('get theaters from lat/long', function (t) {
  s = showtimes('33.8358,-118.3406', {
    //date: 0
  });

  s.getTheaters(function (err, theaters) {
    t.equal(err, null);
    t.ok(theaters.length > 1);
    t.end();
  });
});

test('get theaters from lat/long', function (t) {
  s = showtimes('45.531531531531535,-122.61220863200342', {
    //date: 0
  });

  s.getTheaters(function (err, theaters) {
    t.equal(err, null);
    t.equal(theaters.length, 12);
    t.end();
  });
});
