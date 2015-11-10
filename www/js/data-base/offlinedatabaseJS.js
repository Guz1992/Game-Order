//1. Inicialização
 
var localDB = null;

function hrsss(){
    console.log('oi');
}
 
function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Erro: Seu navegador não permite banco de dados.");
        }
        else {
            initDB();
            createTables();
            queryAndUpdateOverview();
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
    var shortName = 'gameOrder';
    var version = '2.8.17';
    var displayName = 'MyGameOrder';
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
 
 
 
 
//2. Query e visualização de Update
 
 
function onUpdate(){
    var id = document.itemForm.id.value;
    var nome = document.itemForm.nome.value;
    if (nome == "") {
        updateStatus("'Nome' é obrigatório");
    }
    else {
        var query = "update player set nome=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Update não realizado.");
                    }
                    else {
                        updateForm("", "", "");
                        updateStatus("Update realizado:" + results.rowsAffected);
                        queryAndUpdateOverview();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Erro: UPDATE não realizado " + e + ".");
        }
    }
}
 
function onDelete(){
    var id = document.itemForm.id.value;
 
    var query = "delete from player where id=?;";
    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    updateForm("", "", "");
                    updateStatus("Linhas deletadas:" + results.rowsAffected);
                    queryAndUpdateOverview();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");
    }
 
}

function deletarPlayersAtuais(listaIdsL,i){

    try {
        localDB.transaction(function(transaction){
     
            transaction.executeSql("delete from player where id=" + listaIdsL[i] +";", [], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    //updateForm("", "", "");
                    //updateStatus("Linhas deletadas:" + results.rowsAffected);
                    //queryAndUpdateOverview();
                    console.log("pessoas deletadas");
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");
    }  
}
 
function onCreate(){
    var nome = document.itemForm.nome.value;
    if (nome == "") {
        updateStatus("Erro: 'Nome' e 'Idade' são campos obrigatórios!");
    }
    else {
        var query = "insert into player (nome) VALUES (?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        updateForm("", "", "");
                        updateStatus("Inserção realizada, linha id: " + results.insertId);
                        queryAndUpdateOverview();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
}
 
function onSelect(htmlLIElement){
    var id = htmlLIElement.getAttribute("id");
 
    query = "SELECT * FROM player where id=?;";
    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [id], function(transaction, results){
 
                var row = results.rows.item(0);
 
                updateForm(row['id'], row['nome']);
 
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
 
}
 
function queryAndUpdateOverview(){
 
    //Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
 
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
 
    //Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM player;";
    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
 
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
                    li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
 
                    var liText = document.createTextNode(row['nome']);
                    li.appendChild(liText);
 
                    document.getElementById("itemData").appendChild(li);
                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}
 
// 3. Funções de tratamento e status.
 
// Tratando erros
 
errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}
 
nullDataHandler = function(transaction, results){
}
 
// Funções de update
 
function updateForm(id, nome){
    document.itemForm.id.value = id;
    document.itemForm.nome.value = nome;
}
 
function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}

function recolocarFila(listaDeJogadoresL,k){
     
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql("insert into player (nome) VALUES" + "(" + "'"+listaDeJogadoresL[k]+"'" + ")" + ";", [], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        //updateForm("", "", "");
                        updateStatus("Inserção realizada, linha id: " + results.insertId);
                        //queryAndUpdateOverview();
                    }
                }, errorHandler);

            });
        } 
        catch (e) {
            updateStatus("Erro: INSERT não realizado " + e + ".");
        }   
}

function separaTimes(listaDeJogadoresL, qty) {

    console.log(listaDeJogadoresL);
    var time1 = new Array;
    var time2 = new Array;

    time1 = listaDeJogadoresL.splice(0, qty);
    time2 = listaDeJogadoresL;
    console.log([time1, time2]);

    return [time1, time2];
}

function mesclar(listaTimesL, qty){
    
    var time1 = listaTimesL[0];
    var time2 = listaTimesL[1];
    
    var jogadorTrocar;

    for(var i = 0; i < qty; i++){        
        if(i % 2 == 0){
            jogadorTrocar = time1[i];
            time1[i] = time2[i];
            time2[i] = jogadorTrocar;
        }

    }

    var times = [time1, time2];

    return times;
}

function mesclaGame(){

    var qty = document.getElementById("qty_players").value;
    var listaDeJogadores = new Array;
    var listaIds = new Array;

    var dataRows = document.getElementById("game").getElementsByClassName("data");
 
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("game").removeChild(row);
    };

    var query = "SELECT * FROM player LIMIT " + qty * 2 + ";";

    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    console.log(results.rows.length);
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
                    li.setAttribute("id", row['id']);
                    listaIds[i] = li.id;
 
                    var liText = document.createTextNode(row['nome']);
                    listaDeJogadores[i] = liText.data;

                }
                    var times = separaTimes(listaDeJogadores, qty);
                    mesclar(times,qty);

         }, function(transaction, error){
                    updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
                });
            });
        }
        catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    } 

}

function createGame(){ 
    var qty = document.getElementById("qty_players").value;
    var listaDeJogadores = new Array;
    var listaIds = new Array;

    var dataRows = document.getElementById("game").getElementsByClassName("data");
 
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("game").removeChild(row);
    };

    var query = "SELECT * FROM player LIMIT " + qty * 2 + ";";

    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
                    li.setAttribute("id", row['id']);
                    listaIds[i] = li.id;
 
                    var liText = document.createTextNode(row['nome']);
                    listaDeJogadores[i] = liText.data;

                }
                
                var times = separaTimes(listaDeJogadores, qty);
                
                mesclar(times,qty);

                for(var j = 0; j < listaIds.length; j++){
                    deletarPlayersAtuais(listaIds, j);
                    recolocarFila(listaDeJogadores, j);
                }

            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }

}