import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Grid from "../src/grid";
import { StaticRouter } from "react-router";

const PORT = 8080;

const app = express();

app.use("^/$", (req, res, next) => {
  const context = {};
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(
          <StaticRouter location={req.url} context={context}>
            <Grid />
          </StaticRouter>
        )}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
