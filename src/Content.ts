import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");

        // Material Design Bootstrap súgó: https://mdbootstrap.com/
        // Font Awesome:
        res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'>");
        // Google Fonts:
        res.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'>");
        // Bootstrap core CSS:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'>");
        // Material Design Bootstrap:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css'>");

        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        const megold: Megoldas = new Megoldas("lovesek.txt");

        //5.Határozza meg és írja ki a minta szerint, hogy a játékosok hány lövést adtak le a játék során!
        res.write(`5. feladat: Lövések száma: ${megold.lovesekSzama} db\n`);

        //7.Határozza meg a céltábla középpontjához legközelebb eső (legpontosabb) lövés adatait és írja ki a minta szerint! Feltételezheti, hogy csak egy ilyen lövés van!
        res.write("7. feladat: Legpontosabb lövés:");
        res.write(`\n\t${megold.legpontosabb}\n`);

        //9.Határozza meg és írja ki a minta szerint a nulla pontos lövések számát!
        res.write(`9. feladat: Nulla pontos lövések száma: ${megold.nullaPontosLovesek} db\n`);

        //10.Számolja meg és írja ki a képernyőre a játékban részvevő játékosok számát a minta szerint!
        res.write(`10. feladat: Játékosok száma: ${megold.jatekosokSzama}\n`);

        //11.Határozza meg játékosonként a leadott lövések számát! Megoldását úgy készítse el, hogy a játékosok nevei és száma nem ismert, de feltételezheti, hogy a számuk 2 és 10 fő közötti!

        //12.Számítsa ki az átlagpontszámokat, majd jelenítse meg a minta szerint!

        //13.Határozza meg a legmagasabb átlagpontszám alapján a nyertes játékos nevét! Feltételezheti, hogy nem alakult ki holtverseny.

        res.write("\nGithub repository link: <a href='https://github.com/braitigamalexander30/Lezerloveszet.git'>https://github.com/braitigamalexander30/Lezerloveszet</a>\n\n");
        res.write("A lovesek.txt kiírása:\n\n");

        fs.readFileSync("lovesek.txt")
            .toString()
            .split("\r\n")
            .forEach(l => {
                res.write(l + "\n");
            });

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");

        // JQuery:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>");
        // Bootstrap tooltips:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js'></script>");
        // Bootstrap core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js'></script>");
        // MDB core JavaScript:
        res.write("<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/js/mdb.min.js'></script>");

        res.write("</body></html>");
        res.end();
    }
}
