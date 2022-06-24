class todoApi {
    todos = [
        {
            id: 1,
            status: 2,
            name: 'Học JS',
        },
        {
            id: 2,
            status: 1,
            name: 'Học React',
        },
        {
            id: 3,
            status: 0,
            name: 'Học Redux saga',
        },
        {
            id: 4,
            status: 1,
            name: 'Học Redux Toolkit',
        },
        {
            id: 5,
            status: 2,
            name: 'Học tiếng Anh',
        },
    ];

    GET(id = false) {
        // trả về toàn bộ list
        if (!id) {
            return this.todos;
        }
        // trả về todo theo id
        return this.todos.find((t) => t.id === id);
    }
    SAVE(todo) {
        if (todo.id === undefined) {
            // get latest ID
            const ids = this.todos.map((todo) => {
                // console.log(todo.id);
                return todo.id;
            });

            const lastestId = Math.max(...ids);
            // thêm id vào object todo
            todo = {
                ...todo,
                id: lastestId + 1,
            };

            // thêm to do vào list
            this.todos.push(todo);

            // trả về dữ liệu mới
            return todo;
        } else {
            // tìm kiếm theo id và sửa nếu tìm thấy
            this.todos = this.todos.map((oldTodo) =>
                oldTodo.id === todo.id ? todo : oldTodo
            );
            // trả về dữ liệu mới
            return todo;
        }
    }

    DELETE(id) {
        // lọc dữ liệu loại bỏ object có id = id
        const newtodos = this.todos.filter((oldTodo) => {
            return oldTodo.id !== id;
        });

        // kiểm tra xem lọc được không nếu được thì gán lại cho list mớt

        this.todos = newtodos;
        return true;
    }
}

export default new todoApi();