const express = require("express");
const app = express();
const connection = require('./conf');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get(`/api/travel`, (req, res) => {
    connection.query(`SELECT * FROM participants`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }
    })
});


app.get(`/api/travel/city`, (req, res) => {
    connection.query(`SELECT name, city FROM participants`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }
    })
});

app.get(`/api/travel/city/has`, (req, res) => {
    connection.query(`SELECT name, city FROM participants WHERE has_traveled = 1`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }

    })
});

app.get(`/api/travel/ascendant`, (req, res) => {
    connection.query(`SELECT name, birthday FROM participants ORDER BY birthday ASC`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }

    })
});


app.get(`/api/travel/citymar`, (req, res) => {
    connection.query(`SELECT name, city FROM participants WHERE city LIKE "Mar%"`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }

    })
});


app.get(`/api/travel/names`, (req, res) => {
    connection.query(`SELECT name FROM participants WHERE name LIKE "S%"`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }

    })
});


app.get(`/api/travel/birthday`, (req, res) => {
    connection.query(`SELECT name, birthday FROM participants WHERE birthday > "1990-01-01"`, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.json(results);
        }

    })
});

app.post(`/api/travel`, (req, res) => {
    const formData = req.body
    connection.query(`INSERT INTO participants SET ?`, formData, (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.send('Data added');
        }
    })
})


app.put(`/api/travel/:city`, (req, res) => {
    const formData = req.body
    const idCity = req.params.city
    connection.query(`UPDATE participants SET ? WHERE city = ?`, [formData, idCity], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.send('Data updated');
        }
    })
})


app.put(`/api/travel/:hastraveled`, (req, res) => {
    const formData = req.body
    const idHasTraveled = req.params.has_traveled
    connection.query(`UPDATE participants SET ? WHERE has_traveled = ?`, [formData, idHasTraveled], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erreur lors de la récupération des données');
        } else {
            res.send('Data updated');
        }
    })
})


app.delete('/api/travel/:city', (req, res) => {
    const idCity = req.params.city;
    connection.query('DELETE FROM participants WHERE city= ?', [idCity], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression des données");
        } else {
            res.send('Data deleted');
        }
    })
})


app.delete('/api/movies/:hastraveled', (req, res) => {
    const idHasTraveled = req.params.has_traveled;
    connection.query('DELETE FROM movie WHERE id= ?', [idMovie], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression des données");
        } else {
            res.send('Data deleted');
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }

    console.log(`Server is listening on ${port}`);

})