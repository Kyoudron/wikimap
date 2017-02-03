$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps"
  })
    .done((maps) => {
    for (let map of maps) {
      $("<div>").text(map.title).appendTo($("body"));
    }
  });



// posts the user names
  //  $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
})
