Vue.component('message-insert',{
	data(){
		return {
			id_req : this.makeid(),
			contador : 1,
			textoEntrada : "",
			error : false,
			class_error : 'error_class',
			mostra_load : false,
		}
	},
	template : '#message-insert',
	methods: {
		send(){
			if(this.textoEntrada.trim()){
				console.log(this.id_req);
				this.$emit('manda-message',{ 
					id_message : this.makeid(), 
					message: this.textoEntrada , 
					to : 'l'
				});
				let retornoReq = this.enviaRequisicao(this.textoEntrada);
				
				this.error = false;
				this.textoEntrada = "";	
				let objDiv = document.getElementById("lista_mensagens");
				objDiv.scrollTop = objDiv.scrollHeight;


			}else{
				this.error = true;
			}
			console.log(this.contador);
		},
		enviaRequisicao(msg){
			this.mostra_load = true;
			var data = { "inputdata" : msg};
			let config = {
				headers: { "userid" : this.id_req}
			}
			axios.post('https://tbypr10uv6.execute-api.us-east-1.amazonaws.com/Dev/sendmessage',data, config).then((response) => {
				var message = response.data.message;
				var matches = (this.IsJsonString(message)) ? JSON.parse(message).matches : null;

				if(matches){
					console.log("Yeah");
				}else{
					console.log(response.data);
					this.$emit('manda-message',{ 
						id_message : this.makeid(), 
						message: response.data.message, 
						to : 'r'
					});
				}
			})
			.catch((error) => {
				console.log(error);
			}).then(()=>{
				this.mostra_load = false;
			});
		},
		makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < 10; i++)
				text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		},
		IsJsonString(str) {
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			console.log("is json");
			return true;
		}
	}
});

