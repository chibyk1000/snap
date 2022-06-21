$(document).ready(function () {
    $('.fa-bars').click(function () {
      
        $('.nav_section').toggleClass('showbox')
    });
    $(".container").hover(function () {
        this.show()
	});
	
// $.ajax({
// 	type: "get",
// 	url: "https://catfact.ninja/facts",
// 	data: "data",
// 	dataType: "json",
// 	success: function (response) {
// 		console.log(response);
// 	},
// });
	
	// $(".xy").load(
	// 	"https://catfact.ninja/facts",
	// 	"data",
	// 	function (response, status, request) {
	// 		this.innerHTML = JSON.parse(response)
	// 		console.log(JSON.parse(response));
	// 	}
	// );
	$.getJSON(
		"https://catfact.ninja/facts",
		
		function (data, textStatus, jqXHR) {
			console.log(data);
		}
	);
})

