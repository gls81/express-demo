var express = require('express');
var router = express.Router();
var connection = require('./../config/db.config');
 
// display shows page
router.get('/', function(req, res, next) {
      
  connection.query('SELECT * FROM shows',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/shows.ejs
            res.render('shows',{data:''});   
        } else {
            // render to  views/shows.ejs
            res.render('shows',{data:rows});
        }
    });
});

// display add show page
router.get('/add', function(req, res, next) {    
    // render to add.ejs
    res.render('add', {
        title: '',
        service: '',
        seasons: '' ,
        rating: ''       
    })
})

router.get('/detail/(:id)', function(req, res, next) {

  let id = req.params.id;
   
  connection.query('SELECT * FROM shows WHERE id =' + id, function(err, rows) {
      //if(err) throw err
      if (err) {
          // set flash message
          req.flash('error', err)
          // redirect to shows page
          res.redirect('/shows')
      } else {
          // redirect to show details page
          res.render('detail',{data:rows});
      }
  })
})

// add a new book
router.post('/add', function(req, res, next) {    

    let title = req.body.title;
    let service = req.body.service;
    let seasons = req.body.seasons;
    let rating = req.body.rating;
    let errors = false;

    let message = 'Please enter a';

    // Basic input validation
    if(title.length === 0) {
        errors = true;
        message += ' title';
    }

    if(service.length === 0) {
      errors = true;
      message += ', service';
    }

    if(isNaN(seasons) || seasons.length === 0) {
      errors = true;
      message += ', valid number for season';
    }

    if(isNaN(rating) || rating.length === 0 || rating< 0 || rating > 10 ) {
      errors = true;
      message += ', valid number for ratings';
    }

    message += '!';

    if (errors) {
      // set flash error message
      req.flash('error', message);
      // render the previous entered values 
      res.render('add', {
          title: title,
          service: service,
          seasons: seasons,
          rating: rating,
      })
    }

    // if no error
    if(!errors) {

        var form_data = {
            title: title,
            service: service,
            seasons: seasons,
            rating: rating
        }
        
        // insert query
        connection.query('INSERT INTO shows SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('add', {
                    title: form_data.title,
                    service: form_data.service,
                    seasons: form_data.seasons,
                    rating: form_data.rating,                    
                })
            } else {                
                req.flash('success', 'Show successfully added');
                res.redirect('/shows');
            }
        })
    }
})

// display edit show page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM shows WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Show not found with id = ' + id)
            res.redirect('/shows')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('edit', {
                page: 'Edit Book', 
                id: rows[0].id,
                title: rows[0].title,
                service: rows[0].service,
                seasons: rows[0].seasons,
                rating: rows[0].rating
            })
        }
    })
})

// update book data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let title = req.body.title;
    let service = req.body.service;
    let seasons = req.body.seasons;
    let rating = req.body.rating;
    let errors = false;

    if(title.length === 0 || service.length === 0) {
        errors = true;
        
        // set flash message
        req.flash('error', "Please enter correct data");
        // render to add.ejs with flash message
        res.render('edit', {
            id: req.params.id,
            title: title,
            service: service,
            seasons: seasons,
            rating: rating,
        })
    }

    // if no error
    if( !errors ) {   
 
        var form_data = {
          title: title,
          service: service,
          seasons: seasons,
          rating: rating
        }
        // update query
        connection.query('UPDATE shows SET ? WHERE id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('edit', {
                    id: req.params.id,
                    title: form_data.title,
                    service: form_data.service,
                    seasons: form_data.seasons,
                    rating: form_data.rating,   
                })
            } else {
                req.flash('success', 'Show successfully updated');
                res.redirect('/shows');
            }
        })
    }
})
   
// delete show
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM shows WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/shows')
        } else {
            // set flash message
            req.flash('success', 'Show successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/shows')
        }
    })
})

module.exports = router;
