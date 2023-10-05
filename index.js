const fs = require('fs');
const express = require('express');
const app = express();
const cars = require('./MOCK_DATA.json');

const PORT = 8080;

// Middleware or plugin
app.use(express.urlencoded({extended: false}));

//---------------------------Routes----------------------------------------------------------

//Route for GET /car used to render an HTML page and show in frontend
app.get('/cars',(req,res) => {
    const html = `
    <ul>
        ${cars.map((cars) => `<li>${cars.car_make}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


//Route for GET /api/car used for developer purpose to see raw JSON data
app.get('/api/cars',(req,res) => {
    return res.json(cars);
});


//Route for GET /api/cars/id where a dynamic id entered by the user is searched from the mock_data and on matching shows the details
app.get('/api/cars/:id',(req,res) => {
    const id = Number(req.params.id);
    const find_id = cars.find((cars) => cars.id === id);
    return res.json(find_id);
});


//Route for POST /api/cars to create a new car
app.post('/api/cars',(req,res) => {
    //TODO: Create a new car
    const body = req.body;
    // console.log('Body',body);
    cars.push({...body, id: cars.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(cars), (err,data) => {
        return res.json({status: "success", id: cars.length});
    })
});


//Route for PATCH /api/cars/id to edit a car with the specified id
app.patch('/api/cars/:id',(req,res) => {
    //TODO: Edit the car with specified id
    return res.json({status: "pending"});
});


//Route for DELETE /api/cars/id to delete a car with the specified id
app.delete('/api/cars/:id',(req,res) => {
    //TODO: Delete the car with specified id
    return res.json({status: "pending"});
});


//Route all the same get, patch and delete routes to one route using the .route function
/*
app
    .route('/api/cars/:id')
    .get((req,res) => {
        const id = Number(req.params.id);
        const find_id = cars.find((cars) => cars.id === id);
        return res.json(find_id);
    })
    .patch((req,res) => {
        //TODO: Edit the car with specified id
        return res.json({status: "pending"});
    })
    .delete((req,res) => {
        //TODO: Delete the car with specified id
        return res.json({status: "pending"});
    })
*/



// Listening on port 8080
app.listen(
    PORT,
    () => console.log(`it's is alive on http://localhost:${PORT}`) 
)

