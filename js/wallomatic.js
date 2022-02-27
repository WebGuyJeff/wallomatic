/*
 * Wall-O-Matic
 *
 * A plugin to generate css wallpaper on page load or manual initiation.
 *
 * Author: Jefferson Real
 * URL: https://jeffersonreal.com
 * Copyright: © 2021 Jefferson Real
 *
 */

let wallOMatic_plugin = function() {

    let wallOMatic = function() {
    "use strict";
        /* Config Values */
        const columns = Math.floor((Math.random() * (16 - 6 + 1)) + 6);
        const cellAspect = 0.50;
        const radius = (Math.floor((Math.random() * 20) + 1 + 1)) / 10;
        const skewX = Math.floor((Math.random() * (40 - 10 + 1)) + 10);
        const skewY = Math.floor((Math.random() * (40 - 10 + 1)) + 10);
        const colours = ["#fd6a42", "#b1e8f2", "#ffb908", "#fff"];

        const cellWidth = parseFloat(100 / columns).toFixed(2);
        let cellHeight = parseFloat(($('.wallOMatic_wall').width() / columns) * cellAspect).toFixed(2);
        let rowCurrent = 0;
        let right = 0;
        let bottom = 0;
        let rowColours = [];
        let resizeTimer = null;

        $("head").append("<style>.wallOMatic_cell{width:" + cellWidth + "%;height:" + cellHeight + "px;border-radius:" + radius + "rem;transform:skew(" + skewY + "deg," + skewX + "deg)}.wallOMatic_cell:nth-child(odd){transform:skew(-" + skewY + "deg,-" + skewX + "deg);}</style>");

        wallOMatic_grid();
        function wallOMatic_grid() {
            let containerHeight = $('.wallOMatic_wall').height();
            let rowQty = Math.ceil(containerHeight / cellHeight);
            if (rowQty > rowCurrent) {
                let rowDeficit = rowQty - rowCurrent;
                    if (rowDeficit > 250) { /* Deficit error threshold */
                        console.log("WallOMatic [Error] Deficit threshold exceeded, aborting.");
                        return;
                    }
                    for (let i = 0; i < rowDeficit; i++) {
                        right = 0;
                        wallOMatic_colours(rowColours);
                        for (let i = 0; i < columns; i++) {
                            $(".wallOMatic_wall").append("<div class=\"wallOMatic_cell\" style=\"right:" + right + "%;bottom:" + bottom + "px;background: " + rowColours[i] + ";\"></div>");
                            right = parseFloat(((+right) + (+cellWidth)).toFixed(1));
                        }
                        bottom = parseFloat(((+bottom) + (+cellHeight)).toFixed(1));
                    }
                    rowCurrent = rowCurrent + rowDeficit;
                    //console.log("WallOMatic [Notice] Built " + rowDeficit + " rows. Current grid " + columns + " x " + rowCurrent + ", " + (columns * rowCurrent) + " cells.");
            }
        }

        function wallOMatic_colours(array) {
            let colourPool = [];
            function removeFromPool(a) {
                let r = colourPool.indexOf(a);
                colourPool.splice(r, 1);
                return;
            }
            for (let n = 0; n < (columns); n++) {
                colourPool = Array.from(colours);
                if (colourPool.indexOf(array[n]) !== -1 ) {
                    removeFromPool(array[n]);
                }
                if (colourPool.indexOf(array[n - 1]) !== -1) {
                    removeFromPool(array[n - 1]);
                }
                array[n] = colourPool[Math.floor(Math.random() * colourPool.length)];
            }
        }

        $(window).resize(function() {
            if(resizeTimer !== null) window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function() {
                wallOMatic_grid();
            }, 500);
        });
    };

    /* Fire wallpaper refresh on manual button click */
    $(".wallOMatic_button").click(function(){
        $(".wallOMatic_cell").remove();
        wallOMatic();
    });

    // Poll for doc ready state
    let interval = setInterval(function() {
        if(document.readyState === 'complete') {
            clearInterval(interval);

            /* Add wall to the body element */
            $(document.body).append('<div class="wallOMatic_wall" style="position: fixed; top: -10em; height: calc(100% + 20em);"><div class="wallOMatic_overlay"></div></div>');

            /* Start the reactor */
            if($(".wallOMatic_wall").length){
                wallOMatic();
            }

        }
    }, 100);

};
wallOMatic_plugin();
