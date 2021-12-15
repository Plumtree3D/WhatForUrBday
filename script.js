let list = new Vue({
    el: '#list',
    data: {
        inputName: "",
        inputBirthdate: "",
        friends: [
            { name: 'Eusèbe Lelapin', birthdate: '09/08/1998', picture: 'https://via.placeholder.com/150' },
            { name: 'Jeanmi Laquiche', birthdate: '21/32/1728', picture: 'https://via.placeholder.com/150' },
            { name: 'Jeanmi Laquiche', birthdate: '21/32/1728', picture: 'https://via.placeholder.com/150' },
            { name: 'Jeanmi Laquiche', birthdate: '21/32/1728', picture: 'https://via.placeholder.com/150' },
            { name: 'Jeanmi Laquiche', birthdate: '21/32/1728', picture: 'https://via.placeholder.com/150' },
            { name: 'Jeanmi Laquiche', birthdate: '21/32/1728', picture: 'https://via.placeholder.com/150' },
        ]
    },
    methods: {
        addFriend: function () {
            this.friends.push({
                name: this.inputName, 
                birthdate: this.inputBirthdate, 
                picture: 'https://www.placecage.com/c/150/150' 
            })
            this.inputName = ""
            this.inputBirthdate = ""
        },
        removeFriend: function (index) {
            console.log("CHEVAL");
            console.log(index);
            this.friends.splice(index, 1)

        }
    }
})



// list.friends.push({ name: 'Marine LePrune', birthdate: "09/07/1120", picture: 'https://via.placeholder.com/150'});