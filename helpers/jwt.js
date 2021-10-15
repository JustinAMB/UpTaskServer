const jwt = require('jsonwebtoken');


const generarJWT = async(id, nombre) => {

    const payload = { id, nombre };

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '10m'
        }, (err, token) => {

            if (err) {
                // TODO MAL
                console.log(err);
                console.log('aqui');
                console.log(process.env.SECRET_JWT_SEED);
                reject(err);

            } else {
                // TODO BIEN
                resolve(token)
            }

        })


    });




}


module.exports = {
    generarJWT
}