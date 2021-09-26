  function dynamic_header(){
    var headerHeight = $('#header')[0].scrollHeight
    var top1 = $('#hero').offset().top;
    var top2 = $('#about').offset().top - headerHeight;
    // var top3 = $('#contact').offset().top;
    
    var scrollPos = $(document).scrollTop();
    if (scrollPos >= top1 && scrollPos < top2) {
        $('#header').css('background-color', 'rgba(255,255,255,0.10)');
    } else if (scrollPos >= top2) {
        $('#header').css('background-color', 'var(--primary-color-m-dark)');
      } 
  
  }
  dynamic_header()
  $(window).on('resize', dynamic_header);
  $(document).scroll(dynamic_header);