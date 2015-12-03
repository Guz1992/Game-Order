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
