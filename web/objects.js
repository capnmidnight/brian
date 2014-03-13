(class (Plant:BoardObject x y height)
    (define parts ["\\" "/"])
    (define a [])
    (define b [])
    (define c [])
    (define n 0)
    (while (< n height)
        (define i (% n parts.length))
        (define j (% (+ 1 n) parts.length))
        (a.push parts[i])
        (b.push parts[j])
        (c.push "|")
        (set! n (+ 1 n)))

    (set! a (a.join "\n"))
    (set! b (b.join "\n"))
    (set! c (c.join "\n"))
    (set! this.height (* height 10))
    (base x (- y (* 0.5 this.height)) 
        (new Animation 10 this.height 2000
            (pattern-group 10 "#00ff00"
                a c b c))))

(class (Jelly:BoardObject x y)
    (base x y 
        (new Animation 40 60 1000
            (pattern-group 20 "#ff00ff"
                "(O)\n/|\\\n|/|\n" 
                "(O)\n|\\/\n/|/\n" 
                "(O)\n/|\\\n\\/\\\n"))))

(class (Shark:BoardObject x y)
    (base x y 
        (new Animation 225 120 1000 
            (pattern-group 25 "#ff0000"
                "      .\n \\____)\\_____\n /--v___ __`<\n        )/\n        '"
                "      .\n \\____)\\_____\n /--v___ __\\`)\n        )/\n        '")))
    (set! this.spd (new Vector 0.2 0)))