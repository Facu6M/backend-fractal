const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [
  {
    id: 1,
    order: "ORD001",
    date: "2024-03-13",
    products: 3,
    price: 100,
    status: "Completed",
  },
  {
    id: 2,
    order: "ORD002",
    date: "2024-03-14",
    products: 2,
    price: 75,
    status: "Completed",
  },
  {
    id: 3,
    order: "ORD003",
    date: "2024-03-15",
    products: 4,
    price: 120,
    status: "Completed",
  },
  {
    id: 4,
    order: "ORD004",
    date: "2024-03-16",
    products: 1,
    price: 50,
    status: "Completed",
  },
  {
    id: 5,
    order: "ORD005",
    date: "2024-03-17",
    products: 5,
    price: 200,
    status: "In Progress",
  },
];

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", (req, res) => {
  const { date, products, price, status } = req.body;
  if (!date || products == null || !price || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newOrder = {
    id: orders.length + 1,
    order: `ORD00${orders.length + 1}`,
    date,
    products,
    price,
    status,
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.delete("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders.splice(index, 1);
  res.json({ message: "Order deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
