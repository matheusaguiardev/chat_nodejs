module.exports.startChat = function(app, req, res){

    var nick = req.body;

    req.assert('nickname', 'Você precisa de um apelido para entrar no chat !').notEmpty();
    req.assert('nickname', 'Seu apelido deve conter entre 3 a 10 caracteres').len(3,10);

    var erros = req.validationErrors(); // recuperar os erros
    var globalPort = app.get('global_port');

    if(erros){
        res.render('index', {erros: erros});
        return;
    }

    app.get('io').emit( // para recuperar a variavel global do express app.get('variavel')
        'msgToClient',
        {apelido: nick.nickname, msg: 'Entrou no chat !'}
    ) 
    
    res.render('chat',{user:nick, port: globalPort});
}

