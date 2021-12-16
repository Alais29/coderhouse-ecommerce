// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import {
  createApp,
  contentTypeFilter,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colors: string[] = [];

interface IApp {
  colorsProp: string[];
}

const App = ({ colorsProp }: IApp) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Desafío 47</title>
    </head>
    <body style={{ background: "#000000" }}>
      <form method="POST" action="/form">
        <label style={{ color: "#ffffff" }}>Enter a color: </label>
        <input name="color" type="text" />
        <button>Enter</button>
      </form>
      <ul>
        {colorsProp.map((color, index) => (
          <li key={index} style={{ color }}>
            {color}
          </li>
        ))}
      </ul>
    </body>
  </html>
);

const headers = {
  "content-type": "text/html; charset=UTF-8",
};

app.handle("/", async (req) => {
  console.log("LLEGO REQUEST");
  return await req.respond({
    status: 200,
    headers: new Headers(headers),
    body: ReactDOMServer.renderToString(<App colorsProp={colors} />),
  });
});

app.handle("/form", async (req) => {
  const bodyForm = await req.formData();
  const color = bodyForm.value("color");
  colors.push(color as string);
  await req.respond({
    status: 200,
    headers: new Headers(headers),
    body: ReactDOMServer.renderToString(<App colorsProp={colors} />),
  });
});

app.listen({ port: 8080 });
