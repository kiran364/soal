
module.exports = (sequelize, Sequelize) =>{
    const Movies = sequelize.define('movies', {
        title : {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        releaseDate: {
            type: Date,
            default: Date.now
        }
    });
    return Movies;
};