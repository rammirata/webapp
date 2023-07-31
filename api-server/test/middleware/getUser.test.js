const assert = require('assert');
const sinon = require('sinon');
const UserService = require('../../services/User.service');
const { getUserByEmail } = require('../../middleware/getUser');

describe('getUserByEmail middleware', () => {
  it('should set req.$scope.user when user exists', async () => {
    const email = 'test@example.com';
    const userDocs = { name: 'John', email };
    const req = { body: { email }, $scope: {} };
    const res = {};
    const next = sinon.spy();

    sinon.stub(UserService.prototype, 'getOne').returns(userDocs);

    await getUserByEmail(req, res, next);

    assert.deepStrictEqual(req.$scope.user, userDocs);
    assert.strictEqual(next.calledOnce, true);

    UserService.prototype.getOne.restore();
  });

  it('should call next with error when user does not exist', async () => {
    const email = 'nonexistent@example.com';
    const req = { body: { email }, $scope: {} };
    const res = {};
    const next = sinon.spy();

    sinon.stub(UserService.prototype, 'getOne').returns(null);

    await getUserByEmail(req, res, next);

    assert.strictEqual(req.$scope.user, undefined);
    assert.strictEqual(next.calledOnce, true);
    assert(next.args[0][0] instanceof Error);

    UserService.prototype.getOne.restore();
  });
});
