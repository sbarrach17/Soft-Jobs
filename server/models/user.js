const bcrypt = require('bcryptjs');
const pool = require('../db.js');

const getUser = async (email) => {
    const values = [email];
    const { rows: [usuario] } = await pool.query("SELECT * FROM usuarios WHERE email = $1", values);
    return usuario;
};

const getUsers = async () => {
    const { rows: usuarios } = await pool.query("SELECT * FROM usuarios");
    return usuarios;
};

const credential = async (email, password) => {
    const usuario = await getUser(email);
    if (!usuario) throw { code: 401, message: "Email o contraseña incorrecta" };
    const { password: passwordEncriptada } = usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
    if (!passwordEsCorrecta) throw { code: 401, message: "Email o contraseña incorrecta" };
    return usuario;
};

const registerUser = async (usuario) => {
    let { email, password, rol, lenguage } = usuario;
    const passwordEncriptada = bcrypt.hashSync(password, 10);
    const values = [email, passwordEncriptada, rol, lenguage];
    const consulta = "SELECT insert_usuario($1, $2, $3, $4)";
    await pool.query(consulta, values)};

module.exports = { getUser, getUsers, credential, registerUser };
