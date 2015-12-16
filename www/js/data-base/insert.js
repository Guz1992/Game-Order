function onCreate(value){
    var nome = value;

    if (nome == "") {
        updateStatus("Erro: 'Nome' é campo obrigatório!");
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
