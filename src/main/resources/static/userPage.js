$(async function() {
    await thisUser();
});
async function thisUser() {
    fetch("http://localhost:8080/api/authUser")
        .then(res => res.json())
        .then(data => {
            // Добавляем информацию в шапку
            $('#header-username').append(data.username);
            let roles = data.roles.map(role => role.role.replaceAll('ROLE_', '')).join(" ");
            $('#header-roles').append(roles);

            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.age}</td>
                <td>${data.username}</td>
                <td>${roles}</td>)`;
            $('#user-panel-tbody').append(user);
        })
}


