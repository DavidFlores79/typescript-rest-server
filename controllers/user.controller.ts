import { Request, Response } from "express";
import User from "../models/users.model";

export const getusers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({
        msg: 'getusers',
        users
    })
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({
                ok: false,
                msg: `Usuario con id ${id} no encontrado.`
            })
        }
    
        res.json({
            ok: true,
            user
        })
    
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const userExists = await User.findOne({
            where: { email: body.email }
        });

        if(userExists) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con email ${body.email} ya existe en la BD.`
            })
        }

        const user = await User.create(body);
        // await user.save();

        res.json({
            ok: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con id ${ id } no existe en la BD.`
            })
        }

        await user.update(body);

        res.json({
            ok: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con id ${ id } no existe en la BD.`
            })
        }

        // await user.destroy();
        await user.update({ status: false});

        res.json({
            ok: true,
            msg: `Usuario con id ${id} ha sido eliminado.`
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }

}

