const assert  = require('assert'),
      sinon   = require('sinon');
const func    = require('../lib/func');

describe('Library func', () => {
  it('内容確認', () => {
    assert.deepEqual(Object.keys(func), ['assignSecondLevel', 'judgeAssociativeArray']);
    assert.equal(typeof func.assignSecondLevel, 'function');
    assert.equal(typeof func.judgeAssociativeArray, 'function');
  });

  describe('assignSecondLevel', () => {
    var stubFuncJudgeAssociativeArray,
        spyTargetHasOwnProperty,
        spyTargetNoFugaHasOwnProperty,
        spySourceHasOwnProperty;
    var target = {},
        targetNoFuga = {},
        source = {},
        expectAssignTrue = {
          fuga: { a: 3, b: 2, d: 4 },
          hoge: { c: 3 },
        },
        expectAssignFalse = {
          fuga: { a: 3, d: 4 },
          hoge: { c: 3 },
        },
        expectAssignRevese = {
          fuga: { a: 1, b: 2, d: 4 },
          hoge: { c: 3 },
        };
    before(() => {
      stubFuncJudgeAssociativeArray = sinon.stub(func, 'judgeAssociativeArray');
      spyTargetHasOwnProperty = sinon.spy(target, 'hasOwnProperty');
      spyTargetNoFugaHasOwnProperty = sinon.spy(targetNoFuga, 'hasOwnProperty');
      spySourceHasOwnProperty = sinon.spy(source, 'hasOwnProperty');
    });
    after(() => {
      stubFuncJudgeAssociativeArray.restore();
      spyTargetHasOwnProperty.restore();
      spyTargetNoFugaHasOwnProperty.restore();
      spySourceHasOwnProperty.restore();
    });
    beforeEach(() => {
      stubFuncJudgeAssociativeArray.returns(true);
      Object.assign(target, {
        fuga: { a: 1, b: 2 },
        hoge: { c: 3 },
      });
      Object.assign(targetNoFuga, {
        hoge: { c: 3 },
      });
      Object.assign(source, {
        fuga: { a: 3, d: 4 },
      });
    });
    afterEach(() => {
      stubFuncJudgeAssociativeArray.reset();
      spyTargetHasOwnProperty.resetHistory();
      spyTargetNoFugaHasOwnProperty.resetHistory();
      spySourceHasOwnProperty.resetHistory();
    });

    describe('正常系', () => {
      it('sourceの中身をtargetも持っている', () => {
        var result = func.assignSecondLevel(target, source);
        assert.deepEqual(result, expectAssignTrue);
        assert.ok(spyTargetHasOwnProperty.calledOnce);
        assert.ok(spySourceHasOwnProperty.calledOnce);
        assert.deepEqual(spyTargetHasOwnProperty.args, [['fuga']]);
        assert.deepEqual(spySourceHasOwnProperty.args, [['fuga']]);
      });
      it('sourceの中身をtargetが持っていない', () => {
        var result = func.assignSecondLevel(targetNoFuga, source);
        assert.deepEqual(result, expectAssignFalse);
        assert.ok(spyTargetNoFugaHasOwnProperty.calledOnce);
        assert.ok(spySourceHasOwnProperty.calledOnce);
        assert.deepEqual(spyTargetNoFugaHasOwnProperty.args, [['fuga']]);
        assert.deepEqual(spySourceHasOwnProperty.args, [['fuga']]);
      });
      it('第二引数の方がkeyが多い', () => {
        var result = func.assignSecondLevel(source, target);
        assert.deepEqual(result, expectAssignRevese);
        assert.ok(spyTargetHasOwnProperty.calledTwice);
        assert.ok(spySourceHasOwnProperty.calledTwice);
        assert.deepEqual(spyTargetHasOwnProperty.args, [['fuga'], ['hoge']]);
        assert.deepEqual(spySourceHasOwnProperty.args, [['fuga'], ['hoge']]);
      });
    });

    describe('異常系', () => {
      it('targetがfalse', () => {
        stubFuncJudgeAssociativeArray.returns(false);
        try {
          func.assignSecondLevel(target, source);
          assert.fail();
        } catch(error) {
          assert.equal(error.name, 'TypeError');
          assert.equal(error.message, `'target' must be an Object.`);
        }
      });
      it('sourceがiterableでない', () => {
        var result = func.assignSecondLevel(target, null);
        assert.deepEqual(result, target);
        assert.ok(spyTargetHasOwnProperty.notCalled);
      });
    });
  });

  describe('judgeAssociativeArray', () => {
    class classDummy {};
    var promiseFunc = (res, rej) => {};
    function* genDummy(){};

    describe('return true', () => {
      it('targetが連想配列', () => {
        var result = func.judgeAssociativeArray({ fuga: 1 });
        assert.equal(result, true);
      });
      it('targetが空オブジェクト', () => {
        var result = func.judgeAssociativeArray({});
        assert.equal(result, true);
      });
      it('targetがインスタンス', () => {
        var result = func.judgeAssociativeArray(new classDummy());
        assert.equal(result, true);
      });
      it('targetがMap', () => {
        var result = func.judgeAssociativeArray(new Map());
        assert.equal(result, true);
      });
    });
    describe('return false', () => {
      it('targetがnull', () => {
        var result = func.judgeAssociativeArray(null);
        assert.equal(result, false);
      });
      it('targetがundefined', () => {
        var result = func.judgeAssociativeArray(undefined);
        assert.equal(result, false);
      });
      it('targetがboolean', () => {
        var result = func.judgeAssociativeArray(true);
        assert.equal(result, false);
      });
      it('targetが空文字', () => {
        var result = func.judgeAssociativeArray('');
        assert.equal(result, false);
      });
      it('targetが文字列', () => {
        var result = func.judgeAssociativeArray('fuga');
        assert.equal(result, false);
      });
      it('targetが数字', () => {
        var result = func.judgeAssociativeArray(10);
        assert.equal(result, false);
      });
      it('targetが正規表現', () => {
        var result = func.judgeAssociativeArray(/\w+/);
        assert.equal(result, false);
      });
      it('targetが配列', () => {
        var result = func.judgeAssociativeArray([]);
        assert.equal(result, false);
      });
      it('targetが関数', () => {
        var result = func.judgeAssociativeArray(() => {});
        assert.equal(result, false);
      });
      it('targetがジェネレーター関数', () => {
        var result = func.judgeAssociativeArray(genDummy);
        assert.equal(result, false);
      });
      it('targetがジェネレータ', () => {
        var result = func.judgeAssociativeArray(genDummy());
        assert.equal(result, false);
      });
      it('targetがクラス', () => {
        var result = func.judgeAssociativeArray(classDummy);
        assert.equal(result, false);
      });
      it('targetがError', () => {
        var result = func.judgeAssociativeArray(new Error());
        assert.equal(result, false);
      });
      it('targetがTypeError', () => {
        var result = func.judgeAssociativeArray(new TypeError());
        assert.equal(result, false);
      });
      it('targetが正規表現オブジェクト', () => {
        var result = func.judgeAssociativeArray(new RegExp('\\w+'));
        assert.equal(result, false);
      });
      it('targetがArrayBuffer', () => {
        var result = func.judgeAssociativeArray(new ArrayBuffer(100));
        assert.equal(result, false);
      });
      it('targetがDataView', () => {
        var result = func.judgeAssociativeArray(new DataView(new ArrayBuffer(100)));
        assert.equal(result, false);
      });
      it('targetがPromise', () => {
        var result = func.judgeAssociativeArray(new Promise(promiseFunc));
        assert.equal(result, false);
      });
    });
  });
});
