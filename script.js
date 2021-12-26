let list = new Vue({
    el: '#list',
    data: {
        displayBloc : false,
        displayForm: true,
        hidden: false,
        inputName: "",
        inputBirthdate: "",
        inputPicture: "",
        inputPresent: "",
        inputYear: "",
        search: null,
        addOption: "Add a birthday",
        icon: "far fa-calendar-plus",
        friends: [
            { id: 123, name: 'Marceline', birthdate: '2012-01-08', picture: 'https://i.gifer.com/O9XA.gif', presents: []},
            { id: 3245, name: 'Jake', birthdate: '2007-01-27', picture: 'https://i.gifer.com/origin/ff/ff421019d3e1939bf30d99c6d1bf831e.gif', presents: []},
            { id: 6548, name: 'Bonnibel', birthdate: '2012-02-12', picture: 'https://c.tenor.com/E9ub-isJm3kAAAAM/princess-bubblegum-pasta.gif', presents: []},
            { id: 9874, name: 'Wiz', birthdate: '2018/11/17', picture: 'profile.svg', presents: []},
        ],
        profile: [
        ]
    },
    mounted() {
        if (localStorage.getItem('friends')) {
            try {
                this.friends = JSON.parse(localStorage.getItem('friends'));
            } catch(err) {
                localStorage.removeItem('friends');
            }
        }
        document.getElementById("loader").style.opacity = "0";
        setTimeout(start, 1000);
        function start() {
            document.getElementById("loader").style.display = "none";
        }


    },
    computed: {
        result() {
            if (this.search){
                return this.friends.filter((friend)=>{
                    return friend.name.toLowerCase().startsWith(this.search.toLowerCase())
                })
            } else {
                return this.friends;
            }
        }

    },
    methods: {
        addFriend: function () {
            this.friends.push({
                id: Date.now(), 
                name: this.inputName, 
                birthdate: this.inputBirthdate,
                picture: this.inputPicture,
                presents: [],

            })
            this.displayBloc = !this.displayBloc
            this.inputName = ""
            this.inputBirthdate = ""
            this.inputPicture = ""
            this.saveLocal();
        },

        addPresent: function (id) {

            idA = this.profile[0].id; 

            for (let i = 0; i < this.friends.length; i++ ) {
                if (this.friends[i].id === idA) {
                    console.log(this.friends[i].name) ; 
                    this.friends[i].presents.push({
                        gift: this.inputPresent, 
                        year: this.inputYear,})
                }
            }
            this.displayBloc = !this.displayBloc
            this.inputPresent = ""
            this.inputYear = ""
            this.saveLocal();

        },

        removeFriend: function () {
            idA = this.profile[0].id; 

            for (let i = 0; i < this.friends.length; i++ ) {
                if (this.friends[i].id === idA) {
                    console.log(this.friends[i].name) ; 
                    this.friends.splice(i, 1)
                }
            }
            this.closeProfile();

            this.saveLocal();
        },

        displayProfile: function (index) {
            this.addOption = "Add a present"
            this.icon = "fas fa-gift"
            console.log(this.friends[index].name)
            
            this.profile = []
            this.profile.push(this.friends[index])
            this.displayForm = false
            this.hidden = !this.hidden
        },
        closeProfile: function () {
            this.addOption = "Add a birthday"
            this.icon = "far fa-calendar-plus"
            this.hidden = !this.hidden
            this.profile = []
            this.displayForm = true

        },
        saveLocal: function () {
            const parsed = JSON.stringify(this.friends);
            localStorage.setItem('friends', parsed);
            
        },
        getAge: function (birthdate) {
            let d = new Date();
            var y = d.getFullYear();
            var date = new Date(birthdate).getFullYear();
            let yearsOld = y - date;
            return yearsOld;
        },

        countdown: function (birthdate) {
            let d = new Date();
            var y = d.getFullYear();
            var dateObj = new Date(birthdate);
            var month = dateObj.getUTCMonth();
            var day = dateObj.getUTCDate();
            let cd = new Date(y, month, day)
            if (d.getMonth()>month && d.getDate()>day)  {
                cd.setFullYear(cd.getFullYear()+1); 
            }
            let unixDay =  86400000;
            
            return Math.ceil((cd.getTime()-d.getTime())/(unixDay));
        }

    }
})

