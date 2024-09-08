const express = require("express");
const app = express();
const pool = require("./config/db");
const cors = require("cors");

const corsOptions = {
  oriign: "http://localhost:5000",
};

app.use(cors(corsOptions));
app.use(express.json());

//*****************************************************COMMANDS CRUD *****************************************/
//get all commands

app.get("/commands", async (req, res) => {
  try {
    const allCommands = await pool.query('SELECT * FROM "Commands"');

    res.json(allCommands.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a command

app.get("/commands/:command_id", async (req, res) => {
  const { command_id } = req.params;
  try {
    const command = await pool.query(
      'SELECT * FROM "Commands" WHERE command_id=$1',
      [command_id]
    );

    res.json(command.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a command

app.post("/commands", async (req, res) => {
  try {
    const { command, time_spent, learned } = req.body;
    const newCommand = await pool.query(
      'INSERT INTO "Commands" (command, time_spent, learned) VALUES ($1, $2, $3) RETURNING *',
      [command, time_spent, learned]
    );

    res.json(newCommand.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a command

app.put("/commands/:command_id", async (req, res) => {
  try {
    const { command_id } = req.params;
    const { command, time_spent, learned } = req.body;

    const updatedCommand = await pool.query(
      'UPDATE "Commands" SET command=$1, time_spent=$2, learned=$3 WHERE command_id=$4',
      [command, time_spent, learned, command_id]
    );

    res.json("Updated command");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a command

app.delete("/commands/:command_id", async (req, res) => {
  try {
    const { command_id } = req.params;
    const deleteCommand = await pool.query(
      'DELETE FROM "Commands" WHERE command_id=$1',
      [command_id]
    );

    res.json("Command was successfully deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//*****************************************************CUSTOMER CRUD *****************************************/
//get all customer
app.get("/customers", async (req, res) => {
  try {
    const allCustomers = await pool.query('SELECT * FROM "Customers"');
    res.json(allCustomers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a customer
app.get("/customers/:customerid", async (req, res) => {
  const { customerid } = req.params;
  console.log(customerid);
  try {
    const customer = await pool.query(
      'SELECT * FROM "Customers" WHERE customerid = $1',
      [customerid]
    );
    res.json(customer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a customer
app.post("/customers", async (req, res) => {
  try {
    const { customertype, customerphone, customeremail } = req.body;
    const newCustomer = await pool.query(
      'INSERT INTO "Customers" (customertype, customerphone, customeremail) VALUES ($1, $2, $3) RETURNING *',
      [customertype, customerphone, customeremail]
    );
    // console.log(newCustomer.rows[0]);
    res.json(newCustomer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a customer
app.put("/customers/:customerid", async (req, res) => {
  try {
    const { customerid } = req.params;
    const { customertype, customerphone, customeremail } = req.body;

    const updateCustomer = await pool.query(
      'UPDATE "Customers" SET customertype=$1, customerphone=$2, customeremail=$3 WHERE customerid = $4',
      [customertype, customerphone, customeremail, customerid]
    );
    res.json("Customers was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a customer
app.delete("/customers/:customerID", async (req, res) => {
  try {
    const { customerID } = req.params;
    const deleteCustomer = await pool.query(
      'DELETE FROM "Customers" WHERE customerID = $1',
      [customerID]
    );
    res.json("Customer was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//*****************************************************EXPERIENCES CRUD *****************************************/

//CREATE
app.post("/experience", async (req, res) => {
  try {
    const { exp_date, exp_level, exp_notes, exp_name } = req.body;
    const newExp = await pool.query(
      'INSERT INTO "experience" (exp_date, exp_level, exp_notes, exp_name) VALUES ($1, $2, $3, $4) RETURNING *',
      [exp_date, exp_level, exp_notes, exp_name]
    );
    res.json(newExp.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//READ
//READ all experiences
app.get("/experience", async (req, res) => {
  try {
    const allExp = await pool.query('SELECT * FROM "experience"');
    res.json(allExp.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//READ a single experience
app.get("/experience/:exp_id", async (req, res) => {
  const { exp_id } = req.params;
  try {
    const experience = await pool.query(
      'SELECT * FROM "experience" WHERE exp_id = $1',
      [exp_id]
    );
    res.json(experience.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
app.put("/experience/:exp_id", async (req, res) => {
  try {
    const { exp_id } = req.params;
    const { exp_date, exp_level, exp_notes, exp_name } = req.body;

    const updateExp = await pool.query(
      'UPDATE "experience" SET exp_date=$1, exp_level=$2, exp_notes=$3, exp_name=$4  WHERE exp_id = $5',
      [exp_date, exp_level, exp_notes, exp_name, exp_id]
    );
    res.json("Experience was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE
app.delete("/experience/:exp_id", async (req, res) => {
  try {
    const { exp_id } = req.params;
    const deleteExp = await pool.query(
      'DELETE FROM "experience" WHERE exp_id = $1',
      [exp_id]
    );
    res.json("Experience was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
//*****************************************************TRAINER CRUD *****************************************/
//get all trainers
app.get("/trainers", async (req, res) => {
  try {
    const allTrainers = await pool.query('SELECT * FROM "Trainer"');

    res.json(allTrainers.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a trainers
app.get("/trainers/:TrainerID", async (req, res) => {
  const { TrainerID } = req.params;
  try {
    const trainer = await pool.query(
      'SELECT * FROM "Trainer" WHERE "TrainerID"=$1',
      [TrainerID]
    );

    res.json(trainer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a trainer
app.post("/trainers", async (req, res) => {
  try {
    const { TrainerID, TrainerFName, TrainerLName, TrainerPhone } = req.body;
    const newTrainer = await pool.query(
      'INSERT INTO "Trainer" ("TrainerID", "TrainerFName", "TrainerLName", "TrainerPhone") VALUES ($1, $2, $3, $4) RETURNING *',
      [TrainerID, TrainerFName, TrainerLName, TrainerPhone]
    );

    res.json(newTrainer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a trainer
app.put("/trainers/:TrainerID", async (req, res) => {
  try {
    const { TrainerID } = req.params;
    const { TrainerFName, TrainerLName, TrainerPhone } = req.body;

    const updateTrainer = await pool.query(
      'UPDATE "Trainer" SET "TrainerFName"=$1, "TrainerLName"=$2, "TrainerPhone"=$3 WHERE "TrainerID"=$4',
      [TrainerFName, TrainerLName, TrainerPhone, TrainerID]
    );

    res.json("Trainer was updated");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a customer
app.delete("/trainers/:TrainerID", async (req, res) => {
  try {
    const { TrainerID } = req.params;
    console.log(TrainerID);
    const deleteTrainer = await pool.query(
      'DELETE FROM "Trainer" WHERE "TrainerID" = $1',
      [TrainerID]
    );
    res.json("Trainer was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//***************************************************** DOG CRUD *****************************************/

//get all dogs
app.get("/Dog", async (req, res) => {
  try {
    const allDogs = await pool.query('SELECT * FROM "Dog"');
    res.json(allDogs.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a dog
app.get("/Dog/:DogID", async (req, res) => {
  const { DogID } = req.params;
  try {
    const dog = await pool.query(
      'SELECT * FROM "Dog" WHERE "DogID" = $1',
      [DogID]
    );
    res.json(dog.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a dog
app.post("/Dog", async (req, res) => {
  try {
    const {
      dogname,
      dogdob,
      dogweight,
      dogbreed,
      doggender,
      datelastvisit,
      vaxcurrent,
    } = req.body;
    const newDog = await pool.query(
      'INSERT INTO "Dog" (dogname, dogdob, dogweight, dogbreed, doggender, datelastvisit, vaxcurrent) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        dogname,
        dogdob,
        dogweight,
        dogbreed,
        doggender,
        datelastvisit,
        vaxcurrent,
      ]
    );
    res.json(newDog.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a dog
app.put("/Dog/:DogID", async (req, res) => {
  try {
    const { DogID } = req.params;
    const {
      dogname,
      dogdob,
      dogweight,
      dogbreed,
      doggender,
      datelastvisit,
      vaxcurrent,
    } = req.body;

    const updateDog = await pool.query(
      'UPDATE "Dog" SET dogname=$1, dogdob=$2, dogweight=$3, dogbreed=$4, doggender=$5, datelastvisit=$6, vaxcurrent=$7 WHERE "DogID" = $8',
      [dogname, dogdob, dogweight, dogbreed, doggender, datelastvisit, vaxcurrent, DogID]
    );
    res.json("Dog has been updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a dog

app.delete("/Dog/:DogID", async (req, res) => {
  try {
    const { DogID } = req.params;
    const deleteDog = await pool.query('DELETE FROM "Dog" WHERE "DogID" = $1', [
      DogID,
    ]);
    res.json("Dog has been deleted");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
