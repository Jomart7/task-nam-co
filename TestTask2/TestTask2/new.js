// Использовать Fetch для отправки запроса к REST API и получения списка пользователей. 
// Затем обработать полученные данные и динамически создать элементы для каждого пользователя, отображая их на странице.

// Example 

// Name: Leanne Graham
// Email: Sincere@april.biz
// Phone: 1-770-736-8031 x56442

// Дополнительно можете реализовать функции, такие как сортировка пользователей, добавление новых пользователей, поиск пользователей и обработку ошибок при загрузке данных.

// Для получение данных =>
// https://jsonplaceholder.typicode.com/users


document.addEventListener("DOMContentLoaded", function() {
    const loadUsersButton = document.getElementById("load-users");
    const userListContainer = document.getElementById("user-list");
    const addUserForm = document.getElementById("add-user-form");
    const searchInput = document.getElementById("search-input");
    let usersData = [];

    async function fetchUsers() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const users = await response.json();
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    function renderUsers(users) {
        userListContainer.innerHTML = "";
        users.forEach(user => {
            const userElement = document.createElement("div");
            userElement.classList.add("user");
            userElement.innerHTML = `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
            `;
            userListContainer.appendChild(userElement);
        });
    }

    function handleError(error) {
        userListContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }

    function sortUsersByName(users) {
        return users.slice().sort((a, b) => a.name.localeCompare(b.name));
    }

    loadUsersButton.addEventListener("click", async function() {
        loadUsersButton.disabled = true;
        userListContainer.innerHTML = "<p>Loading...</p>";
        try {
            usersData = await fetchUsers();
            renderUsers(usersData);
        } catch (error) {
            handleError(error);
        }
        loadUsersButton.disabled = false;
    });

    addUserForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(addUserForm);
        const newUser = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone")
        };
        usersData.push(newUser);
        renderUsers(usersData);
        addUserForm.reset();
    });

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredUsers = usersData.filter(user =>
            user.name.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });

    document.getElementById("sort-users").addEventListener("click", function() {
        const sortedUsers = sortUsersByName(usersData);
        renderUsers(sortedUsers);
    });
});