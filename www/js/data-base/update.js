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