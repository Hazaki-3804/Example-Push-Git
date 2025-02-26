import express from "express";
import homeController from "../controllers/homeController";

let route = express.Router();
let initWebRouters = (app) => {
    route.get('/', homeController.getHomePage);
    route.post('/get-crud', homeController.getCRUD);
    route.get('/edit-crud', homeController.editCRUD);
    route.post('/put-crud', homeController.putCRUD);
    route.get('/del-crud', homeController.delCRUD);
    return app.use("/", route);

};
module.exports = initWebRouters;