function queryAndUpdateOverview(start){ 
    if(! start) {
        //Remove as linhas existentes para inserção das novas
        var dataRows = document.getElementById("itemData").getElementsByClassName("data");
     
        while (dataRows.length > 0) {
            row = dataRows[0];
            document.getElementById("itemData").removeChild(row);
        };
    }
 
    //Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM player;";
    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [], function(transaction, results){

                for (var i = 0; i < results.rows.length; i++) {
 
                    var row = results.rows.item(i);
                    var ionItem = document.createElement("ion-item");
                    ionItem.setAttribute("id", row['id']);
                    ionItem.setAttribute("class", "item widget uib_w_7 data");
                    ionItem.setAttribute("onclick", "deletePlayer(this, 'index')");
 
                    var ionText = document.createTextNode(row['nome']);
                    ionItem.appendChild(ionText);
 
                    document.getElementById("itemData").appendChild(ionItem);
                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}

function atualizaTimes() {

}

function recolocarFila(listaDeJogadoresL){
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql("insert into player (nome) VALUES" + "(" + "'" + listaDeJogadoresL + "'" + ")" + ";", [], function(transaction, results){
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

function createGame(){ 
    var qty = document.getElementById("qty_players").value;

    //Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("time-a").getElementsByClassName("time-a");
 
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("time-a").removeChild(row);
    };

    var dataRows = document.getElementById("time-b").getElementsByClassName("time-b");
 
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("time-b").removeChild(row);
    };

    var times =  new Array;


    var query = "SELECT * FROM player LIMIT " + qty * 2 + ";";

    try {
        localDB.transaction(function(transaction){
 
            transaction.executeSql(query, [], function(transaction, results){
                
                for(var i = 0; i < qty * 2; i++){
                    times[i] = results.rows.item(i);
                }

                for (var i = 0; i < qty; i++) {
                    console.log(times);
                    var ionItem = document.createElement("ion-item");
                    ionItem.setAttribute("id", times[i]['id']);
                    ionItem.setAttribute("class", "item widget time-a");
                    ionItem.setAttribute("onclick", "deletePlayer(this, 'game')");
 
                    var ionText = document.createTextNode(times[i]['nome']);
                    ionItem.appendChild(ionText);
 
                    document.getElementById("time-a").appendChild(ionItem);
                }

                for (var i = qty; i < qty * 2; i++) {
                    var ionItem = document.createElement("ion-item");
                    ionItem.setAttribute("id", times[i]['id']);
                    ionItem.setAttribute("class", "item widget time-b");
                    ionItem.setAttribute("onclick", "deletePlayer(this, 'game')");
 
                    var ionText = document.createTextNode(times[i]['nome']);
                    ionItem.appendChild(ionText);
 
                    document.getElementById("time-b").appendChild(ionItem);
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

