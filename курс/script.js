window.onload = function() {
    let input = document.getElementById('textTask');
    let addBtn = document.getElementById('addBtn');
    let list = document.getElementById('list');
    let clearBtn = document.getElementById('clearBtn');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    function showTasks() {
        list.innerHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = tasks[i].text;
            if (tasks[i].done) {
                li.className = 'done';
            }
            li.onclick = function() {
                tasks[i].done = !tasks[i].done;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                showTasks();
            };
            let delBtn = document.createElement('button');
            delBtn.innerHTML = '✖';
            delBtn.style.marginLeft = '10px';
            delBtn.style.float = 'right';
            delBtn.onclick = function(event) {
                event.stopPropagation();
                tasks.splice(i, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                showTasks();
            };
            
            li.appendChild(delBtn);
            list.appendChild(li);
        }
    }
    addBtn.onclick = function() {
        let text = input.value.trim();
        
        if (text == '') {
            alert('Напиши что-нибудь!');
            return;
        }
        tasks.push({
            text: text,
            done: false
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
        showTasks();
    };
    input.onkeypress = function(e) {
        if (e.key == 'Enter') {
            addBtn.onclick();
        }
    };
    clearBtn.onclick = function() {
        if (confirm('Удалить всё?')) {
            tasks = [];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            showTasks();
        }
    };
    showTasks();
};