import express from 'express';
import handlebars from 'express-handlebars';
import routes from './routes.js';
import initDatabase from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import {auth} from './middlewars/authMiddleware.js';
import expressSession from 'express-session'
import { SESSION_SECRET } from './config/index.js';


const app = express();

initDatabase();

app.use(express.static('src/public'));

app.use(cookieParser())

app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
    cookie: {secure: false, httpOnly: true}
}))

app.use(express.urlencoded())



app.engine('hbs', handlebars.engine({
    extname : 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault : true,
        allowProtoPropertiesByDefault: true
    }

}))

app.set('view engine', 'hbs')

app.set('views', 'src/views')

app.use(auth)

app.use(routes)

app.listen(3000, () => console.log('Server is listening on http://localhost:3000'));