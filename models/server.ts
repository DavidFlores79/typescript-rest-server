import express, { Application } from "express";
import userRoutes from "../routes/user.route";
import cors from "cors";
import db from "../database/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5000';

        //conectar la BD
        this.db_connection();
        //llamar los middlewares
        this.middlewares();
        //definir las rutas
        this.routes();

    }

    async db_connection(){
        try {
            await db.authenticate();
            console.log('Database online');
            
        } catch (error) {
            throw new Error(`${error}`);
            
        }
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //lectura del body (parsear)
        this.app.use( express.json() );
        //carpeta publica
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.apiPaths.users, userRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor listo en el puerto: ${this.port}`);
        })
    }

    
}

export default Server;