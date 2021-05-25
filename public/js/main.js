$(window).on('load', function () { 

    /* Menu toggle */
    $('.menu-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).next().toggleClass('opened');
    });

    $('.menu').on('click', '.menu_list-item__parent > a', function(e) {
        e.preventDefault();
        $(this).next().toggleClass('opened');
    });


    /* Dropdown */
    $("select:visible").chosen({
        disable_search: true,
        width: $(this).data('width')
    });

    /* Tabs */
    $(".tabs, .catalog_mode").on('click', 'button', function(e) {
        e.preventDefault();

        $(".tabs_button.active, .tabs_tab.active, .catalog_tab, .catalog_mode-icon").removeClass('active');

        $(this).addClass('active');
        $('.tabs_tab[data-tab="'+ $(this).data('tab') +'"], .catalog_tab[data-tab="'+ $(this).data('tab') +'"]').addClass('active');
    });

    /*Range inputs*/
    if ($("#price").length) {
        $("#price").slider({
            min: 10,
            max: 100,
            range: true
        }).on('slide', function(e) {
            $(this).parent().find('.value-1').html(e.value[0]);
            $(this).parent().find('.value-2').html(e.value[1]);
        });
        $("#weight").slider({
            min: 10,
            max: 2000,
            range: true
        }).on('slide', function(e) {
            $(this).parent().find('.value-1').html(e.value[0]);
            $(this).parent().find('.value-2').html(e.value[1]);
        });
    }

 });
