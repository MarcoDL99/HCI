export class Canteen {
    id: number;
    name: string;
    region: string;
    address: string;
    open: string;
    closed: string;
    special: string;
    menu: string[][]
    constructor(id: number, name: string, region: string, address: string, open: string,
        closed: string, special: string) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.address = address;
        this.open = open;
        this.closed = closed;
        this.special = special;
        this.menu = [["Pasta with sauce", "Pasta with pesto"], ["Hamburger", "Sausages"], ["Salad", "Chips"]];
    }
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

export const CANTEENS = {
    'Abruzzo': [new Canteen(0, "Mensa del polo Centro", ABRUZZO, "Via Giuseppe Mezzanotte snc, Località Acquasanta, 67100 - L'Aquila", "Monday to Sunday", "", ""),
    new Canteen(1, "Mensa del polo Coppito", ABRUZZO, "Via Vetoio (Coppito 1), 67100 - L'Aquila", "Monday to Sunday", "", ""),
    new Canteen(2, "Mensa del polo Roio", ABRUZZO, "Piazzale Ernesto Pontieri, Monteluco di Roio, 67100 - L'Aquila", "Monday to Sunday", "", ""),
    new Canteen(3, "Mensa dell'ex caserma Campomizzi", ABRUZZO, "Loc S. Antonio - Casermette, Palazzina D, 67100 - L'Aquila", "Monday to Sunday", "", ""),
    new Canteen(4, "Mensa Pescara", ABRUZZO, "Viale G. Marconi, 191, 65126 Pescara PE", "Monday to Sunday", "", ""),
    new Canteen(5, "Mensa Chieti", ABRUZZO, "Mensa Universitaria, Via dei Vestini, 31, 66100 Chieti CH", "Monday to Sunday", "", "")
    ],
    'Basilicata': [new Canteen(6, "Mense Quartiere Maisonnettes", BASILICATA, "Via Lanera, 20, 75100 Matera MT", "", "", ""),
    new Canteen(7, "Mensa UniBas", BASILICATA, "85100 Potenza PZ", "", "", "")],
    calabria: [new Canteen(8, "Mense Quartiere Maisonnettes", CALABRIA, "Via Lanera, 20, 75100 Matera MT", "Monday to Sunday. 12.00 a.m. to 3.00 p.m. - 7.00 p.m. - 9.30 p.m.", "", ""),
    new Canteen(9, "Unical - Mensa Quartiere Martensson", CALABRIA, "85100 Potenza PZ", "Monday to Saturday (Saturday only at lunch). 12.00 a.m. to 3.00 p.m. - 7.00 p.m. - 9.30 p.m.", "Sunday", ""),
    new Canteen(10, "Unical - Mensa Piazza Vermicelli", CALABRIA, "85100 Potenza PZ", "Monday to Friday. 12.00 a.m. to 3.00 p.m.", "Saturday, Sunday", ""),
    new Canteen(11, "Unical - Bar tavola calda Polifunzionale", CALABRIA, "85100 Potenza PZ", "Monday to Saturday. Early morning to 3.00 p.m.", "", ""),
    ],
    'Campania': [],
    'Emilia Romagna': [],
    'Friuli Venezia Giulia': [],
    'Lazio': [new Canteen(12, "De Lollis", LAZIO, "Via De Lollis 22, 00185 - Roma", "Monday to Saturday. 11.45 a.m to 2.30 p.m - 7.00 p.m to 9.00 p.m.", "Sunday", "Book meals for celiacs at 064970339"),
    new Canteen(13, "Sette Sale", LAZIO, "Via delle sette sale 29, 00184 - Roma", "Monday to Saturday. 11.30 a.m to 3.00 p.m.", "Saturday, Sunday", "Book meals for celiacs at 064460316"),
    new Canteen(14, "Castro Laurenziano", LAZIO, "Via del Castro Laurenziano 7/B, 00161 - Roma", "Monday to Friday. 11.30 a.m to 3.00 p.m.", "Saturday, Sunday", "Meals for celiacs always available"),
    new Canteen(15, "Cambridge", LAZIO, "Via Cambridge 115, 00133 - Roma", "Monday to Friday. 11.45 a.m to 3.00 p.m. - 6.45 p.m to 9.00 p.m.", "Saturday, Sunday", "Meals for celiacs always available"),
    new Canteen(16, "Vasca Navale", LAZIO, "Via della Vasca Navale 79, 00146 - Roma", "Monday to Friday. 11.45 a.m to 3.00 p.m.", "Saturday, Sunday", "Book meals for celiacs at 0655340736"),
    new Canteen(17, "Caffè Pittori", LAZIO, "Via Flaminia 57/59, 00196 - Roma", "Monday to Friday. 12.00 a.m to 3.00 p.m. - 6.45 p.m to 9.00 p.m.", "Saturday, Sunday", "Book meals for celiacs at 3452606571"),
    new Canteen(18, "Ospedale S.Andrea", LAZIO, "Via di Grottarossa 1035, 00189 - Roma", "Monday to Friday. 12.00 a.m to 3.00 p.m. - 7.00 p.m to 9.00 p.m.", "", "20 Meals for celiacs available everyday. No booking allowed."),
    new Canteen(19, "Ristorante Vinile", LAZIO, "Via Libetta 19, 00154 - Roma", "Monday to Friday. 12.00 a.m to 3.00 p.m.", "Saturday, Sunday", ""),
    new Canteen(20, "Mensa Casal Bertone", LAZIO, "Via De Dominicis 13/15, 00159 - Roma", "Monday to Saturday. 12.00 a.m to 3.00 p.m. - 7.00 p.m to 9.00 p.m.", "Sunday", ""),
    new Canteen(21, "Università del Foro Italico", LAZIO, "Piazza Lauro de Bosis, 00100 - Roma", "Monday to Friday. 12.00 a.m to 2.30 p.m.", "Saturday, Sunday", ""),
    new Canteen(22, "Latina", LAZIO, "Via XXIV Maggio 48, 04100 - Latina", "Monday to Friday. 12.00 a.m to 2.30 p.m.", "Saturday, Sunday", ""),
    new Canteen(23, "San Sisto", LAZIO, "Piazza San Sisto 8, 01100 - Viterbo", "Monday to Sunday. 12.30 a.m to 2.30 p.m. - 7.30 p.m to 9.00 p.m.", "", "Book meals for celiacs and halal at 0761220912"),
    new Canteen(24, "Mensa Via Alessandro Volta", LAZIO, "Via Alessandro Volta 37, 01100 - Viterbo", "Monday to Friday. 12.30 a.m to 2.30 p.m.", "Saturday, Sunday", ""),
    new Canteen(25, "Folcara", LAZIO, "Via S. Angelo, Località Folcara - Cassino (FR)", "Monday to Friday. 11.30 a.m to 3.00 p.m. - 7.00 p.m to 9.00 p.m.", "Saturday, Sunday", "Book meals for celiacs at 07763258233"),
    new Canteen(26, "Ditta Gemini", LAZIO, "Via Minghetti 70, 03043 - Frosinone", "Monday to Friday. 12.00 a.m to 3.00 p.m.", "Saturday, Sunday", "Book meals for celiacs at 07763258233"),
    new Canteen(27, "Garigliano - Ingegneria", LAZIO, "Viale Bonomi - Cassino (FR)", "Monday to Friday. 11.30 a.m to 3.00 p.m. - 6.45 p.m to 9.00 p.m.", "Saturday, Sunday", "Meals for celiacs always available")
    ],
    'Liguria': [],
    'Lombardia': [],
    'Marche': [],
    'Molise': [],
    'Piemonte': [],
    'Puglia': [],
    'Sardegna': [],
    'Sicilia': [],
    'Toscana': [],
    'Prov. Autonoma di Trento': [],
    'Prov. Autonoma di Bolzano': [],
    'Umbria': [],
    'Valle d\'Aosta': [],
    'Veneto': []
}