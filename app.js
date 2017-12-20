/* importar as configurações do serviror */

var app = require('./config/server');
var socketIO = require('socket.io');
/*Parametrizar a porta de escuta */

var server = app.listen(3000, function(){
    console.log('Servidor esta online !');
});

var io = socketIO.listen(server);

app.set('io', io); // variavel global no objeto do express

/* criar a conexão por websocket */
io.on('connection', function(socket){
    console.log('Usuário conectou ao servidor');

    socket.on('disconnect', function(){
        socket.broadcast.emit(
            'user_exit',
            {apelido: 'Alguém', msg: ' saiu da conversa'}
        );
    });

    socket.on('msgToServer', function(data){

        if(data.msg == ''){
            return;
        }

        /* Dispara eventos de dialogo*/
        socket.emit(
            'msgToClient',
            {apelido: data.apelido, msg: data.msg}
        );

        socket.broadcast.emit(
            'msgToClient',
            {apelido: data.apelido, msg: data.msg}
        );

        /* participantes */
        if(parseInt(data.participante) == 0){
            socket.emit(
                'participantesCliente',
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesCliente',
                {apelido: data.apelido}
            );
        }
    });

}); 