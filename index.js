// All imports
import express from 'express';
import bodyParser from 'body-parser';

// All Server Constants
const app = express();
const port = 3000;

// All Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}\n------------------------------\n`);
})

// All Routes
app.get("/", (req, res) => {
    // console.log("Here is console.log()");
    res.render("index");
});

app.get("/create", (req, res) => {
    res.render("create");
})

const blogPosts = new Array();
// Below route to submit the blog

app.post("/submit", (req, res) => {
    let author = req.body.author;
    let title = req.body.title;
    let content = req.body.blog;

    blogPosts.push({author, title, content});
    res.redirect("/create");
});

app.get("/view", (req, res) => {
    res.render("view.ejs", {
        blog: blogPosts,
    });
});

app.post("/update", (req, res) => {
    let title_update = req.body['title'];
    let author_update = req.body['author'];
    let content_update = req.body['content'];
    let tail = parseInt(req.body['index']);

    let object = {
        title_update,
        author_update,
        content_update,
        tail,
    };

    res.render("update.ejs", {
        object
    });

});

app.post("/finalUpdate", (req, res) => {
    let index = parseInt(req.body['index']);

    blogPosts[index].author = req.body.author;
    blogPosts[index].title = req.body.title;
    blogPosts[index].content = req.body.blog;

    res.redirect("/view");
});

app.post("/delete", (req, res) => {

    const index = parseInt(req.body['index']);

    console.log(req.body);

    blogPosts.splice(index, 1);
    res.redirect("/view");
});