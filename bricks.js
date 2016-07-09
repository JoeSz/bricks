/*! Bricks by Taufik Nurrohman <https://github.com/tovic> based on <https://gist.github.com/2208329> */
(function(w, d) {

    // find minimum value from array
    Array.prototype.min = function() {
        return Math.min.apply({}, this);
    };

    // find maximum value from array
    Array.prototype.max = function() {
        return Math.max.apply({}, this);
    };

    // wall, brick(s) margin, wall padding
    w.bricks = function(wall, gap, pad) {
        gap = gap || 0;
        pad = pad || 0;
        if (typeof wall === "string") {
            wall = d.getElementById(wall);
        }
        function class_a(el, c) {
            return el.classList.add(c);
        }
        function class_r(el, c) {
            return el.classList.remove(c);
        }
        function class_h(el, c) {
            return el.classList.contains(c);
        }
        var bricks = wall.children,
            c = bricks.length,
            wait = false,
            c_t, i, j;
        if (!c) return;
        var width = bricks[0].offsetWidth + gap,
            o = wall.getAttribute('style') || "";
        class_a(wall, 'bricks');
        wall.setAttribute('data-style', o);
        wall.style.padding = 0;
        wall.style.position = 'relative';
        if (!class_h(wall, 'bricks-ready')) {
            var x = d.createElement('div');
            class_a(x, wall.className);
            x.style.margin = 0;
            x.style.padding = 0;
            x.style.border = 0;
            x.style.outline = 0;
            x.style.width = 'auto';
            x.style.height = 0;
            x.style.float = 'none';
            x.style.display = 'block';
            x.style.clear = 'both';
            x.style.overflow = 'hidden';
            x.style.visibility = 'hidden';
            wall.parentNode.insertBefore(x, wall);
        }
        function apply(first) {
            if (!first && !class_h(wall, 'bricks-ready')) return;
            var c_h = [],
                c_c = Math.floor(x.offsetWidth / width);
            for (i = 0; i < c_c; ++i) {
                c_h[i] = 0;
            }
            for (i = 0; i < c; ++i) {
                var brick = bricks[i];
                if (first) {
                    var o = brick.getAttribute('style') || "";
                    brick.setAttribute('data-style', o);
                }
                brick.style.float = 'none';
                brick.style.display = 'block';
                brick.style.position = 'absolute';
                brick.style.margin = 0;
                for (j = c_c - 1; j > -1; --j) {
                    if (c_h[j] === c_h.min()) {
                        c_t = j;
                    }
                }
                brick.style.top = (c_h[c_t] + pad) + 'px';
                brick.style.left = ((width * c_t) + pad) + 'px';
                class_a(brick, 'brick-ready');
                c_h[c_t] += brick.offsetHeight + gap;
            }
            wall.style.width = ((width * c_h.length) - gap + (pad * 2)) + 'px';
            wall.style.height = (c_h.max() - gap + (pad * 2)) + 'px';
            class_a(wall, 'bricks-ready');
        } apply(1);
        w.addEventListener("resize", function() {
            if (wait) w.clearTimeout(wait);
            wait = w.setTimeout(apply, 50);
        }, false);
    };

})(window, document);