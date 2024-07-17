const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
require('dotenv').config();

app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Hello Node api')
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if (!product) {
      res.status(200).json({ message: "cannot find the item" })
    } else {
      const updatedProduct = await Product.findById(id)
      res.status(200).json(updatedProduct)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(200).json({ message: "cannot find the item" })
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/blog', (req, res) => {
  res.send('Hello Node api: blog')
})

app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
  }
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Node api app is running in port 3000");
    })
    console.log("connected to MongoDB");
  }).catch((error) => {
    console.log(error);
  })
