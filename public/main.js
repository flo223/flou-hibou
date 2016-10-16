// var update = document.getElementById('update')

var del = document.getElementsByName('delete')
var bookTable = document.getElementsByName('bookTable')

/*Get parameter of the url and escape it*/
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results !== null){
	    return results[1] || 0;
    }
}
var lecteur = decodeURI($.urlParam('lecteur'));


/*Event listener for delete button in bookList*/
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
        var currentReader = $('ul[class="nav nav-tabs"]').find('a[aria-expanded="true"]').text();
        window.location.href = '/liste?lecteur='+currentReader
      })
    })
})

$(document).ready(function()  {
   // $('ul[class="nav navbar-nav"]').find('li').each(function(){
    var currentUrl = window.location.href.substr(window.location.href.lastIndexOf("/"));
    if (currentUrl.includes("?")){
        currentUrl = currentUrl.substr(0, currentUrl.indexOf("?"));

    }
    console.log("url Est " + currentUrl);
    $('ul[class="nav navbar-nav"]').find('a').each(function(){
        if ($(this).attr("href") === currentUrl)
        {
            $(this).parent().attr('class','active');
        }
    })

})


/*show first tab when directly enter book page. If user come from insert book page,
it will select the user tab that just inserted a book*/

function selectPane (index){
    $(document).ready(function() {
        $('ul[class="nav nav-tabs"]').find('li').each(function(tab){
            $(this).removeClass('active');
        })
        $('ul[class="nav nav-tabs"]').find('li').eq(index).addClass('active');
        $('ul[class="nav nav-tabs"]').find('a').each(function(tab){
            $(this).attr( "aria-expanded", "false" );
        })
        $('ul[class="nav nav-tabs"]').find('a').eq(index).attr( "aria-expanded", "true" );
        $('div[class=tab-content]').find('div').each(function(tab){
            $(this).attr('class','tab-pane fade');
        })
        $('div[class=tab-content]').find('div').eq(index).attr('class','tab-pane fade active in');
    })
}

selectPane(0);

if (lecteur !== null && lecteur === "Stéphanie"){
    selectPane(0);
}

else if (lecteur !== null && lecteur === "Marie-France"){
    selectPane(1);
}

else if (lecteur !== null && lecteur === "Florent"){
    selectPane(2);

}


