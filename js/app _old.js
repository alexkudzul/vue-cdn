var app = new Vue({
    el: '#app',
    data: {
        message: "",
        tasks: [
            {
                title: "Aprender PHP",
                completed: true
            },
            {
                title: "Aprender Laravel",
                completed: true
            },
            {
                title: "Aprender Vue",
                completed: false
            }
        ],
        newTask: ""
    },
    methods: {
        reverse: function () {
            this.message = this.message.split('').reverse().join('')
        },
        addTask: function () {
            if (this.newTask.length <= 1) return alert('La tarea no puede estar vacia');
            this.tasks.push({
                title: this.newTask,
                completed: false
            });
            this.newTask = "";
        },
        // Funciones que pueden estar definidas como computed(propiedades calculadas o computadas)
        // Funciones en method, se ejecutan cada vez que se agrega o se haga un cambio, sin que se termine el proceso

        // completedTask: function(){
        //     console.log('trigger completedTask');
        //     return this.tasks.filter(function(task){
        //         return task.completed;
        //     }).length;
        // },
        // incompletedTask: function(){
        //     console.log('trigger incompletedTask');
        //     return this.tasks.filter(function(task){
        //         return !task.completed;
        //     }).length;
        // }

        completeTask: function (task) {
            // Al dar click, convertira su valor a su inversa, si es false a true, si es true a false
            task.completed = !task.completed
        },
        taskClasses: function (task) {
            console.log('css changed');
            // Con v-bind se puede utilizar objetos o arreglos

            // Object
            // return {
            //     'glyphicon': true,
            //     'glyphicon-check': task.completed,
            //     'glyphicon-unchecked': ! task.completed
            // }

            // Array
            return ['glyphicon', task.completed ? 'glyphicon-check' : 'glyphicon-unchecked']
        }
    },
    computed: {

        /**
         * Las propiedades calculadas, su resultado se guarda en cache y puede ser reutilizado sin que se
           ejecute la operacion, ejemplo cuando un elemento se encuentra dentro de un v-for
         * Las propiedades calculadas no reciben parametros las funciones
         * Funciones en computed, se ejecuta solo cuando se termine un proceso, solo cuando se alla modificado
           el valor del array tasks, el resto del proceso se guarda en cache.
         */

         /**
          * Ventajas de utilizar computed es poder utilizar la propiedad sin que se ejecute de nuevo,
            ya que se encuentra en cache, ejemplo:
          * <h4 v-if="completedTask">Tareas completas: {{completedTask}}</h4>
          * <h4 v-if="icompletedTask">Tareas icompletas: {{incompletedTask}}</h4>
          */


        reversedTask: function () {
            return this.newTask.split('').reverse().join('')
        },
        // Devuelve la cantidad de tareas terminadas, solo cuando se alla modificado el valor del array tasks
        completedTask: function () {
            // console.log('trigger completedTask');
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length;
        },
        // Devuelve la cantidad de tareas no terminadas, solo cuando se alla modificado el valor del array tasks
        incompletedTask: function () {
            // console.log('trigger incompletedTask');
            return this.tasks.filter(function (task) {
                return !task.completed;
            }).length;
        }
    },
});