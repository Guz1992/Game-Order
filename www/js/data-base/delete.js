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

function removerTime(data){
    var jogadoresTime = document.getElementById(data).getElementsByClassName(data);
    var size = jogadoresTime.length;
    var ids = new Array

    for(var i = 0; i < size; i++){
        id = jogadoresTime[i].getAttribute("id");
        ids[i] = id;   
        deletarPlayersAtuais(ids,i);
        recolocarFila(jogadoresTime[i].innerHTML);
    }
    document.getElementById("qty_players").value = size;
    createGame();

}

// Deleta JOGADOR 
function deletePlayer(htmlLIElement, place){
    var name = htmlLIElement.innerHTML;
    var resp = confirm("Tem certeza que deseja excluir: " + name + "?");

    if (resp == true) {
        remove(htmlLIElement, place);
    } else {
        console.log("Não foi removido!");
    }
}

function remove(htmlLIElement, place){
    var id = htmlLIElement.getAttribute("id");
    
    var query = "delete from player where id=?;";
    try {
        localDB.transaction(function(transaction){ 
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");

                } else {
                    updateStatus("Linhas deletadas:" + results.rowsAffected);
                    if (place == 'index') { // Se for da lista de jogadores da tela inicial
                        queryAndUpdateOverview();
                    }

                    if (place == 'game') { // Se for da tela da listagem dos times
                        atualizaTimes();
                    }

                }
            }, errorHandler);
        });
    } catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");

    }
}