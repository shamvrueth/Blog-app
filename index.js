import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "123456",
  port: 5432,
});
db.connect();

// In-memory data store
let posts = [];

const result = await db.query("SELECT * FROM posts");
posts = result.rows

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//GET All posts
app.get("/posts",(req,res) => {
  res.json(posts);
})
//GET a specific post by id
app.get("/posts/:id",(req,res) => {
  const id=parseInt(req.params.id);
  res.json(posts.find((post) => post.id===id));
})
//POST a new post
app.post("/posts",async(req,res) => {
  const id=posts[posts.length-1].id+1;
  let d;
  d=new Date();
  d=d.toISOString();
  const data={
    id: id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: d
  }
  const r = await db.query("INSERT INTO posts values($1,$2,$3,$4,$5);",[data.id,data.title,data.content,data.author,data.date])
  posts.push(data);
  res.json(posts.find((joke) => joke.id===id));
})

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id",async(req,res) => {
  const id=parseInt(req.params.id);
  const index=posts.findIndex((post) => post.id===id);
  let d;
  d=new Date();
  d=d.toISOString();
  const data={
    id: id,
    title: req.body.title || posts[index].title,
    content: req.body.content || posts[index].content,
    author: req.body.author || posts[index].author,
    date: d
  }
  const r = await db.query("UPDATE posts set title=$1, content=$2, author=$3 where id=$4;",[data.title,data.content,data.author,data.id])
  posts[index]=data;
  res.json(data);
})
//DELETE a specific post by providing the post id.
app.delete("/posts/:id",async(req,res) => {
  const id=parseInt(req.params.id);
  const index=posts.findIndex((post) => post.id===id);
  if (index>-1){
    const r = await db.query("DELETE FROM posts where id=$1;",[id]);
    posts.splice(index,1);
    res.sendStatus(200);
  }
  else{
    res
    .status(404)
    .json({error:`Joke with id ${id} not found. No joke was deleted.`})
  }
})
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
