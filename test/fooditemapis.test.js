const chai = require("chai");
const request = require("supertest");

const expect = chai.expect;
const { app } = require("../server");
const fooditemsitemModel = require("../app/models/fooditemsitemModel");
const CategoryModel = require("../app/models/categoryModel");
const CuisineModel = require("../app/models/cuisineModel");

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe("fooditemsitem APIs Tests", function () {
  var sessionToken;
  var category;
  var cuisine;
  var testfooditemsitem;
  before(async () => {
    console.log = function () {};
    console.error = function () {};

    fooditemsitemModel.deleteMany();

    let credentials = {
      username: "testuser",
      password: "testpassword",
    };

    const res = await request(app).post("/api/v1/users/login").send(credentials);

    sessionToken = res.body.data.sessionToken;
    console.log("Token Generated", sessionToken);

    category = await CategoryModel.findOne({ isActive: true });
    cuisine = await CuisineModel.findOne({isActive: true});
  });

  after(async () => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  describe("POST /api/v1/fooditemsitems/", () => {
    it("should add a new fooditemsitem", async () => {
      const testfooditems = {
        name: "test fooditems",
        description: "test fooditems description",
        price: 100,
        quantityInStock: 100,
        image: "test fooditems image path",
        categoryId: category._id,
      };
      const res = await request(app)
      .post("/api/v1/fooditemss/")
      .set("Authorization", `Bearer ${sessionToken}`)
      .send(testfooditems);

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal("fooditems created successfully");
  });

    it("should return 401 incase token is not provided in request", async () => {
      const testfooditems = {
        name: "test fooditems",
        description: "test fooditems description",
        price: 100,
        quantityInStock: 100,
        image: "test fooditems image path",
        categoryId: category._id,
      };
      const res = await request(app).post("/api/v1/fooditemss/").send(testfooditems);
      expect(res.status).to.equal(401);
    });
  });
  describe("GET /api/v1/fooditemsitems", () => {
    it("should return 200 OK with fooditemss", async function () {
      const response = await request(app)
        .get("/api/v1/fooditemss")
        .set("Authorization", `Bearer ${sessionToken}`)
        .expect(200)
        .expect("Content-Type", /json/);

      const fooditems = response.body.fooditems;
      expect(fooditems).to.be.an("array");
      expect(fooditems).length.greaterThanOrEqual(0);
    });

    it("should have valid fooditems", async function () {
      const response = await request(app)
        .get("/api/v1/fooditems/")
        .set("Authorization", `Bearer ${sessionToken}`)
        .expect(200)
        .expect("Content-type", /json/);

      const fooditems = response.body.fooditems;
      expect(fooditems).have.length.greaterThanOrEqual(0);
      expect(fooditems).to.be.an("array");

      fooditems.forEach((fooditem) => {
        expect(fooditem.name).to.be.an("string");
        expect(fooditem.description).to.be.an("string");
        expect(fooditem.image).to.be.an("string");
      });
    });
  });
});
