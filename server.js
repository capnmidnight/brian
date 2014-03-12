var format = require("util").format,
    readline = require('readline'),
    fs = require("fs"),
    http = require("http"),
    proc = require("child_process"),
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
    console.log(cmd);
    try {
        if (cmd == "push") {
            push = proc.execFile("push.bat");
            push.stdout.on("data", function (data) {
                console.log("FTP: ", data);
            });
        }
        else
            console.log(eval(cmd));
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
    proc.execFile("explorer", ["http://127.0.0.1:"+port]);
}