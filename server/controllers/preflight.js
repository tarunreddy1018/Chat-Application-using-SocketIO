exports.setPreflight = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Accept-Encoding, Accept-Language, Cookie');
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
}