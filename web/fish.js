(class (Fish:BoardObject x y)
    (base x y 
        (new Animation 40 22 1000
            (pattern-group 22 "#c0c0c0"
                "><>"
                "-<>")))

    (set! this.lastBubble 0)
    (method (update dt)
        (BoardObject.prototype.update.call this dt)
        (set! this.spd (this.spd.add (new Vector 0 (* G dt))))
        (set! this.spd (this.spd.mul 0.99))
        
        (when (< this.loc.y this.animation.height)
        (set! this.spd.y 0)
        (set! this.loc.y this.animation.height))

        (when (> this.loc.y HEIGHT)
        (set! this.spd.y 0)
        (set! this.loc.y HEIGHT))
        
        (set! this.lastBubble (+ this.lastBubble dt))
        (when (> this.lastBubble 2000)
            (set! this.lastBubble 0))
                (define ret [])
                (when (= this.lastBubble 0)
                    (ret.push (new Bubble this.loc.x this.loc.y)))
                ret))

(class (Bubble:BoardObject x y)
    (base x y 
        (new Animation 10 10 3000
            (pattern-group 10 "#0000ff"
                "."
                "o"
                "O") true))

    (set! this.spd.y -0.01))

(define (boids arr dt)
    (define all (arr.concat brian))
    (define ret [])
    (arr.forEach (lambda (f)
        (define v1 (rule1 all f))
        (define v2 (rule2 all f))
        (define v3 (rule3 all f))
        (v1.iadd v2)
        (v1.iadd v3)
        (v1.idiv 10000)
        (v1.ilimit 0.01)
        (f.spd.iadd v1)
        //(f.spd.ilimit 0.05)
        (set! ret (ret.concat (f.update dt)))))
        ret)

(define MAX_DIST 100)

// steer torwards local center
(define (rule1 arr f)
    (define center (new Vector 0 0))
    (define count 0)
    (for (var i in arr)
        (define dir (arr[i].loc.sub f.loc))
        (define dist (dir.mag))
        (when (!= arr[i] f)
(center.iadd arr[i].loc)
(set! count (+ 1 count))))
(when (> count 0)
    (center.idiv count)
    (center.isub f.loc))
(center.div 4))

// steer away from local fish 
(define (rule2 arr f)
(define center (new Vector 0 0))
(define count 0)
(for (var i in arr)
    (define dir (arr[i].loc.sub f.loc))
    (define dist (dir.mag))
    (when (and (!= arr[i] f) (< dist MAX_DIST))
        (center.iadd arr[i].loc)
        (set! count (+ 1 count))))
(when (> count 0)
    (center.idiv count)
    (set! center (f.loc.sub center)))
(center.mul 3))

// average direction
(define (rule3 arr f)
(define center (new Vector 0 0))
(define count 0)
(for (var i in arr)
    (define dir (arr[i].loc.sub f.loc))
    (define dist (dir.mag))
    (when (and (!= arr[i] f) (< dist MAX_DIST))
        (center.iadd arr[i].spd)
        (set! count (+ 1 count))))
(when (> count 0)
    (center.idiv count))
    (center.div 2))