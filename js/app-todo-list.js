Vue.component('tasks-todo', {
    template:
    `
    <section class="todoapp">
            <!-- Directivas -->
            <!-- v-text => evita que pestanee el contenido-->
            <!-- v-show => ocultar o mostrar elemento en el DOM, segun su valor -->
            <!-- v-if =>  quitar o agregar elemento en el DOM, segun su valor-->
            <!-- v-else => mostrar un valor en caso contrario del if anterior -->

            <!-- <h1>Vue si tiene acceso {{ message }}</h1> -->
            <!-- <h1 v-text="'Vue si tiene acceso' + message" ></h1> -->
            <!-- <h1 v-show="message.length > 2">Vue si tiene acceso <span v-text="message"></span></h1> -->

            <!-- <h1 v-if="message.length > 2">Vue si tiene acceso <span v-text="message"></span></h1>
            <h1 v-else>Escribe tú nombre</h1> -->

            <!-- <input type="text" v-model="message">
             <button v-on:click="message = message.split('').reverse().join('')">Invertir</button>
            <button @click="reverse">Invertir</button> -->

            <header class="header">
                <h1>Tasks</h1>
                <input v-on:keyup.enter = "add" v-model="newTask" type="text" class="new-todo" placeholder="¿Qué deseas hacer?" autofocus>
            </header>

            <!-- <p>{{ reversed }}</p> -->

            <section>
                <ul class="todo-list">
                    <!-- Las listas desordenadas solo permiten utilizar li y no un componente
                        directiva "is" hace referencia al componente task -->
                    <!-- v-bind:task="task hace referencia al objeto task, y se pasa el objeto task como props al componente task -->
                    <!-- Se utiliza :key para que el componente sepa cómo identificar elementos individuales. Esto le permite realizar un seguimiento de los cambios de reactividad de Vue .
                        Es mejor intentar vincular el :key a alguna propiedad de identificación única de cada elemento. Por ejemplo, un id. -->

                    <li is="task-todo" v-for="task in tasks" v-bind:task="task" v-bind:key="task.key"></li>

                </ul>
            </section>
            <!-- v-show que se muestre el footer solo si hay alguna tarea -->
            <footer class="footer" v-show="tasks.length">
                <span class="todo-count">Completas: {{ completed }} | Incompletas: {{ incompleted }} |</span>
                <span>Editar: doble click | Cancelar: presionar ESC</span>
            </footer>
    </section>`,

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

Vue.component('task-todo', {
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
    <li :class="classes">
        <div class="view">
            <input class="toggle" type="checkbox" v-model="task.completed">
            <label v-text="task.title" @dblclick="edit()"></label>
            <button class="destroy" @click="remove()"></button>
        </div>
        <!-- metodo @blur se ejecuta cuando el campo pierde el foco(cuando el cursor deja de estar ubicado en el input)  -->
        <input class="edit"
            v-model="task.title"
            @keyup.enter="finishEdit()"
            @blur="finishEdit()"
            @keyup.esc="cancelEdit()">
    </li>
    `,
    data: function() {
        return {
            editing: false, // Para mostrar el campo de editar
            cacheBeforeEdit: '' // Guarda el valor del input original sin que se precione el enter
        }
    },
    methods: {
        // Cuanddo se este editando, mostrar el campo editar y ocultar el label
        edit: function() {
            this.cacheBeforeEdit = this.task.title;
            this.editing= true
        },
        // Cuando se termine de editar, mostrar el label y ocultar el input
        finishEdit: function(){
            // Si no existe ni una letra en el campo title, eliminarlo
            if(! this.task.title){
                this.remove();
            }

            this.editing= false
        },
        cancelEdit: function(){
            this.editing = false;
            this.task.title = this.cacheBeforeEdit;
        },
        remove: function() {
            var tasks = this.$parent.tasks;

            // splice elimina un elemento => recibe como parametro la ubicacion de task que se quiere eliminar y que elimine 1 elemento
            tasks.splice(tasks.indexOf(this.task), 1);
        }
    },
    computed: {
        // clases css dinamicamente
        // solo se agregan las clases(completed, editing) cuando sus propiedades sean verdaderos(this.task.completed, this.editing)
        classes: function () {
            console.log('css changed');
            return {
                completed: this.task.completed,
                editing: this.editing
            }
        },
    },

})

var app = new Vue({
    el: '#app-todo',
});