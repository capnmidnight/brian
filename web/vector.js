(class (Vector x y)
    (set! this.x x)
    (set! this.y y)

    (method (div num)
        (new Vector (/ this.x num) (/ this.y num)))

    (method (idiv num) 
        (set! this.x (/ this.x num))
        (set! this.y (/ this.y num)))

    (method (mul num)
        (new Vector (* this.x num) (* this.y num)))

    (method (imul num) 
        (set! this.x (* this.x num))
        (set! this.y (* this.y num)))

    (method (limit max)
        (define mag (this.mag))
        (define unit (this.div mag))
        (define ret this)
        (when (> mag max)
            (set! ret (new Vector (* unit.x max) (* unit.y max))))
        ret)

    (method (ilimit max)
        (when (> (this.mag) max)
            (define unit (this.unit))
            (set! this.x (* unit.x max))
            (set! this.y (* unit.y max))))

    (method (mag) 
        (Math.sqrt (+ (* this.x this.x) (* this.y this.y))))

    (method (unit)
        (define mag (this.mag))
        (new Vector (/ this.x mag) (/ this.y mag)))

    (method (add v2)  
        (new Vector (+ this.x v2.x) (+ this.y v2.y)))
    (method (iadd v2)  
        (set! this.x (+ this.x v2.x))
        (set! this.y (+ this.y v2.y)))

    (method (sub v2)  
        (new Vector (- this.x v2.x) (- this.y v2.y)))

    (method (isub v2)  
        (set! this.x (- this.x v2.x))
        (set! this.y (- this.y v2.y)))

    (method (dot v2)  
        (+ (* this.x v2.x) (* this.y v2.y)))

    (method (euc2d dest) 
        (Math.sqrt (+ (* (- this.x dest.x) (- this.x dest.x))
                      (* (- this.y dest.y) (- this.y dest.y)))))

    (method (toString)
        (+ "<" this.x ", " this.y ">")))                   