$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

function renderMap (data) {
  $container = $('#map')
  data.forEach(function(map){
    let $mapTitle = createMap(map)
    $container.prepend($mapTitle)
  })
}




// For kapish to referene
// <section id="map">

// <body class="allmaps">
//     <a href="<%= `/view/${maptitle}` %>"> ${NameOfMap}</a>
//   </body>

// </section>

});



