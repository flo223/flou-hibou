var bookTable = document.getElementsByName('bookTable');
var dateFields = function (elem){
    var date = bookTable[elem].firstElementChild.innerHTML;
    var splitDate = date.split("-");
    return splitDate[2] +  "/" +  splitDate[1] + "/" + splitDate[0];

}

var insertDate = function (){
    for (i=0;i<bookTable.length;i++){
        bookTable[i].firstElementChild.innerHTML = dateFields(i);
    }

}

insertDate();
