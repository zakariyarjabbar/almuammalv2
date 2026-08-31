import assert from 'node:assert/strict';
import test from 'node:test';
import { inquirySchema, normalize } from '../lib/inquiry-validation.ts';
const valid = {
  name: 'عميل تجريبي',
  phone: '٠٧٧٠١٢٣٤٥٦٧',
  service: 'posters',
  details: 'طباعة بوسترات تجريبية للمكتب بمقاس متوسط',
  area: 'بغداد الكرادة',
  method: 'whatsapp',
  consent: true,
  quantity: '٢',
  date: '',
  email: '',
};

await test('Arabic Iraqi phone accepted and normalized', () => {
  assert.equal(normalize(valid.phone), '07701234567');
  assert.equal(inquirySchema.safeParse(valid).success, true);
});
await test('International phone accepted', () =>
  assert.equal(
    inquirySchema.safeParse({ ...valid, phone: '+964 770 123 4567' }).success,
    true,
  ));
await test('Short and non-Iraqi numbers rejected', () => {
  for (const phone of ['123', '077012345', '+15551234567'])
    assert.equal(inquirySchema.safeParse({ ...valid, phone }).success, false);
});
await test('Required fields rejected', () => {
  for (const [field, value] of Object.entries({
    name: '',
    service: '',
    details: '',
    area: '',
    consent: false,
  }))
    assert.equal(
      inquirySchema.safeParse({ ...valid, [field]: value }).success,
      false,
    );
});
await test('Email required only for email method', () => {
  assert.equal(
    inquirySchema.safeParse({ ...valid, method: 'email' }).success,
    false,
  );
  assert.equal(
    inquirySchema.safeParse({
      ...valid,
      method: 'email',
      email: 'demo@local.test',
    }).success,
    true,
  );
});
await test('Negative fractional zero and extreme quantities rejected', () => {
  for (const quantity of ['-1', '0', '2.5', '100001', 'abc'])
    assert.equal(
      inquirySchema.safeParse({ ...valid, quantity }).success,
      false,
    );
});
await test('Past requested date rejected', () =>
  assert.equal(
    inquirySchema.safeParse({ ...valid, date: '2000-01-01' }).success,
    false,
  ));
await test('Future requested date accepted', () =>
  assert.equal(
    inquirySchema.safeParse({ ...valid, date: '2099-01-01' }).success,
    true,
  ));
