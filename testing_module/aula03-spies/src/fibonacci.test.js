const Fibonacci = require("./fibonacci");
const sinon = require("sinon")
const assert = require("assert")
;(async ()=>{

    {
        const fibonacci = new Fibonacci()
        const spyExecute = sinon.spy(fibonacci, fibonacci.execute.name)

        // our alg will start at 0

        //for await ( const i of fibonacci.execute(3)) {}
        const expectedCallCount = 4
        //assert.deepStrictEqual(spyExecute.callCount , expectedCallCount) 
        
    }
    {
        const fibonacci = new Fibonacci()
        const spyExecute = sinon.spy(fibonacci, fibonacci.execute.name)

        // gets the current returning at yield 
        const [...result] = fibonacci.execute(5)
        
        // [0] input[5]  current[0] next[0]
        // [1] input[4]  current[1] next[1]
        // [2] input[3]  current[1] next[2]
        // [3] input[2]  current[2] next[3]
        // [4] input[1]  current[3] next[5]
        // [5] input[0]  current[5] next[8]

        const {args} = spyExecute.getCall(2)
        const expectedResult = [0, 1, 1, 2, 3]
        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        assert.deepStrictEqual( result,expectedResult) 
        assert.deepStrictEqual( args, expectedParams) 
        console.log("result",result)
        console.log("args", args)
        
    }

})()