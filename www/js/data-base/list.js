function onSelect(htmlLIElement){
    var id = htmlLIElement.getAttribute("id");
    
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
                    ionItem.setAttribute("onclick", "confirmar(this)");
 
                    var ionText = document.createTextNode(row['nome']);
                    ionItem.appendChild(ionText);
 
                    document.getElementById("itemData").appendChild(ionItem);
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


function confirmar(htmlLIElement){
    var resp = confirm("Tem certeza que deseja excluir esse player?");
    if(resp == true){
        onSelect(htmlLIElement);
    }else{
        console.log("null");
    }
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

