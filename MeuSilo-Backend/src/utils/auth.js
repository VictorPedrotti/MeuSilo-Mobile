const { verify } = require('./jwt.js');

function validaAutenticacao (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    try {
        const decoded =  verify(token);
        req.usuario = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado'});
    }
}

// function verificaAdmin (req, res, next) {
//     const { admin } = req.usuario;
//     console.log("Admin: ", admin);
//     if(!admin) {
//         return res.status(403).json({ mensagem: 'Você não possui permissão para esta ação' })
//     }
//     next();
// } 

module.exports = { validaAutenticacao };