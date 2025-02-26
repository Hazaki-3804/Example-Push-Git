import bcrypt from "bcrypt";
import db from "../models/index";
import e from "express";
import { raw } from "body-parser";
import { where } from "sequelize";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phone: data.phone,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('ok create new user success');
        } catch (error) {
            reject(error)
        }
    })
}
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    })
}

let getALLUser = () => {
    return new Promise(async (resolve, reject) => {
        {
            try {
                let users = await db.User.findAll({ raw: true });
                resolve(users);
            } catch (error) {
                reject(error);
            }
        }
    })

}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        {
            try {
                let users = await db.User.findOne({
                    where: { id: userId },
                    raw: true
                });
                if (users) {
                    resolve(users);
                }
                else {
                    resolve(null);
                }
            } catch (error) {
                reject(error);
            }
        }
    })
};

let updUser = (data) => {
    return new Promise(async (resolve, reject) => {
        {
            try {
                let users = await db.User.findOne({
                    where: { id: data.id }
                });
                if (!users) {
                    resolve("Update failed");
                } else {
                    users.firstName = data.firstName;
                    users.lastName = data.lastName;
                    users.address = data.address;
                    await users.save();
                    resolve("Update success");
                }
            } catch (error) {
                console.log(error);
            }
        }
    })
}

let delUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } });
            if (user) {
                await user.destroy();
            }
            resolve("Delete success");

        } catch (error) {
            reject(error)
        }
    });

}
module.exports = {
    createNewUser: createNewUser,
    getALLUser: getALLUser,
    getUserInfoById: getUserInfoById,
    updUser: updUser,
    delUser: delUser
}