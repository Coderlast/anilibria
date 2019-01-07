var needUpdate = 0;

function xPagination(a){
	$("#xpagination").pagination({
		items: a,
		itemsOnPage: 12,
		cssStyle: 'light-theme',
		onPageClick: function(page){
			event.preventDefault();
			getCatalog(page);
			$('html, body').animate({
				scrollTop: $(".simpleFilter").offset().top
			}, 0);
		}
	});
}
  
function getCatalog(page){
	year = $.trim($('#catalogYear').val().toString().replace(/,/g, ", "));
	genre = $.trim($('#catalogGenre').val().toString().replace(/,/g, ", "));
	search = {year, genre};
	$.post("//"+document.domain+"/public/catalog.php", { 'page': page, 'search': JSON.stringify(search) }, function(json){
		data = JSON.parse(json);
		if(data.err == 'ok'){
			$('.simpleCatalog tbody').html(data.table);
			if(needUpdate != data.update){
				xPagination(data.total);
				needUpdate = data.update;
			}
		}
	});
}

$(document).ready(function() {
	getCatalog(1);
});

$(document).on('click', '[data-catalog-update]', function(e){
	$(this).blur();
	e.preventDefault();	
	getCatalog(1);
});
