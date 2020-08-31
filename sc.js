var filters = {
    'all': function (todo) {
        return todo;
    },
    'active': function (todo) {
        return todo.filter(function (todo) {
            return !todo.completed;
        });
    },
    'completed': function (todo) {
        return todo.filter(function (todo) {
            return todo.completed;
        });
    },

};
var tods_storage = {
    feach: function () {
        return JSON.parse(localStorage.getItem('todo') || '[]');
    },
    save : function (todos) {
        localStorage.setItem('todo' , JSON.stringify(todos)) ;
    }
};
new Vue({
    'el': '.todoapp',
    'data': {
        'newTask': '',
        'visibility': 'all',
        'oldEditingTodoTitle': null,
        'todo':tods_storage.feach(),
        'editingTodo': null

    },
    'methods': {
        'deleteTask': function (task) {
            return this.todo.splice(this.todo.indexOf(task), 1);
        },
        'addTask': function () {
            if (this.newTask !== '') {
                this.todo.push({
                    'title': this.newTask,
                    'completed': false
                });
            }
            this.newTask = '';
        },
        'removeCompleted': function () {
            return this.todo = filters['active'](this.todo);
        }
        ,
        'editTodo': function (todo) {
            this.editingTodo = todo;
            this.oldEditingTodoTitle = todo.title;
        },
        'doneEditing': function () {
            if (this.editingTodo.title == '') {
                return this.deleteTask(this.editingTodo);
            }
            this.editingTodo = null;
        },
        'cancelEditing': function () {
            this.editingTodo.title = this.oldEditingTodoTitle;
            this.editingTodo = null;
        }
    }, 'computed': {
        'filterTodoTasks': function () {
            return filters[this.visibility](this.todo);
        },
        'remainingTodo': function () {
            return filters['active'](this.todo).length;
        },
        'allDone': {
            get: function () {
                return this.removeCompleted === 0;
            },
            set: function (value) {
                this.todo.forEach(function (task) {
                    task.completed = value;
                });
            }
        }
    },
    'watch' : {
        'todo' : function (todo) {
            tods_storage.save(todo);
        },
        deep:true
    }
});