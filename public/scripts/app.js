$(() => {

  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done((maps) => {
    html = '';
    for(map of maps) {
      html += createMapElement(map);
    }
    $('.map-list').html(html);
  });;

  function createMapElement(map){
    let title = map.title;

    let html = `
            <div class="col-md-4 portfolio-item">
                <a href="#">
                    <img class="img-responsive" src="http://placehold.it/700x400" alt="">
                </a>
                <h3>
                    <a href="#">${title}</a>
                </h3>
                <p></p>
            </div>`

    return html;
  }

})
