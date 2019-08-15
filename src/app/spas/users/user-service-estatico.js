var app = angular.module('UserCRUDServiceEstatico', [])

app.service('UserCRUDServiceEstatico',['$http','$httpParamSerializer', function ($http,$httpParamSerializer) {

    this.editarUser = function editarUser(usuarioTela,vm,index) {
        
        //altera o campo preEditar do user para true para que apareça o input text dentro da tabela
        usuarioTela.preEditar = true;

        //salva o user com o campo preEditar = true
        vm.usuarios[index] = usuarioTela;

        //guarda uma cópia do user, criando o objeto 
        //usuarioOriginal usuarioOriginal new usuarioOriginal()  
        //usuarioOriginal =  vm.usuarios[index]
        //em tempo de compilacao) para que quando cancelar a edição, volte com os valores originais
        vm.usuarioOriginal = angular.copy(vm.usuarios[index]);

        //limpa o formulario (setUSer(new User()))
        vm.usuario = {};

        return usuarioTela; 
    }

    this.confirmarEditar = function confirmarEditar(user,vm,index){
        //altera o campo preEditar do user para false para que apareça readonly dos campos
        user.preEditar = false;
        
        vm.usuarios[index] = user;
        vm.usuarioOriginal = angular.copy(vm.usuarios[index]);
        vm.user = {};

        return user;
    }

    this.cancelarEditarUser = function cancelarEditarUser(usuarioTela,vm,index) {

        usuarioTela = vm.usuarioOriginal;
        usuarioTela.preEditar = false;
        vm.usuarios[index] = usuarioTela;

        vm.usuario = {};

        return vm.usuario;
    }

    this.adicionarUsuario = function adicionarUsuario(usuarioTela,vm){
             
        if (usuarioTela != null && usuarioTela.nome && usuarioTela.sexoUsuarioEnum) {    
        	
        	console.log(usuarioTela);
        	
        	$http({
                method: 'POST',
                headers: {
                	'Content-Type': 'application/json'
                },
                url: 'http://localhost:8080/listatarefas/rest/usuario/salvarUsuario',
                data: JSON.stringify(usuarioTela)
              })          
              .then(
        			function success(response){
        				console.log(vm.usuarios.includes(usuarioTela, 0));

        	            usuarioTela.preEditar = false; 
        	            vm.usuarios.push(usuarioTela);
        	            vm.usuario = {};   
        	            vm.errorMessage = ''; 
        			},
        			function error(response) {
        				if (response.status === 404){
        					console.log("Endpoint Fora ");
        				} else {
        					vm.errorMessage = "Código do Status " +response.status;
        					console.log("Código do Status " +response.status );
        				}
        				
        			}
            	);
        	  
        } else {
            vm.errorMessage = 'Entre com o nome e o sexo!';
            vm.message = '';
            console.log(vm.errorMessage);
        }
    }
    this.getUsuarios = function getUsuarios(){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/listatarefas/rest/usuario/listarUsuarios'
        });
    }

    this.deleteUser = function deleteUser(vm,index){
        vm.usuarios.splice(index,1);
    }
}]);