import { Connection, createConnection } from 'mysql';
export default class ConnexionBdd {



   static getConnexion(): Connection | null {
        const co: Connection = createConnection({ // Init params to database
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            socketPath: process.env.SOCKETPATH, // Socket to Mac or Linux
            port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) // 3306 port default to mysql
        })
        co.connect(err => {
            if (err) console.log('Connection database error');
            return null;
        })
        return co;
    }
}