(define (log args...)
    (console.log.apply console args))

(define (rgba r g b a)
    (+ "rgba(" r ", " g ", " b ", " a ")"))

(define (time)
    ((new Date).getTime))