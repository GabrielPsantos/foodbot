Vue.component('message-container',{
    mounted(){
        console.log(this.messages)
    },
    methods : {
        recebeMessage(data){
            console.log(data + " -----");
            this.messages.push(data)
        }
    },
    data(){
        return {
            messages : [
            { id_message : 1, message : 'Welcome to FoodBot ! <3', to : 'r'},
            { id_message : 2, message : 'What do you want to prepare today? I can help you on dishes, drinks and desserts', to : 'r'},
            ],
            openedRecipes : [],
            fright : 'float-right',
            fleft : 'float-left',
            alert_danger : 'alert-danger',
            alert_success : 'alert-success'
        }
    },
    template : '#message-container'
});
