// JavaScript Document
$(document).ready( function() {
var settings_data;
var sizex;
var inviz, viz, toggler=true;

$.ajax({
  dataType: 'json',
  url: 'js/settings.json',
  success: function(data){
    settings_data = data;
	console.log(data);
  },
  async: false
});

function checkvisible() {
	for(inviz = 4; inviz < settings_data.images.number; inviz++) {
		$('ul#vl_ul').find('.img_shortcut').eq(inviz).find('a').css("display","none");
		for (viz = 0; viz < 4; viz++) {
			$('ul#vl_ul').find('.img_shortcut').eq(viz).find('a').css("display","block");
		}
		viz = 0;
	}
	inviz = 4;
	
	
}


	$('.vl_button').on('mouseover', function() {
		$(this).find('span').find('i').addClass('fa-inverse');
	});
	
	
	$('.vl_button').on('mouseout', function() {
		$(this).find('span').find('i').removeClass('fa-inverse');
	});
	
	
	$('#vl_bottom').on('click', function() {
		$('ul#vl_ul').find('.img_shortcut').fadeOut()
		$('ul#vl_ul').animate({"padding-top":150}, 1000, function () {
			$(this).css("padding-top",100);
			$('ul#vl_ul').prepend($('ul#vl_ul').find('.img_shortcut').eq(settings_data.images.number - 1));
			$(this).find('.img_shortcut').fadeIn();
			checkvisible();
		});
	});
	
	
	$('#vl_top').on('click', function() {
		$('ul#vl_ul').find('.img_shortcut').fadeOut()
		$('ul#vl_ul').animate({"padding-top":50}, 1000, function () {
			$(this).css("padding-top",100);
			$('ul#vl_ul').append($('ul#vl_ul').find('.img_shortcut').eq(0));
			$(this).find('.img_shortcut').fadeIn();
			checkvisible();
		});
		//checkvisible();
	});
	
	
	$('#more').on('click', function() {
		if (toggler == true) {
		var pamela = $('#preview').css('background').substring($('#preview').css('background').indexOf('url'), $('#preview').css('background').indexOf('.jpg'))
		var brevno = pamela.substring(pamela.lastIndexOf("/") + 1, pamela.lengths);
		sizex = (window.innerHeight / settings_data.images.sizes[brevno-1].height)*settings_data.images.sizes[brevno-1].width;
		$('#preview').animate({"width": sizex}, 1000);
		$('#vertical-line').animate({"right": sizex}, 1000);
		$(this).find('span').find('i').removeClass('fa-angle-left');
		$(this).find('span').find('i').addClass('fa-angle-right');
		toggler = false;
		} else {
			$('#preview').animate({"width": "52%"}, 500);
		$('#vertical-line').animate({"right": "52%"}, 500);
		$('#more').find('span').find('i').removeClass('fa-angle-right');
		$('#more').find('span').find('i').addClass('fa-angle-left');
		toggler = true;
		}
	});



var imgcount;
for(imgcount = 0; imgcount < settings_data.images.number; imgcount++) {
	$('ul#vl_ul').append($('<li class="img_shortcut"><a href="#" onclick="show_preview($(this));"><div class="vu_inner" style="background:url(' + settings_data.images.assets[imgcount] + '); background-size:100%;"></div></a></li>'));
}
checkvisible();

	//userSettings
		if(settings_data.usersettings.overflow == "hidden") {
			$('body').css('overflow', 'hidden');
		}
		$('#preview').css({'background':'url(' + settings_data.images.assets[settings_data.usersettings.deafultImageNum] + ')', 'background-size':'auto 100%'});
		if (settings_data.usersettings.bodyFading == true) {
			$('body').css('display', 'none');
			$('body').fadeIn(1500);
		}
		$('#sp-tamp').css('background-image', "url(" + settings_data.usersettings.sptamp + ")");
});
	
	//end
	function show_preview(elem) {
		
		//console.log(elem);
		var atag = elem;
		$(document).ready( function() {
			$('#preview').animate({"width": "52%"}, 500);
		$('#vertical-line').animate({"right": "52%"}, 500);
		$('#more').find('span').find('i').removeClass('fa-angle-right');
		$('#more').find('span').find('i').addClass('fa-angle-left');
			console.log(atag.html());
			var atgurl = atag.html().substring(atag.html().indexOf('(')+1, atag.html().indexOf(')'));
			//console.log(atgurl);
			var bronebro = +atgurl.substring(11, atgurl.indexOf('.'));
		$('#preview').css({'background': "url(" + atgurl + ")", "background-size":" auto 100%"}); 
		//console.log("1");
		});
	}