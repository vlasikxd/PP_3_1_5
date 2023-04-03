$('#edit').on('show.bs.modal', ev => {
    let button = $(ev.relatedTarget);
    let id = button.data('id');
    showEditModal(id);
})

async function showEditModal(id) {
    let user = await getUser(id);
    let form = document.forms["editUserForm"];
    form.id.value = user.id;
    form.firstName.value = user.firstName;
    form.lastName.value = user.lastName;
    form.email.value = user.email;
    form.age.value = user.age;
    form.password.value = user.password;

    $('#rolesEditUser').empty();

    await fetch("http://localhost:8080/api/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].role === role.role) {
                        selectedRole = true;
                        break;
                    }
                }
                let el = document.createElement("option");
                el.text = role.role.substring(5);
                el.value = role.id;
                if (selectedRole) el.selected = true;
                $('#rolesEditUser')[0].appendChild(el);
            })
        })
}

$(async function () {
    editUser();
});

function editUser() {
    const editForm = document.forms["editUserForm"];
    editForm.addEventListener("submit", async ev => {
        ev.preventDefault();
        const roles = editForm.roles.options;
        let rolesList = [];
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].selected) rolesList.push({
                id: roles[i].value,
                name: "ROLE_" + roles[i].text
            });
        }
        let body = JSON.stringify({
            id: editForm.id.value,
            firstName: editForm.firstName.value,
            lastName: editForm.lastName.value,
            age: editForm.age.value,
            email: editForm.email.value,
            password: editForm.password.value,
            roles: rolesList })
        console.log(body)
        await fetch("api/users/" + editForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(() => {
                allUsers();
                $('#editFormCloseButton').click();
            })
    })
}