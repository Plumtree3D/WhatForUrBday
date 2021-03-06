let list = new Vue({
    el: '#list',
    data: {
        displayBloc : false,
        displayForm: true,
        hidden: false,
        inputName: "",
        newImage: "",
        inputBirthdate: "",
        inputPicture: "",
        inputPresent: "",
        inputYear: "",
        bgcolor: "",
        search: null,
        addOption: "Add a birthday",
        icon: "far fa-calendar-plus",
        friends: [{"id":1648816350529,"name":"Marceline","birthdate":"1988-04-03","picture":"https://i1.sndcdn.com/avatars-000199543640-n1j2m1-t500x500.jpg","presents":[{"gift":"Candy Apple Red Fender 1951 Precision Bass","year":"2002"},{"gift":"10\" Hardwood Stakes","year":"2007"},{"gift":"One dark blue button","year":"2018"},{"gift":"Vampire Stuff","year":"2020"},{"gift":"Cool Motorbike","year":"2023"}],"color":"background-color: rgba(92,71,55);"},{"id":1648816417668,"name":"Jake","birthdate":"2002-04-14","picture":"https://c.tenor.com/r2iOb-XCJXcAAAAC/jake-adventure-time.gif","presents":[{"gift":"A single brick","year":"2012"},{"gift":"Bacon Pancakes","year":"2013"},{"gift":"His favorite mug","year":"2017"}],"color":"background-color: rgba(61,200,170);"},{"id":1648816428806,"name":"Bonnibel","birthdate":"1998-12-09","picture":"https://thumbs.gfycat.com/CrazyMeekCollardlizard-size_restricted.gif","presents":[{"gift":"Science stuff","year":"2011"},{"gift":"Marcy's T-shirt","year":"2016"},{"gift":"A bag of candy corn (for science purposes)","year":"2017"},{"gift":"Cool motorbike helmet","year":"2023"}],"color":"background-color: rgba(28,83,52);"}
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
        },



    },


    methods: {
        addFriend: function () {
            this.backgroundcolor();
            this.friends.push({
                id: Date.now(), 
                name: this.inputName, 
                birthdate: this.inputBirthdate,
                picture: this.newImage,
                presents: [],
                color: this.bgcolor,

            })
            this.displayBloc = !this.displayBloc
            this.inputName = ""
            this.inputBirthdate = ""
            this.inputPicture = ""
            this.newImage = ""
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
            let d = Math.round(new Date().getTime() / 1000);
            var date = Math.round(new Date(birthdate).getTime() / 1000);
            let yearsOld = d - date;
            return Math.floor(yearsOld/31536000);
        },

        countdown: function (birthdate) {
            let d = new Date();
            var y = d.getFullYear();
            var dateObj = new Date(birthdate);
            var month = dateObj.getUTCMonth();
            var day = dateObj.getUTCDate();
            let cd = new Date(y, month, day)
            if (d.getMonth()+1>month && d.getDate()+1>day)  {
                cd.setFullYear(cd.getFullYear()+1); 
            }
            let unixDay =  86400000;

            countdown =  Math.ceil((cd.getTime()-d.getTime())/(unixDay))

             if (countdown == 365){
                countdown = "today!"
            } else if (countdown == 1) {
                countdown = "tomorrow"
            } else { countdown = "in "+countdown+" days"}
            
            return countdown;
        },

        processFile: function (event) {
            file = event.target.files[0]
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
            list.newImage = reader.result;
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };

        },
        backgroundcolor: function () {
            let r = Math.floor(Math.random()*256);
            let g = Math.floor(Math.random()*256);
            let b = Math.floor(Math.random()*256);

            let color = "background-color: rgba(" + r + "," + g + "," + b + ");"
            list.bgcolor = color
            
        }

    }
})

