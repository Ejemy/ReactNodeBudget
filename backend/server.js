const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")
const cors = require("cors")
const url = `mongodb+srv://codyclackclack:${process.env.MONGODB_PASS}@cluster0.tb1gxvb.mongodb.net/budget?retryWrites=true&w=majority&appName=Cluster0`
const Category = require("./models/category.js")
const Saving = require("./models/saving.js")
const Transaction = require("./models/transaction.js")


const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  headers: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));




app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static(path.join(__dirname, '../frontend/build')))


async function connect() {
  try {
    await mongoose.connect(url);
    console.log("MONGODB CONNECTED")
  } catch (err) {
    console.log(err)
  }
}


connect().catch(err => console.log(err));


app.get("/load", async (req, res) => {
  console.log("/load ATTEMPT")
  try {
    const data = await Category.find({})
    const transD = await Transaction.find({})
    const savingsD = await Saving.find({})
    const combinedData = { categories: data, transactions: transD, savings: savingsD }

    return res.json(combinedData);

  } catch (err) {
    console.error("ERR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//WHY IS UPDATE SHOOTING FIRST????? 


app.post("/update", async (req, res) => {
  console.log("/update", req.body);

  try {
    const reqbody = req.body;
    let update;
    if (req.body[0].type === "budget") {
      console.log("request", req.body)
      reqbody.forEach(async (item) => {
        update = await Category.findOneAndUpdate({ _id: item.id },
          {
            $set: {
              name: item.category,
              amount: item.budgetamount,
              persist: item.check,
              date: item.date,
              type: item.type,
              spent: item.spentamount
            }
          },
          { new: true, upsert: true }
        )
      })
      return res.status(200).json({ data: update })
    }
  } catch (err) {
    console.log(err)
  }
})
// app.post("/update", async (req, res) => {
//   try {
//     const reqdata = req.body;
//     let update;
//     if (reqdata.payday) {
//       console.log("UPDATING settings");
//       const update = await Settings.updateOne({}, { payday: reqdata.payday }, { new: true, upsert: true });
//       return res.status(200).json({ data: update });
//     } else if (reqdata[5] != "savings" && reqdata[4] != "aaa" && typeof reqdata[5] === "number" && reqdata[0] != "") {
//       console.log("Transaction is being added...", reqdata)
//       update = await Transaction.findOneAndUpdate({ _id: reqdata[0] },
//         { tname: reqdata[1], date: reqdata[2], category: reqdata[3], expense: reqdata[4], income: reqdata[5] },
//         { new: true, upsert: true })
//       return res.status(200).json({ data: update });
//     } else if (reqdata[0][5] === "aaa") {
//       console.log("updating AUTO", req.body)
//       reqdata.forEach(async (item) => {
//         update = await Autotrans.findOneAndUpdate({_id: item[0]},
//           { adate: item[1], acategory: item[2], aexpense: item[3], aincome: item[4], aaa: item[5] },
//           {new: true, upsert: true})
//       })
//       return res.status(200).json({data: update})
//     } else if (reqdata[0][4] === "savings") {
//       reqdata.forEach(async (item) => {
//         update = await Savings.findOneAndUpdate({_id: item[0]},
//           { sname: item[1], samount: item[2], stotal: item[3], sss: item[4], sdate: item[5] },
//           {new: true, upsert: true})
//       })
//       return res.status(200).json({data: update})
//     }
//     else if (typeof reqdata[0][5] === "boolean") {
//       console.log("UPDATING BUDGET", req.body)
//       reqdata.forEach(async (item) => {
//         update = await Category.findOneAndUpdate({_id: item[0]},
//           { name: item[1], amount: item[2], spent: item[3], bdate: item[4], persist: item[5] },
//           {new: true, upsert: true})
//       })
//       return res.status(200).json({data: update})
//     }

//   } catch (err) {
//   console.log(err)
//   res.status(500).json({ error: "Internal server error." })
// }

// });


// app.post("/delete", async (req, res) => {
//   try {

//     if (!req.body[0].includes("aaa") && !req.body[0].includes("savings") && typeof req.body[0][5] === "number") {
//       const deletion = await Transaction.findOneAndDelete({ _id: req.body[0][0] })
//       console.log("Deleting: ", req.body)
//       return res.status(200).json({ data: deletion })
//     } else if (req.body[0][4] === "savings") {
//       const deletion = await Savings.findOneAndDelete({ _id: req.body[0][0] })
//       return res.status(200).json({ data: deletion })
//     } else if (req.body[0][5] === "aaa") {
//       console.log("Deleting AUTO transaction", req.body)
//       const deletion = await Autotrans.findOneAndDelete({ _id: req.body[0][0] })
//       return res.status(200).json({ data: deletion })
//     } else {
//       const deletion = await Category.findOneAndDelete({ _id: req.body[0][0] })
//       return res.status(200).json({ data: deletion })
//     }

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: "Something went wrong with deleting..." })
//   }
// })

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port: ${process.env.PORT} `)
});