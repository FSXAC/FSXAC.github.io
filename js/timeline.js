var offset = 0.8;

jQuery(document).ready(function($) {
    var timelineBlocks = $(".timeline-block");

    hideBlocks(timelineBlocks, offset);

    $(window).on('scroll', function() {
        // if (!window.requestAnimationFrame) {
        //     setTimeout(function() {
        //         showBlocks(timelineBlocks, offset);
        //     }, 100);
        // } else {
        //     window.requestAnimationFrame(function() {
        //         showBlocks(timelineBlocks, offset);
        //     });
        // }
        blocksUpdateTrigger();
    });
});

function blocksUpdateTrigger() {
    var timelineBlocks = $(".timeline-block");
    if (!window.requestAnimationFrame) {
        setTimeout(function() {
            showBlocks(timelineBlocks, offset);
        }, 100);
    } else {
        window.requestAnimationFrame(function() {
            showBlocks(timelineBlocks, offset);
        });
    }
}

function hideBlocks(blocks, offset) {
    blocks.each(function() {
        ($(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && 
        $(this).find('.timeline-icon, .timeline-body').addClass('is-hidden');
    });
}

function showBlocks(blocks, offset) {
    blocks.each(function(){
        ($(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && 
            $(this).find('.timeline-icon').hasClass('is-hidden')) && 
        $(this).find('.timeline-icon, .timeline-body').removeClass('is-hidden').addClass('bounce-in');
    });
}