const express = require("express");
const app = express();

// Allows us to access the body
app.use(express.json());
app.use(express.static("dist"));

const cors = require("cors");

app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end("bruh");
  }
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const generateID = () => {
    const maxID =
      notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
    return maxID + 1;
  };

  const note = {
    id: generateID(),
    content: body.content,
    important: Boolean(body.important) || false,
  };
  notes.concat(note);

  res.json(note);
});

// DELETE
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => {
    return note.id !== id;
  });
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 27255;
// iyanaslaptop@Iyanas-Air-4 express-lesson-1 % ssh-add -l -E sha256
// 3072 SHA256:lQek9hTrSyyOUkXAJWnTzWU5YCDkKF4LG0DV/VvJT5k iyanaslaptop@Iyanas-MacBook-Air.local (RSA)
// -rw-------   1 iyanaslaptop  staff  2635 Mar 25  2022 id_rsa
// -rw-r--r--@  1 iyanaslaptop  staff   571 Mar 25  2022 id_rsa.pub
