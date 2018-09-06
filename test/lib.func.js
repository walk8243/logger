const assert  = require('assert'),
      sinon   = require('sinon');
const func    = require('../lib/func');

describe.only('Library func', () => {
  it('内容確認', () => {
    assert.deepEqual(Object.keys(func), ['assignSecondLevel']);
    assert.equal(typeof func.assignSecondLevel, 'function');
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

  describe('judgeAssociativeArray', () => {
    class classDummy {}

    it('targetが連想配列', () => {
      var result = func.judgeAssociativeArray({ fuga: 1 });
      assert.equal(result, true);
    });
    it('targetが空オブジェクト', () => {
      var result = func.judgeAssociativeArray({});
      assert.equal(result, true);
    });
    it('targetがnull', () => {
      var result = func.judgeAssociativeArray(null);
      assert.equal(result, false);
    });
    it('targetがundefined', () => {
      var result = func.judgeAssociativeArray(undefined);
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
    it('targetが配列', () => {
      var result = func.judgeAssociativeArray([]);
      assert.equal(result, false);
    });
    it('targetが関数', () => {
      var result = func.judgeAssociativeArray(() => {});
      assert.equal(result, false);
    });
    it('targetがクラス', () => {
      var result = func.judgeAssociativeArray(classDummy);
      assert.equal(result, false);
    });
    it('targetがインスタンス', () => {
      var result = func.judgeAssociativeArray(new classDummy());
      assert.equal(result, true);
    });
  });
});
