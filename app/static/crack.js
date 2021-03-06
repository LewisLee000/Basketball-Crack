var print_result = function(wl){
	var message;
	if(wl == 1){
		message = '<h1 class="alert alert-success">YOU ARE RIGHT.</h1>';
	}else{
		message = '<h1 class="alert alert-danger">YOU ARE WRONG!!!!</h1>';
	}
	$('#resMessage').html(message);
}

var display_loss = function(player_name, stats){
	message = '<h1 class="alert alert-danger">YOU GAVE UP.  The player was ' + player_name + '!!!!</h1>';
	$('#resMessage').html(message);
	nextbtn = '<button id="next" class="btn btn-default"> NEXT </button>'
	currentcontents=$('#input_stuff').html();
	$('#input_stuff').html(nextbtn);
	$('#next').click(function(){
		$('#input_stuff').html(currentcontents);
		replace_table(stats);
		prep_buttons();
	})
}

var replace_table = function(newtable){
	$('#stattable').html(newtable);
}

var prep_buttons = function(){
	$('#go_btn').click(function(){
		var player = $('#player').val();
		$.ajax({
			url: "/submit",
			data: {
				player_name: player,
				p_num: pnum
			},
			success: function(data){
				print_result(data.successCode);
				if(data.successCode == 1){
					replace_table(data.stats);
					pnum = data.pnum;
				}
				console.log(data);
			},
			error: function(data){
				console.log(data);
			}
		});
	});

	$('#give_btn').click(function(){
		$.ajax({
			url: "/giveup",
			data: {
				p_num: pnum
			},
			success: function(data){
				pnum = data.pnum;
				display_loss(data.player_name, data.stats);
			}
		});
	});

	$('#player').keypress(function (e){
		var key = e.which;
		if(key == 13) {
			$('#go_btn').click();
			return false;
		}
	});
}

$( document ).ready(function(){
	prep_buttons();
});