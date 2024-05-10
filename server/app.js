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

// Aqui empieza la validacion de usuario

app.post("/register", (req, res) => {
    const nombre = req.body.nombre;
    const correo = req.body.email;
    const contraseña = req.body.password;

    const queryAltaUsuarioNoValidado = "CALL altaUsuarioNoValidado(?,?,?,?)";
    const querySelectUsuarioNoValidado = "SELECT * FROM UsuarioNoValidado WHERE correoElectronico = ?";

    let codigo = generarNumeroAleatorio();

    if (!nombre) {
        return res.json({ error: "Nombre requerido" });
    } else if (nombre.length < 3) {
        return res.json({ error: "El nombre debe tener mas de 2 caracteres" });
    } else if (!correo) {
        return res.json({ error: "Correo electronico requerido" });
    } else if (correo.indexOf("@gmail.com") === -1) {
        res.json({ error: "El correo debe tener '@gmail.com'" });
    } else if (!contraseña) {
        return res.json({ error: "Contraseña requerido" });
    } else {
        database.query(querySelectUsuarioNoValidado, [correo], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
                    return res.json({error: "El correo ya esta en uso"});
                } else {
                    database.query(queryAltaUsuarioNoValidado, [nombre, correo, contraseña, codigo], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // let trasporter = nodeMailer.createTransport({
                            //     service: "gmail",
                            //     auth: {
                            //         type: 'OAuth2',
                            //         user: 'hectorsacaca1123@gmail.com',
                            //         clientId: email_connect.clientId,
                            //         clientSecret: email_connect.clientSecret,
                            //         refreshToken: email_connect.refreshToken,
                            //         accessToken: email_connect.accessToken
                            //     }
                            // });
                    
                            // var mailOptions = {
                            //     from: "hectorsacaca1123@gmail.com",
                            //     to: correo,
                            //     subject: "Codigo de verificacion",
                            //     text: `${codigo}`
                            // }
                    
                            // trasporter.sendMail(mailOptions, (error, info) => {
                            //     if (error) {
                            //         console.log(error);
                            //     } else {
                            //         console.log("Email enviado:", info.response);
                            //     }
                            // });

                            res.send("Datos enviados correctamente");
                        }
                    });
                }
            }
        });
    }
});

app.post("/validar-codigo", (req, res) => {
    const code = req.body.code;
    const correo = req.body.email;

    const querySelectoUsuarioNoValidado = "SELECT * FROM UsuarioNoValidado WHERE correoElectronico = ?";
    const queryAltaUsuario = "CALL altaUsuario(?,?,?,?,?)";

    if (code.length < 1) {
        return res.json({ error: "Codigo requerido" });
    } else if (isNaN(Number(code))) {
        return res.json({ error: "Error, deje el type tal como estaba" });
    } else {
        database.query(querySelectoUsuarioNoValidado, [correo], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                if (Number(code) === results[0].codigo) {
                    database.query(queryAltaUsuario, [results[0].nombre, results[0].correoElectronico, results[0].contraseña, results[0].idUsuarioNoValidado, results[0].codigo], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("Datos insertados correctamente en la tabla Usuario");
                        }
                    });
                } else {
                    res.json({ error: "Codigo invalido" });
                }
            }
        });
    }
});

// Aqui termina la validacion de usuario

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}/`);
});