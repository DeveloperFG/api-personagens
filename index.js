const express = require('express')
const app = express();
const mysql = require('mysql')

const cors = require("cors")



const personagens = [
    { nome: 'Goku', atk: 10, level: 10, url: 'https://i.pinimg.com/originals/b4/3e/cb/b43ecb8ac16646a0b16722f96cf48841.png' }
]


// const PORT = process.env.PORT || 3001

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'system',
//     database: 'db_personagens'
// })

app.use(express.json());
app.use(cors());



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

    // let SQL = "SELECT * FROM personagens ";

    // db.query(SQL, (err, result) => {
    //     if (err) console.log(err);
    //     else res.send(result)

    // })

    res.send(personagens)



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


app.listen(process.env.PORT || 3001, () => {
    console.log('Servidor iniciado')
})



// app.listen(PORT, () => {
//     console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
// })

