// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable max-lines */
/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const MIN_RATING = 0;
const MAX_RATING = 5;

export enum Geschlecht {
    MAENNLICH = 'M',
    WEIBLICH = 'W',
    DIVERS = 'D',
}
export enum Familienstand {
    LEDIG = 'L',
    VERHEIRATET = 'VH',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
}

/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundedaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    _id?: string | undefined;
    nachname: string;
    email?: string | undefined;
    newsletter?: boolean | undefined;
    homepage?: string | undefined;
    geschlecht?: Geschlecht | undefined;
    familienstand?: Familienstand | '' | undefined;
    geburtsdatum?: string | undefined;
    version?: number;
    // umsatz?: Umsatz;
    // adresse?: Adresse;
}

interface Link {
    href: string;
}

/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    kategorie?: number | undefined;
    interessen?: string[] | undefined;
    adresse: {
        plz?: string | undefined;
        ort?: string | undefined;
    };
    user?: {
        username?: string | undefined;
        password?: string | undefined;
    };
    username?: string;
    _links?: {
        self: Link;
        list?: Link;
        add?: Link;
        update?: Link;
        remove?: Link;
    };
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    kategorie: number;
    username?: string;
    password?: string;
    plz?: string;
    ort?: string;
    reisen?: boolean;
    sport?: boolean;
    lesen?: boolean;
}

export interface KundePut {
    _id?: string;
    nachname: string;
    email?: string | undefined;
    kategorie?: number | undefined;
    newsletter?: boolean | undefined;
    geburtsdatum?: string | undefined;
    homepage?: string | undefined;
    geschlecht?: Geschlecht | undefined;
    familienstand?: Familienstand | '' | undefined;
    interessen?: string[];
    adresse: {
        plz: string | undefined;
        ort: string | undefined;
    };
}

export interface ServerResponse {
    _embedded: {
        kundeList: KundeServer[];
    };
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    private static readonly SPACE = 2;

    // kategorieArray: boolean[] =
    //     /* eslint-disable unicorn/no-new-array, unicorn/prefer-spread */
    //     this.kategorie === undefined
    //         ? new Array(MAX_RATING - MIN_RATING).fill(false)
    //         : new Array(this.kategorie - MIN_RATING)
    //               .fill(true)
    //               .concat(new Array(MAX_RATING - this.kategorie));
    // eslint-disable-next-line eslint-comments/no-unused-enable
    /* eslint-enable unicorn/no-new-array, unicorn/prefer-spread */

    geburtsdatum: Date | undefined;

    interessen: string[];

    // wird aufgerufen von fromServer() oder von fromForm()
    // eslint-disable-next-line max-params
    private constructor(
        public _id: string | undefined,
        public nachname: string,
        public email: string | undefined,
        public kategorie: number | undefined,
        public familienstand: Familienstand | '' | undefined,
        public geschlecht: Geschlecht | undefined,
        geburtsdatum: string | undefined,
        public homepage: string | undefined,
        public newsletter: boolean | undefined,
        interessen: string[] | undefined,
        public username: string | undefined,
        public password: string | undefined,
        public ort: string | undefined,
        public plz: string | undefined,
        public version: number | undefined,
    ) {
        this.geburtsdatum =
            geburtsdatum === undefined ? new Date() : new Date(geburtsdatum);
        this.interessen = interessen === undefined ? [] : interessen;
        console.log('Kunde(): this=', this);
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Kunde-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined;
        const { _links } = kundeServer;
        if (_links !== undefined) {
            const { self } = _links;
            selfLink = self.href;
        }
        let id: string | undefined;
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/');
            id = selfLink.slice(lastSlash + 1);
        }

        let version: number | undefined;
        if (etag !== undefined) {
            const versionStr = etag.slice(1, -1);
            version = Number.parseInt(versionStr, 10);
        }

