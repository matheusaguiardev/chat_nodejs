module.exports = function(app){
    app.get('/', function(req, res){
        console.log('Iniciando a view da home !');
        app.app.controllers.index.home(app, req, res);
    });
}