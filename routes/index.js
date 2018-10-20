var express = require('express');
var router = express.Router();

router.post('/adduser', function(req, res) {
    var userName = req.body.username;
    var userUbid = req.body.ubid;
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("userinformation");
        collection.insert({
            "username" : userName,
            "ubid" : userUbid
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.redirect("userlist");
            }
        });
        client.close();
      });
});


router.post('/deluser', function(req, res) {
    var userName = req.body.username;
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("userinformation");
        collection.findOneAndDelete({
            "username" : userName,
        }, function (err, doc) {
            if (err) {
                print(err)
                res.send("There was a problem finding the information to the database.");
            }
            else {
                res.redirect("userlist");
            }
        });
        client.close();
      });

});

router.post('/newmotion', function(req, res) {
    var motionTitle = req.body.motiontitle;
    var motionDescription = req.body.motiondescription;
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("motions");
        collection.insert({
            "motiontitle" : motionTitle,
            "motiondescription" : motionDescription
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding the motion to the database.");
            }
            else {
                res.redirect("listmotions");
            }
        });
        client.close();
      });
});

router.get('/userlist', function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("userinformation");
        collection.find({}).toArray(function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
        client.close();
      });
});

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.get('/deluser', function(req, res) {
  res.render('deluser', { title: 'Delete a User'})
});

router.get('/newmotion', function(req, res) {
  res.render('newmotion', { title: 'Submit a Motion'})
});

router.get('/listmotions', function(req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("motions");
        collection.find({}).toArray(function(e,docs){
            res.render('listmotions', {
                "listmotions" : docs
            });
        });
        client.close();
      });
});

router.get('/vote/:motion', function(req, res){
    var motion = req.params.motion

    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
      MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("motions");
          collection.find({"motiontitle": motion}).toArray(function(e,docs){
            res.render('vote', {
                "motion" : docs[0], 
            });
        });
        client.close();
      });


});

submit_votes = router.post('/:motion/submitvote', function(req, res){
    var motion = req.params.motion;
    var vote = req.body.vote;
   
    var MongoClient = require('mongodb').MongoClient;
    var uri = "mongodb+srv://srini:srini55@bigredcluster-q026c.mongodb.net/testConnect?retryWrites=true";
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
        const collection = client.db("testConnect").collection("motions");
        collection.update({"motiontitle": motion}, {$inc: { [vote] : 1} });
    res.redirect('/listmotions');

});
});



module.exports = router;
