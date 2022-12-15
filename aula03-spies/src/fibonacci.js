module.exports = class Fibonacci {
//generators return iterators, (.next)
//has 3 ways to read data
// @1 using .next, for await or rest/spread
// @
    *execute(input , current = 0 , next=1){
        if(input === 0) return 0 
        
        //return value
        yield current

        // delegate function
        yield* this.execute(input -1 , next , current + next)
    }

}