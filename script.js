let list = new Vue({
    el: '#list',
    data: {
        change : false,
        inputName: "",
        inputBirthdate: "",
        addOption: "Ajouter un anniversaire",
        friends: [
            { name: 'Eusèbe Lelapin', birthdate: '09/08/1998', picture: 'https://via.placeholder.com/150' },
            { name: 'Jeanmi Laquiche', birthdate: '21/32/1728', picture: 'https://via.placeholder.com/150' },
            { name: 'Marine Le Prune', birthdate: '21/11/1728', picture: 'https://via.placeholder.com/150' },
            { name: 'Michou', birthdate: '12/01/1999', picture: 'https://via.placeholder.com/150' },
        ],
        profile: [
             { profileName: "", profileBirthdate: "", profilePicture: "" }
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

            console.log(index);
            this.friends.splice(index, 1)
        },
        displayProfile: function (index) {
            this.addOption = "Ajouter un cadeau"
            console.log(this.friends[index].name)

            
            this.profile.push(this.friends[index])
        },
        closeProfile: function () {
            this.addOption = "Ajouter un anniversaire"
            this.profile = []


        }
    }
})





// list.friends.push({ name: 'Marine LePrune', birthdate: "09/07/1120", picture: 'https://via.placeholder.com/150'});