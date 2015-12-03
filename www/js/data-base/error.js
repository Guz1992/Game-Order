errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
},
 
nullDataHandler = function(transaction, results){
    
    updateStatus("Erro: " + results);
    return true;
},

updateStatus = function updateStatus(status){
    console.log(status);
}

// Atualizar Lista 
function updateForm(id, nome){
    console.log(id + ' ' + nome);
}
