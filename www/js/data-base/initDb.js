//1. Inicialização
 
var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Erro: Seu navegador não permite banco de dados.");
        }
        else {
            initDB();
            createTables();
            queryAndUpdateOverview(true);
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Erro: Versão de banco de dados inválida.");
        }
        else {
            updateStatus("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}
 
function initDB(){
    var shortName = 'gameOrder1';
    var version = '2.8.17';
    var displayName = 'MyGameOrder1';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}
 
function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS player(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'player' status: OK.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'player' não criada " + e + ".");
        return;
    }
}

