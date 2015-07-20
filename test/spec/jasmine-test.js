/**
 * Created by Stone on 2015/7/19.
 */
describe("Jasmine Test", function () {
    'use strict';
    it("jasmine works well", function () {
        expect(1).toBe(1);
    });

    it("'toBe' matcher works as '==='", function () {
        expect(0).not.toBe(false);
        expect(false).toBe(false);
    });

    it("'toEqual' matcher works well with objects", function () {
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

    it("The 'toBeCloseTo' matcher is for precision math comparison", function () {
        var pi = 3.1415926,
            e = 2.78;

        expect(pi).not.toBeCloseTo(e, 2); //2.78 => 2.78
        expect(pi).toBeCloseTo(e, 0); //2.78 => 3
    });

    it("The 'toThrowError' matcher is for testing a specific thrown exception", function () {
        var foo = function () {
            throw new TypeError("foo bar baz");
        };

        expect(foo).toThrowError("foo bar baz");
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, "foo bar baz");
    });

    describe("A spec using the fail function", function () {
        var foo = function (x, callBack) {
            if (x) {
                callBack();
            }
        };

        it("should not call the callBack", function () {
            foo(false, function () {
                fail("Callback has been called"); //断言，如果执行则测试失败
            });
        });
    });

    describe("Setup and Teardown", function () {
        var count = 0;
        beforeAll(function () {
            count++;
        });

        beforeEach(function () {
            count++;
        });

        afterEach(function () {
            count++;
        });

        it("should be 2 for the first test", function () {
            expect(count).toBe(2);
        });

        it("should be 4 for the second test", function () {
            expect(count).toBe(4);
        });

        afterAll(function () {
            expect(count).toBe(5);
        });
    });

    describe("'this'", function () {

        beforeAll(function () {
            this.x = 1;
        });

        beforeEach(function () {
            this.y = 2;
        });

        it('can use the `this` to share state', function () {
            expect(this).toBeDefined();
            expect(this).toEqual({
                x: 1,
                y: 2
            });
        });
    });

    xdescribe('disable suit', function () {
        fail('never execute');
    });

    describe("disable spec", function () {
        xit('never execute', function () {
            fail('never execute');
        });
    });

    describe('Spy', function () {
        describe('match function call', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    setBar: function (value) {
                        bar = value;
                    }
                };
                //spyOn(foo.setBar);No method name supplied

                spyOn(foo, 'setBar');

                foo.setBar(123);
                foo.setBar(456, 'another');
            });

            it('setBar is called', function () {

                expect(foo.setBar).toHaveBeenCalled();
            });

            xit('setBar has been call twice', function () {
                expect(foo.setBar).toHaveBeenCalledXTimes(2);
            });

            it('setBar has been call with params', function () {
                expect(foo.setBar).toHaveBeenCalledWith(123);
                expect(foo.setBar).toHaveBeenCalledWith(456, 'another');
            });
        });

        describe('when set a call through', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    setBar: function (value) {
                        bar = value;
                    }
                };

                spyOn(foo, 'setBar').and.callThrough();

                foo.setBar(123);
            });

            it('bar should be 123', function () {
                expect(bar).toBe(123);
            });
        });

        describe('when set a return value', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    getBar: function () {
                        return 1;
                    }
                };

                spyOn(foo, 'getBar').and.returnValue(2);

                bar = foo.getBar();
            });

            it("bar should be 2", function () {
                expect(bar).toBe(2);
            });
        });

        describe('when set a call fake', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    getBar: function () {
                        return bar;
                    },
                    setBar: function (value) {
                        bar = value;
                    }
                };

                spyOn(foo, 'getBar').and.callFake(function () {
                    return 100;
                });

                foo.setBar(1);
            });

            it('bar should be 1', function () {
                expect(bar).toBe(1);
            });

            it('getBar() should get 100', function () {
                expect(foo.getBar()).toBe(100);
            });
        });

        describe('when set to throw an error', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    getBar: function () {
                        return 1;
                    }
                };

                spyOn(foo, 'getBar').and.throwError('error');
            });

            it('should throw an error', function () {
                expect(function () {
                    foo.getBar();
                }).toThrowError();

                expect(function () {
                    foo.getBar();
                }).toThrowError('error');
            });
        });

        describe('when set call through and then stub', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    setBar: function (value) {
                        bar = value;
                    }
                };
            });

            it('can be stub in same spec', function () {
                spyOn(foo, 'setBar').and.callThrough();

                foo.setBar(1);
                expect(bar).toBe(1);

                foo.setBar.and.stub();
                foo.setBar(2);

                expect(bar).toBe(1);
            });
        });

        describe('trace if it was called', function () {
            var foo, bar = null;
            beforeEach(function () {
                foo = {
                    setBar: function (value) {
                        bar = value;
                    }
                };

                spyOn(foo, 'setBar');
            });

            it('will be true if called', function () {
                expect(foo.setBar).not.toHaveBeenCalled();
                foo.setBar(1);
                expect(foo.setBar).toHaveBeenCalled();
            });

            it('will be true if called', function () {
                expect(foo.setBar.calls.any()).toBe(false);
                foo.setBar(1);
                expect(foo.setBar.calls.any()).toBe(true);
            });

            it('count call times', function () {
                expect(foo.setBar.calls.count()).toBe(0);
                foo.setBar(1);
                expect(foo.setBar.calls.count()).toBe(1);
                foo.setBar(2);
                foo.setBar(3);
                expect(foo.setBar.calls.count()).toBe(3);
            });

            it('trace arguments for each call', function () {
                foo.setBar(1);
                foo.setBar(1, 2);
                foo.setBar(1, 2, 3);

                expect(foo.setBar.calls.argsFor(0)).toEqual([1]);
                expect(foo.setBar.calls.argsFor(1)).toEqual([1, 2]);
                expect(foo.setBar.calls.argsFor(2)).toEqual([1, 2, 3]);
            });

            it('trace arguments for all calls', function () {
                foo.setBar(1);
                foo.setBar(1, 2);
                foo.setBar(1, 2, 3);

                expect(foo.setBar.calls.allArgs()).toEqual([[1], [1, 2], [1, 2, 3]]);
            });

            it('trace all detail for a call', function () {
                foo.setBar(1);

                expect(foo.setBar.calls.all()).toEqual([
                    {
                        object: foo,
                        args: [1],
                        returnValue: undefined
                    }
                ]);
            });

            it('trace all detail most recent call', function () {
                foo.setBar(1);
                foo.setBar(1, 2);

                expect(foo.setBar.calls.mostRecent()).toEqual({
                    object: foo,
                    args: [1, 2],
                    returnValue: undefined
                });
            });

            it('trace all detail first call', function () {
                foo.setBar(1);
                foo.setBar(1, 2);

                expect(foo.setBar.calls.first()).toEqual({
                    object: foo,
                    args: [1],
                    returnValue: undefined
                });
            });

            it("tracks the context", function() {
                var spy = jasmine.createSpy('spy');
                var baz = {
                    fn: spy
                };
                var quux = {
                    fn: spy
                };
                baz.fn(123);
                quux.fn(456);

                expect(spy.calls.first().object).toBe(baz);
                expect(spy.calls.mostRecent().object).toBe(quux);
            });

            it("can be reset", function() {
                foo.setBar(123);
                foo.setBar(456, "baz");

                expect(foo.setBar.calls.any()).toBe(true);

                foo.setBar.calls.reset();

                expect(foo.setBar.calls.any()).toBe(false);
            });
        });
    });
});
