$(() => {

  $.ajax({
    method: "GET",
    url: "/api/maps"
    })
    .done((maps) => {
    html = '';
    for (let map of maps) {
      html += createMapElement(map);
    }
    $('.map-list').html(html);
  });

$.ajax({
    method: "GET",
    url: "/api/profilemaps"
    })
    .done((maps) => {
    html = '';
    for(let map of maps) {
      html += profileMapElement(map);
    }
    $('.maprow').html(html);
  });


  function profileMapElement(map){
    let title = map.title;
    let id = map.id;

    let html = `
                <h3>
                    <a href="/maps/${id}">${title}</a>
                </h3>
          `

    return html;
  }


  function createMapElement(map){
    let title = map.title;
    let id = map.id

    let html = `
                <h3>
                    <a href="/maps/${id}">${title}</a>
                </h3>
`

    return html;
  }

})
