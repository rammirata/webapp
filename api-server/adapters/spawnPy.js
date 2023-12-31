async function spawnChild() {
  const { spawn } = require("child_process");
  const child = spawn("python", ["test.js"]);

  let data = "";
  for await (const chunk of child.stdout) {
    console.log("stdout chunk: " + chunk);
    data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
    console.error("stderr chunk: " + chunk);
    error += chunk;
  }
  const exitCode = await new Promise((resolve, reject) => {
    child.on("close", resolve);
  });

  if (exitCode) {
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
  return data;
}

spawnChild().then(
  (data) => {
    console.log("async result:\n" + data);
  },
  (err) => {
    console.error("async error:\n" + err);
  }
);