        console.log('Kunde, wie er vom Server kommt=', kundeServer);

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.familienstand,
            kundeServer.geschlecht,
            kundeServer.geburtsdatum,
            kundeServer.homepage,
            kundeServer.newsletter,
            kundeServer.interessen,
            kundeServer.username,
            kundeServer.user?.password,
            kundeServer.adresse.ort,
            kundeServer.adresse.plz,
            version,
        );
        console.log('Kunde.fromServer(): kunde=', kunde);
        return kunde;
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param kunde JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Kunde-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        console.log('Kunde.fromForm(): kundeForm=', kundeForm);
        const interessen: string[] = [];
        if (kundeForm.reisen === true) {
            interessen.push('R');
        }
        if (kundeForm.lesen === true) {
            interessen.push('L');
        }
        if (kundeForm.sport === true) {
            interessen.push('S');
        }

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            Number(kundeForm.kategorie),
            kundeForm.familienstand,
            kundeForm.geschlecht,
            kundeForm.geburtsdatum,
            kundeForm.homepage,
            kundeForm.newsletter,
            interessen,
            kundeForm.username,
            kundeForm.password,
            kundeForm.ort,
            kundeForm.plz,
            kundeForm.version,
        );
        console.log('Kunde.fromForm(): kunde=', kunde);
        return kunde;
    }

    // Property in TypeScript wie in C#
    // https://www.typescriptlang.org/docs/handbook/classes.html#accessors
    get datumFormatted() {
        const formatter = new Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return this.geburtsdatum === undefined
            ? ''
            : formatter.format(this.geburtsdatum);
    }

    /**
     * Abfrage, ob im Kundennamen der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param titel Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Kundetitel enthalten ist. Sonst
     *         false.
     */
    containsTitel(nachname: string) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase());
    }

    /**
     * Die Bewertung des Kunden um 1 erh&ouml;hen
     */
    rateUp() {
        if (this.kategorie !== undefined && this.kategorie < MAX_RATING) {
            this.kategorie++;
        }
    }

    /**
     * Die Bewertung des Kunden um 1 erniedrigen
     */
    rateDown() {
        if (this.kategorie !== undefined && this.kategorie > MIN_RATING) {
            this.kategorie--;
        }
    }

    /**
     * Abfrage, ob der Kunde das Geschlecht hat
     * @param verlag der Name des Verlags
     * @return true, falls das Kunde dem Verlag zugeordnet ist. Sonst false.
     */
    hasGeschlecht(geschlecht: string) {
        return this.geschlecht === geschlecht;
    }

    /**
     * Aktualisierung der Stammdaten des Kunde-Objekts.
     * @param titel Der neue Kundetitel
     * @param rating Die neue Bewertung
     * @param art Die neue Kundeart (DRUCKAUSGABE oder KINDLE)
     * @param verlag Der neue Verlag
     * @param preis Der neue Preis
     * @param rabatt Der neue Rabatt
     */
    // eslint-disable-next-line max-params
    updateStammdaten(
        nachname: string,
        email: string | undefined,
        kategorie: number | undefined,
        geburtsdatum: Date | undefined,
        homepage: string,
        geschlecht: Geschlecht | undefined,
        familienStand: Familienstand | undefined,
        plz: string,
        ort: string,
        newsletter: boolean | undefined,
    ) {
        this.nachname = nachname;
        this.email = email;
        this.kategorie = kategorie;
        // this.kategorieArray =
        //     kategorie === undefined
        //         ? (Array.from({ length: MAX_RATING - MIN_RATING }).fill(
        //               false,
        //           ) as boolean[])
        //         : (Array.from({ length: kategorie - MIN_RATING }).fill(
        //               true,
        //           ) as boolean[]);
        this.geburtsdatum = geburtsdatum;
        this.homepage = homepage;
        this.geschlecht = geschlecht;
        this.familienstand = familienStand;
        this.plz = plz;
        this.ort = ort;
        this.newsletter = newsletter;
    }

    /**
     * Abfrage, ob es zum Kunde auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
     */
    hasInteressen() {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.interessen === undefined) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return this.interessen?.length !== 0;
    }

    /**
     * Abfrage, ob es zum Kunde das angegebene Schlagwort gibt.
     * @param schlagwort das zu &uuml;berpr&uuml;fende Schlagwort
     * @return true, falls es das Schlagwort gibt. Sonst false.
     */
    hasInteresse(interesse: string) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.interessen === undefined) {
            return false;
        }
        return this.interessen.includes(interesse);
    }

    /**
     * Aktualisierung der Schlagw&ouml;rter des Kunde-Objekts.
     * @param javascript ist das Schlagwort JAVASCRIPT gesetzt
     * @param typescript ist das Schlagwort TYPESCRIPT gesetzt
     */
    updateInterssen(reisen: boolean, lesen: boolean, sport: boolean) {
        this.resetInteressen();
        if (lesen) {
            this.addInteresse('L');
        }
        if (reisen) {
            this.addInteresse('R');
        }
        if (sport) {
            this.addInteresse('S');
        }
    }

    /**
     * Konvertierung des Kundeobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        const geburtsdatum =
            this.geburtsdatum === undefined
                ? undefined
                : this.geburtsdatum.toISOString();
        console.log(`toJSON(): datum=${geburtsdatum}`);
        console.log(`toJSON(): familienstand=${this.familienstand}`);
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            geburtsdatum,
            newsletter: this.newsletter,
            homepage: this.homepage,
            interessen: this.interessen,
            adresse: {
                plz: this.plz,
                ort: this.ort,
            },
            user: {
                username: this.username,
                password: this.password,
            },
        };
    }

    toJSONPut(): KundePut {
        const geburtsdatum =
            this.geburtsdatum === undefined
                ? undefined
                : this.geburtsdatum.toISOString();
        return {
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum,
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: {
                plz: this.plz,
                ort: this.ort,
            },
        };
    }

    toString() {
        // eslint-disable-next-line no-null/no-null,unicorn/no-null
        return JSON.stringify(this, null, Kunde.SPACE);
    }

    private resetInteressen() {
        this.interessen = [];
    }

    private addInteresse(interesse: string) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.interessen === undefined) {
            this.interessen = [];
        }
        this.interessen.push(interesse);
    }
}
/* eslint-enable max-lines */
// eslint-disable-next-line eslint-comments/no-unused-enable
/* eslint-enable no-extra-parens */
