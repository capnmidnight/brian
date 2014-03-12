var format = require("util").format,
    readline = require('readline'),
    fs = require("fs"),
    http = require("http"),
    webServer = require("./src/webServer.js"),
    app = http.createServer(webServer("./web/")),
    rl = readline.createInterface(process.stdin, process.stdout),
    port = 8080;
//    socketio = require("socket.io"),
//    io = socketio.listen(app);
//    io.set("log level", 2);

rl.setPrompt('BRIAN ADMIN :> ');
rl.on('line', function (line) {
    var cmd = line.trim();
    core.log(cmd);
    try {
        core.log(eval(cmd));
    }
    catch (exp) {
        process.stderr.write(exp.message + "\n");
    }
    rl.prompt();
}).on('close', function () {
    process.exit(0);
});
rl.prompt();

app.listen(port);

if (process.argv.indexOf("--test") > -1) {
    var proc = require("child_process");
    proc.execFile("explorer", ["http://127.0.0.1:"+port]);
}