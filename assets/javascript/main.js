 // Initialize Firebase
 // This is the code we copied and pasted from our app page
 var config = {
     apiKey: "AIzaSyAoRULea-lXZQROpFwTQAmMcj_4ri-OKNg",
     authDomain: "brian-project-47f17.firebaseapp.com",
     databaseURL: "https://brian-project-47f17.firebaseio.com",
     projectId: "brian-project-47f17",
     storageBucket: "brian-project-47f17.appspot.com",
     messagingSenderId: "424510805234"
 };
 firebase.initializeApp(config);

 // Variables
 // ================================================================================

 // Get a reference to the database service
 var database = firebase.database();

 // Initializing our click count at 0
 var isplayer_1 = false;
 var isplayer_2 = false;
 var player = 0;


 $("#list-1").hide()
 $("#list-2").hide()
 database.ref().on('value', function(shot) {
     if (shot.val() === null) {
         database.ref('members/').set({
             mem: 0
         })

     } else if (shot.val().members.mem > 0) {


     }
 })

 // Functions

 // ================================================================================

 // On Click
 $("#add-button").on("click", function() {
     event.preventDefault();
     return database.ref('members/').once('value').then(function(snapshot) {
         var member = snapshot.val().mem
         if (member < 2) {
             member++;
             database.ref('members/').set({
                 mem: member
             });
             database.ref('players/' + member).set({
                 name: $("#add-user").val().trim(),
                 wins: 0,
                 loses: 0
             });
             $("#player").text('You are player-' + member);
             $("#register").empty()
             $("#list-" + member).show()
             player = member;
             sessionStorage.setItem('player', player)
             database.ref('players/' + member).on('value', function(snapshot) {
                 $("#player-" + member).text(snapshot.val().name)
             })
         }


     })
 });