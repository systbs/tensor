# tensor
tensor ts

#using
```dart
const a = new Tensor(2,3,4);
const b = new Tensor(5,4,3);
const c = new Tensor(6,7,8);
const e1 = b.minus(a);
const e2 = c.minus(a);
const normal = e1.cross(e2);
const normalize = normal.norm();
```
