const loadData = require('../models/getdata_model')
const getAreasData = require('../models/get_area_data_model');
const getOneAreaStores = require('../models/get_area_stores_model');

module.exports = class GetData {
    async getStroes(req, res, next) {
        const url = "http://emap.pcsc.com.tw/EMapSDK.aspx";
        const data = await loadData(url);
        res.json({
            result: data
        })
    }
    async getAreas(req, res, next) {
        const result = await getAreasData("http://emap.pcsc.com.tw/EMapSDK.aspx", "01");
        // console.log("length: " + result.length); // 台北市區域數量
        res.json({
            result: result 
        })
    }
    async getAreaStores(req, res, next) {
        const result = await getOneAreaStores("http://emap.pcsc.com.tw/EMapSDK.aspx", "台北市", "松山區");
        // console.log("length: " + result.length); // 台北市松山區店家數量
        res.json({
            result: result 
        })
    }
}