/* JavaScript Document by sasha2401
#Author: @alexanderBuzin
#version: 1.0.1
#workspace: Dreamweaver CC
## Fork me on GitHub
*/
$(document).ready(function () {
    var sizex, inviz, viz, toggler = true;
	//settings_data;

    //we need to include settings.json file 
    $.ajax({
        dataType: 'json',
        url: 'js/settings.json',
        success: function (data) {
            settings_data = data; //fetching data into variable
        },
        async: false
    });

    //Function for hiding elements after 4
    function checkvisible() {
        for(inviz = 4; inviz < settings_data.images.number; inviz++) {
            $('ul#vl_ul').find('.img_shortcut').eq(inviz).find('a').css("display", "none");
            for(viz = 0; viz < 4; viz++) {
                $('ul#vl_ul').find('.img_shortcut').eq(viz).find('a').css("display", "block");
            }
            viz = 0;
        }
        inviz = 4;
    }

    //--Events for our buttons--
    $('.vl_button').on('mouseover', function () {
        $(this).find('span').find('i').addClass('fa-inverse');
    }); // inverse color when mouse is on vl_button


    $('.vl_button').on('mouseout', function () {
        $(this).find('span').find('i').removeClass('fa-inverse');
    }); // the same, but when mouse is out of this button. (conversely)


    $('#vl_bottom').on('click', function () {
        $('ul#vl_ul').find('.img_shortcut').fadeOut()
        $('ul#vl_ul').animate({
            "padding-top": 150
        }, 1000, function () {
            $(this).css("padding-top", 100);
            $('ul#vl_ul').prepend($('ul#vl_ul').find('.img_shortcut').eq(settings_data.images.number - 1));
            $(this).find('.img_shortcut').fadeIn();
            checkvisible();
        });
    }); //animation and some additional functions for listing


    $('#vl_top').on('click', function () {
        $('ul#vl_ul').find('.img_shortcut').fadeOut()
        $('ul#vl_ul').animate({
            "padding-top": 50
        }, 1000, function () {
            $(this).css("padding-top", 100);
            $('ul#vl_ul').append($('ul#vl_ul').find('.img_shortcut').eq(0));
            $(this).find('.img_shortcut').fadeIn();
            checkvisible();
        });
    });


    $('#more').on('click', function () {
        if(toggler == true) {
            var pamela = $('#preview').css('background').substring($('#preview').css('background').indexOf('url'), $('#preview').css('background').indexOf('.jpg'))
            var brevno = pamela.substring(pamela.lastIndexOf("/") + 1, pamela.lengths);
            sizex = (window.innerHeight / settings_data.images.sizes[brevno - 1].height) * settings_data.images.sizes[brevno - 1].width;
            $('#preview').animate({
                "width": sizex
            }, 1000);
            $('#vertical-line').animate({
                "right": sizex
            }, 1000);
            $(this).find('span').find('i').removeClass('fa-angle-left');
            $(this).find('span').find('i').addClass('fa-angle-right');
            toggler = false;
        } else {
            $('#preview').animate({
                "width": "52%"
            }, 500);
            $('#vertical-line').animate({
                "right": "52%"
            }, 500);
            $('#more').find('span').find('i').removeClass('fa-angle-right');
            $('#more').find('span').find('i').addClass('fa-angle-left');
            toggler = true;
        }
    }); //expand image to full size. And hide if it is already done/


    //--Initialization of images--
    var imgcount;
    for(imgcount = 0; imgcount < settings_data.images.number; imgcount++) {
        $('ul#vl_ul').append($('<li class="img_shortcut" id="' + imgcount +  '"><a href="#" onclick="show_preview($(this).parent(2));"><div class="vu_inner" style="background:url(' + settings_data.images.assets[imgcount] + '); background-size:100%;"></div></a></li>'));
    } //write some more tags to our list/gallery
    checkvisible();

    //--userSettings--
    if(settings_data.usersettings.overflow == "hidden") {
        $('body').css('overflow', 'hidden');
    } //hiding body overflow/scrollbar for better view
    $('#preview').css({
        'background': 'url(' + settings_data.images.assets[settings_data.usersettings.deafultImageNum] + ')',
        'background-size': 'auto 100%'
    }).find('h1#heading').text(settings_data.images.text[settings_data.usersettings.deafultImageNum].heading); //Automatic preview
	$('#preview').find('p#about').text(settings_data.images.text[settings_data.usersettings.deafultImageNum].content);

switch (true) {
  case settings_data.usersettings.textEffects.fading:
    $('#preview').find('*').css('display', 'none').fadeIn();
	break;
  case settings_data.usersettings.textEffects.puffing:
    $('#preview').find('*').css('display', 'none').toggle('puff');
	break;
  case settings_data.usersettings.textEffects.sliding:
    $('#preview').find('*').css('display', 'none').slideUp();
	break;
  case settings_data.usersettings.textEffects.shake:
    $('#preview').find('*').css('display', 'none').effect( "shake" );
	break;
  case settings_data.usersettings.textEffects.bounce:
    $('#preview').find('*').css('display', 'none').toggle( "bounce", { times: 3 }, "slow" );
	break;
  case settings_data.usersettings.textEffects.pulsate:
    $('#preview').find('*').css('display', 'none').toggle( "pulsate" );
	break;
}

	
    if(settings_data.usersettings.bodyFading == true) { //fade in body when it's loaded
        $('body').css('display', 'none');
        $('body').fadeIn(1500);
    }
    $('#sp-tamp').css('background-image', "url(" + settings_data.usersettings.sptamp + ")");
	
	
	//rewrite for me ( because another way this can't work(( )!!
});

//--ending-- (not JQuery)
function show_preview(elem) {
    var atag = elem;
    $(document).ready(function () {
        $('#preview').animate({
            "width": "52%"
        }, 500);
        $('#vertical-line').animate({
            "right": "52%"
        }, 500);
        $('#more').find('span').find('i').removeClass('fa-angle-right');
        $('#more').find('span').find('i').addClass('fa-angle-left');
        var atgurl = atag.attr('id');
        $('#preview').css({
            'background': "url(img/assets/" + (+atgurl+1) + ".jpg)",
            "background-size": " auto 100%"
        }).find('h1#heading').text(settings_data.images.text[atgurl].heading);
		$('#preview').find('p#about').text(settings_data.images.text[atgurl].content);
switch (true) {
  case settings_data.usersettings.textEffects.fading:
    $('#preview').find('*').css('display', 'none').fadeIn();
	break;
  case settings_data.usersettings.textEffects.puffing:
    $('#preview').find('*').css('display', 'none').toggle('puff');
	break;
  case settings_data.usersettings.textEffects.sliding:
    $('#preview').find('*').css('display', 'none').slideUp();
	break;
}
    });
}