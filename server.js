var format = require("util").format,
    readline = require('readline'),
    os_ = require("os"),
    fs = require("fs"),
    http = require("http"),
    proc = require("child_process"),
    webServer = require("./src/webServer.js"),
    app = http.createServer(webServer("./web/")),
    rl = readline.createInterface(process.stdin, process.stdout),
    port = 8080,
    os = os_.platform(),
    pushScript = os == "win32" ? "push.bat" : "./push.sh",
    browseScript = os == "win32" ? "explorer" : "xdg-open";
//    socketio = require("socket.io"),
//    io = socketio.listen(app);
//    io.set("log level", 2);
function startBrowser() {
    proc.execFile(browseScript, ["http://127.0.0.1:" + port]);
}
rl.setPrompt('BRIAN ADMIN :> ');
rl.on('line', function (line) {
    var cmd = line.trim();
    console.log(cmd);
    try {
        if (cmd == "push") {
            push = proc.execFile(pushScript);
            push.stdout.on("data", function (data) {
                console.log("FTP OUT: ", data);
            });
            push.stdin.on("data", function (data) {
                console.log("FTP IN: ", data);
            });
            push.stderr.on("data", function (data) {
                console.log("FTP ERR: ", data);
            });
        }
        else if (cmd == "start") {
            startBrowser();
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
    startBrowser();
}