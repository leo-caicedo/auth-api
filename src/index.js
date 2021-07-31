import createApp from "./app";

const app = createApp();

app.listen(app.get("port"), (err) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(`Express listening on port ${app.get("port")}`);
});
