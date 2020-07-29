function scrollIntoViewIfNeeded($target, options) {

    var options = options ? options : {},
        $win = $($target[0].ownerDocument.defaultView), //get the window object of the $target, don't use "window" because the element could possibly be in a different iframe than the one calling the function
        $container = options.$container ? options.$container : $win,
        padding = options.padding ? options.padding : 20,
        elemTop = $target.offset().top,
        elemHeight = $target.outerHeight(),
        containerTop = $container.scrollTop(),
        //Everything past this point is used only to get the container's visible height, which is needed to do this accurately
        containerHeight = $container.outerHeight(),
        winTop = $win.scrollTop(),
        winBot = winTop + $win.height(),
        containerVisibleTop = containerTop < winTop ? winTop : containerTop,
        containerVisibleBottom = containerTop + containerHeight > winBot ? winBot : containerTop + containerHeight,
        containerVisibleHeight = containerVisibleBottom - containerVisibleTop;

    if (elemTop < containerTop) {
        //scroll up
        if (options.instant) {
            $container.scrollTop(elemTop - padding);
        } else {
            $container.animate({ scrollTop: elemTop - padding }, options.animationOptions);
        }
    } else if (elemTop + elemHeight > containerTop + containerVisibleHeight) {
        //scroll down
        if (options.instant) {
            $container.scrollTop(elemTop + elemHeight - containerVisibleHeight + padding);
        } else {
            $container.animate({ scrollTop: elemTop + elemHeight - containerVisibleHeight + padding }, options.animationOptions);
        }
    }
}