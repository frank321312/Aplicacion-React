const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const nodeMailer = require('nodemailer');

require('dotenv').config({path: './archivo.env'});
app.use(cors());
app.use(express.json());

const port = 8001;

const db_connect = JSON.parse(process.env.MySQL_CONNECT);
const email_connect = JSON.parse(process.env.EMAIL_CONNECT);

var database = mysql.createConnection({
    host: db_connect.host,
    user: db_connect.user,
    password: db_connect.password,
    database: db_connect.database
});

database.connect((err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } 
    
    console.log("Conexion exitosa con la base de datos"); 
});

function generarNumeroAleatorio() {
    const numero = Math.floor(Math.random() * 900000) + 100000;
    return numero;
}

app.get('/ruta', (req, res) => {
    res.json({message: "Hello world"});
});

app.post("/register", (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.email;
    const contraseña = req.body.password;
    const validarCorreo = req.body.verificar;

    const queryAltaUsuarioNoValidado = "CALL altaUsuarioNoValidado(?,?,?,?)";

    let codigo = generarNumeroAleatorio();

    if (!nombre) {
        res.json({ error: "Nombre requerido" });
    } else if (nombre.length < 3) {
        res.json({ error: "El nombre debe tener mas de 5 caracteres" });
    } else if (!correo) {
        res.json({ error: "Correo electronico requerido" });
    } else if (correo.indexOf("@gmail.com") === -1) {
        res.json({ error: "El correo debe tener '@gmail.com'" });
    } else if (!contraseña) {
        res.json({ error: "Constraseña requerido" });
    } else if (validarCorreo) {
        res.json({ error: "El correo ya esta en uso" });
        console.log(validarCorreo);
    } 
    else {
        database.query(queryAltaUsuarioNoValidado, [nombre, correo, contraseña, codigo], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Datos enviados correctamente");
            }
        });

        let trasporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'hectorsacaca1123@gmail.com',
                clientId: email_connect.clientId,
                clientSecret: email_connect.clientSecret,
                refreshToken: email_connect.refreshToken,
                accessToken: email_connect.accessToken
            }
        });

        var mailOptions = {
            from: "hectorsacaca1123@gmail.com",
            to: correo,
            subject: "Codigo de verificacion",
            text: `${codigo}`
        }

        trasporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email enviado:", info.response);
            }
        });
    }
});

app.get("/usuarioNoValidados", (req, res) => {
    const querySelectUsuarioNoValidado = "SELECT * FROM UsuarioNoValidado";

    database.query(querySelectUsuarioNoValidado, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.json({results});
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}/`);
});

