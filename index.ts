import express from "express";

const app = express();

app.use(express.json()); // this helps expres understand any json payload sent

interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
}

const products = [
  { id: 1, name: "iPhone 15", category: "phones", price: 1200 },
  { id: 2, name: "Samsung Galaxy S24", category: "phones", price: 1100 },
  { id: 3, name: "MacBook Pro", category: "laptops", price: 2500 },
  { id: 4, name: "Dell XPS 13", category: "laptops", price: 1800 },
  { id: 5, name: "AirPods Pro", category: "accessories", price: 250 },
];

// GET route with filters
app.get("/", (req, res) => {
  const category = req.query.category;
  const sortBy = req.query.sortBy;

  let filteredProducts = [...products];

  // ✅ Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category
    );
  }

  // ✅ Sort by field if provided (e.g., sortBy=price or sortBy=name)
  // if (sortBy && typeof(sortBy) === "string") {
  //   filteredProducts.sort((a, b) => {
  //     if (typeof a[sortBy] === "string") {
  //       return a[sortBy].localeCompare(b[sortBy]);
  //     }
  //     return a[sortBy] - b[sortBy];
  //   });
  // }

  // ✅ Send JSON response
  if (filteredProducts.length === 0) {
    return res.send(`<h1>No products found</h1>`);
  }

  res.send(`
    <h1>Filtered Products</h1>
    <ul>
      ${filteredProducts
        .map((p) => `<li>${p.name} - ${p.category} - $${p.price}</li>`)
        .join("")}
    </ul>
  `);
});

// req.body
app.post("/product", (req, res) => {
  const { title, description, price } = req.body as CreateProductPayload;

  if (!title || !description || !price) {
    return res.send("title, price and description are required");
  }

  // return res.send(
  //   `A new product of name ${title} of description ${description} of price ${price}`
  // );

  return res.status(201).json({
    data: `A new product of name ${title} of description ${description} of price ${price}`,
    message: "new product created successfully",
  });
});

// req.query
app.get("/", (req, res) => {
  // for request
  // route params
  // const name = req.params.name;
  // const age = req.params.age;
  // const { name, age } = req.params;

  // query params
  const category = req.query.category;
  const sortBy = req.query.sortBy;

  if (category) {
    return res.send(`<h1> hello you are filtering for ${category}</h1>`);
  }

  if (sortBy) {
    return res.send(`<h1> hello you are filtering based on ${sortBy}</h1>`);
  }
  // body
  // user - authenticated
  // console.log(res);

  // for response
  // send
  // status
  // json
  res.send(`<h1> hello this is all data</h1>`);
});

// app.get("/", (req, res) => {
//   // for request
//   // route params
//   // const name = req.params.name;
//   // const age = req.params.age;
//   // const { name, age } = req.params;

//   // query params
//   const category = req.query.category;
//   const sortBy = req.query.sortBy;

//   if (category) {
//     return res.send(`<h1> hello you are filtering for ${category}</h1>`);
//   }

//   if (sortBy) {
//     return res.send(`<h1> hello you are filtering based on ${sortBy}</h1>`);
//   }
//   // body
//   // user - authenticated
//   // console.log(res);

//   // for response
//   // send
//   // status
//   // json
//   res.send(`<h1> hello this is all data</h1>`);
// });

// route params
app.get("/:name/:age", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  // const { name, age } = req.params;
  // res.send(`<h1> hellow ${name} i am ${age} years old</h1>`);
  res.json({
    data: `hellow ${name} i am ${age} years old`,
  });
});

app.get("/about", (req, res) => {
  res.send(
    `<h1> Hello World i am testing nice to meet you! this an about page</h1>`
  );
});

app.listen(3000, () => {
  console.log("server is running at " + 3000);
});

// create these endpoints
/**
 * /product - POST - takes a payload of title, description, price, tag, owner and returns a 201 response with json object containing message and the data passsed in the payload
 * / product/:id - GET - takes id from route params and returns a 201 response of json with a message and the id
 * / product/:id - PUT - takes id from route params and returns a html response including the id sent
 */
