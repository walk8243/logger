import * as assert from 'assert';
import { stub, spy, SinonStub, SinonSpy } from 'sinon';
import func from '../../lib/func';

describe('Library func', () => {
  it('内容確認', () => {
    assert.deepEqual(Object.keys(func), ['assignSecondLevel', 'isAssociativeArray']);
    assert.equal(typeof func.assignSecondLevel, 'function');
    assert.equal(typeof func.isAssociativeArray, 'function');
  });

  describe('assignSecondLevel', () => {
    let stubFuncisAssociativeArray: SinonStub<[any], boolean>,
        spyTargetHasOwnProperty: SinonSpy<[string | number | symbol], boolean>,
        spyTargetNoFugaHasOwnProperty: SinonSpy<[string | number | symbol], boolean>,
        spySourceHasOwnProperty: SinonSpy<[string | number | symbol], boolean>;
    let target: Object = {},
        targetNoFuga: Object = {},
        source: Object = {},
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
      stubFuncisAssociativeArray = stub(func, 'isAssociativeArray');
      spyTargetHasOwnProperty = spy(target, 'hasOwnProperty');
      spyTargetNoFugaHasOwnProperty = spy(targetNoFuga, 'hasOwnProperty');
      spySourceHasOwnProperty = spy(source, 'hasOwnProperty');
    });
    after(() => {
      stubFuncisAssociativeArray.restore();
      spyTargetHasOwnProperty.restore();
      spyTargetNoFugaHasOwnProperty.restore();
      spySourceHasOwnProperty.restore();
    });
    beforeEach(() => {
      stubFuncisAssociativeArray.returns(true);
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
      stubFuncisAssociativeArray.reset();
      spyTargetHasOwnProperty.resetHistory();
      spyTargetNoFugaHasOwnProperty.resetHistory();
      spySourceHasOwnProperty.resetHistory();
    });

    describe('正常系', () => {
      it('sourceの中身をtargetも持っている', () => {
        var result = func.assignSecondLevel(target, source);
        assert.deepEqual(result, expectAssignTrue);
        assert.ok(spyTargetHasOwnProperty.calledOnce);
        assert.deepEqual(spyTargetHasOwnProperty.args, [['fuga']]);
      });
      it('sourceの中身をtargetが持っていない', () => {
        var result = func.assignSecondLevel(targetNoFuga, source);
        assert.deepEqual(result, expectAssignFalse);
        assert.ok(spyTargetNoFugaHasOwnProperty.calledOnce);
        assert.deepEqual(spyTargetNoFugaHasOwnProperty.args, [['fuga']]);
      });
      it('第二引数の方がkeyが多い', () => {
        var result = func.assignSecondLevel(source, target);
        assert.deepEqual(result, expectAssignRevese);
        assert.ok(spySourceHasOwnProperty.calledTwice);
        assert.deepEqual(spySourceHasOwnProperty.args, [['fuga'], ['hoge']]);
      });
    });

    describe('異常系', () => {
      it('targetがfalse', () => {
        stubFuncisAssociativeArray.returns(false);
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

  describe('isAssociativeArray', () => {
    class classDummy {};
    var promiseFunc = (resolve: (value?: unknown) => void, reject: (reason?: any) => void) => {};
    function* genDummy(){};

    describe('return true', () => {
      it('targetが連想配列', () => {
        var result = func.isAssociativeArray({ fuga: 1 });
        assert.equal(result, true);
      });
      it('targetが空オブジェクト', () => {
        var result = func.isAssociativeArray({});
        assert.equal(result, true);
      });
      it('targetがインスタンス', () => {
        var result = func.isAssociativeArray(new classDummy());
        assert.equal(result, true);
      });
      it('targetがMap', () => {
        var result = func.isAssociativeArray(new Map());
        assert.equal(result, true);
      });
    });
    describe('return false', () => {
      it('targetがnull', () => {
        var result = func.isAssociativeArray(null);
        assert.equal(result, false);
      });
      it('targetがundefined', () => {
        var result = func.isAssociativeArray(undefined);
        assert.equal(result, false);
      });
      it('targetがboolean', () => {
        var result = func.isAssociativeArray(true);
        assert.equal(result, false);
      });
      it('targetが空文字', () => {
        var result = func.isAssociativeArray('');
        assert.equal(result, false);
      });
      it('targetが文字列', () => {
        var result = func.isAssociativeArray('fuga');
        assert.equal(result, false);
      });
      it('targetが数字', () => {
        var result = func.isAssociativeArray(10);
        assert.equal(result, false);
      });
      it('targetが正規表現', () => {
        var result = func.isAssociativeArray(/\w+/);
        assert.equal(result, false);
      });
      it('targetが配列', () => {
        var result = func.isAssociativeArray([]);
        assert.equal(result, false);
      });
      it('targetが関数', () => {
        var result = func.isAssociativeArray(() => {});
        assert.equal(result, false);
      });
      it('targetがジェネレーター関数', () => {
        var result = func.isAssociativeArray(genDummy);
        assert.equal(result, false);
      });
      it('targetがジェネレータ', () => {
        var result = func.isAssociativeArray(genDummy());
        assert.equal(result, false);
      });
      it('targetがクラス', () => {
        var result = func.isAssociativeArray(classDummy);
        assert.equal(result, false);
      });
      it('targetがError', () => {
        var result = func.isAssociativeArray(new Error());
        assert.equal(result, false);
      });
      it('targetがTypeError', () => {
        var result = func.isAssociativeArray(new TypeError());
        assert.equal(result, false);
      });
      it('targetが正規表現オブジェクト', () => {
        var result = func.isAssociativeArray(new RegExp('\\w+'));
        assert.equal(result, false);
      });
      it('targetがArrayBuffer', () => {
        var result = func.isAssociativeArray(new ArrayBuffer(100));
        assert.equal(result, false);
      });
      it('targetがDataView', () => {
        var result = func.isAssociativeArray(new DataView(new ArrayBuffer(100)));
        assert.equal(result, false);
      });
      it('targetがPromise', () => {
        var result = func.isAssociativeArray(new Promise(promiseFunc));
        assert.equal(result, false);
      });
    });
  });
});
