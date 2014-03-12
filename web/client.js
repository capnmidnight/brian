// setup the drawing area
// test draw
(set! g.fillStyle "#00007f")
(g.fillRect 0 0 WIDTH 20)
(set! g.font "12pt Lucida Console")
(set! g.fillStyle "#c0c0c0")
(g.fillText "Brian!" 0 15)

(define brian (new Shape 50 50 {
    "17px Consolas #c0c0c0":
" 
><>"
    "17px Consolas #0000ff":
"~_^

~_^"}))

(define angle 0)
(define lt (time))
(setInterval (lambda ()
    (define t (time))
    (define dt (- t lt))
    (set! lt t)
    (g.save)
    (set! g.fillStyle (rgba 0 0 0 1))
    (g.fillRect 0 0 WIDTH HEIGHT)
    (g.translate 150 150)
    (g.rotate angle)
    (set! g.strokeStyle (rgba 0 255 0 0.5))
    (g.strokeRect 100 0 brian.img.width brian.img.height)
    (brian.draw 100 0)
    (set! angle (+ angle (* dt 0.001)))
    (g.restore)) 1)