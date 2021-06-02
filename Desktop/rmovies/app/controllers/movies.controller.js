const db = require('../models');
const Movies = db.movies;
const Op = db.Sequelize.Op;
exports.create = (req, res) =>{
    if(!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty!!'
        });
        return;
    }
    const movies = {
        title : req.body.title,
        description : req.body,description
    };

    Movies.create(movies).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the movies."
      });
    });
};



exports.findAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    Movies.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving movies."
        });
      });

};

exports.findOne = (req, res) =>{
    const id = req.params.id;

    Movies.findByPk(id).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

exports.update = (req, res) =>{
    const id = req.params.id;

     Movies.update(req.body, {
     where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "movie was updated successfully."
            });
        } else {
             res.send({
             message: `Cannot update movie with id=${id}. Maybe movie was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
        message: "Error updating movie with id=" + id
        });
    });

};

exports.delete = (req, res) =>{
    const id = req.params.id;

    Movies.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: 'movie was deleted successfully!!'
            });
        }else{
            res.send({
                message: `Cannot delete movie with id=${id}. Maybe movie was not found!`
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message: 'could not delete movie with id ' +id
        });
    });

};

exports.deleteAll = (req, res) =>{
    Movies.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} movies were deleted successfully!`
        });
    }).catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while removing all movies."
         });
    });

};