Vue.component('tasks', {
    template: 
    `
    <div>
            <!-- Directivas -->
            <!-- v-text => evita que pestanee el contenido-->
            <!-- v-show => ocultar o mostrar elemento en el DOM, segun su valor -->
            <!-- v-if =>  quitar o agregar elemento en el DOM, segun su valor-->
            <!-- v-else => mostrar un valor en caso contrario del if anterior -->

            <!-- <h1>Vue si tiene acceso {{ message }}</h1> -->
            <!-- <h1 v-text="'Vue si tiene acceso' + message" ></h1> -->
            <!-- <h1 v-show="message.length > 2">Vue si tiene acceso <span v-text="message"></span></h1> -->

            <h1 v-if="message.length > 2">Vue si tiene acceso <span v-text="message"></span></h1>
            <h1 v-else>Escribe tú nombre</h1>
            <input type="text" v-model="message">
            <!-- <button v-on:click="message = message.split('').reverse().join('')">Invertir</button> -->
            <button @click="reverse">Invertir</button>

            <h2>List Tasks</h2>
            <p>{{ reversed }}</p>
            <!-- Definadas en methods -->
            <!-- <h4>Tareas completas: {{completed()}}</h4>
            <h4>Tareas icompletas: {{incompleted()}}</h4> -->

            <!-- Definidas en computed -->
            <h4 v-if="completed">Tareas completas: {{completed}}</h4>
            <h4 v-if="incompleted">Tareas icompletas: {{incompleted}}</h4>
            <ul>
                <!-- Agregar clases css de forma tradicional -->

                <!-- <li v-for="task in tasks">
                    <span v-text="task.title"></span>
                    <span @click="task.completed = false" v-if="task.completed" class="glyphicon glyphicon-check"></span>
                    <span @click="task.completed = true" v-else class="glyphicon glyphicon-unchecked"></span>
                </li> -->

                <!-- Las listas desordenadas solo permiten utilizar li y no un componente
                     directiva "is" hace referencia al componente task -->
                <!-- v-bind:task="task hace referencia al objeto task, y se pasa el objeto task como props al componente task -->
                <!-- Se utiliza :key para que el componente sepa cómo identificar elementos individuales. Esto le permite realizar un seguimiento de los cambios de reactividad de Vue .
                    Es mejor intentar vincular el :key a alguna propiedad de identificación única de cada elemento. Por ejemplo, un id. -->

                <li is="task" v-for="task in tasks" v-bind:task="task" v-bind:key="task.key"></li>
                <li class="form-inline">
                    <input v-on:keyup.enter = "add" v-model="newTask" type="text" class="form-control">
                    <button @click="add" class="btn btn-primary">+</button>
                </li>
            </ul>
    </div>`,

    // Al estar dentro de un componente data sera una funcion, retornando los valores
    data: function () {
        return {
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
        }
    },
    methods: {
        reverse: function () {
            this.message = this.message.split('').reverse().join('')
        },
        add: function () {
            if (this.newTask.length <= 1) return alert('La tarea no puede estar vacia');
            this.tasks.push({
                title: this.newTask,
                completed: false
            });
            this.newTask = "";
        },
        // Funciones que pueden estar definidas como computed(propiedades calculadas o computadas)
        // Funciones en method, se ejecutan cada vez que se agrega o se haga un cambio, sin que se termine el proceso

        // completed: function(){
        //     console.log('trigger completedTask');
        //     return this.tasks.filter(function(task){
        //         return task.completed;
        //     }).length;
        // },
        // incompleted: function(){
        //     console.log('trigger incompletedTask');
        //     return this.tasks.filter(function(task){
        //         return !task.completed;
        //     }).length;
        // }

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

        // Convierte las tareas en inversa
        reversed: function () {
            return this.newTask.split('').reverse().join('')
        },
        // Devuelve la cantidad de tareas terminadas, solo cuando se alla modificado el valor del array tasks
        completed: function () {
            // console.log('trigger completedTask');
            return this.tasks.filter(function (task) {
                return task.completed;
            }).length;
        },
        // Devuelve la cantidad de tareas no terminadas, solo cuando se alla modificado el valor del array tasks
        incompleted: function () {
            // console.log('trigger incompletedTask');
            return this.tasks.filter(function (task) {
                return !task.completed;
            }).length;
        }
    },
});

Vue.component('task', {
    /**
     * props => pase de datos entre componentes
     * Los props sirven para pasar parámetros o información al propio web component
       para poder personalizarlo y ajustarlo dependiendo de las necesidades.
     * Los props se tiene que considerar como una variable más del data, es decir,
       puedes acceder desde cualquier método o computada a los props con el this.
     */

    props: ['task'], // objeto task que viene desde el componente tasks
    template:
    `
    <!-- Agregar clases dinamicas css con vue y bindings(Enlaces a cualquier atributo html y permite manipular con js el contenido) -->
    <li>
        <span v-text="task.title"></span>
        <!-- Con v-bind se puede utilizar objetos, arreglos -->
        <span @click="complete()" v-bind:class="classes"></span>
    </li>
    `,
    methods: {
        complete: function () {
            // Al dar click, convertira su valor a su inversa, si es false a true, si es true a false
            this.task.completed = ! this.task.completed
        },
    },
    computed: {
        // clases css dinamicamente
        classes: function () {
            console.log('css changed');
            // Con v-bind se puede utilizar objetos o arreglos

            // Object
            // return {
            //     'glyphicon': true,
            //     'glyphicon-check': task.completed,
            //     'glyphicon-unchecked': ! task.completed
            // }

            // Array
            return ['glyphicon', this.task.completed ? 'glyphicon-check' : 'glyphicon-unchecked']
        },
    },

})

var app = new Vue({
    el: '#app-bootstrap',
});