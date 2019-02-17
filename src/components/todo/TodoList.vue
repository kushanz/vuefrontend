<template>
    <div>
        <input type="text" v-model="title" @keyup.enter="addTodo" />
        <ul>
            <li v-for="(todoitem, index) in allTodos" :key='index'>
                <div >
                    <input type="checkbox" v-model="todoitem.completed" />
                    <span :class="{completed:todoitem.completed}" v-if="!todoitem.editing" @dblclick="editTodo(todoitem)">
                        {{ todoitem.title}}
                    </span>
                    <input  @blur="doneEdit(todoitem)"
                            @keyup.enter="doneEdit(todoitem)"
                            @keyup.esc="cancelEdit" 
                            v-else type="text" 
                            v-model="todoitem.title" 
                            v-focus />
                    <span v-if="todoitem.completed" @click="removeTodo(todoitem.id)" class="close">X</span>
                </div> 
            </li>
        </ul>
        <div class="panel">
            <span><input type="checkbox" @change="checkAll" :checked="!anyRemaining"/>Check All</span>
            <span>{{remaining}} are left</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            'id': '',
            'title': '',
            'completed': false,
            'editing': false,
            'beforeEditCache': '',  
        }
    },
    methods: {
        addTodo() {
            if(this.title.trim() ==0) {
                return
            }
            this.$store.commit('addTodoStore',{
                title: this.title
            })
            this.title = ''
        },
        editTodo(item) {
            this.beforeEditCache = item.title
            item.editing = true;
        },
        doneEdit(item) {
            console.log(item.title);
            if (item.title.trim() == '') {
                item.title = this.beforeEditCache
            }
            this.beforeEditCache = ''
            item.editing = false;
            this.$store.commit('updateTodoStore',{
                id: item.id,
                title: item.title,
                completed:item.completed,
                editing: item.editing
            })
        },
        cancelEdit(todoitem) {
            todoitem.title = this.beforeEditCache
            todoitem.editing = false;
        },
        removeTodo(id) {
            this.$store.commit('deleteTodoStore', id)
        },
        checkAll() {
            this.$store.state.todolist.forEach((todo) => todo.completed = event.target.checked)
        }
    },
    computed: {
        allTodos() {
            return this.$store.getters.allTodos
        },
        remaining() {
            return this.$store.getters.remaining
        },
        anyRemaining() {
            return this.$store.getters.anyRemaining
        }
    },
    directives: {
        focus: {
            inserted: function(el) {el.focus()}
        }
    }
}
</script>
<style>
.panel {
    padding-top: 20px;
}
.panel span {
    padding: 5px;
    background: #3c3c3f;
    margin: 0 10px;
    color: #b8bec1;
    border-radius: 6px;
}
.close {
    color: red;
    margin-left: 10px;
    cursor: pointer;
}
.completed {
    text-decoration: line-through;
    color: #505152;
}
</style>
