import { json } from "body-parser";
import db from "../models/index";
import CRUDServices from "../service/CRUDServices";
//do trong viewEngine đã set path .src/views
// rồi nên chỉ cần render tên file ejs thôi
let getHomePage = async (req, res) => {
    return res.render("homePage.ejs");
    // try {
    //     let data = await db.User.findAll();
    //     return res.render("homePage.ejs", {
    //         data: JSON.stringify(data)
    //     });
    // } catch (e) {
    //     console.log(e);
    // }
};

let postCRUD = async (req, res) => {
    let data = req.body;
    let mess = await CRUDServices.createNewUser(data);
    return res.send(mess);
};

let getCRUD = async (req, res) => {
    // let dt = req.body;
    // await CRUDServices.createNewUser(dt);
    let data = await CRUDServices.getALLUser();
    return res.render("display.ejs", {
        dataTable: data
    });
};

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        //check userData
        if (!userData)
            return res.send("User not found");
        else
            return res.render("editCRUD.ejs", {
                data: userData
            });

    } else {
        return res.send("User not found");
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let user = await CRUDServices.updUser(data);
    return res.send(user);
}
let delCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.delUser(id);
        let data = await CRUDServices.getALLUser();
        return res.render("display.ejs", {
            dataTable: data
        });
    }
    else
        return res.send("User not found")

}
//export ra kiểu object thì bao nhiêu cũng được
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    postCRUD: postCRUD,
    delCRUD: delCRUD
}