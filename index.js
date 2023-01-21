import express from 'express';
const app = express();


import mysql from 'mysql'
import cors from 'cors'


import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    DB_PORT,
    PORT
} from './config.js'

const db = mysql.createPool({
    // host: DB_HOST,
    // user: DB_USER,
    // password: DB_PASSWORD,
    // port: DB_PORT,
    // database: DB_NAME
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'db_personagens'
})


app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
    res.send('ola mundo')
})


app.post('/lista', (req, res) => {
    const { nome } = req.body;
    const { atk } = req.body;
    const { level } = req.body;
    const { url } = req.body;

    let SQL = "INSERT INTO personagens (nome, atk, level, url) VALUES ( ?,?,?,? )";

    db.query(SQL, [nome, atk, level, url], (err, result) => {
        if (err) console.log(err)
        else res.send(result)
    })
});


app.get('/listCards', (req, res) => {

    let SQL = "SELECT * FROM personagens ";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result)

    })

});

app.put('/editCards', (req, res) => {

    const { id } = req.body
    const { nome } = req.body
    const { atk } = req.body
    const { level } = req.body
    const { url } = req.body

    let SQL = "UPDATE personagens SET nome = ?, atk = ?, level= ?, url = ? WHERE idpersonagens = ?";

    db.query(SQL, [nome, atk, level, url, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result)

    })
});

app.delete('/deleteCards/:id', (req, res) => {

    const { id } = req.params

    let SQL = "DELETE FROM personagens WHERE idpersonagens = ?";

    db.query(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else res.send(result)

    })
});


app.listen(PORT, () => {
    console.log('Servidor iniciado')
})

// app.listen(PORT, () => {
//     console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
// })

