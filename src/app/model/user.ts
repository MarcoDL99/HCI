import { Canteen } from "./canteen";

export class User{
    mail: string;
    favouriteID: number;
    password: string;
    status: number;
    credit: number;
    region: string;
    favourite: Canteen;
    requestdate: string;
    card: string;
    paypal: string;
    payments: string[][];
    constructor(mail: string, password: string, credit: number) {
        this.mail=mail;
        this.password=password;
        this.favouriteID = -1;
        this.credit=credit;
        this.status=1; // 0 accepted, 1 pending, 2 denied
        this.region= LAZIO;
        var today = new Date();
        this.requestdate=(today.toLocaleDateString());
        this.paypal="";
        this.card="";
      }
    getUsername(): string{
        return this.mail;
    }
    getPassword(): string{
        return this.password;
    }
}
export const REGIONI = {
    ABRUZZO: 'Abruzzo',
    BASILICATA: 'Basilicata',
    CALABRIA: 'Calabria',
    CAMPANIA: 'Campania',
    EMILIA_ROMAGNA: 'Emilia Romagna',
    FRIULI_VENEZIA_GIULIA: 'Friuli Venezia Giulia',
    LAZIO: 'Lazio',
    LIGURIA: 'Liguria',
    LOMBARDIA: 'Lombardia',
    MARCHE: 'Marche',
    MOLISE: 'Molise',
    PIEMONTE: 'Piemonte',
    PUGLIA: 'Puglia',
    SARDEGNA: 'Sardegna',
    SICILIA: 'Sicilia',
    TOSCANA: 'Toscana',
    PROVAUT_TRENTO: 'Provincia Autonoma di Trento',
    PROVAUT_BOLZANO: 'Provincia Autonoma di Bolzano',
    UMBRIA: 'Umbria',
    VALLE_D_AOSTA: 'Valle d\'Aosta',
    VENETO: 'Veneto',
    TRENTINO: 'Trentino Alto Adige'
  }
  
  export const ABRUZZO = 'Abruzzo';
  export const BASILICATA = 'Basilicata';
  export const CALABRIA = 'Calabria';
  export const CAMPANIA = 'Campania';
  export const EMILIA_ROMAGNA = 'Emilia Romagna';
  export const FRIULI_VENEZIA_GIULIA = 'Friuli Venezia Giulia';
  export const LAZIO = 'Lazio';
  export const LIGURIA = 'Liguria';
  export const LOMBARDIA = 'Lombardia';
  export const MARCHE = 'Marche';
  export const MOLISE = 'Molise';
  export const PIEMONTE = 'Piemonte';
  export const PUGLIA = 'Puglia';
  export const SARDEGNA = 'Sardegna';
  export const SICILIA = 'Sicilia';
  export const TOSCANA = 'Toscana';
  export const PROVAUT_TRENTO = 'Prov. Autonoma di Trento';
  export const PROVAUT_BOLZANO = 'Prov. Autonoma di Bolzano';
  export const UMBRIA = 'Umbria';
  export const VALLE_D_AOSTA = 'Valle d\'Aosta';
  export const VENETO = 'Veneto';
  
  export const NOMI_REGIONI = [ABRUZZO,BASILICATA,CALABRIA,CAMPANIA,EMILIA_ROMAGNA,FRIULI_VENEZIA_GIULIA,LAZIO,LIGURIA,LOMBARDIA,
    MARCHE,MOLISE,PIEMONTE,PUGLIA,SARDEGNA,SICILIA,TOSCANA,PROVAUT_TRENTO,PROVAUT_BOLZANO,UMBRIA,VALLE_D_AOSTA,VENETO];
  