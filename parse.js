var csv = require('csv');
var fs = require('fs');


var democracy = fs.readFileSync('democracy.csv');
var facebook = fs.readFileSync('facebook.csv');
var people = fs.readFileSync('people.csv');

var results = {};

csv.parse(democracy, function(err, democracy) {
  democracy = democracy.map(function(reply) {
    return {
      name: reply[1],
      type: reply[3],
      democracy: reply[0],
      democracyPoint: reply[2]
    };
  });

  democracy.map(function(reply) {
    results[reply.name] = {
      type: reply.type,
      democracy: reply.democracy,
      democracyPoint: reply.democracyPoint
    };
  });

  csv.parse(facebook, function(err, facebook) {
    facebook = facebook.map(function(reply) {
      return {
        name: reply[0],
        facebookRequest: reply[1],
        facebookReport: reply[2],
        facebookPercentage: reply[3]
      };
    });

    facebook.map(function(reply) {
      if (!results[reply.name]) {
        results[reply.name] = {};
      }

      results[reply.name].facebookRequest = reply.facebookRequest;
      results[reply.name].facebookReport = reply.facebookReport;
      results[reply.name].facebookPercentage = reply.facebookPercentage;
    });

    csv.parse(people, function(err, people) {
      people = people.map(function(reply) {
        return {
          people: reply[0],
          name: reply[1],
          peopleTotal: reply[2]
        };
      });

      people.map(function(reply) {
        if (!results[reply.name]) {
          results[reply.name] = {};
        }

        results[reply.name].people = reply.people;
        results[reply.name].peopleTotal = reply.peopleTotal;
      });
      
      console.log(results);
    });
  });
});