// var update = document.getElementById('update')

var del = document.getElementsByName('delete')
var bookTable = document.getElementsByName('bookTable')



/*update.addEventListener('click', function () {
    var titre = document.getElementById('titre').value
    var genre = document.getElementById('genre').value
    fetch('actu', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'titre': titre,
        'genre': genre
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    }).then(data => {
        console.log(data)
        window.location.reload(true)
    })
})
*/

Array.from(bookTable).forEach(function(elem){
    elem.lastElementChild.addEventListener('click', function () {
      var titleOfBookToDelete = elem.children[1].innerHTML
      fetch('actu', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'titre': titleOfBookToDelete
        })
      }).then(res => {
        if (res.ok) return res.json()
      }).then(data => {
        console.log(data)
        window.location.reload()
      })
    })
})

jQuery(document).ready(function ($) {
    $('#myTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
});



