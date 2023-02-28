const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const CREATE_CITY =
  'CREATE TABLE city (id  INTEGER PRIMARY KEY, insee VARCHAR(6) NOT NULL, name TEXT NOT NULL, zipcode  VARCHAR(6) NOT NULL, population INTEGER)';
const CREATE_FORECAST =
  'CREATE TABLE forecast (id  INTEGER PRIMARY KEY, date DATE NOT NULL, insee VARCHAR(6) NOT NULL, details TEXT NOT NULL)';

const POP_CITY =
  'insert into city (insee, name, zipcode, population) VALUES \
  ("06004", "ANTIBES", "06160", "73798"),\
("06029", "CANNES", "06400", "74152"),\
("06088", "NICE", "06200", "342636"),\
("10387", "TROYES", "10000", "60641"),\
("13001", "AIX-EN-PROVENCE", "13290", "143006"),\
("13208", "MARSEILLE 8E ARRONDISSEMENT", "13008", "80725"),\
("13209", "MARSEILLE 9E ARRONDISSEMENT", "13009", "74521"),\
("13212", "MARSEILLE 12E ARRONDISSEMENT", "13012", "60800"),\
("13213", "MARSEILLE 13E ARRONDISSEMENT", "13013", "91758"),\
("13214", "MARSEILLE 14E ARRONDISSEMENT", "13014", "62199"),\
("13215", "MARSEILLE 15E ARRONDISSEMENT", "13015", "76419"),\
("14118", "CAEN", "14000", "105400"),\
("17300", "LA ROCHELLE", "17000", "75735"),\
("18033", "BOURGES", "18000", "65557"),\
("21231", "DIJON", "21000", "155095"),\
("25056", "BESANÇON", "25000", "116465"),\
("26362", "VALENCE", "26000", "62475"),\
("29019", "BREST", "29200", "139339"),\
("29232", "QUIMPER", "29000", "63401"),\
("2A004", "AJACCIO", "20167", "69073"),\
("30189", "NÎMES", "30900", "150999"),\
("31555", "TOULOUSE", "31300", "475442"),\
("33063", "BORDEAUX", "33000", "252044"),\
("33281", "MÉRIGNAC", "33700", "70318"),\
("33318", "PESSAC", "33600", "61860"),\
("34032", "BÉZIERS", "34500", "76495"),\
("34172", "MONTPELLIER", "34000", "281611"),\
("35238", "RENNES", "35000", "216268"),\
("37261", "TOURS", "37000", "136565"),\
("38185", "GRENOBLE", "38100", "158182"),\
("42218", "SAINT-ÉTIENNE", "42000", "171925"),\
("44109", "NANTES", "44000", "306692"),\
("44184", "SAINT-NAZAIRE", "44600", "69718"),\
("45234", "ORLÉANS", "45100", "114781"),\
("49007", "ANGERS", "49100", "151231"),\
("50129", "CHERBOURG-EN-COTENTIN", "50130", "80076"),\
("51454", "REIMS", "51100", "183111"),\
("54395", "NANCY", "54100", "104592"),\
("57463", "METZ", "57050", "117890"),\
("59009", "VILLENEUVE-D\'ASCQ", "59493", "62360"),\
("59183", "DUNKERQUE", "59430", "88109"),\
("59350", "LILLE", "59160", "232449"),\
("59512", "ROUBAIX", "59100", "96412"),\
("59599", "TOURCOING", "59200", "97477"),\
("62193", "CALAIS", "62100", "74978"),\
("63113", "CLERMONT-FERRAND", "63000", "142680"),\
("64445", "PAU", "64000", "77252"),\
("66136", "PERPIGNAN", "66100", "121875"),\
("67482", "STRASBOURG", "67100", "279277"),\
("68066", "COLMAR", "68000", "69899"),\
("68224", "MULHOUSE", "68100", "108996"),\
("69259", "VÉNISSIEUX", "69200", "65403"),\
("69266", "VILLEURBANNE", "69100", "149018"),\
("69383", "LYON 3E ARRONDISSEMENT", "69003", "101992"),\
("69387", "LYON 7E ARRONDISSEMENT", "69007", "82045"),\
("69388", "LYON 8E ARRONDISSEMENT", "69008", "84519"),\
("72181", "LE MANS", "72000", "142992"),\
("74010", "ANNECY", "74000", "126416"),\
("75110", "PARIS 10E ARRONDISSEMENT", "75010", "91934"),\
("75111", "PARIS 11E ARRONDISSEMENT", "75011", "147016"),\
("75112", "PARIS 12E ARRONDISSEMENT", "75012", "141494"),\
("75113", "PARIS 13E ARRONDISSEMENT", "75013", "181548"),\
("75114", "PARIS 14E ARRONDISSEMENT", "75014", "137104"),\
("75115", "PARIS 15E ARRONDISSEMENT", "75015", "233483"),\
("75116", "PARIS 16E ARRONDISSEMENT", "75116", "165447"),\
("75117", "PARIS 17E ARRONDISSEMENT", "75017", "167835"),\
("75118", "PARIS 18E ARRONDISSEMENT", "75018", "195060"),\
("75119", "PARIS 19E ARRONDISSEMENT", "75019", "186390"),\
("75120", "PARIS 20E ARRONDISSEMENT", "75020", "195603"),\
("76351", "LE HAVRE", "76600", "170356"),\
("76540", "ROUEN", "76000", "110121"),\
("78646", "VERSAILLES", "78000", "85345"),\
("80021", "AMIENS", "80080", "133751"),\
("82121", "MONTAUBAN", "82000", "60444"),\
("83126", "LA SEYNE-SUR-MER", "83500", "64620"),\
("83137", "TOULON", "83100", "169631"),\
("84007", "AVIGNON", "84000", "92378"),\
("86194", "POITIERS", "86000", "87959"),\
("87085", "LIMOGES", "87000", "132659"),\
("92002", "ANTONY", "92160", "62209"),\
("92004", "ASNIÈRES-SUR-SEINE", "92600", "85974"),\
("92012", "BOULOGNE-BILLANCOURT", "92100", "119645"),\
("92024", "CLICHY", "92110", "60387"),\
("92025", "COLOMBES", "92700", "85366"),\
("92026", "COURBEVOIE", "92400", "81720"),\
("92040", "ISSY-LES-MOULINEAUX", "92130", "68394"),\
("92044", "LEVALLOIS-PERRET", "92300", "63461"),\
("92050", "NANTERRE", "92000", "94260"),\
("92051", "NEUILLY-SUR-SEINE", "92200", "60581"),\
("92063", "RUEIL-MALMAISON", "92500", "78197"),\
("93001", "AUBERVILLIERS", "93300", "86064"),\
("93005", "AULNAY-SOUS-BOIS", "93600", "84663"),\
("93029", "DRANCY", "93700", "70270"),\
("93048", "MONTREUIL", "93100", "108404"),\
("93051", "NOISY-LE-GRAND", "93160", "66657"),\
("93066", "SAINT-DENIS", "93200", "111355"),\
("94017", "CHAMPIGNY-SUR-MARNE", "94500", "77408"),\
("94028", "CRÉTEIL", "94000", "89396"),\
("94041", "IVRY-SUR-SEINE", "94200", "60770"),\
("94068", "SAINT-MAUR-DES-FOSSÉS", "94100", "74893"),\
("94081", "VITRY-SUR-SEINE", "94400", "92758"),\
("95018", "ARGENTEUIL", "95100", "110467"),\
("95127", "CERGY", "95800", "63819");';

const database = {};

database.init = function () {
  db.serialize(() => {
    db.run(CREATE_CITY);
    db.run(CREATE_FORECAST);
    db.run(POP_CITY);
  });
};

database.run = function (request) {
  db.run(request);
};

database.all = async function (sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

database.get = async function (sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

database.close = function () {
  db.close();
};

module.exports = database;
