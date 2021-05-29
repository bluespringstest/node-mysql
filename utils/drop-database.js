
const mysql = require('mysql2/promise')
const path = require('path'); 
const args = process.argv.slice(2)[0]
//extracts any command line arguments from argument values

const envFile = args === 'test' ? '../.test.env' : '../.env';
//uses arguments to determine if .env or .test.env should be loaded

require('dotenv').config({
    path: path.join(__dirname, envFile),
});
//Loads the environment variables from the env files.

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;
const dropDatabase = async () => {
    try {
        //to connect to the database
        const db = await mysql.createConnection({
            name: DB_NAME,
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        });
        //Drop the database
        await db.query(`DROP DATABASE ${DB_NAME}`);
        db.close();
    }
    //if something goes wrong
    catch (err) {
        //log out the error and current environment variables
        console.log('Environment Variables are:', {
            DB_PASSWORD,
            DB_NAME,
            DB_USER,
            DB_HOST,
            DB_PORT,
        });
        console.log(err);
    }
}
dropDatabase();