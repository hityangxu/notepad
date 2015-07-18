/**
 * Created by Stone on 2015/7/19.
 */
describe("Jasmine Test", function () {
    'use strict';
    it("jasmine works well", function () {
        expect(1).toBe(1);
    });

    it("'toBe' matcher works as '==='", function() {
        expect(0).not.toBe(false);
        expect(false).toBe(false);
    });

    it("'toEqual' matcher works well with objects", function() {
        var a = {
            x: 1
        };

        var b = {
            x: 1
        };

        expect(a).not.toBe(b);
        expect(a).toEqual(b);

        b.y = 2;
        expect(a).not.toEqual(b);
    });

    it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
        var pi = 3.1415926,
            e = 2.78;

        expect(pi).not.toBeCloseTo(e, 2); //2.78 => 2.78
        expect(pi).toBeCloseTo(e, 0); //2.78 => 3
    });

    it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
        var foo = function() {
            throw new TypeError("foo bar baz");
        };

        expect(foo).toThrowError("foo bar baz");
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, "foo bar baz");
    });

    describe("A spec using the fail function", function() {
        var foo = function(x, callBack) {
            if (x) {
                callBack();
            }
        };

        it("should not call the callBack", function() {
            foo(false, function() {
                fail("Callback has been called"); //断言，如果执行则测试失败
            });
        });
    });
});
