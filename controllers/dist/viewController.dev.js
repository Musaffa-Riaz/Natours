"use strict";

var Tour = require('../models/tourModel');

var catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(function _callee(req, res, next) {
  var tours;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Tour.find());

        case 2:
          tours = _context.sent;
          // Build Template
          // Rander tath tamplate using  tour data from 1)
          res.status(200).render('overview', {
            title: 'All Tours',
            tours: tours
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

exports.getTour = function (req, res) {
  res.status(200).render('tours', {
    title: 'The Forest Hiker Tour'
  });
};