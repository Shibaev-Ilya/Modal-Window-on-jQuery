$('.button').click(function(){
    $('.modal').show();
});

$('.close').click(function(){
    $('.modal').hide();
});

// buttons forward $ back

$('.forward').click(function(){
    if( $('.one').hasClass('active') ) {
        $('#step-1').hide().next().show();
        $('.two').addClass('active').prev().removeClass('active');
    } else if( $('.two').hasClass('active') ) {
        $('.step-2').hide().next().show();
        $('.three').addClass('active').prev().removeClass('active');
    } else if( $('.three').hasClass('active') ) {
        $('.step-3').hide().next().show();
        $('.four').addClass('active').prev().removeClass('active');
        $(this).hide();
        $('.subsc').removeClass('hidden');
    }
});

$('.back').click(function(){
    if($('.two').hasClass('active')){
        $('#step-1').show();
        $('.step-2').hide();
        $('.two').removeClass('active');
        $('.one').addClass('active');
    } else if($('.three').hasClass('active')){
        $('.step-2').show();
        $('.step-3').hide();
        $('.three').removeClass('active');
        $('.two').addClass('active');
    } else if($('.four').hasClass('active')){
        $('.step-3').show();
        $('.step-4').hide();
        $('.four').removeClass('active');
        $('.three').addClass('active');
        $('.subsc').addClass('hidden');
        $('.forward').show();
    }
});

$("#form").submit(function(e){
    var str = $(this).serialize();
    $.ajax({url: "answer.php",
            data: str,
             success: function(result){
      $("#div1").html(result);
    }});
    $('.modal').hide();
    return false;
  });