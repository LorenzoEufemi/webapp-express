const connection = require("../data/db");

const index = (req, res, next) => {

    const sql = `SELECT * FROM movies`;

    connection.query(sql, (err, movies) => {
        if (err) {
            return next(new Error(err.message))
        } else {
            return res.status(200).json({
                status: "success",
                data: movies
            })
        };
    });

};

const show = (req, res, next) => {
    const id = req.params.id;
    const sql = `SELECT * FROM movies WHERE id = ?`;//prima query
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id = ?`;//seconda query

    connection.query(sql, [id], (err, movies) => {
        if (err) {
            return next(new Error(err.message))
        };
        if (movies.length === 0) {
            return res.status(404).json({
                message: "Dipartimento non trovato"
            })
        } else {
            connection.query(reviewsSql, [id], (err, reviews) => {
                if (err) {
                    return next(new Error(err.message))
                };

                return res.status(200).json({
                    status: "success",
                    data: {
                        ...movies[0],
                        reviews
                    }
                })
            })
        }
    })

};

module.exports = {
    index,
    show
};
