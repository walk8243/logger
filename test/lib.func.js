const assert  = require('assert'),
      sinon   = require('sinon');
const func    = require('../lib/func');

describe.only('Library func', () => {
  it('内容確認', () => {
    assert.deepEqual(Object.keys(func), ['assignSecondLevel', 'judgeAssociativeArray']);
    assert.equal(typeof func.assignSecondLevel, 'function');
    assert.equal(typeof func.judgeAssociativeArray, 'function');
  });

  describe('assignSecondLevel', () => {
    var stubTargetHasOwnProperty,
        stubSourceHasOwnProperty;
    var target = {
          fuga: { a: 1 },
          hoge: { b: 2 },
        },
        source = {
          fuga: { a: 3, c: 4 },
        },
        expectAssing = {
          fuga: { a: 3, c: 4 },
          hoge: { b: 2 },
        }
    before(() => {
      stubTargetHasOwnProperty = sinon.stub(target, 'hasOwnProperty');
      stubSourceHasOwnProperty = sinon.stub(source, 'hasOwnProperty');
    });
    after(() => {
      stubTargetHasOwnProperty.restore();
      stubSourceHasOwnProperty.restore();
    });
    beforeEach(() => {
      stubTargetHasOwnProperty.returns(true);
      stubSourceHasOwnProperty.returns(true);
    });
    afterEach(() => {
      stubTargetHasOwnProperty.reset();
      stubSourceHasOwnProperty.reset();
    });

    it('正常系', () => {
      var result = func.assignSecondLevel(target, source);
      assert.deepEqual(result, expectAssing);
    });

    describe('異常系', () => {
    });
  });

  describe.only('judgeAssociativeArray', () => {
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
