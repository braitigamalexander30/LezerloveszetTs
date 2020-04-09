import fs from "fs";
import JatekosLovese from "./JatekosLovese";

export default class Megoldás {
    private _lovesek: JatekosLovese[] = [];
    public celtablaKozeppontElso = 0;
    public celtablaKozeppontMasodik = 0;

    public get lovesekSzama(): number {
        return this._lovesek.length;
    }

    szam = 0;

    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(i => {
                const adatok = i.trim();
                if (adatok.length > 0 && this.szam != 0) this._lovesek.push(new JatekosLovese(adatok, this.szam));
                else {
                    this.celtablaKozeppontElso = parseFloat(adatok.split(";")[0].replace(",", "."));
                    this.celtablaKozeppontMasodik = parseFloat(adatok.split(";")[1].replace(",", "."));
                }
                this.szam++;
            });
    }

    public get legpontosabb(): string {
        let seged = this._lovesek[0].Tavolsag(this.celtablaKozeppontElso, this.celtablaKozeppontMasodik);
        let segedKiir = 0;
        for (let i = 0; i < this._lovesek.length; i++) {
            if (this._lovesek[i].Tavolsag(this.celtablaKozeppontElso, this.celtablaKozeppontMasodik) < seged) {
                seged = this._lovesek[i].Tavolsag(this.celtablaKozeppontElso, this.celtablaKozeppontMasodik);
                segedKiir = i;
            }
        }
        return this._lovesek[segedKiir].sorszam + ".; " + this._lovesek[segedKiir].nev + "; x:" + this._lovesek[segedKiir].xkoordinata + "; y:" + this._lovesek[segedKiir].ykoordinata + " távolság:" + this._lovesek[segedKiir].Tavolsag(this.celtablaKozeppontElso, this.celtablaKozeppontMasodik);
    }

    public get nullaPontosLovesek(): number {
        let szamolo = 0;
        for (let i = 0; i < this._lovesek.length; i++) {
            if (this._lovesek[i].Pontszam(this.celtablaKozeppontElso, this.celtablaKozeppontMasodik) == null) szamolo++;
        }
        return szamolo;
    }

    public get jatekosokSzama(): number {
        const jatekosok: string[] = [];
        for (let i = 0; i < this._lovesek.length; i++) {
            if (!jatekosok.includes(this._lovesek[i].nev)) {
                jatekosok.push(this._lovesek[i].nev);
            }
        }
        return jatekosok.length;
    }
}
