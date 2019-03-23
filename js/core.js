$(function(){
    console.log('Page Loaded!');

    new WOW().init();
    Counting();

    setTimeout(function(){
        modalShow('.subscribe-modal');
    }, 60 * 1000);

    $(document).on("scroll", onScroll);
    $('a[href="#"]').on('click', function(e){
        e.preventDefault();
    });
    $('.close-modal').on('click', function(e){
       e.preventDefault();

       closeModal();
    });
    $('.subscribe-submit').on('click', function(e){
       e.preventDefault();

       closeModal();
    });

    $('.counter_number').each(function(){
        var container = $(this);
        var color = container.find('p').attr('data-color');
        container.find('p').css('color','#'+color).find('span').css('color','#'+color);
        var start = container.find('.couting').attr('data-start');
        var end = container.find('.couting').attr('data-end');
        var content = container.find('.couting').data('data-end');
        var duration = container.find('.couting').attr('data-speed');
        if(duration)
        {
            var speed = parseInt(duration / end);
            var interval = setInterval(function(){
                if(start - 1 < end)
                {
                    container.find('.number').html(start);
                }
                else
                {
                    container.find('.number').html(content);
                    clearInterval(interval);
                }
                start++;
            },speed)
        } else
        {
            container.find('.number').html(content);
        }

    });

    var owl = $('.main-carousel');

    if(owl.length > 0)
        initMainSlider();

    // init Isotope
    var $grid = $('.portfolio-grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        stagger: 30
    });
    var buttonGroup = $('.button-group');
    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };
    // bind filter button click
    buttonGroup.on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    buttonGroup.each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });

    // Tabs
    $('.tabs').on('click', '.tab', function(e){
        e.preventDefault();

        var activeTab = $(this).data('tab');

        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        $('.tabs-content .tab-content').removeClass('show');
        $('.tabs-content').find('#' + activeTab).addClass('show');

    });

    // Reviews carousel
    $('.reviews-carousel').owlCarousel({
        items: 2,
        margin: 40,
        responsive: {
            0: {
                items: 1,
                margin: 20
            },
            768: {
                items: 2,
                margin: 40
            }
        }
    });

    // Main menu
    $('.main-menu-btn').on('click', function(e){
        e.preventDefault();

        $(this).toggleClass('active');
        $('.main-menu-container').toggleClass('show');
    });
    $('.main-menu').on('click', 'a', function(e){
        e.preventDefault();
        var body = $("html, body");
        var target = $(this).data('target');
        var targetPos = $('#' + target).offset().top - 60;

        $('.main-menu').find('li').removeClass('active');
        $(this).parent('li').addClass('active');

        body.stop().animate({scrollTop: targetPos}, 2000);
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('.main-menu li').each(function () {
            var currLink = $(this);
            var refElement = $('#' + currLink.find('a').data('target'));
            if (refElement.position().top <= scrollPos + 60 && refElement.position().top + refElement.height() > scrollPos + 60) {
                $('.main-menu li').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

    // Main slider methods
    function initMainSlider(){
        owl.owlCarousel({
            items: 1,
            loop: true,
            animateOut: 'fadeOut',
            nav: true,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            autoplay: true,
            autoplayTimeout: 11000,
            autoplayHoverPause: false,
            onInitialized: function(){
                startProgressBar();
            },
            onTranslate: function(){
                resetProgressBar();
            },
            onTranslated: function(){
                startProgressBar();
            }
        });
    }
    function startProgressBar() {
        $('.slider-progress').css({
            'width': '100%',
            'transition': 'width 10s'
        });
    }
    function resetProgressBar() {
        $('.slider-progress').css({
            'width': 0,
            'transition': 'width 0s'
        });
    }

    //Counting
    function Counting(){
        function animateValue(taget, start, end, duration) {
            // assumes integer values for start and end

            var obj = document.getElementById(id);
            var range = end - start;
            // no timer shorter than 50ms (not really visible any way)
            var minTimer = 50;
            // calc step time to show all interediate values
            var stepTime = Math.abs(Math.floor(duration / range));

            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);

            // get current time and calculate desired end time
            var startTime = new Date().getTime();
            var endTime = startTime + duration;
            var timer;

            function run() {
                var now = new Date().getTime();
                var remaining = Math.max((endTime - now) / duration, 0);
                var value = Math.round(end - (remaining * range));
                obj.innerHTML = value;
                if (value == end) {
                    clearInterval(timer);
                }
            }

            var timer = setInterval(run, stepTime);
            run();
        }
        $('.counter_number').each(function(){
            var container = $(this);
            var start = container.find('.counting').data('start');
            var end = container.find('.counting').data('end');
            var content = container.find('.counting').data('end');
            var duration = container.find('.counting').data('speed');
            if(duration)
            {
                var speed = parseInt(duration / end);
                var interval = setInterval(function(){
                    if(start - 1 < end)
                    {
                        container.find('.number').html(start);
                    }
                    else
                    {
                        container.find('.number').html(content);
                        clearInterval(interval);
                    }
                    start++;
                },speed)
            } else
            {
                container.find('.number').html(content);
            }

        });
    }

    // Modal
    function modalShow(target){
        $('body').addClass('modal-open');
        $(target).addClass('open')
    }
    function closeModal(){
        $('body').removeClass('modal-open');
        $('.modal').removeClass('open');
    }

});

function initMap() {
    var mapContainer = document.getElementById('map');
    var markerPos = {lat: 50.3703615, lng: 30.4518733};
    // var markerPos = {lat: 46.4843182, lng: 30.7394993};
    var positionFix = ($(window).width() > 991) ? 0.01 : 0;
    if(mapContainer != null) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: markerPos.lat, lng: markerPos.lng - positionFix},
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({
            position: markerPos,
            map: map
        });
    }
}
