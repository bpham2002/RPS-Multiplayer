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

 var player = 0;
 var totalplayers = 0;

 $("#list-1").hide()
 $("#list-2").hide()
 var num = sessionStorage.getItem('player')
 database.ref('players/' + num).remove();
 database.ref('chats/').set({
     message: ""
 });
 database.ref().once('value').then(function(snapshot) {
     totalplayers = snapshot.val().members.mem;

     if (num > 0) {
         totalplayers--;
         database.ref('members/').set({
             mem: totalplayers
         })
         localStorage.setItem('isplayer_' + num, false);
         $("#player").empty()
         sessionStorage.setItem('player', player)
     } else {
         localStorage.setItem('isplayer_1', false);
         localStorage.setItem('isplayer_2', false);
         sessionStorage.setItem('player', player)
     }
 })


 database.ref('chats/message').on('value', function(snapshot) {

     $("#chat").append(snapshot.val() + '<br>')
 })


 database.ref().on('value', function(shot) {
     if (shot.val() === null) {
         database.ref('members/').set({
             mem: 0
         })

     } else { //if (shot.val().members.mem > 0) {
         var temp = shot.val().members.mem;

         for (var i = 1; i <= temp; i++) {
             database.ref('players/' + i + '/name').once('value', function(snapshot) {

                 $("#player-" + i).text(snapshot.val())

             });
             database.ref('players/' + i + '/wins').once('value', function(snapshot) {

                 $("#player-wins-" + i).text(snapshot.val())
             });
             database.ref('players/' + i + '/loses').once('value', function(snapshot) {

                 $("#player-loses-" + i).text(snapshot.val())

             })
         }
     }
 })

 // Functions
 function setPlayer(num) {
     num++;
     database.ref('members/').set({
         mem: num
     });
     database.ref('players/' + num).set({
         name: $("#add-user").val().trim(),
         wins: 0,
         loses: 0
     });
     database.ref('players/' + num + '/name').once('value').then(function(snapshot) {

         $("#player").append("Hi " + snapshot.val())
         $("#player").append(" You are player-" + num);
     })

     $("#register").empty()
     $("#list-" + num).show()
     sessionStorage.setItem('player', num)
 }
 // ================================================================================

 // On Click
 $("#send-button").on('click', function() {
         event.preventDefault();
         var num = sessionStorage.getItem('player')
         database.ref('players/' + num + '/name').on('value', function(snapshot) {

             var name = snapshot.val()
             database.ref('chats/').set({
                 message: name + ': ' + $("#message").val().trim()
             })

         });


     })
     //var num = sessionStorage.getItem('player')
 $("#rock-" + num).on('click', function() {
     event.preventDefault();
     var num = sessionStorage.getItem('player')
     database.ref('players/' + num + '/chooses').set({
         chooses: 'Rock'
     })

 });
 $("#paper-" + num).on('click', function() {
     event.preventDefault();
     var num = sessionStorage.getItem('player')
     database.ref('players/' + num + '/chooses').set({
         chooses: 'Paper'
     })

 });
 $("#scissors-" + num).on('click', function() {
     event.preventDefault();
     var num = sessionStorage.getItem('player')
     database.ref('players/' + num + '/chooses').set({
         chooses: 'Scissors'
     })

 });

 $("#add-button").on("click", function() {
     event.preventDefault();
     var isplayer_1 = localStorage.getItem('isplayer_1');
     var isplayer_2 = localStorage.getItem('isplayer_2');
     return database.ref('members/').once('value').then(function(snapshot) {

         var member = parseInt(snapshot.val().mem)
         if (member < 1) {
             setPlayer(member);
             localStorage.setItem('isplayer_1', true)
         } else if (member < 2 && (isplayer_1 === 'true')) {
             setPlayer(member);
             localStorage.setItem('isplayer_2', true)
         } else if (member < 2 && (isplayer_1 === 'false')) {
             database.ref('players/' + member).set({
                 name: $("#add-user").val().trim(),
                 wins: 0,
                 loses: 0
             });
             database.ref('players/' + member + '/name').once('value').then(function(snapshot) {

                 $("#player").append("Hi " + snapshot.val())
                 $("#player").append(" You are player-" + member);
             })
             $("#register").empty()
             $("#list-" + member).show()
             sessionStorage.setItem('player', member)
             localStorage.setItem('isplayer_1', true)
             member++;
             database.ref('members/').set({
                 mem: member
             });

         }
     })

 });