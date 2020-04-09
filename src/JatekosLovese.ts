export default class JatekosLovese {
    private _nev: string;
    private _xkoordinata: number;
    private _ykoordinata: number;
    private _sorszam: number;

    public get nev(): string {
        return this._nev;
    }

    public get xkoordinata(): number {
        return this._xkoordinata;
    }

    public get ykoordinata(): number {
        return this._ykoordinata;
    }

    public get sorszam(): number {
        return this._sorszam;
    }

    public Tavolsag(celtablaKozeppontElso: number, celtablaKozeppontMasodik: number): number {
        const dx = celtablaKozeppontElso - this.xkoordinata;
        const dy = celtablaKozeppontMasodik - this.ykoordinata;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    public Pontszam(celtablaKozeppontElso: number, celtablaKozeppontMasodik: number): string | null {
        if (10 - this.Tavolsag(celtablaKozeppontElso, celtablaKozeppontMasodik) < 0) {
            return null;
        }
        return (10 - this.Tavolsag(celtablaKozeppontElso, celtablaKozeppontMasodik)).toFixed(2);
    }

    constructor(sor: string, sorszam: number) {
        const m: string[] = sor.split(";");
        this._nev = m[0];
        this._xkoordinata = parseFloat(m[1].replace(",", "."));
        this._ykoordinata = parseFloat(m[2].replace(",", "."));
        this._sorszam = sorszam;
    }
}
