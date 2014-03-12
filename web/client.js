// setup the drawing area
(define (log args...)
    (console.log.apply console args))

(class (Surface width height)
    (set! this.canv (document.createElement "canvas"))
    (set! this.graph (this.canv.getContext "2d"))
    (this.setSize width height)

    (method (setSize width height)
        (set! this.canv.width width)
        (set! this.canv.style.width (+ width "px"))
        (set! this.canv.height height)
        (set! this.canv.style.height (+ height "px"))))

(define front (new Surface))
(define back (new Surface))

(document.body.appendChild front.canv)
(define g front.graph)

(define WIDTH 0)
(define HEIGHT 0)
(define (setWindowSize)
    (set! WIDTH (- window.innerWidth 5))
    (set! HEIGHT (- window.innerHeight 5))
    (send front setSize WIDTH HEIGHT)
    undefined) 
(setWindowSize)
(on window:resize (setWindowSize.bind window))

// test draw
(set! g.fillStyle "#00007f")
(g.fillRect 0 0 WIDTH 20)
(set! g.font "12pt Consolas")
(set! g.fillStyle "#c0c0c0")
(g.fillText "Brian!" 0 15)

(class (Shape width height blah)
    (set! this.img (new Surface width height))

    (for (var k in blah)
        (define parts (k.split " "))
        (define color (parts.pop))
        (define height parts[0])
        (set! height (parseInt (height.substring 0 (- height.length 2)) 10))
        (define font (parts.join " "))
        (set! this.img.graph.font font)
        (set! this.img.graph.fillStyle color)
        (for (var i in blah[k])
            (define y (* height (+ 1 (parseInt i 10))))
            (this.img.graph.fillText blah[k][i] 0 y)))

    (method (draw x y)
        (g.drawImage this.img.canv (or x 0) (or y 0))))

(define brian (new Shape 50 50 {
    "14px Consolas #c0c0c0":
            ["" 
             "><>"]
    "14px Consolas #0000ff":
            ["~~~"
             ""
             "~~~"]
            }))

(define (rgba r g b a)
            (+ "rgba(" r ", " g ", " b ", " a ")"))

(define angle 0)

(setInterval (lambda ()
    (g.save)
    (set! g.fillStyle (rgba 0 0 0 0.0625))
    (g.fillRect 0 0 WIDTH HEIGHT)
    (g.translate 150 150)
    (g.rotate angle)
    (brian.draw 100 0)
    (set! angle (+ angle 1))
    (g.restore)) 1)
