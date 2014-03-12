(define (log args...)
    (console.log.apply console args))

(define (rgba r g b a)
    (+ "rgba(" r ", " g ", " b ", " a ")"))

(define (time)
    ((new Date).getTime))
    
(define RAD_TO_DEG (/ 180 Math.PI))

(define LEFT 37)
(define UP 38)
(define RIGHT 39)
(define DOWN 40)
(define A_KEY 65)
(define D_KEY 68)
(define R_KEY 82)
(define S_KEY 83)
(define W_KEY 87)
(define SPACE 32)
(define CTRL 17)
(define ALT 18)
(define ESC 27)

(define (rand n)
    (Math.floor (* n (Math.random))))